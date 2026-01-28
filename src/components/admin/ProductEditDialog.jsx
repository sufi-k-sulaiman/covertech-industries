import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { base44 } from '@/api/base44Client';
import { Upload, X } from 'lucide-react';

export default function ProductEditDialog({ product, open, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || 'pool-liners',
    tagline: product?.tagline || '',
    description: product?.description || '',
    warranty_years: product?.warranty_years || 1,
    is_bestseller: product?.is_bestseller || false,
    images: product?.images || []
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const { data } = await base44.integrations.Core.UploadFile({ file });
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, data.file_url]
      }));
    } catch (error) {
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await base44.entities.Product.update(product.id, formData);
      onSave();
      onClose();
    } catch (error) {
      alert('Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label>Product Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Product name"
            />
          </div>

          <div>
            <Label>Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pool-liners">Pool Liners</SelectItem>
                <SelectItem value="safety-covers">Safety Covers</SelectItem>
                <SelectItem value="solar-covers">Solar Covers</SelectItem>
                <SelectItem value="winter-covers">Winter Covers</SelectItem>
                <SelectItem value="steel-kits">Steel Kits</SelectItem>
                <SelectItem value="insulation">Insulation</SelectItem>
                <SelectItem value="golf-sports">Golf & Sports</SelectItem>
                <SelectItem value="tarps-blankets">Tarps & Blankets</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Tagline</Label>
            <Input
              value={formData.tagline}
              onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
              placeholder="Short tagline"
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Product description"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Warranty (Years)</Label>
              <Input
                type="number"
                min="1"
                value={formData.warranty_years}
                onChange={(e) => setFormData(prev => ({ ...prev, warranty_years: parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <Label>Bestseller</Label>
              <Select 
                value={formData.is_bestseller.toString()} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, is_bestseller: value === 'true' }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="false">No</SelectItem>
                  <SelectItem value="true">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Product Images</Label>
            <div className="grid grid-cols-4 gap-4 mt-2">
              {formData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img src={image} alt="" className="w-full h-24 object-cover rounded-lg" />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <label className="w-full h-24 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-cyan-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
                {uploading ? (
                  <span className="text-sm text-slate-500">Uploading...</span>
                ) : (
                  <Upload className="w-6 h-6 text-slate-400" />
                )}
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving} className="bg-cyan-600 hover:bg-cyan-700">
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}