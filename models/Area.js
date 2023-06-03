import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const areaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Area = mongoose.models.Area || mongoose.model("Area", areaSchema);

export default Area;
