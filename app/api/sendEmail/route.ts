import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Destructure form fields
    const {
      firstName,
      lastName,
      email,
      phone,
      message,
      subject,
      termsAccepted,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message || !termsAccepted) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Create the transporter for sending emails
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to your team (receiver)
    const teamMailOptions = {
      from: email, // Sender's email (so you know who sent it)
      to: process.env.EMAIL_USER, // Receiver's email (your team)
      subject: `${subject || "General Inquiry"}`,
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phone}
        
        Message:
        ${message}
      `,
      html: `
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br />${message}</p>
      `,
    };

    // Email to the sender (thank-you email)
    const thankYouMailOptions = {
      from: process.env.EMAIL_USER, // Your team's email
      to: email, // Sender's email
      subject: "Thank You for Reaching Out to Us!",
      text: `
        Dear ${firstName} ${lastName},
        
        Thank you for contacting us! We have received your message and will get back to you shortly.
        
        Best regards,
        Your Team at Artema Medical
      `,
      html: `
        <p>Dear ${firstName} ${lastName},</p>
        <p>Thank you for contacting us! We have received your message and will get back to you shortly.</p>
        <p>Best regards,</p>
        <p><strong>Your Team at Artema Medical</strong></p>
      `,
    };

    // Send emails
    await transporter.sendMail(teamMailOptions); // Send to team
    await transporter.sendMail(thankYouMailOptions); // Send thank-you email to sender

    return new Response(
      JSON.stringify({
        success: true,
        message: "Your message has been sent successfully, and a thank-you email has been sent to the sender.",
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
