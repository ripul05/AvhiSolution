import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

function buildNotificationHtml({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;max-width:680px;margin:auto;">
      <h2>New Website Contact</h2>

      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>

      <h3>Message</h3>

      <p style="white-space:pre-wrap">${message}</p>
    </div>
  `;
}

function buildConfirmationHtml({
  name,
}: {
  name: string;
}) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;max-width:680px;margin:auto;">

      <h2>Thank you for contacting AVHI Solutions</h2>

      <p>Hello ${name},</p>

      <p>
        We have successfully received your enquiry.
      </p>

      <p>
        Our team will review your message and get back to you shortly.
      </p>

      <br>

      Regards,<br>

      <strong>AVHI Solutions</strong>

    </div>
  `;
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
  const response = await fetch(
    "https://api.brevo.com/v3/smtp/email",
    {
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

        to: [
          {
            email: to,
          },
        ],

        replyTo,

        subject,

        htmlContent: html,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();

    throw new Error(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    const email =
      typeof body.email === "string"
        ? body.email.trim()
        : "";

    const message =
      typeof body.message === "string"
        ? body.message.trim()
        : "";

    if (!name) {
      return NextResponse.json(
        {
          error: "Name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        {
          error: "Please provide a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    if (!message) {
      return NextResponse.json(
        {
          error: "Message is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        {
          error:
            "Message must be at least 10 characters long.",
        },
        {
          status: 400,
        }
      );
    }

    await sendEmail({
      to: getEnv("CONTACT_EMAIL"),

      subject: `New contact request from ${name}`,

      replyTo: {
        email,
        name,
      },

      html: buildNotificationHtml({
        name,
        email,
        message,
      }),
    });

    try {
      await sendEmail({
        to: email,

        subject:
          "Thank you for contacting AVHI Solutions",

        html: buildConfirmationHtml({
          name,
        }),
      });
    } catch (error) {
      console.error(
        "Confirmation email failed:",
        error
      );
    }

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to send email.",
      },
      {
        status: 500,
      }
    );
  }
}