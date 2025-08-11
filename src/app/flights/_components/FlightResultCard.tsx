import React from "react";
import { Button } from "@/components/ui/button";
import FlightSegment from "./FlightSegment";
import { formatDuration } from "@/lib/utils";
import { Location, Price, Segment } from "@/lib/types";

interface Props {
  duration: string;
  segments: Segment[];
  price: Price;
  carriers: Record<string, string>;
  locations: Record<string, Location>;
  aircraft: Record<string, string>;
  currencies: Record<string, string>;
}

const FlightResultCard: React.FC<Props> = ({
  duration,
  segments,
  price,
  carriers,
  locations,
  aircraft,
  currencies,
}) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white w-full max-w-4xl mx-auto hover:shadow-md transition-shadow">
      {segments.map((segment, index) => (
        <FlightSegment
          key={segment.id}
          segment={segment}
          segments={segments}
          carriers={carriers}
          locations={locations}
          aircraft={aircraft}
          index={index}
        />
      ))}

      {/* Price & Select Button */}
      <div className="flex justify-between items-center pt-4 border-t">
        <div className="text-xl font-bold text-gray-700">
          {currencies[price.currency]} {price.grandTotal}
        </div>
        <span className="text-gray-600">{formatDuration(duration)}</span>
        <Button variant="outline" size="lg" className="cursor-pointer">
          Select Flight
        </Button>
      </div>
    </div>
  );
};

export default FlightResultCard;
