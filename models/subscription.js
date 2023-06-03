import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },

  paymentMethod: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "paused", "cancelled"],
    default: "active",
  },
});

const Subscription = model("Subscription", subscriptionSchema);

module.exports = Subscription;
