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
    let htmlBody = '';

    const baseStyle = `font-family: Arial, sans-serif; line-height: 1.6; color: #333;`;
    const headerStyle = `background: linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%); padding: 20px; color: white; margin: 0;`;
    const containerStyle = `max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;`;
    const contentStyle = `padding: 20px;`;
    const fieldStyle = `margin: 12px 0;`;
    const messageBoxStyle = `background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;`;
    const statusStyle = `background: #fff3cd; padding: 2px 8px; border-radius: 3px;`;

    const footerStyle = `margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; font-size: 0.85em; color: #666;`;
    const footerHtml = `<div style="${footerStyle}"><p><strong>Covertech Industries</strong></p><p>26 Dansk Court<br>Toronto, ON M9W 5V8<br>Phone: +1 (416) 640-5590<br>Email: <a href="mailto:info@covertechind.com" style="color: #0891b2;">info@covertechind.com</a></p></div>`;

    if (entityType === 'ContactSubmission') {
      const subjectMap = { 'quote': 'Quote Request', 'product-info': 'Product Information Inquiry', 'warranty': 'Warranty Inquiry', 'dealer': 'Dealer Inquiry', 'support': 'Customer Support Request', 'other': 'General Inquiry' };
      const subjectLabel = subjectMap[entityData.subject] || entityData.subject || 'General Inquiry';
      subject = `[Contact] ${subjectLabel} – ${entityData.name}`;
      htmlBody = `<html><body style="${baseStyle}"><div style="${containerStyle}"><div style="padding: 15px; border-bottom: 1px solid #ddd; text-align: center;"><img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/15f12063e_CovertehLogo220923.png" alt="Covertech Industries" style="height: 40px; max-width: 200px;"></div><div style="${headerStyle}"><h2>New Contact Submission</h2></div><div style="${contentStyle}"><div style="${fieldStyle}"><strong>From:</strong> ${entityData.name}</div><div style="${fieldStyle}"><strong>Email:</strong> <a href="mailto:${entityData.email}">${entityData.email}</a></div><div style="${fieldStyle}"><strong>Phone:</strong> ${entityData.phone || 'N/A'}</div><div style="${fieldStyle}"><strong>Subject:</strong> ${entityData.subject || 'N/A'}</div><div style="${messageBoxStyle}"><strong>Message:</strong><p>${(entityData.message || '').replace(/\n/g, '<br>')}</p></div><div style="${fieldStyle}"><strong>Status:</strong> <span style="${statusStyle}">${entityData.status || 'new'}</span></div><p style="color: #666; font-size: 0.9em; margin-top: 20px;">Submitted: ${new Date().toLocaleString()}</p>${footerHtml}</div></div></body></html>`;
    } else if (entityType === 'DealerApplication') {
      subject = `[Dealer Application] ${entityData.company_name} – ${entityData.first_name} ${entityData.last_name}`;
      htmlBody = `<html><body style="${baseStyle}"><div style="${containerStyle}"><div style="padding: 15px; border-bottom: 1px solid #ddd; text-align: center;"><img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/15f12063e_CovertehLogo220923.png" alt="Covertech Industries" style="height: 40px; max-width: 200px;"></div><div style="${headerStyle}"><h2>New Dealer Application</h2></div><div style="${contentStyle}"><div style="${fieldStyle}"><strong>Company:</strong> ${entityData.company_name}</div><div style="${fieldStyle}"><strong>Contact:</strong> ${entityData.first_name} ${entityData.last_name}</div><div style="${fieldStyle}"><strong>Email:</strong> <a href="mailto:${entityData.email}">${entityData.email}</a></div><div style="${fieldStyle}"><strong>Phone:</strong> ${entityData.phone}</div><div style="${fieldStyle}"><strong>Location:</strong> ${entityData.city}, ${entityData.state_province}</div><div style="${fieldStyle}"><strong>Business Type:</strong> ${entityData.business_type}</div><div style="${messageBoxStyle}"><strong>About Business:</strong><p>${(entityData.about_business || 'N/A').replace(/\n/g, '<br>')}</p></div><div style="${fieldStyle}"><strong>Status:</strong> <span style="${statusStyle}">${entityData.status || 'pending'}</span></div><p style="color: #666; font-size: 0.9em; margin-top: 20px;">Submitted: ${new Date().toLocaleString()}</p>${footerHtml}</div></div></body></html>`;
    } else if (entityType === 'WarrantyRegistration') {
      const productLabel = entityData.product_type ? entityData.product_type.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Product';
      subject = `[Warranty Registration] ${productLabel} – ${entityData.full_name}`;
      const sectionHeaderStyle = `background: #f0f9ff; padding: 12px 15px; margin: 15px -20px 12px -20px; border-left: 4px solid #0891b2; font-weight: bold; color: #0c4a6e;`;
      const twoColStyle = `display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 15px 0;`;
      const threeColStyle = `display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin: 15px 0;`;
      htmlBody = `<html><body style="${baseStyle}"><div style="${containerStyle}"><div style="padding: 15px; border-bottom: 1px solid #ddd; text-align: center;"><img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/15f12063e_CovertehLogo220923.png" alt="Covertech Industries" style="height: 40px; max-width: 200px;"></div><div style="${headerStyle}"><h2>New Warranty Registration</h2><p style="margin: 5px 0 0 0; font-size: 0.9em;">${entityData.product_type || 'Product'}</p></div><div style="${contentStyle}"><div style="${sectionHeaderStyle}">Contact Information</div><div style="${fieldStyle}"><strong>Full Name:</strong> ${entityData.full_name}</div><div style="${twoColStyle}"><div style="${fieldStyle}"><strong>Email:</strong> <a href="mailto:${entityData.email}">${entityData.email}</a></div><div style="${fieldStyle}"><strong>Phone:</strong> ${entityData.phone}</div></div><div style="${fieldStyle}"><strong>Country:</strong> ${entityData.country || 'N/A'}</div><div style="${fieldStyle}"><strong>Street Address:</strong> ${entityData.street_address || 'N/A'}</div><div style="${threeColStyle}"><div style="${fieldStyle}"><strong>City:</strong> ${entityData.city || 'N/A'}</div><div style="${fieldStyle}"><strong>State/Province:</strong> ${entityData.state_province || 'N/A'}</div><div style="${fieldStyle}"><strong>Postal Code:</strong> ${entityData.postal_code || 'N/A'}</div></div><div style="${sectionHeaderStyle}">Product Details</div><div style="${fieldStyle}"><strong>Serial Number:</strong> ${entityData.serial_number || 'N/A'}</div><div style="${fieldStyle}"><strong>Product Type:</strong> ${entityData.product_type || 'N/A'}</div><div style="${twoColStyle}"><div style="${fieldStyle}"><strong>Cover Shape:</strong> ${entityData.cover_shape || 'N/A'}</div><div style="${fieldStyle}"><strong>Cover Type:</strong> ${entityData.cover_type || 'N/A'}</div></div><div style="${twoColStyle}"><div style="${fieldStyle}"><strong>Pool Type:</strong> ${entityData.pool_type || 'N/A'}</div><div style="${fieldStyle}"><strong>Pool Size:</strong> ${entityData.pool_size || 'N/A'}</div></div><div style="${twoColStyle}"><div style="${fieldStyle}"><strong>Pool Shape:</strong> ${entityData.pool_shape || 'N/A'}</div><div style="${fieldStyle}"><strong>Warranty Years:</strong> ${entityData.warranty_years || 'N/A'}</div></div><div style="${sectionHeaderStyle}">Installation Information</div><div style="${fieldStyle}"><strong>Installer Name:</strong> ${entityData.installer_name || 'N/A'}</div><div style="${fieldStyle}"><strong>Installer Type:</strong> ${entityData.installer_type || 'N/A'}</div><div style="${fieldStyle}"><strong>Dealer Purchased From:</strong> ${entityData.dealer_purchased_from || 'N/A'}</div><div style="${twoColStyle}"><div style="${fieldStyle}"><strong>Purchase Date:</strong> ${entityData.purchase_date || 'N/A'}</div><div style="${fieldStyle}"><strong>Installation Date:</strong> ${entityData.installation_date || 'N/A'}</div></div><p style="color: #666; font-size: 0.9em; margin-top: 20px;">Submitted: ${new Date().toLocaleString()}</p>${footerHtml}</div></div></body></html>`;
    } else if (entityType === 'DesignCenterSubmission') {
      subject = `[Design Center Quote] ${entityData.pool_shape || 'Custom Pool'} – ${entityData.contact_info?.name || 'Customer'} (${entityData.quote_id})`;
      htmlBody = `<html><body style="${baseStyle}"><div style="${containerStyle}"><div style="padding: 15px; border-bottom: 1px solid #ddd; text-align: center;"><img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/15f12063e_CovertehLogo220923.png" alt="Covertech Industries" style="height: 40px; max-width: 200px;"></div><div style="${headerStyle}"><h2>New Design Center Quote</h2><p style="margin: 5px 0 0 0; font-size: 0.9em;">Quote ID: ${entityData.quote_id}</p></div><div style="${contentStyle}"><div style="${fieldStyle}"><strong>Product Type:</strong> ${entityData.product_type}</div><div style="${fieldStyle}"><strong>Pool Shape:</strong> ${entityData.pool_shape}</div><div style="${fieldStyle}"><strong>Features:</strong> ${entityData.features?.join(', ') || 'N/A'}</div><div style="${fieldStyle}"><strong>Contact:</strong> ${entityData.contact_info?.name || 'N/A'}</div><div style="${fieldStyle}"><strong>Email:</strong> <a href="mailto:${entityData.contact_info?.email || 'N/A'}">${entityData.contact_info?.email || 'N/A'}</a></div><div style="${fieldStyle}"><strong>Phone:</strong> ${entityData.contact_info?.phone || 'N/A'}</div><div style="${fieldStyle}"><strong>Status:</strong> <span style="${statusStyle}">${entityData.status || 'new'}</span></div><p style="color: #666; font-size: 0.9em; margin-top: 20px;">Submitted: ${new Date().toLocaleString()}</p>${footerHtml}</div></div></body></html>`;
    } else {
      return Response.json({ error: 'Unknown entity type' }, { status: 400 });
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
          subject: subject,
          body: { contentType: 'html', content: htmlBody },
          toRecipients: [{ emailAddress: { address: 'webadmin@covertechind.com' } }],
          ccRecipients: [
            { emailAddress: { address: 'Mazen@covertechind.com' } },
            { emailAddress: { address: 'henry@covertechind.com' } }
          ]
        }
      })
    });

    if (!outlookRes.ok) {
      const error = await outlookRes.text();
      return Response.json({ success: false, message: `Outlook error: ${error}` }, { status: 500 });
    }

    return Response.json({ success: true, message: 'Email sent via Microsoft 365' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});