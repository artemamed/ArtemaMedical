import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { currency, amount } = body;
    if (!currency || !amount) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
        }
      ); // Return an error if required fields are missing
    }
    currency = currency.trim().toUpperCase();

    // if the payment was not in the PKR currency convert into the PKR currency
    if (currency !== "PKR") {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/pair/${currency}/PKR/${amount}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      amount = data.conversion_result;
    }

    amount = Number(amount.toFixed(2));
    amount = Math.round(amount * 100) as number;
    amount = 200 as number;
    currency = "PKR";
    const billReference = `amg${Math.floor(Math.random() * 90 + 10)}`;
    const description = `${currency} ${amount}`;
    const txnType = "MPAY"; // Payment type
    const version = "1.1";
    const txnDateTime = new Date()
      .toISOString()
      .replace(/[-T:.Z]/g, "")
      .slice(0, 14);
    const txnExpiryDateTime = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .replace(/[-T:.Z]/g, "")
      .slice(0, 14);
    const txnRefNumber = `T${txnDateTime}${Math.floor(Math.random() * 90 + 10)}`;
    console.log(txnRefNumber);
    // JazzCash API Credentials
    const MerchantID = process.env.JC_P_MERCHANT_ID!;
    const Password = process.env.JC_P_MERCHANT_PASS!;
    const ReturnURL = process.env.JC_P_CB_URL!;
    const HashKey = process.env.JC_P_SV!;

    const hashArray = [
      amount,
      "",
      billReference,
      description,
      "EN",
      MerchantID,
      Password,
      "",
      ReturnURL,
      currency,
      txnDateTime,
      txnExpiryDateTime,
      txnRefNumber,
      txnType,
      version,
      "",
      "",
      "",
      "",
      "",
    ];

    let sortedString = HashKey;
    hashArray.forEach((value) => {
      if (value) sortedString += `&${value}`;
    });

    // Generate Secure Hash
    const secureHash = crypto
      .createHmac("sha256", HashKey)
      .update(sortedString)
      .digest("hex");

    const response = {
      PostURL: process.env.JC_P_PAYMENT_API as string,
      pp_Version: version,
      pp_TxnType: txnType,
      pp_Language: "EN",
      pp_MerchantID: MerchantID,
      pp_SubMerchantID: "",
      pp_Password: Password,
      pp_TxnRefNo: txnRefNumber,
      pp_Amount: amount,
      pp_TxnCurrency: currency,
      pp_TxnDateTime: txnDateTime,
      pp_BillReference: billReference,
      pp_Description: description,
      pp_BankID: "",
      pp_ProductID: "",
      pp_TxnExpiryDateTime: txnExpiryDateTime,
      pp_ReturnURL: ReturnURL,
      pp_SecureHash: secureHash,
      ppmpf_1: "",
      ppmpf_2: "",
      ppmpf_3: "",
      ppmpf_4: "",
      ppmpf_5: "",
    };
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("JazzCash API Error:", error);
    return new Response(
      JSON.stringify({ error: "JazzCash Session API Error" }),
      { status: 500 }
    );
  }
}
