import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rooms",
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hotels",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    checkInDate: {
      type: String,
      required: true,
    },
    checkOutDate: {
      type: String,
      required: true,
    },
    numberOfDays: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models["bookings"]) {
  delete mongoose.models["bookings"];
}

const BookingModel = mongoose.model("bookings", bookingSchema);

export default BookingModel;
