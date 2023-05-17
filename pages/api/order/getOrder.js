import nc from "next-connect";
import User from "@/models/User";
import Order from "@/models/Order";
import db from "@/utils/db";
import auth from "@/middleware/auth";
const handler = nc().use(auth);

handler.get(async (req, res) => {
  try {
    db.connectDb();
    const latestOrder = await Order.findOne({}).sort({ createdAt: -1 }).limit(1);
    return res.json({ latestOrder });
    db.disconnectDb();
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message });
  }
 
});

export default handler;
