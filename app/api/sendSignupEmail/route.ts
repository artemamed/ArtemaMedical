import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone } = body;

    if (!firstName || !lastName || !email) {
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

    // Email to the team
    const teamMailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: "New User Signup",
      html: `
        <div style="font-family: 'Roboto', Arial, sans-serif; color: #333;">
          <h1>New User Signup</h1>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
        </div>
      `,
    };

    // Email to the user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Artema Med!",
      html: `
        <div style="font-family: 'Roboto', Arial, sans-serif; color: #333;">
          <h1>Welcome, ${firstName} ${lastName}!</h1>
          <p>Thank you for registering with Artema Med. We are excited to have you on board.</p>
          <p>If you have any questions or need assistance, feel free to contact our support team.</p>
          <p>Best regards,</p>
          <p>Artema Med Team</p>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(teamMailOptions);
    await transporter.sendMail(userMailOptions);

    return new Response(
      JSON.stringify({ success: true, message: "Signup emails sent" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending signup email:", error);
    return new Response(
      JSON.stringify({ error: "There was an error sending the email." }),
      { status: 500 }
    );
  }
}
