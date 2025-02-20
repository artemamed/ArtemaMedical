
// app/api/jc-p/cb/route.ts:

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    let body;

    if (contentType.includes("application/json")) {
      body = await request.json();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await request.formData();
      body = Object.fromEntries(formData.entries());
    } else {
      return new Response(
        JSON.stringify({ error: "Unsupported content type" }),
        { status: 415, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("Parsed Body:", body);

    const { pp_ResponseCode, pp_TxnRefNo } = body as {
      pp_TxnRefNo: string;
      pp_ResponseCode: string;
    };

    if (!pp_ResponseCode) {
      return new Response(
        JSON.stringify({ error: "Please provide a complete value" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Determine the payment status based on the response code
    let paymentStatus;
    let statusDescription = "";
    switch (pp_ResponseCode) {
      case "000":
        paymentStatus = "Success";
        statusDescription =
          "Thank you for Using JazzCash, your transaction was successful.";
        break;
      case "121":
        paymentStatus = "Success";
        statusDescription =
          "Transaction has been marked confirmed by Merchant.";
        break;
      case "124":
        paymentStatus = "Pending";
        statusDescription =
          "Order is placed and waiting for financials to be received over the counter.";
        break;
      case "157":
        paymentStatus = "Pending";
        statusDescription = "Transaction is pending.(for Mwallet and MIgs)";
        break;
      case "405 || 453 || 004":
        paymentStatus = "Failed";
        statusDescription =
          "Your transaction was declined because of insufficient balance in your card";
        break;
      case "002	 || 003":
        paymentStatus = "Pending";
        statusDescription = "Account not found";
        break;
      default:
        paymentStatus = "Failed";
        statusDescription = "Transaction failed. Please try again.";
        break;
    }

    // Redirect to the appropriate page based on the payment status
    if (paymentStatus === "Success") {
      return Response.redirect(
        `https://artemamed.com/cart/checkOut/orderComplete?refNo=${pp_TxnRefNo}&status=${paymentStatus}`,
        302
      );
    } else {
      return Response.redirect(
        `https://artemamed.com/cart/checkOut/orderReject?refNo=${pp_TxnRefNo}&status=${paymentStatus}&statusDescription=${encodeURIComponent(statusDescription)}`,
        302
      );
    }
  } catch (error) {
    console.error("Error in Callback:", error);
    return new Response(
      JSON.stringify({ message: "Invalid request or parsing error" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
