import nc from "next-connect";
import User from "@/models/User";
import db from "@/utils/db";
import auth from "@/middleware/auth";
const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    db.connectDb();
    const { shipping } = req.body;

    const user = User.findById(req.user);
    await user.updateOne({
      $push: {
        address: shipping,
      },
    });

    db.disconnectDb();

    return res.json({ message: "Address saved successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
