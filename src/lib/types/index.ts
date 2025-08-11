export type Location = {
  cityCode: string;
  countryCode: string;
};

export type Price = {
  currency: string;
  total: string;
  base: string;
  fees: { amount: string; type: string }[];
  grandTotal: string;
};
export type Segment = {
  departure: { iataCode: string; terminal?: string; at: string };
  arrival: { iataCode: string; terminal?: string; at: string };
  carrierCode: string;
  number: string;
  aircraft: { code: string };
  operating: { carrierCode: string };
  duration: string;
  id: string;
  numberOfStops: number;
  blacklistedInEU: boolean;
};
