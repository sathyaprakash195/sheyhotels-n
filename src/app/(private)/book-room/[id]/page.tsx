import { RoomType } from "@/interfaces";
import RoomModel from "@/models/room-model";
import React from "react";
import Media from "../_common/media";

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
      <div>
        <h1 className="text-3xl text-gray-500">
          {room.name} - {room.hotel.name}
        </h1>
        <span className="text-sm text-gray-500">{room.hotel.location}</span>
      </div>

      <hr className="border-t border-gray-300 border-solid mt-5 mb-5" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-5">
        {renderRoomProperty("Rent Per Day", room.rentPerDay)}
        {renderRoomProperty("Room Type", room.type)}
        {renderRoomProperty("Capacity", room.maxCapacity || "N/A")}
        {renderRoomProperty("Bedrooms", room.bedrooms || "N/A")}
        {renderRoomProperty("Email", room.hotel.email)}
        {renderRoomProperty("Phone Number", room.hotel.phoneNumber)}
      </div>

      <hr className="border-t border-gray-300 border-solid mt-5 mb-5" />

      <Media room={room} />
    </div>
  );
}

export default BookRoomPage;
