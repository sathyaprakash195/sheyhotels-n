import PageTitle from "@/components/page-title";
import React from "react";
import RoomForm from "../../_common/room-form";
import RoomModel from "@/models/room-model";

async function EditRoomPage({ params }: { params: any }) {
  const room = await RoomModel.findById(params.id);
  return (
    <div>
      <PageTitle title="Edit Room" />
      <RoomForm type="edit" initialData={JSON.parse(JSON.stringify(room))} />
    </div>
  );
}

export default EditRoomPage;
