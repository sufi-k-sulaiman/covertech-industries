import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { base44 } from '@/api/base44Client';
import { Upload, X, Plus, FileText, Image as ImageIcon, ExternalLink } from 'lucide-react';

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
    galleryImages: product?.galleryImages || [],
    variants: product?.variants || [],
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newFeature, setNewFeature] = useState('');
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');
  const [newVariantName, setNewVariantName] = useState('');

  const handleImageUpload = async (e, type = 'images') => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const { data } = await base44.integrations.Core.UploadFile({ file });
    setFormData(prev => ({ ...prev, [type]: [...prev[type], data.file_url] }));
    setUploading(false);
    e.target.value = '';
  };

  const handlePDFUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const { data } = await base44.integrations.Core.UploadFile({ file });
    const fileName = file.name.replace(/\.pdf$/i, '');
    setFormData(prev => ({ ...prev, downloads: [...prev.downloads, { name: fileName, url: data.file_url }] }));
    setUploading(false);
    e.target.value = '';
  };

  const removeImage = (index, type = 'images') => {
    setFormData(prev => ({ ...prev, [type]: prev[type].filter((_, i) => i !== index) }));
  };

  const removePDF = (index) => {
    setFormData(prev => ({ ...prev, downloads: prev.downloads.filter((_, i) => i !== index) }));
  };

  const updatePDFName = (index, name) => {
    const updated = [...formData.downloads];
    updated[index] = { ...updated[index], name };
    setFormData(prev => ({ ...prev, downloads: updated }));
  };

  const addFeature = () => {
    if (!newFeature.trim()) return;
    setFormData(prev => ({ ...prev, features: [...prev.features, newFeature.trim()] }));
    setNewFeature('');
  };

  const removeFeature = (index) => {
    setFormData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
  };

  const addSpecification = () => {
    if (!newSpecKey.trim() || !newSpecValue.trim()) return;
    setFormData(prev => ({ ...prev, specifications: { ...prev.specifications, [newSpecKey.trim()]: newSpecValue.trim() } }));
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

  const updateSpecValue = (key, value) => {
    setFormData(prev => ({ ...prev, specifications: { ...prev.specifications, [key]: value } }));
  };

  const addVariant = () => {
    if (!newVariantName.trim()) return;
    setFormData(prev => ({ ...prev, variants: [...prev.variants, { name: newVariantName.trim(), description: '', warranty: '', features: [] }] }));
    setNewVariantName('');
  };

  const removeVariant = (index) => {
    setFormData(prev => ({ ...prev, variants: prev.variants.filter((_, i) => i !== index) }));
  };

  const updateVariant = (index, field, value) => {
    const updated = [...formData.variants];
    updated[index] = { ...updated[index], [field]: value };
    setFormData(prev => ({ ...prev, variants: updated }));
  };

  const addVariantFeature = (variantIndex, feature) => {
    if (!feature.trim()) return;
    const updated = [...formData.variants];
    updated[variantIndex] = { ...updated[variantIndex], features: [...(updated[variantIndex].features || []), feature.trim()] };
    setFormData(prev => ({ ...prev, variants: updated }));
  };

  const removeVariantFeature = (variantIndex, featureIndex) => {
    const updated = [...formData.variants];
    updated[variantIndex] = { ...updated[variantIndex], features: updated[variantIndex].features.filter((_, i) => i !== featureIndex) };
    setFormData(prev => ({ ...prev, variants: updated }));
  };

  const handleSave = async () => {
    setSaving(true);
    await base44.entities.Product.update(product.id, formData);
    setSaving(false);
    onSave();
    onClose();
  };

  const ImageGrid = ({ type, label }) => (
    <div>
      <Label className="flex items-center gap-2 mb-2">
        <ImageIcon className="w-4 h-4" />
        {label}
        <span className="text-xs text-slate-400 font-normal">({formData[type].length} images)</span>
      </Label>
      {formData[type].length === 0 && (
        <p className="text-xs text-slate-400 mb-2">No images yet. Upload below.</p>
      )}
      <div className="grid grid-cols-4 gap-3 mb-3">
        {formData[type].map((image, index) => (
          <div key={index} className="relative group">
            <img src={image} alt="" className="w-full h-24 object-cover rounded-lg border border-slate-200" />
            <button
              onClick={() => removeImage(index, type)}
              className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
            <a href={image} target="_blank" rel="noopener noreferrer"
               className="absolute bottom-1 left-1 w-5 h-5 bg-black/60 text-white rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        ))}
        <label className="w-full h-24 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500 transition-colors">
          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, type)} disabled={uploading} className="hidden" />
          {uploading ? <span className="text-xs text-slate-500">Uploading...</span> : <><Upload className="w-5 h-5 text-slate-400" /><span className="text-xs text-slate-400 mt-1">Add Image</span></>}
        </label>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product: {product?.name}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic" className="py-4">
          <TabsList className="grid w-full grid-cols-6 text-xs">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="specs">Specs</TabsTrigger>
            <TabsTrigger value="variants">Options</TabsTrigger>
            <TabsTrigger value="media">Images</TabsTrigger>
            <TabsTrigger value="docs">Documents</TabsTrigger>
          </TabsList>

          {/* Basic Info */}
          <TabsContent value="basic" className="space-y-4 mt-4">
            <div>
              <Label>Product Name</Label>
              <Input value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} placeholder="Product name" />
            </div>
            <div>
              <Label>Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
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
              <Input value={formData.tagline} onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))} placeholder="Short tagline" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Warranty (Years)</Label>
                <Input type="number" min="1" value={formData.warranty_years} onChange={(e) => setFormData(prev => ({ ...prev, warranty_years: parseInt(e.target.value) }))} />
              </div>
              <div>
                <Label>Bestseller</Label>
                <Select value={formData.is_bestseller.toString()} onValueChange={(value) => setFormData(prev => ({ ...prev, is_bestseller: value === 'true' }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="false">No</SelectItem>
                    <SelectItem value="true">Yes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          {/* Content */}
          <TabsContent value="content" className="space-y-4 mt-4">
            <div>
              <Label>Short Description</Label>
              <Textarea value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} placeholder="Product description" rows={3} />
            </div>
            <div>
              <Label>Full Description</Label>
              <Textarea value={formData.fullDescription} onChange={(e) => setFormData(prev => ({ ...prev, fullDescription: e.target.value }))} placeholder="Detailed product description" rows={5} />
            </div>
            <div>
              <Label>Key Features</Label>
              <div className="space-y-2 mt-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-100">
                    <span className="flex-1 text-sm">{feature}</span>
                    <button onClick={() => removeFeature(index)} className="text-red-500 hover:text-red-700"><X className="w-4 h-4" /></button>
                  </div>
                ))}
                {formData.features.length === 0 && <p className="text-xs text-slate-400">No features added yet.</p>}
                <div className="flex gap-2">
                  <Input value={newFeature} onChange={(e) => setNewFeature(e.target.value)} placeholder="Add a feature" onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())} />
                  <Button onClick={addFeature} type="button" size="sm"><Plus className="w-4 h-4" /></Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Specifications */}
          <TabsContent value="specs" className="space-y-4 mt-4">
            <div>
              <Label>Specifications</Label>
              <p className="text-xs text-slate-400 mb-2">Click any value to edit inline.</p>
              <div className="space-y-2 mt-2">
                {Object.entries(formData.specifications).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-100">
                    <span className="font-medium text-sm text-slate-700 w-40 shrink-0">{key}</span>
                    <Input
                      value={value}
                      onChange={(e) => updateSpecValue(key, e.target.value)}
                      className="flex-1 h-8 text-sm"
                    />
                    <button onClick={() => removeSpecification(key)} className="text-red-500 hover:text-red-700 shrink-0"><X className="w-4 h-4" /></button>
                  </div>
                ))}
                {Object.keys(formData.specifications).length === 0 && <p className="text-xs text-slate-400">No specifications yet.</p>}
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <Input value={newSpecKey} onChange={(e) => setNewSpecKey(e.target.value)} placeholder="Specification name (e.g. Material)" />
                  <div className="flex gap-2">
                    <Input value={newSpecValue} onChange={(e) => setNewSpecValue(e.target.value)} placeholder="Value" onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecification())} />
                    <Button onClick={addSpecification} type="button" size="sm"><Plus className="w-4 h-4" /></Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Variants / Available Options */}
          <TabsContent value="variants" className="space-y-4 mt-4">
            <div>
              <Label>Available Options / Variants</Label>
              <p className="text-xs text-slate-400 mb-3">These appear as "Available Options" cards on the product page.</p>
              {formData.variants.length === 0 && <p className="text-xs text-slate-400 mb-3">No variants yet.</p>}
              <div className="space-y-4">
                {formData.variants.map((variant, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-slate-800 text-sm">{variant.name || `Variant ${idx + 1}`}</span>
                      <button onClick={() => removeVariant(idx)} className="text-red-500 hover:text-red-700"><X className="w-4 h-4" /></button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <Label className="text-xs">Name</Label>
                        <Input value={variant.name || ''} onChange={(e) => updateVariant(idx, 'name', e.target.value)} className="h-8 text-sm" />
                      </div>
                      <div>
                        <Label className="text-xs">Warranty</Label>
                        <Input value={variant.warranty || ''} onChange={(e) => updateVariant(idx, 'warranty', e.target.value)} placeholder="e.g. 15 Years" className="h-8 text-sm" />
                      </div>
                    </div>
                    <div className="mb-3">
                      <Label className="text-xs">Description</Label>
                      <Textarea value={variant.description || ''} onChange={(e) => updateVariant(idx, 'description', e.target.value)} rows={2} className="text-sm" />
                    </div>
                    <div>
                      <Label className="text-xs mb-1 block">Features</Label>
                      <div className="space-y-1 mb-2">
                        {(variant.features || []).map((f, fi) => (
                          <div key={fi} className="flex items-center gap-2 bg-white rounded px-2 py-1 border border-slate-100">
                            <span className="flex-1 text-xs">{f}</span>
                            <button onClick={() => removeVariantFeature(idx, fi)} className="text-red-400 hover:text-red-600"><X className="w-3 h-3" /></button>
                          </div>
                        ))}
                      </div>
                      <VariantFeatureInput onAdd={(f) => addVariantFeature(idx, f)} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-3">
                <Input value={newVariantName} onChange={(e) => setNewVariantName(e.target.value)} placeholder="New variant name (e.g. Deluxe Mesh)" onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addVariant())} />
                <Button onClick={addVariant} type="button" size="sm" className="gap-1"><Plus className="w-4 h-4" /> Add</Button>
              </div>
            </div>
          </TabsContent>

          {/* Media / Images */}
          <TabsContent value="media" className="space-y-6 mt-4">
            <ImageGrid type="images" label="Product Images (Main Hero)" />
            <div className="border-t border-slate-200 pt-4">
              <ImageGrid type="galleryImages" label="Installation Gallery Images" />
            </div>
          </TabsContent>

          {/* Documents */}
          <TabsContent value="docs" className="space-y-4 mt-4">
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4" />
                Product Documentation (PDFs)
                <span className="text-xs text-slate-400 font-normal">({formData.downloads.length} files)</span>
              </Label>
              {formData.downloads.length === 0 && <p className="text-xs text-slate-400 mb-3">No documents yet. Upload below.</p>}
              <div className="space-y-2 mb-3">
                {formData.downloads.map((doc, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <FileText className="w-4 h-4 text-slate-500 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <Input
                        value={doc.name}
                        onChange={(e) => updatePDFName(index, e.target.value)}
                        className="text-sm h-8"
                        placeholder="Document name"
                      />
                    </div>
                    <button onClick={() => removePDF(index)} className="text-red-500 hover:text-red-700 shrink-0"><X className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
              <label className="w-full p-4 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-cyan-500 transition-colors">
                <input type="file" accept=".pdf" onChange={handlePDFUpload} disabled={uploading} className="hidden" />
                {uploading ? (
                  <span className="text-sm text-slate-500">Uploading...</span>
                ) : (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Upload className="w-5 h-5" />
                    <span className="text-sm">Upload PDF Document</span>
                  </div>
                )}
              </label>
              <p className="text-xs text-slate-400 mt-2">You can also replace a document by removing it and uploading the new file.</p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
          <Button variant="outline" onClick={onClose} disabled={saving}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving} className="bg-cyan-600 hover:bg-cyan-700 text-white">
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Small sub-component to avoid stale closure issues with variant feature input
function VariantFeatureInput({ onAdd }) {
  const [val, setVal] = useState('');
  return (
    <div className="flex gap-2">
      <Input value={val} onChange={(e) => setVal(e.target.value)} placeholder="Add feature" className="h-7 text-xs"
        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onAdd(val); setVal(''); } }} />
      <Button type="button" size="sm" className="h-7 px-2" onClick={() => { onAdd(val); setVal(''); }}><Plus className="w-3 h-3" /></Button>
    </div>
  );
}