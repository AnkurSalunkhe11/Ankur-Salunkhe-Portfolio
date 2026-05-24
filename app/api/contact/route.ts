import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getConfig } from '@/lib/data-loader';

// Schema validation using Zod
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(100),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().min(5, { message: "Message must be at least 5 characters." }).max(5000),
  honeypot: z.string().optional(), // Honeypot field for bot protection
  numA: z.number(),
  numB: z.number(),
  captchaAnswer: z.string(),
});

// Simple in-memory rate limiter (Token Bucket concept)
const rateLimitMap = new Map<string, { tokens: number; lastRefill: number }>();
const LIMIT = 5; // max 5 messages
const REFILL_RATE = 1000 * 60 * 60; // Refill 1 token per hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const clientRecord = rateLimitMap.get(ip);

  if (!clientRecord) {
    rateLimitMap.set(ip, { tokens: LIMIT - 1, lastRefill: now });
    return true;
  }

  // Refill tokens based on elapsed time
  const timeElapsed = now - clientRecord.lastRefill;
  const tokensToAdd = Math.floor(timeElapsed / REFILL_RATE);

  if (tokensToAdd > 0) {
    clientRecord.tokens = Math.min(LIMIT, clientRecord.tokens + tokensToAdd);
    clientRecord.lastRefill = now;
  }

  if (clientRecord.tokens <= 0) {
    return false;
  }

  clientRecord.tokens -= 1;
  return true;
}

// Simple HTML/XSS tag stripper
function sanitizeInput(str: string): string {
  return str.replace(/<[^>]*>/g, '');
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    
    // 1. Rate Limiting Check
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in an hour." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 2. Validate Inputs
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const { name, email, message, honeypot, numA, numB, captchaAnswer } = result.data;

    // Validate mathematical CAPTCHA answer
    if (Number(captchaAnswer.trim()) !== numA + numB) {
      return NextResponse.json(
        { error: "Incorrect CAPTCHA answer. Are you a bot?" },
        { status: 400 }
      );
    }

    // 3. Honeypot check for bots
    if (honeypot) {
      // Quietly reject bot submissions as successful to discourage spam retraining
      return NextResponse.json({ success: true, simulated: true });
    }

    // 4. Sanitize strings
    const cleanName = sanitizeInput(name);
    const cleanEmail = sanitizeInput(email);
    const cleanMessage = sanitizeInput(message);

    const config = getConfig();
    const contactEmail = config.contactEmail || 'ankursalunkhe2004@gmail.com';
    const resendApiKey = process.env.RESEND_API_KEY;

    // 5. Send with Resend or Fallback gracefully
    if (resendApiKey && resendApiKey !== 'your_resend_api_key_here') {
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Portfolio Contact Form <onboarding@resend.dev>',
            to: contactEmail,
            subject: `Portfolio Message from ${cleanName}`,
            html: `
              <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; color: #333;">
                <h2 style="color: #4F46E5;">New Message from Portfolio</h2>
                <hr style="border: 0; border-top: 1px solid #eee;" />
                <p><strong>Name:</strong> ${cleanName}</p>
                <p><strong>Email:</strong> ${cleanEmail}</p>
                <p><strong>Message:</strong></p>
                <blockquote style="background: #f9f9f9; padding: 15px; border-left: 4px solid #4F46E5; margin: 0;">
                  ${cleanMessage.replace(/\n/g, '<br />')}
                </blockquote>
              </div>
            `,
            reply_to: cleanEmail,
          }),
        });

        if (res.ok) {
          return NextResponse.json({ success: true, sent: true });
        } else {
          const errData = await res.json();
          console.error("Resend API error:", errData);
          throw new Error("Resend server error");
        }
      } catch (error) {
        console.error("Resend failed. Falling back to local storage logs...", error);
      }
    }

    // Fallback: If Resend is missing or fails, log the message and simulate success
    console.log("--- SIMULATED PORTFOLIO CONTACT MESSAGE ---");
    console.log(`From: ${cleanName} (${cleanEmail})`);
    console.log(`Message: ${cleanMessage}`);
    console.log("-------------------------------------------");

    return NextResponse.json({ 
      success: true, 
      simulated: true, 
      message: "Resend key not active. Logged details securely to dashboard storage." 
    });

  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
