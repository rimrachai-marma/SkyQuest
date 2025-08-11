import React, { Suspense } from "react";
import FlightResultList from "./_components/FlightResultList";
import FlightResultCardSkeleton from "./_components/FlightResultCardSkeleton";

export const dynamic = "force-dynamic";
const FlightsPage: React.FC = async (props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;

  const originLocationCode = searchParams?.originLocationCode as
    | string
    | undefined;
  const destinationLocationCode = searchParams?.destinationLocationCode as
    | string
    | undefined;
  const departureDate = searchParams?.departureDate as string | undefined;
  const returnDate = searchParams?.returnDate as string | undefined;
  const adults = searchParams?.adults as string | undefined;
  const travelClass = searchParams?.travelClass as string | undefined;
  const children = searchParams?.children as string | undefined;
  const infants = searchParams?.infants as string | undefined;

  const query: Record<string, string> = {};

  if (originLocationCode) {
    query.originLocationCode = originLocationCode;
  }

  if (destinationLocationCode) {
    query.destinationLocationCode = destinationLocationCode;
  }

  if (departureDate) {
    query.departureDate = departureDate;
  }

  if (adults) {
    query.adults = adults;
  }

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

  if (Object.keys(query).length === 0)
    return (
      <div className="pt-20">
        <p className="text-2xl font-semibold text-center">
          ✈️ Find Your Perfect Flight!
        </p>
      </div>
    );

  return (
    <div className="py-12">
      <Suspense fallback={<FlightResultCardSkeleton />}>
        <FlightResultList query={query} />
      </Suspense>
    </div>
  );
};

export default FlightsPage;
