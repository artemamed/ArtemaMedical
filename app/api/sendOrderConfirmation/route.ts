import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import OrderConfirmationEmail from "@/components/email/client";
import OrderConfirmationEmail1 from "@/components/email/user";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      firstName = "Customer",
      lastName = "",
      email = "no-reply@artemamed.com",
      orderCode = "N/A",
      paymentStatus = "Pending",
      shippingInfo = {
        shippingInfo: {
          street: "N/A",
          city: "N/A",
          state: "N/A",
          zipCode: "N/A",
          country: "N/A",
        },
        contactInfo: {
          firstName: "Customer",
          lastName: "",
          phoneNumber: "N/A",
          email: "no-reply@artemamed.com",
        },
      },
      items = [], // Default to empty array if no items are provided
    } = body;

    if (paymentStatus !== "Success") {
      return new Response(
        JSON.stringify({
          error: "Email will only be sent for successful payments",
        }),
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Render the OrderConfirmationEmail component to HTML
    const emailHtml = await render(
      OrderConfirmationEmail({
        orderId: orderCode,
        firstName: firstName,
        lastName: lastName,
        shippingAddress: shippingInfo.shippingInfo,
        contactNumber: shippingInfo.contactInfo.phoneNumber,
        emailAddress: shippingInfo.contactInfo.email,
        items: items, // Pass the items from the request body
      })
    );

    const emailHtml1 = await render(
      OrderConfirmationEmail1({
        orderId: orderCode,
        firstName: firstName,
        lastName: lastName,
        shippingAddress: shippingInfo.shippingInfo,
        contactNumber: shippingInfo.contactInfo.phoneNumber,
        emailAddress: shippingInfo.contactInfo.email,
        items: items, // Pass the items from the request body
      })
    );

    // Email options for the customer
    const orderConfirmationMailOptions1 = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Order Confirmation -> " + orderCode,
      html: emailHtml,
    };

    // Email options for the admin (optional)
    const orderConfirmationMailOptions2 = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: "New Order Received -> " + orderCode,
      html: emailHtml1,
    };

    // Send emails
    await transporter.sendMail(orderConfirmationMailOptions1);
    await transporter.sendMail(orderConfirmationMailOptions2);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Order confirmation email sent successfully.",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({
        error: "There was an error sending your order confirmation email.",
      }),
      { status: 500 }
    );
  }
}
