import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      orderCode,
      orderDate,
      orderTotal,
      paymentStatus,
      shippingInfo,
    } = body;

    if (!firstName || !lastName || !email || !orderCode || !orderDate || !orderTotal || !paymentStatus || !shippingInfo) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
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
                <td style="padding: 15px; text-align: left;">$${orderTotal.toFixed(2)}</td>
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

    return NextResponse.json({
      success: true,
      message: "Order confirmation emails sent successfully.",
    }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "There was an error sending the order confirmation emails." }, { status: 500 });
  }
}