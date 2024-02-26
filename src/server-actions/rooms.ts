"use server";
import RoomModel from "@/models/room-model";

export const AddRoom = async (payload: any) => {
  try {
    const room = new RoomModel(payload);
    await room.save();
    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const EditRoom = async ({
  payload,
  roomId,
}: {
  payload: any;
  roomId: string;
}) => {
  try {
    await RoomModel.findByIdAndUpdate(roomId, payload);
    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const DeleteRoom = async (roomId: string) => {
  try {
    await RoomModel.findByIdAndDelete(roomId);
    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};
