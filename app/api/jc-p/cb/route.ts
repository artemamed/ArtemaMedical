import nodemailer from "nodemailer";

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

    // Mock data (default values if not provided in the request)
    const {
      firstName = "Anas",
      lastName = "Ansari",
      email = "anas@artemamed.com",
      orderCode = pp_TxnRefNo,
      orderDate = new Date().toLocaleDateString(),
      shippingInfo = {
        shippingInfo: {
          street: "House No.45, Street No.7, DHA",
          city: "Lahore",
          state: "Punjab",
          zipCode: "54000",
          country: "Pakistan",
        },
        contactInfo: {
          firstName: "Anas",
          lastName: "Ansari",
          phoneNumber: "321 1234567",
          email: "anas@artemamed.com",
        },
      },
      items = [
        {
          name: "Universal Handle for laryngeal forceps acc to Huber",
          size: "17.5 cm",
          sku: "026-0581-01",
          quantity: 2,
          price: 155,
        },
        {
          name: "Handle for laryngeal forceps acc to Huber",
          size: "18 cm",
          sku: "026-0581-01",
          quantity: 1,
          price: 245,
        },
      ],
    } = body;

    // Calculate subtotal
    const subTotal = items.reduce(
      (acc: number, item: { price: number; quantity: number }) =>
        acc + item.price * item.quantity,
      0
    );

    // Calculate freight charges
    const totalQuantity = items.reduce(
      (acc: number, item: { quantity: number }) => acc + item.quantity,
      0
    );
    const freight = totalQuantity === 1 ? 25 : 75;

    // Calculate tax (6.2% of subtotal)
    const tax = subTotal * 0.062;

    // Calculate grand total
    const grandTotal = subTotal + freight + tax;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "465"),
      secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("Transporter Config:", {
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

    console.log("Team Mail Options:", teamMailOptions);
    console.log("Thank You Mail Options:", thankYouMailOptions);

    await transporter.sendMail(teamMailOptions);
    await transporter.sendMail(thankYouMailOptions);

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