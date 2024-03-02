"use server";

import BookingModel from "@/models/booking-model";

export async function CreateBooking(data: any) {
  try {
    const booking = new BookingModel(data);
    await booking.save();
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function CheckRoomAvalibility({
  roomId,
  checkInDate,
  checkOutDate,
}: {
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
}) {
  try {
    const bookings = await BookingModel.find({
      room: roomId,
      $or: [
        {
          checkInDate: { $lte: checkInDate },
          checkOutDate: { $gte: checkInDate },
        },
        {
          checkInDate: { $lte: checkOutDate },
          checkOutDate: { $gte: checkOutDate },
        },
        {
          checkInDate: { $gte: checkInDate },
          checkOutDate: { $lte: checkOutDate },
        },
      ],
    });

    let isAvailable = true;
    if (bookings.length > 0) {
      isAvailable = false;
    }

    return { success: isAvailable };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
