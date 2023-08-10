import nc from "next-connect";
import User from "@/models/User";
import db from "@/utils/db";
import auth from "@/middleware/auth";
const handler = nc().use(auth);

handler.get(async (req, res) => {
  try {
    db.connectDb();
    const user = await User.findById(req.user);
  
    // Find the active address based on some criteria (you need to define the logic for selecting the active address)
    const activeAddress = user.address.find(
      (address) => address.active === true
    );
    // console.log(activeAddress)
    let value = activeAddress.area;

    let data =
      value === "Talai"
        ? 30
        : value === "Mabs" || value === "Kesses" || value === "Chebarus"
        ? 50
        : 0;
    return res.json(data);

    // If there is no active address, you can handle it accordingly
    if (!activeAddress) {
      return res.status(404).json({ message: "User has no active address." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
