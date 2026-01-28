import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { base44 } from '@/api/base44Client';
import { Upload, X, Plus, FileText, Image as ImageIcon } from 'lucide-react';

export default function ProductEditDialog({ product, open, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || 'pool-liners',
    tagline: product?.tagline || '',
    description: product?.description || '',
    fullDescription: product?.fullDescription || '',
    warranty_years: product?.warranty_years || 1,
    is_bestseller: product?.is_bestseller || false,
    images: product?.images || [],
    features: product?.features || [],
    specifications: product?.specifications || {},
    downloads: product?.downloads || [],
    galleryImages: product?.galleryImages || []
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newFeature, setNewFeature] = useState('');
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  const handleImageUpload = async (e, type = 'images') => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const { data } = await base44.integrations.Core.UploadFile({ file });
      setFormData(prev => ({
        ...prev,
        [type]: [...prev[type], data.file_url]
      }));
    } catch (error) {
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handlePDFUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const { data } = await base44.integrations.Core.UploadFile({ file });
      const fileName = file.name.replace('.pdf', '');
      setFormData(prev => ({
        ...prev,
        downloads: [...prev.downloads, { name: fileName, url: data.file_url }]
      }));
    } catch (error) {
      alert('Failed to upload PDF');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index, type = 'images') => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const removePDF = (index) => {
    setFormData(prev => ({
      ...prev,
      downloads: prev.downloads.filter((_, i) => i !== index)
    }));
  };

  const addFeature = () => {
    if (!newFeature.trim()) return;
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, newFeature]
    }));
    setNewFeature('');
  };

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const addSpecification = () => {
    if (!newSpecKey.trim() || !newSpecValue.trim()) return;
    setFormData(prev => ({
      ...prev,
      specifications: { ...prev.specifications, [newSpecKey]: newSpecValue }
    }));
    setNewSpecKey('');
    setNewSpecValue('');
  };

  const removeSpecification = (key) => {
    setFormData(prev => {
      const newSpecs = { ...prev.specifications };
      delete newSpecs[key];
      return { ...prev, specifications: newSpecs };
    });
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product: {product?.name}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic" className="py-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="docs">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 mt-4">
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
          </TabsContent>

          <TabsContent value="content" className="space-y-4 mt-4">
            <div>
              <Label>Short Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Product description (appears in cards and hero)"
                rows={3}
              />
            </div>

            <div>
              <Label>Full Description</Label>
              <Textarea
                value={formData.fullDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, fullDescription: e.target.value }))}
                placeholder="Detailed product description"
                rows={5}
              />
            </div>

            <div>
              <Label>Features</Label>
              <div className="space-y-2 mt-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-slate-50 rounded">
                    <span className="flex-1 text-sm">{feature}</span>
                    <button
                      onClick={() => removeFeature(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Add a feature"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  />
                  <Button onClick={addFeature} type="button" size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="specs" className="space-y-4 mt-4">
            <div>
              <Label>Specifications</Label>
              <div className="space-y-2 mt-2">
                {Object.entries(formData.specifications).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2 p-2 bg-slate-50 rounded">
                    <span className="font-medium text-sm">{key}:</span>
                    <span className="flex-1 text-sm">{value}</span>
                    <button
                      onClick={() => removeSpecification(key)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    value={newSpecKey}
                    onChange={(e) => setNewSpecKey(e.target.value)}
                    placeholder="Specification name"
                  />
                  <div className="flex gap-2">
                    <Input
                      value={newSpecValue}
                      onChange={(e) => setNewSpecValue(e.target.value)}
                      placeholder="Value"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecification())}
                    />
                    <Button onClick={addSpecification} type="button" size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="media" className="space-y-4 mt-4">
            <div>
              <Label className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Product Images (Main)
              </Label>
              <div className="grid grid-cols-4 gap-4 mt-2">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img src={image} alt="" className="w-full h-24 object-cover rounded-lg" />
                    <button
                      onClick={() => removeImage(index, 'images')}
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
                    onChange={(e) => handleImageUpload(e, 'images')}
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

            <div>
              <Label className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Gallery Images
              </Label>
              <div className="grid grid-cols-4 gap-4 mt-2">
                {formData.galleryImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img src={image} alt="" className="w-full h-24 object-cover rounded-lg" />
                    <button
                      onClick={() => removeImage(index, 'galleryImages')}
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
                    onChange={(e) => handleImageUpload(e, 'galleryImages')}
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
          </TabsContent>

          <TabsContent value="docs" className="space-y-4 mt-4">
            <div>
              <Label className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Product Documents (PDFs)
              </Label>
              <div className="space-y-2 mt-2">
                {formData.downloads.map((doc, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                    <FileText className="w-4 h-4 text-slate-600" />
                    <div className="flex-1">
                      <Input
                        value={doc.name}
                        onChange={(e) => {
                          const newDownloads = [...formData.downloads];
                          newDownloads[index].name = e.target.value;
                          setFormData(prev => ({ ...prev, downloads: newDownloads }));
                        }}
                        className="text-sm"
                      />
                    </div>
                    <button
                      onClick={() => removePDF(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <label className="w-full p-4 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-cyan-500 transition-colors">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handlePDFUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                  {uploading ? (
                    <span className="text-sm text-slate-500">Uploading PDF...</span>
                  ) : (
                    <div className="flex items-center gap-2 text-slate-600">
                      <Upload className="w-5 h-5" />
                      <span className="text-sm">Upload PDF Document</span>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </TabsContent>
        </Tabs>

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