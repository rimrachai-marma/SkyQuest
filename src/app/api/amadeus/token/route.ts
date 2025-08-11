import { env } from "@/data/env/server";

export async function GET() {
  const client_id = env.AMADEUS_API_KEY!;
  const client_secret = env.AMADEUS_API_SECRET!;

  const res = await fetch(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
    }
  );

  if (!res.ok) {
    return new Response("Failed to fetch access token");
  }

  const data = await res.json();
  return Response.json(data);
}
