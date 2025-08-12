import { Suspense } from "react";
import SearchForm from "./_components/SearchForm";
import ChildrenWrapper from "./_components/children-wrapper";

export default function FlightsPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-6xl mx-auto px-2 md:px-4 py-6 min-h-screen">
      <h1 className="!text-4xl !font-semibold text-center mb-8">
        ✈️ Find Your Perfect Flight!
      </h1>

      <SearchForm />
      <Suspense fallback={null}>
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </Suspense>
    </main>
  );
}
