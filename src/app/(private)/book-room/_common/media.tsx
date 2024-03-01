"use client";

import { RoomType } from "@/interfaces";
import { Image } from "antd";
import React from "react";

function Media({ room }: { room: RoomType }) {
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const combinedImages = [room.media].flat();
  return (
    <div className="flex flex-wrap gap-5">
      <div className="flex flex-wrap gap-5">
        {combinedImages.map((image, index) => (
          <Image
            width={200}
            src={image}
            height={160}
            key={index}
            className="rounded-md cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
}

export default Media;
