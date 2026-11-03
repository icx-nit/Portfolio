import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address format."),
  subject: z.string().optional(),
  message: z.string().min(5, "Message must be at least 5 characters."),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const errorMsg = result.error.errors.map((e) => e.message).join(" ");
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { name, email, subject, message } = result.data;

    // Resend email integration
    const resendApiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "nittaya503555@gmail.com";

    if (resendApiKey && !resendApiKey.includes("your_resend_api_key")) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: receiverEmail,
          replyTo: email,
          subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] New message from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });
      } catch (emailErr) {
        console.error("Resend delivery failed:", emailErr);
        // Continue processing to record message
      }
    } else {
      console.log(`[Contact Simulation] Received message from ${name} (${email}): ${message}`);
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been received. Thank you!",
    });
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
