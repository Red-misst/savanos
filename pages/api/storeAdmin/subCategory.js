import nc from "next-connect";
import auth from "@/middleware/auth";
import seller from "@/middleware/seller";
import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";
import db from "@/utils/db";
import slugify from "slugify";
const handler = nc().use(auth).use(seller);

handler.get(async (req, res) => {
  try {
    const { category } = req.query;
    (category);
    if (!category) {
      return res.json([]);
    }
    db.connectDb();
    const results = await SubCategory.find({ parent: category }).select("name");
    (results);
    db.disconnectDb();
    return res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default handler;
