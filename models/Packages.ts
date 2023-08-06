import mongoose from "mongoose";

const { Schema } = mongoose;

const packageSchema = new Schema(
  {
    imagePath: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    details: {
      type: Array,
      required: true
    },
    tags: {
      type: Array,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.models.Packages || mongoose.model("Packages", packageSchema);