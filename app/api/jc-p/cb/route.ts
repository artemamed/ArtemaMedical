// import jwt from "jsonwebtoken";
// export async function POST(request: Request) {
//   try {
//     let body = await request.text();
//     body = JSON.parse(body);
//     const { pp_TxnRefNo, pp_ResponseCode } = body as unknown as {
//       pp_TxnRefNo: string;
//       pp_ResponseCode: string;
//     };
//     console.log(pp_TxnRefNo, pp_ResponseCode);
//     if (!pp_ResponseCode) {
//       return new Response(
//         JSON.stringify({ error: "Please provide a complete value" }),
//         { status: 400 }
//       );
//     }
//     const paymentStatus = pp_ResponseCode === "000" ? "success" : "failed";
//     const SECRET_KEY = process.env.JWT_SECRET!;
//     // Generate JWT token with 15-second expiry
//     const token = jwt.sign({ status: paymentStatus, pp_TxnRefNo }, SECRET_KEY, {
//       expiresIn: "15s",
//     });
//     return Response.redirect(
//       `https://artemamed.com/payment-status?token=${token}`,
//       302
//     );
//   } catch (error) {
//     console.log(error);
//     return new Response(
//       JSON.stringify({
//         message: "Call Back Called",
//       }),
//       {
//         status: 200,
//       }
//     );
//   }
// }

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

    // Mapping for response codes and their descriptions
    const responseCodeMappings: {
      [key: string]: { status: string; description: string };
    } = {
      "000": {
        status: "Completed",
        description:
          "Thank you for Using JazzCash, your transaction was successful.",
      },
      "121": {
        status: "Completed",
        description: "Transaction has been marked confirmed by Merchant.",
      },
      "124": {
        status: "Pending",
        description:
          "Order is placed and waiting for financials to be received over the counter.",
      },
      "157": {
        status: "Pending",
        description: "Transaction is pending (for Mwallet and MIgs).",
      },
    };

    // Determine the payment status and description based on the response code
    const paymentStatusMapping = responseCodeMappings[pp_ResponseCode] || {
      status: "Failed",
      description: "Transaction failed due to an unknown error.",
    };
    const { status: paymentStatus, description: statusDescription } =
      paymentStatusMapping;

    // Redirect to the appropriate page with the necessary query parameters
    if (paymentStatus === "Completed") {
      return Response.redirect(
        `https://artemamed.com/cart/checkOut/orderComplete?refNo=${pp_TxnRefNo}&status=${paymentStatus}`,
        // `http://localhost:3000/cart/checkOut/orderComplete?refNo=${pp_TxnRefNo}&status=${paymentStatus}`,
        302
      );
    } else if (paymentStatus === "Pending") {
      return Response.redirect(
        `https://artemamed.com/cart/checkOut/orderPending?refNo=${pp_TxnRefNo}&status=${paymentStatus}&statusDescription=${encodeURIComponent(statusDescription)}`,
        // `http://localhost:3000/cart/checkOut/orderPending?refNo=${pp_TxnRefNo}&status=${paymentStatus}&statusDescription=${encodeURIComponent(statusDescription)}`,
        302
      );
    } else {
      return Response.redirect(
        `https://artemamed.com/cart/checkOut/orderReject?refNo=${pp_TxnRefNo}&status=${paymentStatus}&statusDescription=${encodeURIComponent(statusDescription)}`,
        // `http://localhost:3000/cart/checkOut/orderReject?refNo=${pp_TxnRefNo}&status=${paymentStatus}&statusDescription=${encodeURIComponent(statusDescription)}`,
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
