import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const flashSaleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
    date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
const FlashSale =
  mongoose.models.FlashSale || mongoose.model("FlashSale", flashSaleSchema);

export default FlashSale;
