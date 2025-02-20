import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      firstName = "Customer",
      lastName = "",
      email = "no-reply@artemamed.com",
      orderCode = "N/A",
      orderDate = new Date().toLocaleDateString(),
      orderTotal = 0,
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

    const orderConfirmationMailOptions1 = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Order Confirmation",
      html: `
        <div style="font-family: 'Roboto', Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);">
          <!-- Header Section -->
          <div style="background-color: #008080; color: #ffffff; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 26px; font-weight: bold;"> ${firstName} ${lastName}</h1>
          </div>

          <!-- Body Section -->
          <div style="padding: 20px; background-color: #f9f9f9;">
            <p style="font-size: 16px; color: #555; line-height: 1.6;">
              Thank you for your order! We have received your payment and are processing your order.
            </p>
            <p style="font-size: 16px; color: #555; line-height: 1.6;">
              Below are the details of your order:
            </p>
            <table style="width: 100%; font-size: 18px; border-collapse: collapse; margin-bottom: 20px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);">
              <tr style="background: #f0f0f0; border-bottom: 1px solid #ddd; ">
                <td style="padding: 15px; font-weight: bold; color: #008080; text-align: left; display: flex; align-items: center;">
                  <span style="margin-right: 10px;">📦</span> Order Code
                </td>
                <td style="padding: 15px; text-align: left;">${orderCode}</td>
              </tr>
              <tr style="background: #ffffff; border-bottom: 1px solid #ddd;">
                <td style="padding: 15px; font-weight: bold; color: #008080; text-align: left; display: flex; align-items: center;">
                  <span style="margin-right: 10px;">📅</span> Order Date
                </td>
                <td style="padding: 15px; text-align: left;">${orderDate}</td>
              </tr>
              <tr style="background: #f0f0f0; border-bottom: 1px solid #ddd;">
                <td style="padding: 15px; font-weight: bold; color: #008080; text-align: left; display: flex; align-items: center;">
                  <span style="margin-right: 10px;">💰</span> Order Total
                </td>
                <td style="padding: 15px; text-align: left;">$${orderTotal.toFixed(2)}</td>
              </tr>
              <tr style="background: #ffffff;">
                <td style="padding: 15px; font-weight: bold; color: #008080; text-align: left; display: flex; align-items: center;">
                  <span style="margin-right: 10px;">🚚</span> Shipping Address
                </td>
                <td style="padding: 15px; text-align: left;">
                  ${shippingInfo.shippingInfo.street}, ${shippingInfo.shippingInfo.city}, ${shippingInfo.shippingInfo.state}, ${shippingInfo.shippingInfo.zipCode}, ${shippingInfo.shippingInfo.country}
                </td>
              </tr>
            </table>
            <p style="font-size: 16px; color: #555; line-height: 1.6;">Best regards,</p>
            <p style="font-weight: bold; color: #008080;">Artema Med Team</p>
          </div>

          <!-- Footer Section -->
          <div style="background-color: #f4f4f4; padding: 15px; text-align: center;">
            <p style="margin: 0; font-size: 12px; color: #807D83;">
              📍 7901 4th St. N STE 10963, Saint Petersburg, Florida, 3370
            </p>
          </div>
        </div>
      `,
    };

    const orderConfirmationMailOptions2 = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: "Your Order Confirmation",
      html: `
        <div style="font-family: 'Roboto', Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);">
          <!-- Header Section -->
          <div style="background-color: #109080; color: #ffffff; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 26px; font-weight: bold;">Hello ${firstName} ${lastName}</h1>
          </div>

          <!-- Body Section -->
          <div style="padding: 20px; background-color: #f9f9f9;">
            <p style="font-size: 16px; color: #555; line-height: 1.6;">
              Thank you for your order! We have received your payment and are processing your order.
            </p>
            <p style="font-size: 16px; color: #555; line-height: 1.6;">
              Below are the details of your order:
            </p>
            <table style="width: 100%; font-size: 18px; border-collapse: collapse; margin-bottom: 20px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);">
              <tr style="background: #f0f0f0; border-bottom: 1px solid #ddd; ">
                <td style="padding: 15px; font-weight: bold; color: #008080; text-align: left; display: flex; align-items: center;">
                  <span style="margin-right: 10px;">📦</span> Order Code
                </td>
                <td style="padding: 15px; text-align: left;">${orderCode}</td>
              </tr>
              <tr style="background: #ffffff; border-bottom: 1px solid #ddd;">
                <td style="padding: 15px; font-weight: bold; color: #008080; text-align: left; display: flex; align-items: center;">
                  <span style="margin-right: 10px;">📅</span> Order Date
                </td>
                <td style="padding: 15px; text-align: left;">${orderDate}</td>
              </tr>
              <tr style="background: #f0f0f0; border-bottom: 1px solid #ddd;">
                <td style="padding: 15px; font-weight: bold; color: #008080; text-align: left; display: flex; align-items: center;">
                  <span style="margin-right: 10px;">💰</span> Order Total
                </td>
                <td style="padding: 15px; text-align: left;">$${orderTotal.toFixed(2)}</td>
              </tr>
              <tr style="background: #ffffff;">
                <td style="padding: 15px; font-weight: bold; color: #008080; text-align: left; display: flex; align-items: center;">
                  <span style="margin-right: 10px;">🚚</span> Shipping Address
                </td>
                <td style="padding: 15px; text-align: left;">
                  ${shippingInfo.shippingInfo.street}, ${shippingInfo.shippingInfo.city}, ${shippingInfo.shippingInfo.state}, ${shippingInfo.shippingInfo.zipCode}, ${shippingInfo.shippingInfo.country}
                </td>
              </tr>
            </table>
            <p style="font-size: 16px; color: #555; line-height: 1.6;">Best regards,</p>
            <p style="font-weight: bold; color: #008080;">Artema Med Team</p>
          </div>

          <!-- Footer Section -->
          <div style="background-color: #f4f4f4; padding: 15px; text-align: center;">
            <p style="margin: 0; font-size: 12px; color: #807D83;">
              📍 7901 4th St. N STE 10963, Saint Petersburg, Florida, 3370
            </p>
          </div>
        </div>
      `,
    };

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
