import React, { Fragment } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const FlightResultCardSkeleton: React.FC = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 shadow-sm bg-white w-full max-w-4xl mx-auto hover:shadow-md transition-shadow"
        >
          {[1, 2].map((_, i) => (
            <Fragment key={i}>
              <div className="flex items-center justify-around py-4">
                {/* Departure */}
                <div className="text-center space-y-1">
                  <Skeleton className="h-5 w-16 mx-auto" />
                  <Skeleton className="h-4 w-12 mx-auto" />
                  <Skeleton className="h-3 w-20 mx-auto" />
                  <Skeleton className="h-3 w-14 mx-auto" />
                  <Skeleton className="h-3 w-16 mx-auto" />
                </div>

                {/* Middle info */}
                <div className="flex flex-col items-center px-4 space-y-1">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-[1px] w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>

                {/* Arrival */}
                <div className="text-center space-y-1">
                  <Skeleton className="h-5 w-16 mx-auto" />
                  <Skeleton className="h-4 w-12 mx-auto" />
                  <Skeleton className="h-3 w-20 mx-auto" />
                  <Skeleton className="h-3 w-14 mx-auto" />
                  <Skeleton className="h-3 w-16 mx-auto" />
                </div>
              </div>

              {/* Layover (only if not last segment) */}
              {i === 0 && (
                <div className="text-center py-2 text-xs text-gray-600 bg-gray-50 rounded-lg border">
                  <Skeleton className="h-3 w-40 mx-auto" />
                </div>
              )}
            </Fragment>
          ))}

          {/* Price & Select Button */}
          <div className="flex justify-between items-center pt-4 border-t mt-4">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-4 w-16" />
            <Button variant="outline" size="lg" disabled>
              <Skeleton className="h-5 w-24" />
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};

export default FlightResultCardSkeleton;
