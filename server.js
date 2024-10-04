const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.json());

const mpesaApiUrl = "https://sandbox.safaricom.co.ke/mpesa";

app.post("/mpesa", async (req, res) => {
    const { amount, phoneNumber } = req.body;

    const shortcode = "YOUR_SHORTCODE";
    const lipaNaMpesaOnline = "YOUR_LIPA_NA_MPESA_ONLINE";
    const callbackUrl = "YOUR_CALLBACK_URL";
    const oauthToken = await getMpezaToken();

    const payload = {
        BusinessShortCode: shortcode,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: lipaNaMpesaOnline,
        PhoneNumber: phoneNumber,
        CallBackURL: callbackUrl,
        AccountReference: "Test123",
        TransactionDesc: "Payment for shopping"
    };

    try {
        const response = await axios.post(
            `${mpesaApiUrl}/ipn/v1/paymentrequest`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${oauthToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Payment failed" });
    }
});
// Function to get M-Pesa OAuth token
async function getMpezaToken() {
    const apiUrl = `${mpesaApiUrl}/oauth/v1/generate?grant_type=client_credentials`;
    const auth = Buffer.from("YOUR_CONSUMER_KEY:YOUR_CONSUMER_SECRET").toString("base64");

    const response = await axios.get(apiUrl, {
        headers: {
            Authorization: `Basic ${auth}`,
        },
    });

    return response.data.access_token;
}

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
