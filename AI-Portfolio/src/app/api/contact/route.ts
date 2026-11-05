import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase/client";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

// Clean inbox store ready for real visitor inquiries
let contactMessages: ContactMessage[] = [];

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address format."),
  subject: z.string().optional(),
  message: z.string().min(5, "Message must be at least 5 characters."),
});

// GET: List all messages + unread count for Admin Dashboard
export async function GET() {
  try {
    const unreadCount = contactMessages.filter((m) => !m.isRead).length;
    const resendKey = process.env.RESEND_API_KEY;
    const hasResend = Boolean(resendKey && resendKey.startsWith("re_") && !resendKey.includes("your_resend_api_key"));

    console.log(
      "[Contact System Check] Email Forwarding to Gmail:",
      hasResend ? "ACTIVE (Connected to Resend)" : "INACTIVE (Waiting for RESEND_API_KEY)"
    );

    return NextResponse.json({
      messages: contactMessages,
      unreadCount,
      total: contactMessages.length,
      emailForwardingActive: hasResend,
      receiverEmail: process.env.CONTACT_RECEIVER_EMAIL || "nittaya503555@gmail.com",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Submit a new contact message
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const errorMsg = result.error.errors.map((e) => e.message).join(" ");
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { name, email, subject, message } = result.data;
    const newMsg: ContactMessage = {
      id: "msg-" + Date.now(),
      name,
      email,
      subject: subject || "Portfolio Contact Inquiry",
      message,
      isRead: false,
      createdAt: new Date().toISOString(),
    };

    contactMessages.unshift(newMsg);

    // Save to Supabase contact_messages table if online
    try {
      await supabase.from("contact_messages").insert([
        {
          name,
          email,
          subject: subject || null,
          message,
          is_read: false,
        },
      ]);
    } catch (dbErr) {
      console.warn("Notice: Saved locally/fallback:", dbErr);
    }

    // Resend email integration
    const resendApiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "nittaya503555@gmail.com";

    if (resendApiKey && !resendApiKey.includes("your_resend_api_key")) {
      try {
        const resend = new Resend(resendApiKey);
        const emailResult = await resend.emails.send({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: receiverEmail,
          replyTo: email,
          subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] มีข้อความใหม่จาก ${name}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
              <div style="border-bottom: 2px solid #06b6d4; padding-bottom: 12px; margin-bottom: 18px;">
                <h2 style="color: #0f172a; margin: 0; font-size: 20px;">📩 มีข้อความติดต่อใหม่จากพอร์ตฟอลิโอ</h2>
                <span style="font-size: 12px; color: #64748b;">Nittaya Pana Personal Portfolio</span>
              </div>
              
              <div style="margin-bottom: 16px;">
                <p style="margin: 4px 0; font-size: 14px; color: #334155;"><strong>ชื่อผู้ติดต่อ:</strong> ${name}</p>
                <p style="margin: 4px 0; font-size: 14px; color: #334155;"><strong>อีเมลผู้ติดต่อ:</strong> <a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a></p>
                <p style="margin: 4px 0; font-size: 14px; color: #334155;"><strong>หัวข้อ:</strong> ${subject || "Portfolio Contact Inquiry"}</p>
              </div>

              <div style="padding: 16px; background-color: #f8fafc; border-radius: 12px; border-left: 4px solid #06b6d4; margin-top: 16px;">
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${message}</p>
              </div>

              <div style="margin-top: 24px; pt: 16px; border-top: 1px solid #f1f5f9; text-align: center;">
                <p style="font-size: 11px; color: #94a3b8; margin: 0;">ข้อความนี้ส่งอัตโนมัติจากระบบแบบฟอร์มติดต่อบนเว็บไซต์ Portfolio</p>
              </div>
            </div>
          `,
          text: `มีข้อความติดต่อใหม่จากพอร์ตฟอลิโอ\n\nชื่อผู้ติดต่อ: ${name}\nอีเมล: ${email}\nหัวข้อ: ${subject || "Portfolio Contact Inquiry"}\n\nข้อความ:\n${message}`,
        });
        console.log("[Resend Email Success] Dispatched to:", receiverEmail, emailResult);
      } catch (emailErr) {
        console.error("[Resend Email Error]:", emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been received. Thank you!",
      item: newMsg,
    });
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

// PATCH: Mark message as read/unread
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, isRead } = body;
    if (!id) {
      return NextResponse.json({ error: "Message id is required" }, { status: 400 });
    }

    contactMessages = contactMessages.map((m) =>
      m.id === id ? { ...m, isRead: typeof isRead === "boolean" ? isRead : !m.isRead } : m
    );

    const unreadCount = contactMessages.filter((m) => !m.isRead).length;
    return NextResponse.json({ success: true, unreadCount, messages: contactMessages });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Delete a message
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Message id is required" }, { status: 400 });
    }

    contactMessages = contactMessages.filter((m) => m.id !== id);
    const unreadCount = contactMessages.filter((m) => !m.isRead).length;
    return NextResponse.json({ success: true, unreadCount, messages: contactMessages });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
