// WE CAN ALOSO USE SDK

import { env } from "@/data/env/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const keyword = searchParams.get("keyword");

  const token = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/amadeus/token`);

  const { access_token, token_type } = await token.json();

  try {
    const res = await fetch(
      `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=${keyword}`,
      {
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      }
    );

    if (!res.ok) {
      NextResponse.json("Failed to fetch locations", { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    NextResponse.json(error, { status: 500 });
  }
}
