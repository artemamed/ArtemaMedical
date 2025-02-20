import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Missing email environment variables");
    }

    const {
      firstName = "Anas",
      email = "anas@artemamed.com",
      orderCode = "0123456789",
    } = body;


    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT || 465),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Order Confirmation",
      html: `<p>Hello ${firstName}, your order ${orderCode} has been placed successfully.</p>`,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true, message: "Email sent" }), { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
  }
}
