export interface LocationsApiResponse {
  meta: {
    count: number;
    links: {
      self: string;
    };
  };
  data: LocationData[];
}

export interface LocationData {
  type: string; // "location"
  subType: "CITY" | "AIRPORT";
  name: string;
  detailedName: string;
  id: string;
  self: {
    href: string;
    methods: string[];
  };
  timeZoneOffset: string;
  iataCode: string;
  geoCode: GeoCode;
  address: LocationAddress;
  analytics: LocationAnalytics;
}

export interface GeoCode {
  latitude: number;
  longitude: number;
}

export interface LocationAddress {
  cityName: string;
  cityCode: string;
  countryName: string;
  countryCode: string;
  regionCode: string;
}

export interface LocationAnalytics {
  travelers: {
    score: number;
  };
}
