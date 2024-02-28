import PageTitle from "@/components/page-title";
import React from "react";
import RoomForm from "../_common/room-form";

function AddRoomPage() {
  return (
    <div>
      <PageTitle title="Add Room" />

      <RoomForm type="add" />
    </div>
  );
}

export default AddRoomPage;
