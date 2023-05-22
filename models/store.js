import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, "must be atleast 2 charcters"],
      maxlength: [32, "Should not be more than 32 characters"],
    },
    seller: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      required: "Please enter your email address.",
      trim: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);

const Store = mongoose.models.Store || mongoose.model("Store", storeSchema);

export default Store;
