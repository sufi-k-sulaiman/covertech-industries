import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function PDFViewer() {
  const navigate = useNavigate();
  const [pdfUrl, setPdfUrl] = useState('');
  const [title, setTitle] = useState('Document Viewer');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const url = urlParams.get('url');
    const docTitle = urlParams.get('title');
    
    if (url) {
      setPdfUrl(url);
    }
    if (docTitle) {
      setTitle(docTitle);
    }
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = title + '.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-20 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 flex-shrink-0"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <h1 className="text-lg font-semibold text-slate-900 truncate">{title}</h1>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button
                onClick={handleDownload}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white gap-2"
                size="sm"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 p-4 md:p-6 bg-slate-100">
        <div className="max-w-7xl mx-auto h-full">
          {pdfUrl ? (
            <iframe
              src={`https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
              className="w-full h-[calc(100vh-200px)] rounded-xl shadow-lg bg-white border-0"
              title={title}
              allow="fullscreen"
            />
          ) : (
            <div className="flex items-center justify-center h-[calc(100vh-200px)] bg-white rounded-xl shadow-lg">
              <div className="text-center">
                <p className="text-slate-600 mb-4">No PDF URL provided</p>
                <Link to={createPageUrl('Resources')}>
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-500">
                    Go to Resources
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}