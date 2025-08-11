import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-2 md:px-4">
      <div className="text-center space-y-4 pt-20">
        <h1>✈️ Find Your Perfect Flight</h1>
        <p>
          Easily search and compare flights to your favorite destinations. Enter
          your details and explore the best travel options in seconds.
        </p>

        <Button size="lg">
          <SearchIcon />
          <Link href="/flights">Search Flights</Link>
        </Button>
      </div>
    </main>
  );
}
