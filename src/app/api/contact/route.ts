import Mailgun from "mailgun-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.MAILGUN_API_KEY;
    if (!apiKey) {
      console.error("MAILGUN_API_KEY is not set");
      return NextResponse.json(
        { error: "Mail service not configured" },
        { status: 500 }
      );
    }

    const mailGunClient = new Mailgun({
      apiKey,
      domain: "sandboxaa7aa2c70c0148a394518440826b40f6.mailgun.org",
    });

    const { email, fullname, message, available } = await request.json();

    const msg = {
      to: "ialimson@gmail.com",
      from: email,
      subject: available,
      text: `${fullname} \n ${message}`,
    };

    await mailGunClient.messages().send(msg);
    return NextResponse.json({ message: "Email has been sent" });
  } catch (error) {
    console.error("Error sending email", error);
    return NextResponse.json(
      { error: "Error sending email" },
      { status: 500 }
    );
  }
}
