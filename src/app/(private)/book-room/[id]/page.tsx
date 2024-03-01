import { RoomType } from "@/interfaces";
import RoomModel from "@/models/room-model";
import React from "react";
import Media from "../_common/media";
import DateEntry from "../_common/dates-entry";

async function BookRoomPage({ params }: { params: { id: string } }) {
  const response = await RoomModel.findById(params.id).populate("hotel");
  const room: RoomType = JSON.parse(JSON.stringify(response));

  const renderRoomProperty = (property: string, value: any) => {
    return (
      <div className="flex flex-col text-sm capitalize">
        <span className="text-gray-500">{property}</span>
        <span>{value}</span>
      </div>
    );
  };

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl text-gray-500">
          {room.name} - {room.hotel.name}
        </h1>
        <span className="text-sm text-gray-500">{room.hotel.location}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 mt-10 gap-10">
        <div className="col-span-2">
          <Media room={room} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            {renderRoomProperty("Rent Per Day", room.rentPerDay)}
            {renderRoomProperty("Room Type", room.type)}
            {renderRoomProperty("Capacity", room.maxCapacity || "N/A")}
            {renderRoomProperty("Bedrooms", room.bedrooms || "N/A")}
            {renderRoomProperty("Email", room.hotel.email)}
            {renderRoomProperty("Phone Number", room.hotel.phoneNumber)}
          </div>
        </div>

        <DateEntry room={room} />
      </div>
    </div>
  );
}

export default BookRoomPage;
