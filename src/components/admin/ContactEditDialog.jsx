import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Send, CheckCircle2 } from 'lucide-react';

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
      <h2 style="margin:0;">Message from Covertech Industries</h2>
    </div>
    <div style="padding: 24px;">
      <p>Hi ${form.name},</p>
      <div style="background: #f9fafb; border-left: 4px solid #0891b2; padding: 16px; border-radius: 4px; margin: 16px 0;">
        ${emailBody.replace(/\n/g, '<br>')}
      </div>
      <div style="${footerStyle}">
        <p><strong>Covertech Industries</strong></p>
        <p>26 Dansk Court<br>Toronto, ON M9W 5V8<br>Phone: +1 (416) 640-5590<br>Email: <a href="mailto:info@covertechind.com" style="color: #0891b2;">info@covertechind.com</a></p>
      </div>
    </div>
  </div>
</body></html>`;

    await base44.functions.invoke('sendCustomerEmail', {
      to: form.email,
      subject: emailSubject,
      html,
    });

    setSending(false);
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Contact Submission – {contact?.name}</DialogTitle>
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
            <div className="bg-slate-50 rounded-lg px-4 py-3 text-sm space-y-1">
              <p className="font-medium text-slate-900">{form.name}</p>
              <p className="text-slate-500">{form.email}</p>
            </div>

            <div className="space-y-1">
              <Label>Email Subject</Label>
              <Input value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} />
            </div>

            <div className="space-y-1">
              <Label>Message Body</Label>
              <Textarea
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                rows={8}
                placeholder={`Dear ${form.name},\n\nThank you for contacting Covertech Industries...\n\nBest regards,\nCovertech Team`}
              />
              <p className="text-xs text-slate-400">This message will be sent directly to the customer's email as a branded HTML email.</p>
            </div>

            <Button
              className="w-full gap-2 bg-cyan-600 hover:bg-cyan-700 text-white"
              onClick={handleSendEmail}
              disabled={sending || !emailBody.trim()}
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> :
               emailSent ? <CheckCircle2 className="w-4 h-4" /> :
               <Send className="w-4 h-4" />}
              {emailSent ? 'Email Sent!' : sending ? 'Sending...' : `Send Email to ${form.email}`}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}