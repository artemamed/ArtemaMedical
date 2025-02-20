import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Ensure required fields are present
    if (!body.firstName || !body.lastName || !body.email || !body.orderCode || !body.shippingInfo) {
      return new Response(
        JSON.stringify({ error: "Missing required fields in the request body." }),
        { status: 400 }
      );
    }

    const {
      firstName,
      lastName,
      email,
      orderCode,
      orderDate = new Date().toLocaleDateString(),
      paymentStatus = "Paid",
      shippingInfo,
      items = [],
    } = body;

    // Calculate subtotal, freight, tax, and grand total
    const subTotal = items.reduce((acc: number, item: { price: number; quantity: number }) => acc + item.price * item.quantity, 0);
    const totalQuantity = items.reduce((acc: number, item: { quantity: number }) => acc + item.quantity, 0);
    const freight = totalQuantity === 1 ? 25 : 75;
    const tax = subTotal * 0.062;
    const grandTotal = subTotal + freight + tax;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "465"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const teamMailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Order Confirmation - ${orderCode}`,
      html: `
        <div style="font-family: 'Roboto', Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #008080; color: #ffffff; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 32px; letter-spacing: 1px; font-weight: 700;">New Order Received!</h1>
          </div>
          <div style="padding: 20px; background-color: #f9f9f9;">
            <p style="font-size: 16px; color: #555; margin-bottom: 20px; line-height: 1.6;">
              A new order has been placed. Below are the details:
            </p>
            <table style="width: 100%; font-size: 18px; border-collapse: collapse; margin-bottom: 20px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);">
              <tr style="background: #f0f0f0; border-bottom: 1px solid #ddd;">
                <td style="padding: 15px; font-weight: bold; color: #008080; text-align: left;">Order Code</td>
                <td style="padding: 15px; text-align: left;">${orderCode}</td>
              </tr>
              <tr style="background: #ffffff; border-bottom: 1px solid #ddd;">
                <td style="padding: 15px; font-weight: bold; color: #008080; text-align: left;">Date</td>
                <td style="padding: 15px; text-align: left;">${orderDate}</td>
              </tr>
              <tr style="background: #f0f0f0; border-bottom: 1px solid #ddd;">
                <td style="padding: 15px; font-weight: bold; color: #008080; text-align: left;">Total</td>
                <td style="padding: 15px; text-align: left;">${grandTotal.toFixed(2)}</td>
              </tr>
              <tr style="background: #ffffff; border-bottom: 1px solid #ddd;">
                <td style="padding: 15px; font-weight: bold; color: #008080; text-align: left;">Payment Status</td>
                <td style="padding: 15px; text-align: left;">${paymentStatus}</td>
              </tr>
              <tr style="background: #f0f0f0; border-bottom: 1px solid #ddd;">
                <td style="padding: 15px; font-weight: bold; color: #008080; text-align: left;">Shipping Address</td>
                <td style="padding: 15px; text-align: left;">${shippingInfo.shippingInfo.street}, ${shippingInfo.shippingInfo.city}, ${shippingInfo.shippingInfo.state}, ${shippingInfo.shippingInfo.zipCode}, ${shippingInfo.shippingInfo.country}</td>
              </tr>
              <tr style="background: #ffffff;">
                <td style="padding: 15px; font-weight: bold; color: #008080; text-align: left;">Contact Info</td>
                <td style="padding: 15px; text-align: left;">${shippingInfo.contactInfo.firstName} ${shippingInfo.contactInfo.lastName}, ${shippingInfo.contactInfo.phoneNumber}, ${shippingInfo.contactInfo.email}</td>
              </tr>
            </table>
          </div>
        </div>
      `,
    };

    const thankYouMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank You for Your Order!",
      html: `
        <div style="font-family: 'Roboto', Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #008080; color: #ffffff; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 26px; font-weight: bold;">Hi ${firstName} ${lastName}</h1>
          </div>
          <div style="padding: 20px; background-color: #f9f9f9;">
            <p style="font-size: 16px; color: #555; line-height: 1.6;">
              Thank you for your order! We have received your payment and are processing your order.
            </p>
            <p style="font-size: 16px; color: #555; line-height: 1.6;">
              Your order code is <strong style="color: #008080;">${orderCode}</strong>. We will notify you once your order has been shipped.
            </p>
            <p style="font-size: 16px; color: #555; line-height: 1.6;">Best regards,</p>
            <p style="font-weight: bold; color: #008080;">Artema Med Team</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(teamMailOptions);
    await transporter.sendMail(thankYouMailOptions);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Order confirmation emails sent successfully.",
      }),
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: "There was an error sending your message." }),
      { status: 500 }
    );
  }
}