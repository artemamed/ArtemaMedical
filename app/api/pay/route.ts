import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  console.log("I am in the payment API function.");

  try {
    // Extract cookies from the request
    const cookies = req.headers.get("cookie") || "";
    console.log("Cookies:", cookies);
    const cookieData: Record<string, string> = Object.fromEntries(
      cookies.split(";").map((cookie) => {
        const [key, value] = cookie.trim().split("=");
        return [decodeURIComponent(key), decodeURIComponent(value)];
      })
    );
    console.log("Cookie Data:", cookieData);
    // Parse the shipping_contact_info from cookies
    const shippingContactInfo = cookieData["shipping_contact_info"];
    console.log("Shipping Contact Info:", shippingContactInfo);
    const parsedContactInfo = shippingContactInfo ? JSON.parse(shippingContactInfo) : {};
    console.log("Parsed Contact Info:", parsedContactInfo);
    // Extracting required details
    const userEmail = parsedContactInfo?.email || "ubaidullah2305@gmail.com";
    const cardholderName = parsedContactInfo?.name || "Valued Customer";

    // Default fallback values
    const shippingName = parsedContactInfo?.name || "Unknown Name";
    const shippingAddress = parsedContactInfo?.address || "No Address Provided";
    const shippingCity = parsedContactInfo?.city || "Unknown City";
    const shippingState = parsedContactInfo?.state || "Unknown State";
    const shippingZip = parsedContactInfo?.zip || "Unknown ZIP Code";

    const url = new URL(req.url);
    const sessionId = url.searchParams.get("sessionId") || "DEFAULT_SESSION_ID";
    const orderId = url.searchParams.get("orderId") || "DEFAULT_orderId";
    const amount = url.searchParams.get("amount") || 0;

    const MID = process.env.MERCHANT_ID;
    const Pass = process.env.MERCHANT_PASS;
    const apiUrl = `${process.env.URL}.gateway.mastercard.com/api/rest/version/74/merchant/${MID}/order/${orderId}/transaction/${orderId + 1}`;

    const body = {
      apiOperation: "PAY",
      authentication: {
        transactionId: orderId,
      },
      order: {
        amount: amount,
        currency: `${process.env.CURRENCY}`,
      },
      session: {
        id: sessionId,
      },
    };

    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`merchant.${MID}:${Pass}`).toString("base64"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response from Mastercard:", errorData);

      // Send failure email
      const failureMailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: "Payment Failed",
        html: `
          <div style="font-family: 'Roboto', Arial, sans-serif; color: #333;">
            <h1>Payment Failed</h1>
            <p>We regret to inform you that your payment of USD ${amount} has failed.</p>
            <p>Please try again or contact our support team for assistance.</p>
            <p>Thank you,</p>
            <p>Your Company Team</p>
          </div>
        `,
      };

      await transporter.sendMail(failureMailOptions);

      return new Response(
        `<html>
          <body style="text-align: center;">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="red" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
            <h1 style="font-size: 2em; color: red;">Payment Failed</h1>
          </body>
        </html>`,
        { status: response.status, headers: { "Content-Type": "text/html" } }
      );
    }

    const data = await response.json();
    const gatewayCode = data.response.gatewayCode;
    const amountReceived = data.transaction.amount;

    if (gatewayCode === "APPROVED") {
      // Send success email
      const successMailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: "Payment Successful",
        html: `
          <div style="font-family: 'Roboto', Arial, sans-serif; color: #333;">
            <h1>Payment Successful</h1>
            <p>Dear ${cardholderName},</p>
            <p>Thank you for your payment of USD ${amountReceived}.</p>
            <p>We have received your order and will process it shortly.</p>
            <h3>Shipping Details:</h3>
            <p><strong>Name:</strong> ${shippingName}</p>
            <p><strong>Address:</strong> ${shippingAddress}</p>
            <p><strong>City:</strong> ${shippingCity}</p>
            <p><strong>State:</strong> ${shippingState}</p>
            <p><strong>ZIP Code:</strong> ${shippingZip}</p>
            <p>We appreciate your business.</p>
            <p>Best regards,</p>
            <p>Your Company Team</p>
          </div>
        `,
      };

      await transporter.sendMail(successMailOptions);

      return new Response(
        `<html>
          <body style="text-align: center;">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="green" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.25 15.5L5.5 12l1.41-1.41L10.75 14.6l7.29-7.29L19.5 9.5l-8.75 8.75z"/>
            </svg>
            <h1 style="font-size: 2em; color: green;">Transaction Successful</h1>
            <div style="margin-top: 20px; font-size: 1.2em; text-align: center;">
              <p><strong>Amount:</strong> USD ${amountReceived}</p>
              <p><strong>Cardholder Name:</strong> ${cardholderName}</p>
              <h3>Shipping Details:</h3>
              <p><strong>Name:</strong> ${shippingName}</p>
              <p><strong>Address:</strong> ${shippingAddress}</p>
              <p><strong>City:</strong> ${shippingCity}</p>
              <p><strong>State:</strong> ${shippingState}</p>
              <p><strong>ZIP Code:</strong> ${shippingZip}</p>
            </div>
          </body>
        </html>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

  } catch (error) {
    console.error("Error occurred during payment processing:", error);
    return new Response(
      `<html>
        <body style="text-align: center;">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="red" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
          <h1 style="font-size: 2em; color: red;">Payment processing failed</h1>
        </body>
      </html>`,
      { status: 500, headers: { "Content-Type": "text/html" } }
    );
  }
}
