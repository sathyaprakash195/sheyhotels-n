import HotelModel from "@/models/hotel-model";
import React from "react";
import HotelForm from "../../_common/hotel-form";
import PageTitle from "@/components/page-title";

async function EditHotel({ params }: { params: any }) {
  const hotel = await HotelModel.findById(params.id);
  return (
    <div>
      <PageTitle title="Edit Hotel" />
      <HotelForm type="edit" initialData={JSON.parse(JSON.stringify(hotel))} />
    </div>
  );
}

export default EditHotel;
