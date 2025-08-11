import { Location, Segment } from "@/lib/types";
import {
  formatTime,
  formatDuration,
  formatDate,
  getLayoverMinutes,
} from "@/lib/utils";
import React from "react";

interface Props {
  segment: Segment;
  index: number;
  segments: Segment[];
  carriers: Record<string, string>;
  locations: Record<string, Location>;
  aircraft: Record<string, string>;
}
const FlightSegment: React.FC<Props> = ({
  segment,
  segments,
  carriers,
  locations,
  aircraft,
  index,
}) => {
  return (
    <>
      <div className="flex items-center justify-around py-4">
        {/* Departure */}
        <div className="text-center">
          <div className="text-lg font-semibold">
            {formatTime(segment.departure.at)}
          </div>
          <div className="text-gray-600">{segment.departure.iataCode}</div>
          <div className="text-gray-400 text-sm">
            {locations[segment.departure.iataCode].cityCode}
            &nbsp;&middot;&nbsp;
            {locations[segment.departure.iataCode].countryCode}
          </div>
          {segment.departure.terminal && (
            <div className="text-xs text-gray-400">
              Terminal - {segment.departure.terminal}
            </div>
          )}
          <div className="text-xs text-gray-400">
            {formatDate(segment.departure.at)}
          </div>
        </div>

        {/* Middle info */}
        <div className="flex flex-col items-center px-4">
          <div className="flex items-center space-x-2">
            {/* <img src={airline.logo} alt={airline.name} className="h-5" /> */}
            <span className="text-sm text-gray-600 whitespace-nowrap">
              {carriers[segment.carrierCode]} ({segment.carrierCode})
            </span>
          </div>

          <div className="text-xs text-gray-500 flex items-center gap-1">
            <span>
              {segment.carrierCode}-{segment.number}
            </span>
            &middot;
            <span>
              {aircraft[segment.aircraft.code]} ({segment.aircraft.code})
            </span>
          </div>

          <div className="text-xs text-gray-500">
            Stops - {segment.numberOfStops}
          </div>

          <div className="w-20 border-t border-gray-400 my-1"></div>

          <div className="text-xs text-gray-400">
            {formatDuration(segment.duration)}
          </div>
        </div>

        {/* Arrival */}
        <div className="text-center">
          <div className="text-lg font-semibold">
            {formatTime(segment.arrival.at)}
          </div>
          <div className="text-gray-600">{segment.arrival.iataCode}</div>
          <div className="text-gray-400 text-sm">
            {locations[segment.arrival.iataCode].cityCode}
            &nbsp;&middot;&nbsp;
            {locations[segment.arrival.iataCode].countryCode}
          </div>
          {segment.arrival.terminal && (
            <div className="text-xs text-gray-400">
              Terminal - {segment.arrival.terminal}
            </div>
          )}
          <div className="text-xs text-gray-400">
            {formatDate(segment.arrival.at)}
          </div>
        </div>
      </div>

      {/* Layover (only if not last segment) */}
      {index < segments?.length - 1 && (
        <div className="text-center py-2 text-xs text-gray-600 bg-gray-50 rounded-lg border">
          {getLayoverMinutes(
            segment.arrival.at,
            segments[index + 1].departure.at
          )}
          &nbsp;min layover at&nbsp;
          {segments[index + 1].departure.iataCode}
        </div>
      )}
    </>
  );
};

export default FlightSegment;
