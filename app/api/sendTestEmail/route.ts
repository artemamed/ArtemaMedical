import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import OrderConfirmationEmail from "@/components/email/client"; // Adjust path as needed

export async function GET() {
  try {
    // Mock data for testing
    const mockData = {
      firstName: "John",
      lastName: "Doe",
      email: "70109461@student.uol.edu.pk",
      orderId: "123456",
      paymentStatus: "Success",
      shippingAddress: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
      },
      contactNumber: "123-456-7890",
      emailAddress: "test@example.com",
      items: [
        {
          name: "Test Product",
          size: "Large",
          sku: "TP-001",
          quantity: 1,
          price: 50,
        },
        {
            name: "Test Product",
            size: "Large",
            sku: "TP-001",
            quantity: 2,
            price: 50,
          },
          {
            name: "Test Product",
            size: "Large",
            sku: "TP-001",
            quantity: 2,
            price: 50,
          },
      ],
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Render email template
    const emailHtml = await render(OrderConfirmationEmail(mockData));

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: mockData.email,
      subject: "Test Order Confirmation Email",
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: true, message: "Test email sent successfully." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending test email:", error);
    return new Response(
      JSON.stringify({ error: "Error sending test email." }),
      { status: 500 }
    );
  }
}