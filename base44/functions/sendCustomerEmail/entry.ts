import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { to, subject, html } = await req.json();

    if (!to || !subject || !html) {
      return Response.json({ error: 'Missing to, subject, or html' }, { status: 400 });
    }

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('outlook');

    const outlookRes = await fetch('https://graph.microsoft.com/v1.0/me/sendMail', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: {
          subject,
          body: { contentType: 'html', content: html },
          toRecipients: [{ emailAddress: { address: to } }]
        }
      })
    });

    if (!outlookRes.ok) {
      const error = await outlookRes.text();
      return Response.json({ success: false, message: `Outlook error: ${error}` }, { status: 500 });
    }

    return Response.json({ success: true, message: 'Email sent to customer' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});