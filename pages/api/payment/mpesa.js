import nc from "next-connect";
import Order from "@/models/Order";
import db from "@/utils/db";
import auth from "@/middleware/auth";
import MpesaExpressApiService from "mpesa_express_api_service";
import axios from "axios";

const handler = nc();

handler.post(async (req, res) => {
  try {
    db.connectDb();
    console.log(MpesaExpressApiService);
    let defaultClient = MpesaExpressApiService.ApiClient.instance;
    // Configure OAuth2 access token for authorization: default

    let auth = defaultClient.authentications["default"];

    auth.accessToken =
      "eyJ4NXQiOiJNR1F6TmprelptVTFaV1k0T0dFNU5UZGpPRFU1T1RSak9ETmtaalZpWWpoaE4yRmtaamRoTURBNVpUWXdNamM0T0dWa1l6RXdaVE13WW1WbFlqZ3hZZyIsImtpZCI6Ik1HUXpOamt6Wm1VMVpXWTRPR0U1TlRkak9EVTVPVFJqT0ROa1pqVmlZamhoTjJGa1pqZGhNREE1WlRZd01qYzRPR1ZrWXpFd1pUTXdZbVZsWWpneFlnX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJJc2FhY0BjYXJib24uc3VwZXIiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6ImRkaWhjS2xEa0sxWmZVbzAycnpTTWZrQ2hkRWEiLCJuYmYiOjE2ODUzNzkwNzEsImF6cCI6ImRkaWhjS2xEa0sxWmZVbzAycnpTTWZrQ2hkRWEiLCJpc3MiOiJodHRwczpcL1wva2NiLXdzbzJpcy5hcHBzLnRlc3QuYXJvLmtjYmdyb3VwLmNvbTo5NDQ0XC9vYXV0aDJcL3Rva2VuIiwiZXhwIjoxNjg1MzgyNjcxLCJpYXQiOjE2ODUzNzkwNzEsImp0aSI6IjI0ZmJiNDJiLWY1MjMtNDk4Yy04YmI1LTlkMTRkOTRiYmRhZSJ9.ZYZIGD2D1bdGHNpAN9_47tn_BlvRywPQVGFE977J5zJZkn-Ab4ImYQF0HXN2Z8F-pVHNfQw4CSD4X5X-fZvLhJ0fYRMRB8vMU3P2RMNQtK5-JjiQ_IR9fyxVMLMtUpO8XHc1CxQZq6t2wgu8Ig9jl5t8nRgzsV-tRFeb0eFM-L7VuX3CCimRBHAtFSVPBo8qTD338EImnd60Fd5gNayhmi_r9HgNr6H2a7i8vbmvh9oLr_Lr7jaWH0qjwZKxMom-pwSbRctwe-SNNVj-12egJpfTu7o4aRQe0vl8S4it-SRV4pJ5E5w7hzcqYbtdBIOyzY2KWhIA4p6GO4-fmuNqPXlNYmojJjyc3MNFmrsTuZL64m9tySWhX6I3TbQXKoSiETQZ_-UuWMeJsYMZtpLUECkzBg6ypX03U4InJ3OFiGJKQheuWyGmH7UURAObyMmo90d8vJ02xZ6Hpu66srrEOwDwSBWNgUOCRv3OHRAdGb9bhhivbjX9cXNTy8SQPgqAeSEDdcYwrUtvNKnWVM3AujNPh5_gg6q5BUUmRlyH1aSS5NYf-cZhGpZUzEKtdHNYJTiz6rvotQ6T0atCfwAy_9wqcGkHf7KTA-B3AREnRmrtLvr3Uz0valhuFQGTmikHDJV8SZTuCoA4AqbqQZn7MFQ0I8B2bDVd1sGBnQnRWJY";

    let apiInstance = new MpesaExpressApiService.ExpressCheckoutRequestApi();
    let routeCode = 207; // String |
    let operation = STKPush; // String |
    let messageId = 8875661561; // String |
    let sTKPushRequest = new MpesaExpressApiService.STKPushRequest({
      phoneNumber: "254114931050",
      amount: "10",
      invoiceNumber: "INV-10122",
      sharedShortCode: true,
      orgShortCode: "7589326",
      orgPassKey:
        "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919",
      callbackUrl: "https://posthere.io/f613-4b7f-b82b",
      transactionDescription: "school fee payment",
    }); // STKPushRequest | Express Checkout Request Body
    apiInstance.stkpushPost(
      routeCode,
      operation,
      messageId,
      sTKPushRequest,
      (error, data, response) => {
        if (error) {
          console.error(error);
        } else {
          db.disconnectDb();
          console.log("API called successfully. Returned data: " + data);
          return res.json(buniApiResponse.data);
        }
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default handler;
