import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ACCENT_COLOR = "#2563eb"; // swap for your exact brand accent if different
const DARK_BG = "#0b0d10";
const SITE_URL = "https://www.avhisolutions.com";

function getEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Escapes user input before it goes into any email HTML */
function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Shared header/footer shell so both emails look consistently on-brand */
function emailShell(bodyHtml: string) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>AVHI Solutions</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f5f7;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f5f7;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 40px rgba(11,13,16,0.08);">

            <!-- Header -->
            <tr>
              <td style="background-color:${DARK_BG};padding:28px 32px;">
                <span style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:0.3px;">AVHI Solutions</span>
                <br />
                <span style="color:#9aa3ad;font-size:12px;letter-spacing:0.5px;text-transform:uppercase;">Commercial hygiene, re-engineered</span>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:36px 32px;">
                ${bodyHtml}
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:24px 32px;background-color:#fafafa;border-top:1px solid #eee;">
                <p style="margin:0 0 6px;font-size:13px;color:#6b7280;">
                  <strong style="color:#111827;">AVHI Solutions</strong> &middot; New Delhi, India
                </p>
                <p style="margin:0;font-size:13px;color:#6b7280;">
                  <a href="mailto:avhisolutionsindia@gmail.com" style="color:${ACCENT_COLOR};text-decoration:none;">avhisolutionsindia@gmail.com</a>
                  &nbsp;&middot;&nbsp;
                  <a href="tel:+919899387361" style="color:${ACCENT_COLOR};text-decoration:none;">+91 98993 87361</a>
                </p>
                <p style="margin:12px 0 0;font-size:11px;color:#9ca3af;">
                  Touch-free automation &middot; Premium finishes &middot; Commercial durability
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildNotificationHtml({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  const body = `
    <span style="display:inline-block;background-color:#eff6ff;color:${ACCENT_COLOR};font-size:12px;font-weight:700;letter-spacing:0.4px;text-transform:uppercase;padding:4px 10px;border-radius:999px;margin-bottom:20px;">
      New Website Enquiry
    </span>

    <h1 style="margin:20px 0;font-size:20px;color:#111827;">${safeName} wants to know more</h1>

    <table role="presentation" width="100%" style="margin-bottom:20px;">
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:13px;color:#6b7280;width:90px;">Name</td>
        <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#111827;font-weight:600;">${safeName}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:13px;color:#6b7280;">Email</td>
        <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;">
          <a href="mailto:${safeEmail}" style="color:${ACCENT_COLOR};text-decoration:none;">${safeEmail}</a>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 8px;font-size:12px;font-weight:600;letter-spacing:0.4px;text-transform:uppercase;color:#6b7280;">Message</p>
    <table role="presentation" width="100%" style="background-color:#f9fafb;border-radius:8px;margin-bottom:24px;">
      <tr>
        <td style="padding:16px 20px;font-size:14px;line-height:1.6;color:#374151;white-space:pre-wrap;">${safeMessage}</td>
      </tr>
    </table>

    <a href="mailto:${safeEmail}?subject=Re: Your enquiry to AVHI Solutions" style="display:inline-block;background-color:${DARK_BG};color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;">
      Reply to ${safeName}
    </a>
  `;

  return emailShell(body);
}

function buildConfirmationHtml({
  name,
  message,
}: {
  name: string;
  message: string;
}) {
  const safeName = escapeHtml(name);
  const safeMessage = escapeHtml(message);

  const body = `
    <h1 style="margin:0 0 16px;font-size:22px;color:#111827;">Thank you, ${safeName}.</h1>

    <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#374151;">
      We've received your enquiry and a member of the AVHI Solutions team will get back to you shortly —
      usually within one business day.
    </p>

    <table role="presentation" width="100%" style="background-color:#f9fafb;border-left:3px solid ${ACCENT_COLOR};border-radius:8px;margin-bottom:24px;">
      <tr>
        <td style="padding:16px 20px;">
          <p style="margin:0 0 6px;font-size:12px;font-weight:600;letter-spacing:0.4px;text-transform:uppercase;color:#6b7280;">Your message</p>
          <p style="margin:0;font-size:14px;line-height:1.6;color:#374151;white-space:pre-wrap;">${safeMessage}</p>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#374151;">
      In the meantime, feel free to browse our range of touch-free faucets, sensor flush systems, and premium dispensers.
    </p>

    <a href="${SITE_URL}/products" style="display:inline-block;background-color:${ACCENT_COLOR};color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;">
      View Our Products
    </a>
  `;

  return emailShell(body);
}

async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  replyTo?: {
    email: string;
    name?: string;
  };
}) {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": getEnv("BREVO_API_KEY"),
    },
    body: JSON.stringify({
      sender: {
        name: getEnv("FROM_NAME"),
        email: getEnv("FROM_EMAIL"),
      },
      to: [{ email: to }],
      replyTo,
      subject,
      htmlContent: html,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters long." },
        { status: 400 }
      );
    }

    await sendEmail({
      to: getEnv("CONTACT_EMAIL"),
      subject: `New contact request from ${name}`,
      replyTo: { email, name },
      html: buildNotificationHtml({ name, email, message }),
    });

    try {
      await sendEmail({
        to: email,
        subject: "Thank you for contacting AVHI Solutions",
        html: buildConfirmationHtml({ name, message }),
      });
    } catch (error) {
      console.error("Confirmation email failed:", error);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to send email.",
      },
      { status: 500 }
    );
  }
}