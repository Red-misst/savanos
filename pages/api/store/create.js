import nc from "next-connect";
import bcrypt from "bcrypt";
import { validateEmail } from "@/utils/validation";
import db from "@/utils/db";
import Store from "@/models/Store";
import { sendEmail } from "@/utils/sendEmails";
import { activateEmailTemplate } from "@/components/emails/activateEmailTemplate";

import auth from "@/middleware/auth";
const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { name, email, phoneNumber, seller } = req.body;
    if (!name || !email || !phoneNumber) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email." });
    }
    const store = await Store.findOne({ email: email });

    if (store) {
      return res
        .status(400)
        .json({ message: "This email already registered." });
    }
    // const seller = req.user._id;
    const newStore = new Store({
      name,
      email,
      phoneNumber,
      seller,
    }).save();

    await db.disconnectDb();

    //  await sendEmail( email, "Activate your account", activateEmailTemplate(email, name, newStore._id));

    res.json({
      message:
        "Success! Your store has been created. Please wait for approval.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
