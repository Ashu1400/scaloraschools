import nodemailer from "npm:nodemailer@6.9.13";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { name, email, role } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Set up Nodemailer transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "scaloraschools@gmail.com",
        pass: Deno.env.get("GMAIL_APP_PASSWORD"), // We will set this secret later
      },
    });

    const htmlTemplate = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #eaeaec; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.05);">
      <div style="background-color: #000000; padding: 40px 30px; text-align: center;">
        <div style="display: inline-block; text-align: center;">
          <div style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 4px; font-weight: 800; line-height: 1.1;">SCALORA</div>
          <div style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 3.5px; font-weight: 300; line-height: 1.1;">SCHOOLS</div>
          <div style="color: #9ca3af; margin: 6px 0 0 0; font-size: 10px; letter-spacing: 1.5px; font-weight: 400; text-transform: uppercase;">by Scalora Academy Pvt Ltd</div>
        </div>
      </div>
      <div style="padding: 40px 30px;">
        <h2 style="color: #111827; margin-top: 0; font-size: 24px;">Application Received!</h2>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
          Hi <strong>${name}</strong>,
        </p>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
          Thank you for your interest in joining the Scalora Ecosystem! We have successfully received your application to join as a <strong>${role}</strong>.
        </p>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 35px;">
          Our team is currently reviewing your details. We are extremely excited about the possibility of working with you and will reach out shortly with the next steps.
        </p>
        <div style="text-align: center; margin-bottom: 35px;">
          <span style="background-color: #175dd3; color: #ffffff; padding: 14px 32px; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">
            Application Under Review
          </span>
        </div>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
        <p style="color: #9ca3af; font-size: 13px; line-height: 1.5; margin: 0; text-align: center;">
          If you did not submit this application or have any questions, please feel free to reply directly to this email.
        </p>
      </div>
      <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #eaeaec;">
        <p style="color: #9ca3af; font-size: 12px; margin: 0;">
          © 2026 Scalora Schools by Scalora Academy Pvt Ltd. All rights reserved.<br>
          Empowering the next generation of innovators.
        </p>
      </div>
    </div>
    `;

    const info = await transporter.sendMail({
      from: '"Scalora Schools" <scaloraschools@gmail.com>',
      replyTo: 'scaloraschools@gmail.com',
      to: email,
      subject: "Application Received - Scalora Schools",
      html: htmlTemplate,
    });

    console.log("Message sent: %s", info.messageId);

    return new Response(JSON.stringify({ success: true, messageId: info.messageId }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
