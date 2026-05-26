import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Send, CheckCircle2, Wand2 } from 'lucide-react';

const getTemplates = (name) => [
  {
    id: 'welcome',
    label: '👋 Welcome',
    subject: 'Welcome to the Covertech Family!',
    body: `Dear ${name},

Thank you for reaching out to Covertech Industries! We're thrilled to connect with you.

Since 1987, Covertech has been North America's trusted manufacturer of premium pool liners, safety covers, solar blankets, and winter covers — all proudly made in Canada.

Whether you're looking to protect your investment with a custom-fit safety cover, upgrade to a stunning new vinyl liner, or extend your swim season with one of our high-performance solar blankets, we have the perfect solution for you.

Here's what sets us apart:
• 100% Canadian manufacturing — superior quality control
• Industry-leading warranties — up to 25 years on select products
• Custom-made to fit any pool shape or size
• Trusted by thousands of pool owners and dealers across North America

A member of our team will be in touch shortly to assist you. In the meantime, feel free to explore our full product lineup at covertechind.com.

Warm regards,
The Covertech Industries Team`,
  },
  {
    id: 'products',
    label: '🏊 Product Offerings',
    subject: "Discover Covertech's Premium Pool Products",
    body: `Dear ${name},

Thank you for your interest in Covertech Industries. We'd love to share what we offer!

🔵 VINYL POOL LINERS
Our in-ground and above-ground vinyl liners are custom-manufactured to fit your exact pool dimensions. Choose from hundreds of patterns in our exclusive collections — from Classic and Granite to our stunning 2026 Platinum Plus series. All liners come with up to a 25-year warranty.

🛡️ SAFETY COVERS
Our mesh and solid safety covers are engineered to keep your family safe and your pool protected all season long. Available in Deluxe Mesh, Standard Mesh, Commercial Mesh, Lightweight Solid, and Supreme Solid options — custom-fit to any pool shape.

☀️ SOLAR BLANKETS
Extend your swim season and reduce heating costs by up to 70% with our solar covers. Available in blue and clear bubble designs, our solar blankets trap the sun's energy to naturally warm your pool water.

❄️ WINTER COVERS
Protect your pool during the off-season with our durable winter covers. Designed to withstand harsh Canadian winters, they prevent debris buildup and protect your pool surface year after year.

Ready to get a custom quote? Contact us at info@covertechind.com or call +1 (416) 640-5590 and one of our specialists will be happy to help.

Best regards,
The Covertech Industries Team`,
  },
  {
    id: 'warranty',
    label: '📋 Warranty Registration',
    subject: 'Register Your Covertech Product Warranty',
    body: `Dear ${name},

Congratulations on your new Covertech product! To ensure you receive the full benefit of your warranty coverage, we encourage you to complete your warranty registration as soon as possible.

WHY REGISTER?
✅ Activates your full manufacturer's warranty
✅ Ensures faster service if you ever need support
✅ Keeps you informed of product care tips and updates
✅ Protects your investment for years to come

HOW TO REGISTER:
Visit our warranty registration page at covertechind.com/Warranties and complete the short online form. You'll need:
• Your product serial number (found on the product label)
• Date of purchase and installation
• Dealer or retailer name
• Basic pool information

WHAT'S COVERED:
Covertech's warranties cover manufacturing defects in materials and workmanship. Coverage periods vary by product — vinyl liners carry up to a 25-year warranty, safety covers up to 15 years, and solar blankets up to 5 years.

If you have any questions about your warranty or need assistance with registration, please don't hesitate to contact us at info@covertechind.com or call +1 (416) 640-5590.

Best regards,
The Covertech Industries Team`,
  },
  {
    id: 'maintenance',
    label: '🔧 Pool Maintenance Tips',
    subject: 'Expert Pool Maintenance Tips from Covertech',
    body: `Dear ${name},

At Covertech Industries, we believe that proper maintenance is the key to maximizing the life of your pool products. Here are our top expert tips to keep your pool — and your Covertech products — in peak condition:

💧 WATER CHEMISTRY
• Test your pool water weekly and maintain proper pH levels (7.2–7.6)
• Keep chlorine levels between 1–3 ppm to prevent liner fading and degradation
• Avoid "shocking" your pool directly onto the liner — always dilute chemicals first
• Never allow pH to drop below 7.0, as acidic water can damage vinyl liners

🧹 LINER CARE
• Clean your liner with a soft brush — never abrasive pads
• Inspect the liner regularly for small tears or lifting at the bead; early repairs prevent bigger issues
• Avoid draining your pool completely, as this can cause vinyl liners to shrink and crack

☀️ SOLAR BLANKET CARE
• Remove the solar blanket before adding chemicals
• Rinse the blanket occasionally with fresh water to remove scale buildup
• Store rolled up (not folded) in a shaded area when not in use

🛡️ SAFETY COVER CARE
• Remove standing water from solid covers using a submersible pump
• Inspect straps and anchors each spring before installation
• Store your cover clean and dry in the provided storage bag

❄️ WINTERIZATION
• Balance water chemistry before closing for the season
• Lower the water level as directed for your cover type
• Ensure your safety cover is properly tensioned to prevent sagging

For more detailed guides, visit our Resources & Learn sections at covertechind.com.

Stay swimming,
The Covertech Industries Team`,
  },
];

export default function ContactEditDialog({ contact, open, onClose, onSave }) {
  const [form, setForm] = useState({
    name: contact?.name || '',
    email: contact?.email || '',
    phone: contact?.phone || '',
    subject: contact?.subject || '',
    message: contact?.message || '',
    status: contact?.status || 'new',
  });

  const [emailSubject, setEmailSubject] = useState(`Re: Your inquiry – ${contact?.name || ''}`);
  const [emailBody, setEmailBody] = useState('');
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const templates = getTemplates(form.name);

  const applyTemplate = (tpl) => {
    setEmailSubject(tpl.subject);
    setEmailBody(tpl.body);
  };

  const handleSave = async () => {
    setSaving(true);
    await base44.entities.ContactSubmission.update(contact.id, form);
    setSaving(false);
    onSave();
  };

  const handleSendEmail = async () => {
    if (!emailBody.trim()) return;
    setSending(true);

    const footerStyle = `margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; font-size: 0.85em; color: #666;`;
    const html = `
<html><body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
    <div style="padding: 15px; border-bottom: 1px solid #ddd; text-align: center;">
      <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6966301493bec01d4fb29d56/15f12063e_CovertehLogo220923.png" alt="Covertech Industries" style="height: 40px; max-width: 200px;">
    </div>
    <div style="background: linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%); padding: 20px; color: white;">
      <h2 style="margin:0;">Covertech Industries</h2>
    </div>
    <div style="padding: 24px;">
      <div style="background: #f9fafb; border-left: 4px solid #0891b2; padding: 16px; border-radius: 4px; margin: 0 0 24px 0; white-space: pre-line;">
        ${emailBody.replace(/\n/g, '<br>')}
      </div>
      <div style="${footerStyle}">
        <p><strong>Covertech Industries</strong></p>
        <p>26 Dansk Court<br>Toronto, ON M9W 5V8<br>Phone: +1 (416) 640-5590<br>Email: <a href="mailto:info@covertechind.com" style="color: #0891b2;">info@covertechind.com</a></p>
      </div>
    </div>
  </div>
</body></html>`;

    await base44.functions.invoke('sendCustomerEmail', { to: form.email, subject: emailSubject, html });

    setSending(false);
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Contact – {contact?.name}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="edit" className="mt-2">
          <TabsList className="w-full">
            <TabsTrigger value="edit" className="flex-1">Edit Details</TabsTrigger>
            <TabsTrigger value="email" className="flex-1">Send Email</TabsTrigger>
          </TabsList>

          {/* Edit Tab */}
          <TabsContent value="edit" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Name</Label>
                <Input value={form.name} onChange={set('name')} />
              </div>
              <div className="space-y-1">
                <Label>Email</Label>
                <Input type="email" value={form.email} onChange={set('email')} />
              </div>
              <div className="space-y-1">
                <Label>Phone</Label>
                <Input value={form.phone} onChange={set('phone')} />
              </div>
              <div className="space-y-1">
                <Label>Subject</Label>
                <Select value={form.subject} onValueChange={(v) => setForm(f => ({ ...f, subject: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quote">Quote Request</SelectItem>
                    <SelectItem value="product-info">Product Information</SelectItem>
                    <SelectItem value="warranty">Warranty Inquiry</SelectItem>
                    <SelectItem value="dealer">Dealer Inquiry</SelectItem>
                    <SelectItem value="support">Customer Support</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1">
              <Label>Message</Label>
              <Textarea value={form.message} onChange={set('message')} rows={5} />
            </div>
            <div className="space-y-1">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm(f => ({ ...f, status: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter className="pt-2">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving} className="bg-cyan-600 hover:bg-cyan-700 text-white">
                {saving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                Save Changes
              </Button>
            </DialogFooter>
          </TabsContent>

          {/* Email Tab */}
          <TabsContent value="email" className="space-y-4 pt-4">
            {/* Recipient */}
            <div className="bg-slate-50 rounded-lg px-4 py-3 text-sm flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">{form.name}</p>
                <p className="text-slate-500">{form.email}</p>
              </div>
            </div>

            {/* Templates */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Wand2 className="w-4 h-4 text-cyan-600" />
                <Label className="text-sm font-semibold text-slate-700">Quick Templates</Label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {templates.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => applyTemplate(tpl)}
                    className="text-left px-3 py-2.5 rounded-lg border border-slate-200 bg-white hover:border-cyan-400 hover:bg-cyan-50 transition-all text-sm font-medium text-slate-700 hover:text-cyan-700"
                  >
                    {tpl.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-1.5">Click a template to load it — you can edit before sending.</p>
            </div>

            {/* Subject */}
            <div className="space-y-1">
              <Label>Subject</Label>
              <Input value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} />
            </div>

            {/* Body */}
            <div className="space-y-1">
              <Label>Message Body</Label>
              <Textarea
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                rows={10}
                placeholder={`Dear ${form.name},\n\nThank you for contacting Covertech Industries...\n\nBest regards,\nCovertech Team`}
              />
              <p className="text-xs text-slate-400">Sent as a branded HTML email directly to the customer.</p>
            </div>

            <Button
              className="w-full gap-2 bg-cyan-600 hover:bg-cyan-700 text-white"
              onClick={handleSendEmail}
              disabled={sending || !emailBody.trim()}
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> :
               emailSent ? <CheckCircle2 className="w-4 h-4" /> :
               <Send className="w-4 h-4" />}
              {emailSent ? 'Email Sent!' : sending ? 'Sending...' : `Send to ${form.email}`}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}