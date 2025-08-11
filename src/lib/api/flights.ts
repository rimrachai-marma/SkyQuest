import { env } from "@/data/env/client";

export const fetchFlights = async (query: Record<string, string>) => {
  const searchParams = new URLSearchParams(query).toString();

  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_BASE_URL}/api/amadeus/flights${
        searchParams ? `?${searchParams}` : ""
      }`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch flights");
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
