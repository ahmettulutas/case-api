import mongoose from "mongoose";

const { Schema } = mongoose;
const packageSchema = new Schema(
  {
    packageIds: { type: Array, required: true },
    cardHolderName: { type: String, required: true },
    cardNumber: { type: String, required: true },
    expireDate: { type: String, required: true },
    cvv: { type: Number, required: true, length: 3 },
    totalAmount: { type: Number, required: true },
    currency: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.models.Payment || mongoose.model("Payment", packageSchema);