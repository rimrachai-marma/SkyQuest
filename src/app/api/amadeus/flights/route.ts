// WE CAN ALOSO USE SDK

import { env } from "@/data/env/client";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  // In production app must need validation
  const originLocationCode = searchParams.get("originLocationCode") as string;
  const destinationLocationCode = searchParams.get(
    "destinationLocationCode"
  ) as string;
  const departureDate = searchParams.get("departureDate") as string;
  const adults = searchParams.get("adults") as string;
  const travelClass = searchParams.get("travelClass") as string;
  const returnDate = searchParams.get("returnDate") as string;
  const children = searchParams.get("children") as string;
  const infants = searchParams.get("infants") as string;

  const query: Record<string, string> = {
    originLocationCode,
    destinationLocationCode,
    departureDate,
    adults,
  };

  if (travelClass) {
    query.travelClass = travelClass;
  }

  if (returnDate) {
    query.returnDate = returnDate;
  }

  if (children) {
    query.children = children;
  }

  if (infants) {
    query.infants = infants;
  }

  const params = new URLSearchParams(query);

  const token = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/amadeus/token`);

  const { access_token, token_type } = await token.json();

  try {
    const res = await fetch(
      `https://test.api.amadeus.com/v2/shopping/flight-offers?${params}`,
      {
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      }
    );

    if (!res.ok) {
      Response.json("Failed to fetch flights", { status: 500 });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.log(error);
    Response.json(error, { status: 500 });
  }
}
