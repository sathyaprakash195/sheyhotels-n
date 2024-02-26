import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    roomType: {
      type: String,
      required: true,
    },
    rentPerDay: {
      type: Number,
      required: true,
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hotels",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    media: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models["rooms"]) {
  delete mongoose.models["rooms"];
}

const RoomModel = mongoose.model("rooms", roomSchema);
export default RoomModel;
