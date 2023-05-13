import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const subSchema = new mongoose.Schema({
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
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true,
  },
  products: [
    {
      type: ObjectId,
      ref: "Product",
    },
  ],
  orders: [
    {
      type: ObjectId,
      ref: "Order",
    },
  ],
});

const SubCategory = mongoose.models.Store || mongoose.model("Store", subSchema);

export default Store;
