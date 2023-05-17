import axios from "axios";
import nc from "next-connect";
import User from "@/models/User";
import db from "@/utils/db";
import auth from "@/middleware/auth";

const secret = process.env.MPESA_CLIENT_SECRET;
const consumer = process.env.MPESA_CLIENT_KEY;
const authMpesa = Buffer.from(`${consumer}:${secret}`).toString("base64");

const handler = async (req, res, next) => {
    console.log(authMpesa)
  try {
    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers : {
            Authorization: `Basic ${authMpesa}`,
        }
        
      }
    );

    console.log(response.data);
    return res.status(200).json(response.data);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to retrieve access token" });
  }
};

export default handler;
