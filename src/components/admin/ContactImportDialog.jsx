import { useState, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Upload, Download, CheckCircle2, AlertCircle, Loader2, FileSpreadsheet } from 'lucide-react';

// CSV template fields matching ContactSubmission entity
const TEMPLATE_HEADERS = ['name', 'email', 'phone', 'subject', 'message', 'status'];
const SUBJECT_OPTIONS = ['quote', 'product-info', 'warranty', 'dealer', 'support', 'other'];
const STATUS_OPTIONS = ['new', 'in-progress', 'resolved'];

function downloadTemplate() {
  const sample = [
    TEMPLATE_HEADERS.join(','),
    `"John Smith","john@example.com","416-555-1234","quote","I am interested in a quote for a vinyl liner for my 16x32 inground pool.","new"`,
    `"Jane Doe","jane@example.com","905-555-5678","warranty","I need help with my warranty registration.","in-progress"`,
  ].join('\n');
  const blob = new Blob([sample], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'contacts_import_template.csv';
  a.click();
  URL.revokeObjectURL(url);
}

function parseCSV(text) {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.replace(/^"|"$/g, '').trim().toLowerCase());
  return lines.slice(1).map(line => {
    // Handle quoted fields with commas
    const cols = [];
    let cur = '';
    let inQuote = false;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') { inQuote = !inQuote; }
      else if (line[i] === ',' && !inQuote) { cols.push(cur); cur = ''; }
      else { cur += line[i]; }
    }
    cols.push(cur);
    const row = {};
    headers.forEach((h, i) => { row[h] = (cols[i] || '').trim(); });
    return row;
  }).filter(r => r.name || r.email);
}

export default function ContactImportDialog({ open, onClose, onImported }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);
  const [errors, setErrors] = useState([]);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState(null);
  const inputRef = useRef();

  const handleFile = (f) => {
    setFile(f);
    setResult(null);
    setErrors([]);
    const reader = new FileReader();
    reader.onload = (e) => {
      const rows = parseCSV(e.target.result);
      const errs = [];
      rows.forEach((r, i) => {
        if (!r.name) errs.push(`Row ${i + 2}: missing name`);
        if (!r.email || !r.email.includes('@')) errs.push(`Row ${i + 2}: invalid email`);
        if (r.subject && !SUBJECT_OPTIONS.includes(r.subject)) errs.push(`Row ${i + 2}: subject must be one of: ${SUBJECT_OPTIONS.join(', ')}`);
        if (r.status && !STATUS_OPTIONS.includes(r.status)) errs.push(`Row ${i + 2}: status must be one of: ${STATUS_OPTIONS.join(', ')}`);
      });
      setErrors(errs);
      setPreview(rows.slice(0, 5));
    };
    reader.readAsText(f);
  };

  const handleImport = async () => {
    if (!file || errors.length) return;
    setImporting(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const rows = parseCSV(e.target.result);
      let success = 0, failed = 0;
      for (const row of rows) {
        const record = {
          name: row.name,
          email: row.email,
          phone: row.phone || '',
          subject: SUBJECT_OPTIONS.includes(row.subject) ? row.subject : 'other',
          message: row.message || '',
          status: STATUS_OPTIONS.includes(row.status) ? row.status : 'new',
        };
        try {
          await base44.entities.ContactSubmission.create(record);
          success++;
        } catch { failed++; }
      }
      setResult({ success, failed, total: rows.length });
      setImporting(false);
      if (success > 0) onImported();
    };
    reader.readAsText(file);
  };

  const reset = () => {
    setFile(null);
    setPreview([]);
    setErrors([]);
    setResult(null);
  };

  return (
    <Dialog open={open} onOpenChange={() => { reset(); onClose(); }}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Import Contacts from CSV</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* Download template */}
          <div className="flex items-center justify-between bg-slate-50 rounded-lg p-3">
            <div>
              <p className="text-sm font-medium text-slate-800">Download Template</p>
              <p className="text-xs text-slate-500">CSV with correct column headers & sample rows</p>
            </div>
            <Button size="sm" variant="outline" className="gap-1.5" onClick={downloadTemplate}>
              <Download className="w-4 h-4" /> Template
            </Button>
          </div>

          {/* File field labels */}
          <div className="text-xs text-slate-500 bg-blue-50 border border-blue-100 rounded-lg p-3 space-y-1">
            <p className="font-semibold text-blue-700">Required columns:</p>
            <p><span className="font-mono">name</span>, <span className="font-mono">email</span></p>
            <p className="font-semibold text-blue-700 mt-1">Optional columns:</p>
            <p><span className="font-mono">phone</span>, <span className="font-mono">subject</span> ({SUBJECT_OPTIONS.join(' | ')}), <span className="font-mono">message</span>, <span className="font-mono">status</span> ({STATUS_OPTIONS.join(' | ')})</p>
          </div>

          {/* Upload area */}
          {!result && (
            <div
              className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center cursor-pointer hover:border-cyan-400 hover:bg-cyan-50 transition-all"
              onClick={() => inputRef.current.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
            >
              <FileSpreadsheet className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <p className="text-sm font-medium text-slate-700">{file ? file.name : 'Click or drag & drop your CSV file'}</p>
              <p className="text-xs text-slate-400 mt-1">CSV files only</p>
              <input ref={inputRef} type="file" accept=".csv" className="hidden" onChange={(e) => { if (e.target.files[0]) handleFile(e.target.files[0]); }} />
            </div>
          )}

          {/* Errors */}
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 space-y-1">
              <div className="flex items-center gap-2 text-red-700 font-medium text-sm mb-1">
                <AlertCircle className="w-4 h-4" /> {errors.length} validation error{errors.length > 1 ? 's' : ''}
              </div>
              {errors.map((e, i) => <p key={i} className="text-xs text-red-600">{e}</p>)}
            </div>
          )}

          {/* Preview */}
          {preview.length > 0 && !result && (
            <div>
              <p className="text-xs font-semibold text-slate-600 mb-2">Preview (first {preview.length} rows)</p>
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full text-xs">
                  <thead className="bg-slate-50">
                    <tr>
                      {['name', 'email', 'phone', 'subject', 'status'].map(h => (
                        <th key={h} className="px-3 py-2 text-left font-semibold text-slate-700">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {preview.map((r, i) => (
                      <tr key={i}>
                        <td className="px-3 py-2 text-slate-800">{r.name}</td>
                        <td className="px-3 py-2 text-slate-600">{r.email}</td>
                        <td className="px-3 py-2 text-slate-600">{r.phone || '—'}</td>
                        <td className="px-3 py-2 text-slate-600">{r.subject || '—'}</td>
                        <td className="px-3 py-2 text-slate-600">{r.status || 'new'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Success result */}
          {result && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto" />
              <p className="font-semibold text-green-800">Import Complete</p>
              <p className="text-sm text-green-700">{result.success} of {result.total} contacts imported successfully.</p>
              {result.failed > 0 && <p className="text-xs text-red-600">{result.failed} failed.</p>}
            </div>
          )}
        </div>

        <DialogFooter className="pt-2">
          <Button variant="outline" onClick={() => { reset(); onClose(); }}>
            {result ? 'Close' : 'Cancel'}
          </Button>
          {!result && (
            <Button
              onClick={handleImport}
              disabled={!file || errors.length > 0 || importing}
              className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2"
            >
              {importing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {importing ? 'Importing...' : `Import ${preview.length > 0 ? 'Contacts' : ''}`}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}