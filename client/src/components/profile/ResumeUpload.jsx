import React, { useState } from 'react';
import { UploadCloud, FileText, Check, AlertCircle } from 'lucide-react';
import { InlineError } from '../common/ErrorMessage';

export default function ResumeUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Only PDF documents are allowed.');
        setFile(null);
      } else {
        setError('');
        simulateUpload(selectedFile);
      }
    }
  };

  const simulateUpload = (selectedFile) => {
    setFile(selectedFile);
    setIsUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          if (onUpload) onUpload(selectedFile);
          return 100;
        }
        return prev + 20;
      });
    }, 150);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-5 text-slate-350 shadow-xl">
      <div>
        <h3 className="text-lg font-bold text-white tracking-wide border-b border-slate-800 pb-2.5 flex items-center gap-2">
          <FileText className="h-5 w-5 text-indigo-400" />
          <span>Resume & Documents</span>
        </h3>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          Upload your latest resume to make applying faster. Recruiters will be able to download your PDF.
        </p>
      </div>

      {file ? (
        /* Upload status / file preview */
        <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-200">
              <FileText className="h-5 w-5 text-indigo-400 shrink-0" />
              <span className="truncate max-w-[200px]">{file.name}</span>
            </div>
            
            {!isUploading ? (
              <span className="inline-flex items-center gap-1 text-xs text-emerald-450 font-bold">
                <Check className="h-4 w-4" />
                Uploaded
              </span>
            ) : (
              <span className="text-xs text-indigo-400 font-bold animate-pulse">Uploading...</span>
            )}
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-indigo-600 h-1.5 rounded-full transition-all duration-150"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {!isUploading && (
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-xs text-rose-400 hover:text-rose-350 font-bold hover:underline"
              >
                Delete and replace
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Dropzone area */
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-850 hover:border-indigo-500/40 rounded-2xl py-8 px-4 bg-slate-950/40 cursor-pointer transition-colors group">
          <UploadCloud className="h-10 w-10 text-slate-550 group-hover:text-indigo-400 transition-colors mb-2.5" />
          <span className="text-xs font-semibold text-slate-300">Drag your resume here, or browse</span>
          <span className="text-[10px] text-slate-550 mt-1">PDF file formats up to 5MB</span>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      )}
      <InlineError message={error} />
    </div>
  );
}
