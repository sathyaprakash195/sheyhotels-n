import LinkButton from "@/components/link-button";
import PageTitle from "@/components/page-title";
import RoomModel from "@/models/room-model";
import React from "react";
import RoomsTable from "./_common/rooms-table";

async function RoomsPage() {
  const response = await RoomModel.find()
    .populate("hotel")
    .sort({ createdAt: -1 });
  const rooms = JSON.parse(JSON.stringify(response));
  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title="Rooms" />
        <LinkButton path="/admin/rooms/add" title="Add Room" />
      </div>

      <RoomsTable dataSource={rooms} />
    </div>
  );
}

export default RoomsPage;
