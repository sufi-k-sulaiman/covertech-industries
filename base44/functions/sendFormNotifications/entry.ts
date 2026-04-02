import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { entityType, entityData } = await req.json();

    if (!entityType || !entityData) {
      return Response.json({ error: 'Missing entityType or entityData' }, { status: 400 });
    }

    // Format email content based on entity type
    let subject = '';
    let body = '';

    if (entityType === 'ContactSubmission') {
      subject = `New Contact Form Submission from ${entityData.name}`;
      body = `
New Contact Submission:

Name: ${entityData.name}
Email: ${entityData.email}
Phone: ${entityData.phone || 'N/A'}
Subject: ${entityData.subject || 'N/A'}
Message: ${entityData.message}
Status: ${entityData.status || 'new'}

Submitted: ${new Date().toISOString()}
      `;
    } else if (entityType === 'DealerApplication') {
      subject = `New Dealer Application from ${entityData.company_name}`;
      body = `
New Dealer Application:

Name: ${entityData.first_name} ${entityData.last_name}
Company: ${entityData.company_name}
Email: ${entityData.email}
Phone: ${entityData.phone}
Location: ${entityData.city}, ${entityData.state_province}
Business Type: ${entityData.business_type}
About Business: ${entityData.about_business || 'N/A'}
Status: ${entityData.status || 'pending'}

Submitted: ${new Date().toISOString()}
      `;
    } else if (entityType === 'WarrantyRegistration') {
      subject = `New Warranty Registration from ${entityData.full_name}`;
      body = `
New Warranty Registration:

Customer: ${entityData.full_name}
Email: ${entityData.email}
Phone: ${entityData.phone}
Product Type: ${entityData.product_type}
Serial Number: ${entityData.serial_number || 'N/A'}
Pool Type: ${entityData.pool_type || 'N/A'}
Warranty Years: ${entityData.warranty_years || 'N/A'}
Purchase Date: ${entityData.purchase_date || 'N/A'}
Status: ${entityData.status || 'pending'}

Submitted: ${new Date().toISOString()}
      `;
    } else if (entityType === 'DesignCenterSubmission') {
      subject = `New Design Center Quote Request - ${entityData.quote_id}`;
      body = `
New Design Center Submission:

Quote ID: ${entityData.quote_id}
Product Type: ${entityData.product_type}
Pool Shape: ${entityData.pool_shape}
Status: ${entityData.status || 'new'}

Contact Info: ${JSON.stringify(entityData.contact_info, null, 2)}
Pattern Selection: ${JSON.stringify(entityData.pattern_selection, null, 2)}
Features: ${entityData.features?.join(', ') || 'N/A'}

Submitted: ${new Date().toISOString()}
      `;
    } else {
      return Response.json({ error: 'Unknown entity type' }, { status: 400 });
    }

    const errors = [];

    // Send via Outlook
    try {
      const outlookRes = await fetch('https://graph.microsoft.com/v1.0/me/sendMail', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${(await base44.asServiceRole.connectors.getConnection('outlook')).accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: {
            subject: subject,
            body: {
              contentType: 'text',
              content: body
            },
            toRecipients: [
              {
                emailAddress: {
                  address: 'webadmin@covertechind.com'
                }
              }
            ]
          }
        })
      });

      if (!outlookRes.ok) {
        const error = await outlookRes.text();
        errors.push(`Outlook error: ${error}`);
      }
    } catch (error) {
      errors.push(`Outlook exception: ${error.message}`);
    }

    // Send via Gmail
    try {
      const gmailAccessToken = (await base44.asServiceRole.connectors.getConnection('gmail')).accessToken;
      
      // Create MIME message
      const message = `From: covertechinds@gmail.com\nTo: covertechinds@gmail.com\nSubject: ${subject}\n\n${body}`;
      const encodedMessage = btoa(message).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

      const gmailRes = await fetch('https://www.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${gmailAccessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          raw: encodedMessage
        })
      });

      if (!gmailRes.ok) {
        const error = await gmailRes.text();
        errors.push(`Gmail error: ${error}`);
      }
    } catch (error) {
      errors.push(`Gmail exception: ${error.message}`);
    }

    if (errors.length > 0) {
      return Response.json({
        success: false,
        message: 'Partial failure',
        errors: errors
      }, { status: 207 });
    }

    return Response.json({
      success: true,
      message: 'Emails sent to both Outlook and Gmail'
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});