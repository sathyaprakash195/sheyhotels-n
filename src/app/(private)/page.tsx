import React, { Suspense } from "react";
import RoomsData from "./_common/rooms-data";
import Spinner from "@/components/spinner";

async function Homepage({ searchParams }: { searchParams: any }) {
  const suspenseKey = JSON.stringify(searchParams);
  return (
    <div>
      <Suspense
       key={suspenseKey}
       fallback={<Spinner />}
      >
        <RoomsData 
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
}

export default Homepage;
