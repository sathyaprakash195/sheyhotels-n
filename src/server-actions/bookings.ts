"use server";

import BookingModel from "@/models/booking-model";

export async function CreateBooking(data: any) {
  try {
    const booking = new BookingModel(data);
    await booking.save();
    return { success: true, data: booking };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
