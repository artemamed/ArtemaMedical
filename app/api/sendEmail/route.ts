import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      message,
      subject,
      termsAccepted,
    } = body;

    if (!firstName || !lastName || !email || !message || !termsAccepted) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
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

    const teamMailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `${subject || "General Inquiry"}`,
      html: `
        <div style="font-family: 'Roboto', Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);">
  <!-- Header Section -->
  <div style="background-color: #008080; color: #ffffff; padding: 30px; text-align: center;">
    <h1 style="margin: 0; font-size: 32px; letter-spacing: 1px; font-weight: 700;">Hello, Artema Team!</h1>
  </div>

  <!-- Body Section -->
  <div style="padding: 20px; background-color: #f9f9f9;">
    <p style="font-size: 16px; color: #555; margin-bottom: 20px; line-height: 1.6;">
      A user has sent you a message through the website contact form. Below are the details of the inquiry:
    </p>
    <table style="width: 100%; font-size: 18px; border-collapse: collapse; margin-bottom: 20px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);">
      <tr style="background: #f0f0f0; border-bottom: 1px solid #ddd; ">
        <td style="padding: 15px; font-weight: bold; color: #008080; text-align: left; display: flex; align-items: center;">
          <span style="margin-right: 10px;">📧</span> Email
        </td>
        <td style="padding: 15px; text-align: left;">${email}</td>
      </tr>
      <tr style="background: #ffffff; border-bottom: 1px solid #ddd;">
        <td style="padding: 15px; font-weight: bold; color: #008080; text-align: left; display: flex; align-items: center;">
          <span style="margin-right: 10px;">👤</span> Name
        </td>
        <td style="padding: 15px; text-align: left;">${firstName} ${lastName}</td>
      </tr>
      <tr style="background: #f0f0f0; border-bottom: 1px solid #ddd;">
        <td style="padding: 15px; font-weight: bold; color: #008080; text-align: left; display: flex; align-items: center;">
          <span style="margin-right: 10px;">📞</span> Phone Number
        </td>
        <td style="padding: 15px; text-align: left;">${phone || "N/A"}</td>
      </tr>
      <tr style="background: #ffffff;">
        <td style="padding: 15px; font-weight: bold; color: #008080; text-align: left; display: flex; align-items: center;">
          <span style="margin-right: 10px;">💬</span> Message
        </td>
        <td style="padding: 15px; text-align: left;">${message}</td>
      </tr>
    </table>
    <p style="font-size: 14px; color: #807D83; line-height: 1.6; margin-top: 10px;">
      Please ensure a timely response to this inquiry. You can directly reach out to the user using the contact details provided above.
    </p>
  </div>

  <!-- Footer Section -->
  <div style="background: #008080; padding: 15px; text-align: center; color: #e0f7f7;">
    <p style="margin: 0; font-size: 14px;">
      📍 371 J, Commercial Block EME Society DHA, Phase XII Canal Road, Lahore, Pakistan
    </p>
    <p style="margin: 5px 0 0; font-size: 12px;">
      <a href="#" style="color: #008080; text-decoration: none;">Visit Us</a> | <a href="#" style="color: #008080; text-decoration: none;">Contact Support</a>
    </p>
  </div>
</div>

      `,
    };

    const thankYouMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank You for Reaching Out to Us!",
      html: `
        <div style="font-family: 'Roboto', Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);">
  <!-- Header Section -->
  <div style="background-color: #008080; color: #ffffff; padding: 30px; text-align: center;">
    <h1 style="margin: 0; font-size: 26px; font-weight: bold;">Hi ${firstName} ${lastName}</h1>
  </div>

  <!-- Body Section -->
  <div style="padding: 20px; background-color: #f9f9f9;">
    <p style="font-size: 16px; color: #555; line-height: 1.6;">
      Thank you for getting in touch with us through our website! We have <strong style="color: #008080;">received</strong> your message.
    </p>
    <p style="font-size: 16px; color: #555; line-height: 1.6;">
      Our team will review your message and get back to you within <strong style="color: #008080;">24 – 48 hours</strong>. We look forward to assisting you!
    </p>
    <p style="font-size: 16px; color: #555; line-height: 1.6;">Best regards,</p>
    <p style="font-weight: bold; color: #008080;">Artema Med Team</p>
  </div>

  <!-- Footer Section -->
  <div style="background-color: #f4f4f4; padding: 15px; text-align: center;">
    <p style="margin: 0; font-size: 12px; color: #807D83;">
      📍 371 J, Commercial Block EME Society DHA, Phase XII Canal Road, Lahore, Pakistan
    </p>
  </div>
</div>

      `,
    };

    await transporter.sendMail(teamMailOptions);
    await transporter.sendMail(thankYouMailOptions);

    return new Response(
      JSON.stringify({
        success: true,
        message:
          "Your message has been sent successfully, and a thank-you email has been sent to the sender.",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: "There was an error sending your message." }),
      { status: 500 }
    );
  }
}
