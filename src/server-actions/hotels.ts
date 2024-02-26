"use server";
import HotelModel from "@/models/hotel-model";

export const AddHotel = async (payload: any) => {
  try {
    const hotel = new HotelModel(payload);
    await hotel.save();
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

export const EditHotel = async ({
  payload,
  hotelId,
}: {
  payload: any;
  hotelId: string;
}) => {
  try {
    await HotelModel.findByIdAndUpdate(hotelId, payload);
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

export const DeleteHotel = async (hotelId: string) => {
  try {
    await HotelModel.findByIdAndDelete(hotelId);
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
