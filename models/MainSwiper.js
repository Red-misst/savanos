import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const mainSwiperSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    img: {
      type: String,
      required: true,
    },

    category: {
      type: ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);
const MainSwiper =
  mongoose.models.MainSwiper || mongoose.model("MainSwiper", mainSwiperSchema);

export default MainSwiper;
