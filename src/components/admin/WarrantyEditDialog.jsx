import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

const Field = ({ label, value }) => (
  value ? (
    <div className="flex justify-between gap-4 py-1.5 border-b border-slate-100 last:border-0">
      <span className="text-xs text-slate-500 shrink-0">{label}</span>
      <span className="text-xs text-slate-900 font-medium text-right">{value}</span>
    </div>
  ) : null
);

export default function WarrantyEditDialog({ warranty, open, onClose, onSave }) {
  const [invoiceNumber, setInvoiceNumber] = useState(warranty?.invoice_number || '');
  const [status, setStatus] = useState(warranty?.status || 'pending');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await base44.entities.WarrantyRegistration.update(warranty.id, {
      invoice_number: invoiceNumber,
      status
    });
    setSaving(false);
    onSave();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Warranty Registration Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">

          {/* Customer Info */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Customer</h3>
            <div className="bg-slate-50 rounded-lg px-3 py-1">
              <Field label="Full Name" value={warranty?.full_name} />
              <Field label="Email" value={warranty?.email} />
              <Field label="Phone" value={warranty?.phone} />
              <Field label="Address" value={warranty?.street_address} />
              <Field label="City" value={warranty?.city} />
              <Field label="State / Province" value={warranty?.state_province} />
              <Field label="Postal Code" value={warranty?.postal_code} />
              <Field label="Country" value={warranty?.country} />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Product</h3>
            <div className="bg-slate-50 rounded-lg px-3 py-1">
              <Field label="Product Type" value={warranty?.product_type} />
              <Field label="Serial Number" value={warranty?.serial_number} />
              <Field label="Warranty Years" value={warranty?.warranty_years} />
              <Field label="Cover Type" value={warranty?.cover_type} />
              <Field label="Cover Shape" value={warranty?.cover_shape} />
            </div>
          </div>

          {/* Pool Info */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Pool</h3>
            <div className="bg-slate-50 rounded-lg px-3 py-1">
              <Field label="Pool Type" value={warranty?.pool_type} />
              <Field label="Pool Shape" value={warranty?.pool_shape} />
              <Field label="Pool Size" value={warranty?.pool_size} />
            </div>
          </div>

          {/* Purchase & Installation */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Purchase & Installation</h3>
            <div className="bg-slate-50 rounded-lg px-3 py-1">
              <Field label="Dealer Purchased From" value={warranty?.dealer_purchased_from} />
              <Field label="Purchase Date" value={warranty?.purchase_date} />
              <Field label="Installation Date" value={warranty?.installation_date} />
              <Field label="Installer Name" value={warranty?.installer_name} />
              <Field label="Installer Type" value={warranty?.installer_type} />
            </div>
          </div>

          {/* Editable Fields */}
          <div className="border-t border-slate-200 pt-4 space-y-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Admin</h3>

            <div className="space-y-2">
              <Label htmlFor="invoice_number">Invoice Number</Label>
              <Input
                id="invoice_number"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                placeholder="Enter invoice number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving} className="bg-cyan-600 hover:bg-cyan-700 text-white">
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}