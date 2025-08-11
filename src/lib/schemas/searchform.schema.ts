import { isBefore, startOfDay } from "date-fns";
import { z } from "zod";

// Zod schema with business logic
export const SearchFormSchema = z
  .object({
    travelClass: z.enum(["ECONOMY", "PREMIUM_ECONOMY", "BUSINESS", "FIRST"]),
    passengers: z.object({
      adults: z
        .number()
        .min(1, "At least one adult is required")
        .max(9, "Maximum 9 total passengers allowed"),
      children: z.number().min(0).max(9),
      infants: z.number().min(0).max(9),
    }),

    originLocation: z.object({
      id: z.string(),
      name: z.string(),
      subType: z.enum(["AIRPORT", "CITY"]),
      iataCode: z.string().regex(/^[A-Z]{3}$/),
      cityName: z.string(),
      countryName: z.string(),

      label: z.string(),
      value: z.string(),
    }),
    destinationLocation: z.object({
      id: z.string(),
      iataCode: z.string().regex(/^[A-Z]{3}$/),
      name: z.string(),
      subType: z.enum(["AIRPORT", "CITY"]),
      cityName: z.string(),
      countryName: z.string(),

      label: z.string(),
      value: z.string(),
    }),

    departureDate: z.date(),
    returnDate: z.date().optional(),
  })
  .superRefine((data, ctx) => {
    const { adults, children, infants } = data.passengers;
    const seated = adults + children;

    if (seated > 9) {
      ctx.addIssue({
        path: ["passengers"],
        code: "custom",
        message:
          "Total seated passengers (adults + children) must not exceed 9.",
      });
    }

    if (infants > adults) {
      ctx.addIssue({
        path: ["passengers.infants"],
        code: "custom",
        message: "Infants cannot exceed number of adults.",
      });
    }

    // Date rules
    const today = startOfDay(new Date());

    if (isBefore(data.departureDate, today)) {
      ctx.addIssue({
        path: ["departureDate"],
        code: "custom",
        message: "Departure date cannot be in the past.",
      });
    }

    if (data.returnDate && isBefore(data.returnDate, data.departureDate)) {
      ctx.addIssue({
        path: ["returnDate"],
        code: "custom",
        message: "Return date must be after departure date.",
      });
    }
  });
