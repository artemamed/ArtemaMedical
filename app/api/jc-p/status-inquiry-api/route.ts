import axios from "axios";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { txnRefNo } = body;
    if (!txnRefNo) {
      return new Response(
        JSON.stringify({ error: "Please provide a txnRefNo Value" }),
        { status: 400 }
      );
    }
    console.log(txnRefNo);
    // JazzCash API Credentials
    const MerchantID = process.env.JC_P_MERCHANT_ID!;
    const Password = process.env.JC_P_MERCHANT_PASS!;
    const HashKey = process.env.JC_P_SV!;

    // Generate Secure Hash (HMAC-SHA256)
    const sortedString = `${HashKey}&${MerchantID}&${Password}&${txnRefNo}`;
    const secureHash = crypto
      .createHmac("sha256", HashKey)
      .update(sortedString)
      .digest("hex");

    // API Request Body
    const requestBody = {
      pp_MerchantID: MerchantID,
      pp_Password: Password,
      pp_TxnRefNo: txnRefNo,
      pp_SecureHash: secureHash,
    };

    // Make API Request
    const apiResponse = await axios.post(
      "https://sandbox.jazzcash.com.pk/ApplicationAPI/API/PaymentInquiry/Inquire",
      requestBody,
      { headers: { "Content-Type": "application/json" } }
    );

    const responseData = apiResponse.data;
    console.log("Transaction Status Response:", responseData);

    return new Response(JSON.stringify(responseData), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Error processing request" }), {
      status: 500,
    });
  }
}
