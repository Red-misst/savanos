import nc from "next-connect";
import Order from "@/models/Order";
import db from "@/utils/db";
import auth from "@/middleware/auth";
import axios from "axios";

const handler = nc();

handler.post(async (req, res) => {
  try {
    db.connectDb();

    // Get order data and user phone number from request body
    const { orderData, phone_number } = req.body;

    // Get order details from the database using the order ID
    const order = await Order.findById(orderData.id).lean();
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Calculate the amount the user is supposed to pay
    const orderTotal = order.total;

    // Make an API call to the KCB Buni API to initiate the M-Pesa STK push
    const buniApiUrl = "https://sandbox.buni.co.ke";
    const buniApiToken = process.env.BUNI_API_TOKEN;

    const buniApiBusinessShortCode = process.env.BUNI_API_BUSINESS_SHORTCODE;
    const buniApiPasskey = process.env.BUNI_API_PASSKEY;

    // Password: Buffer.from(
    //     `${buniApiBusinessShortCode}${buniApiPasskey}${getCurrentTimestamp()}`
    //   ).toString("base64"),
    const payload = {
      orgShortCode: buniApiBusinessShortCode,
      orgPassKey: buniApiPasskey,
      amount: orderTotal,
      sharedShortCode: true,
      phoneNumber: phone_number,
      callbackUrl: "https://06ebwp-3000.csb.app/", // Replace with your callback URL
      invoiceNumber: orderData.id,
      transactionDescription: "Order Payment",
    };
    const headers = {
      Authorization: `Bearer ${buniApiToken}`,
      "Content-Type": "application/json",
    };

    const buniApiResponse = await axios.post(`${buniApiUrl}/STKPush`, payload, {
      headers,
    });

    db.disconnectDb();
    console.log(buniApiResponse.data);
    return res.json(buniApiResponse.data);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default handler;

// Helper function to get the current timestamp in the required format
function getCurrentTimestamp() {
  return new Date()
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, -3);
}
