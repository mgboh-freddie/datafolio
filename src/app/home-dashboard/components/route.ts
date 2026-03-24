import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, subject, type, message } = await request.json();

    const apiKey = process.env.RESEND_API_KEY;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: 'mgbohfrederick@mail.com',
        reply_to: email,
        subject: `[DataFolio] ${type}: ${subject}`,
        html: `
          <h3>New Message from DataFolio</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Type:</strong> ${type}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <br/>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br/>')}</p>
        `,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to send email' }, { status: res.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}