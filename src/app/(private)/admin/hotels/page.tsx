import LinkButton from "@/components/link-button";
import PageTitle from "@/components/page-title";
import HotelModel from "@/models/hotel-model";
import React from "react";
import HotelsTable from "./_common/hotels-table";

async function HotelsPage() {
  const response = await HotelModel.find({});
  const hotelsData = JSON.parse(JSON.stringify(response));
  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title="Hotels" />
        <LinkButton path="/admin/hotels/add" title="Add Hotel" />
      </div>

      <HotelsTable dataSource={hotelsData} />
    </div>
  );
}

export default HotelsPage;
