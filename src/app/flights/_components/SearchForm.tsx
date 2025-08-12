"use client";

import React from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import AsyncSelect from "react-select/async";
import { addYears, format } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  ChevronDownIcon,
  MinusIcon,
  PlusIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchLocations } from "@/lib/api/locations";
import { SearchFormSchema } from "@/lib/schemas/searchform.schema";
import { Calendar } from "@/components/ui/calendar";
import { reactSlectStyles } from "@/styles/react-select-styles";
import { LocationsApiResponse } from "@/lib/types/api-response-types/locations";
import { LocationData } from "@/lib/types";

const SearchForm: React.FC = () => {
  const router = useRouter();
  const [tripType, setTripType] = React.useState<string>("round-trip");

  //  Initialize form
  const form = useForm<z.infer<typeof SearchFormSchema>>({
    resolver: zodResolver(SearchFormSchema),
    defaultValues: {
      travelClass: "ECONOMY",
      passengers: {
        adults: 1,
        children: 0,
        infants: 0,
      },
      originLocation: {
        id: "",
        name: "",
        subType: "CITY",
        iataCode: "",
        cityName: "",
        countryName: "",

        label: "",
        value: "",
      },
      destinationLocation: {
        id: "",
        name: "",
        subType: "CITY",
        iataCode: "",
        cityName: "",
        countryName: "",

        label: "",
        value: "",
      },
      departureDate: undefined,
      returnDate: undefined,
    },
  });

  const passengers = form.watch("passengers");
  //  Helper values
  const seated = passengers.adults + passengers.children;
  const totalPassengers =
    passengers.adults + passengers.children + passengers.infants;

  //  Update passenger count safely
  const updatePassengerCount = (
    type: "adults" | "children" | "infants",
    delta: number
  ) => {
    const { adults, children } = passengers;
    const current = passengers[type];
    const newVal = current + delta;

    // Common minimum rules
    if (newVal < 0) return;

    // Adults must be at least 1
    if (type === "adults" && newVal < 1) return;

    // Seated passengers (adults + children) must not exceed 9
    const newSeated =
      type === "adults"
        ? newVal + children
        : type === "children"
        ? adults + newVal
        : adults + children;

    if (newSeated > 9) return;

    // Infants cannot exceed adults
    if (type === "infants" && newVal > adults) return;

    form.setValue(`passengers.${type}`, newVal);

    if (type === "adults") {
      const infants = passengers.infants;
      if (infants > newVal) {
        form.setValue("passengers.infants", newVal, {
          shouldValidate: true,
        });
      }
    }
  };

  const searchLocations = async (keyword: string) => {
    const locations: LocationsApiResponse = await fetchLocations(keyword);
    return locations.data?.map((location: LocationData) => ({
      id: location.id,
      name: location.name,
      iataCode: location.iataCode,
      subType: location.subType,

      cityName: location.address.cityName,
      countryName: location.address.countryName,

      label: location.name,
      value: location.iataCode,
    }));
  };

  function onSubmit(values: z.infer<typeof SearchFormSchema>) {
    const query: Record<string, string> = {
      originLocationCode: values.originLocation.iataCode,
      destinationLocationCode: values.destinationLocation.iataCode,
      departureDate: format(values.departureDate, "yyyy-MM-dd"),
      adults: values.passengers.adults.toString(),
      travelClass: values.travelClass,
    };

    // Add returnDate only if it exists
    if (values.returnDate) {
      query.returnDate = format(values.returnDate, "yyyy-MM-dd");
    }

    // Add children if > 0
    if (values.passengers.children > 0) {
      query.children = values.passengers.children.toString();
    }

    // Add infants if > 0
    if (values.passengers.infants > 0) {
      query.infants = values.passengers.infants.toString();
    }

    const params = new URLSearchParams(query);

    router.push(`/flights?${params.toString()}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-5xl mx-auto relative"
      >
        <div className="bg-background rounded-lg shadow pt-2 md:pt-4 px-2 md:px-4 space-y-2 pb-8">
          <div className="flex justify-between md:justify-start gap-1 md:gap-2">
            {/*  Trip Type */}
            <Select
              name="tripType"
              value={tripType}
              onValueChange={(value) => {
                setTripType(value);

                form.setValue("returnDate", undefined);
              }}
            >
              <SelectTrigger className="w-full md:w-fit cursor-pointer">
                <SelectValue placeholder={tripType} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="round-trip">Round Trip</SelectItem>
                  <SelectItem value="one-way">One Way</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/*  Passenger Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="space-x-0.5 md:space-x-1 cursor-pointer"
                >
                  <UserIcon size={18} className="opacity-50" />
                  <span>{totalPassengers}</span>
                  <ChevronDownIcon className="size-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="space-y-2.5" align="start">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Passengers</span>
                  <div className="text-sm text-muted-foreground">
                    Seated: {seated} / 9
                  </div>
                </DropdownMenuLabel>

                <div className="p-2 space-y-2">
                  {(["adults", "children", "infants"] as const).map((type) => {
                    const labels = {
                      adults: "Adults",
                      children: "Children",
                      infants: "Infants",
                    };
                    const descriptions = {
                      adults: "12+",
                      children: "2-12",
                      infants: "Under 2 (on lap)",
                    };

                    const count = passengers[type];

                    // Disabled logic
                    const disableDecrement =
                      type === "adults" ? count <= 1 : count <= 0;

                    const disableIncrement =
                      (type === "adults" || type === "children") && seated >= 9;

                    const disableInfantPlus =
                      type === "infants" && count >= passengers.adults;

                    return (
                      <div
                        key={type}
                        className="flex items-center justify-between gap-6"
                      >
                        <div className="flex flex-col">
                          <span>{labels[type]}</span>
                          <span className="text-sm text-muted-foreground">
                            {descriptions[type]}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <Button
                            size="icon"
                            variant="outline"
                            type="button"
                            onClick={() => updatePassengerCount(type, -1)}
                            disabled={disableDecrement}
                            className="cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            <MinusIcon className="size-4" />
                          </Button>
                          <span>{count}</span>
                          <Button
                            size="icon"
                            variant="outline"
                            type="button"
                            onClick={() => updatePassengerCount(type, 1)}
                            disabled={disableIncrement || disableInfantPlus}
                            className="cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            <PlusIcon className="size-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/*  Travel Class */}
            <FormField
              control={form.control}
              name="travelClass"
              render={({ field }) => (
                <FormItem className="w-full md:w-fit">
                  <Select
                    name="travelClass"
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full cursor-pointer">
                        <SelectValue placeholder={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ECONOMY">Economy</SelectItem>
                      <SelectItem value="PREMIUM_ECONOMY">
                        Premium Economy
                      </SelectItem>
                      <SelectItem value="BUSINESS">Business</SelectItem>
                      <SelectItem value="FIRST">First</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          {/* Location AND Date */}
          <div className="flex flex-col md:flex-row gap-2">
            {/* Location */}
            <div className="flex gap-2 w-full">
              {/*  Origin Location */}
              <Controller
                name="originLocation"
                control={form.control}
                render={({ field }) => (
                  <AsyncSelect
                    name="originLocation"
                    instanceId="originLocation"
                    cacheOptions
                    defaultOptions
                    loadOptions={searchLocations}
                    placeholder="Where from you?"
                    onChange={(value) => field.onChange(value)}
                    noOptionsMessage={({ inputValue }) => {
                      if (!inputValue) {
                        return "Find city or airport";
                      }
                      return "No matching locations found!";
                    }}
                    styles={reactSlectStyles(
                      !!form.formState.errors.originLocation
                    )}
                  />
                )}
              />

              {/* Destination Location  */}
              <Controller
                name="destinationLocation"
                control={form.control}
                render={({ field }) => (
                  <AsyncSelect
                    name="destinationLocation"
                    instanceId="destinationLocation"
                    cacheOptions
                    defaultOptions
                    loadOptions={searchLocations}
                    placeholder="Where to?"
                    onChange={(value) => field.onChange(value)}
                    noOptionsMessage={({ inputValue }) => {
                      if (!inputValue) {
                        return "Find city or airport";
                      }
                      return "No matching locations found!";
                    }}
                    styles={reactSlectStyles(
                      !!form.formState.errors.destinationLocation
                    )}
                  />
                )}
              />
            </div>

            {/* Date */}
            <div
              className={`flex gap-2 w-full ${
                tripType === "one-way" && "md:w-1/2"
              }`}
            >
              {/* Departure Date */}
              <FormField
                control={form.control}
                name="departureDate"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full font-normal flex justify-between cursor-pointer h-10",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              <>
                                <span>Departure</span>
                                <span>{format(field.value, "PPP")}</span>
                              </>
                            ) : (
                              <span>Departure Date</span>
                            )}

                            <CalendarIcon className="h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date: Date) =>
                            date < new Date() || date > addYears(new Date(), 1)
                          }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              {/* Return Date IF round trip */}
              {tripType === "round-trip" && (
                <FormField
                  control={form.control}
                  name="returnDate"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full font-normal flex justify-between cursor-pointer h-10",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                <>
                                  <span>Retrun</span>
                                  <span>{format(field.value, "PPP")}</span>
                                </>
                              ) : (
                                <span>Retrun Date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date: Date) =>
                              date < new Date() ||
                              date > addYears(new Date(), 1)
                            }
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>

          {/* Search button */}
          <Button
            size="lg"
            variant="outline"
            className="cursor-pointer rounded-full absolute left-1/2 transform -translate-x-1/2 -bottom-5 shadow"
          >
            <SearchIcon />
            <span>Search</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SearchForm;
