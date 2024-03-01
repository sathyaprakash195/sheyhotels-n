import RoomModel from "@/models/room-model";
import React from "react";
import RoomTile from "./room-tile";

async function RoomsData({ searchParams }: { searchParams: any }) {
  const response = await RoomModel.find().populate("hotel");
  const rooms = JSON.parse(JSON.stringify(response));
  return (
    <div className="grid grid-cols-3 gap-5">
      {rooms.map((room: any) => (
        <RoomTile key={room.id} room={room} />
      ))}
    </div>
  );
}

export default RoomsData;
