import React from "react";

import FlightResultCard from "./FlightResultCard";
import { fetchFlights } from "@/lib/api/flights";
import { FlightsApiResponse } from "@/lib/types/api-response-types/flights";
import { FlightData } from "@/lib/types";

interface Props {
  query: Record<string, string>;
}

const FlightResultList: React.FC<Props> = async ({ query }) => {
  const flights: FlightsApiResponse = await fetchFlights(query);

  if (!flights.data || flights.data.length < 1) {
    return (
      <div className="pt-8">
        <p className="text-2xl font-semibold text-center text-gray-500">
          😔 No flights found! Try adjusting your search.
        </p>
      </div>
    );
  }

  const { locations, aircraft, carriers, currencies } = flights.dictionaries;

  return (
    <>
      {flights.data.map((flight: FlightData) => {
        const [itinerary] = flight.itineraries;
        return (
          <FlightResultCard
            key={flight.id}
            segments={itinerary.segments}
            duration={itinerary.duration}
            price={flight.price}
            locations={locations}
            aircraft={aircraft}
            carriers={carriers}
            currencies={currencies}
          />
        );
      })}
    </>
  );
};

export default FlightResultList;
