"use client";
import { RoomType } from "@/interfaces";
import React from "react";
import { useRouter } from "next/navigation";
function RoomTile({ room }: { room: RoomType }) {
  const router = useRouter();
  let mainImage = room.media[0];
  return (
    <div
      className="border border-gray-300 border-solid room-tile cursor-pointer"
      onClick={() => router.push(`/book-room/${room._id}`)}
    >
      <img src={mainImage} alt="room" className="w-full" />
      <div className="py-3 px-2 flex flex-col">
        <h1 className="text-sm">{room.name}</h1>
        <span className="text-gray-500 text-sm">{room.hotel.name}</span>
      </div>
      <hr className="border-t border-gray-300 border-solid" />

      <div className="flex justify-between p-2">
        <span className="text-sm">Rent Per Day</span>
        <span className="text-sm">${room.rentPerDay}</span>
      </div>
    </div>
  );
}

export default RoomTile;
