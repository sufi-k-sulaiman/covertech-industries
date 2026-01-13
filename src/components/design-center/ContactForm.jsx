import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { User, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

export default function ContactForm({ formData, onFormChange }) {
  const handleChange = (field, value) => {
    onFormChange({ ...formData, [field]: value });
  };

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">Your Contact Information</h2>
        <p className="text-slate-600">We'll use this to send you your personalized quote.</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {/* Contact Information */}
        <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
          <div className="flex items-center gap-3 text-cyan-600 mb-6">
            <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold">Contact Information</div>
              <div className="text-sm text-slate-600">We'll use this to send you your quote</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="fullName"
                  placeholder="John Smith"
                  value={formData.fullName || ''}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone || ''}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
          <div className="flex items-center gap-3 text-blue-600 mb-6">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold">Shipping Address</div>
              <div className="text-sm text-slate-600">Where should we deliver your product?</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="Canada"
                value={formData.country || 'Canada'}
                onChange={(e) => handleChange('country', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                placeholder="Start typing your address..."
                value={formData.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="City"
                  value={formData.city || ''}
                  onChange={(e) => handleChange('city', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="province">Province</Label>
                <Input
                  id="province"
                  placeholder="Province"
                  value={formData.province || ''}
                  onChange={(e) => handleChange('province', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  placeholder="M5V 1A1"
                  value={formData.postalCode || ''}
                  onChange={(e) => handleChange('postalCode', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Special Notes */}
        <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
          <div className="flex items-center gap-3 text-amber-600 mb-6">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold">Special Notes</div>
              <div className="text-sm text-slate-600">Any additional information we should know?</div>
            </div>
          </div>

          <Textarea
            placeholder="Describe any special requirements, unique pool features, or questions you have..."
            value={formData.notes || ''}
            onChange={(e) => handleChange('notes', e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>
      </div>
    </div>
  );
}