import {
  Price as ResponsePrice,
  Location as ResponseLocation,
  Segment as ResponseSegment,
  FlightData as ResponseFlightData,
} from "./api-response-types/flights";
import { LocationData as ResponseLocationData } from "./api-response-types/locations";

export type Location = ResponseLocation;
export type Price = ResponsePrice;
export type Segment = ResponseSegment;
export type FlightData = ResponseFlightData;
export type LocationData = ResponseLocationData;
