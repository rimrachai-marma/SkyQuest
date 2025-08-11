import React from "react";

import FlightResultCard from "./FlightResultCard";
import { fetchFlights } from "@/lib/api/flights";
import FlightResultCardSkeleton from "./FlightResultCardSkeleton";

interface Props {
  query: Record<string, string>;
}

const FlightResultList: React.FC<Props> = async ({ query }) => {
  const flights = await fetchFlights(query);

  if (!flights.data || flights.data.length === 0) {
    return (
      <div className="pt-10">
        <p className="text-2xl font-semibold text-center text-gray-500">
          😔 No flights found! Try adjusting your search.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {flights.data?.map((flight: any) => (
        <FlightResultCard
          key={flight.id}
          segments={flight.itineraries[0].segments}
          duration={flight.itineraries[0].duration}
          price={flight.price}
          locations={flights.dictionaries.locations}
          aircraft={flights.dictionaries.aircraft}
          carriers={flights.dictionaries.carriers}
          currencies={flights.dictionaries.currencies}
        />
      ))}

      <FlightResultCardSkeleton />
    </div>
  );
};

export default FlightResultList;
