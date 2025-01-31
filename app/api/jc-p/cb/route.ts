import jwt from "jsonwebtoken";
export async function POST(request: Request) {
  try {
    let body = await request.text();
    body = JSON.parse(body);
    const { pp_TxnRefNo, pp_ResponseCode } = body as unknown as {
      pp_TxnRefNo: string;
      pp_ResponseCode: string;
    };
    console.log(pp_TxnRefNo, pp_ResponseCode);
    if (!pp_ResponseCode) {
      return new Response(
        JSON.stringify({ error: "Please provide a complete value" }),
        { status: 400 }
      );
    }
    const paymentStatus = pp_ResponseCode === "000" ? "success" : "failed";
    const SECRET_KEY = process.env.JWT_SECRET!;
    // Generate JWT token with 15-second expiry
    const token = jwt.sign({ status: paymentStatus, pp_TxnRefNo }, SECRET_KEY, {
      expiresIn: "15s",
    });
    return Response.redirect(
      `https://artemamed.com/payment-status?token=${token}`,
      302
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        message: "Call Back Called",
      }),
      {
        status: 200,
      }
    );
  }
}
