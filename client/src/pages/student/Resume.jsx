import React, { useState } from 'react';
import { Upload, FileText, Download, CheckCircle2, Eye, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Resume() {
  const [resume, setResume] = useState({
    name: 'Bhagyashri_Sanap_Resume.pdf',
    size: '1.2 MB',
    uploadedAt: '12 Aug 2026'
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadedAt: 'Just now'
      });
      toast.success('Resume uploaded successfully!');
    }
  };

  const handleRemove = () => {
    setResume(null);
    toast.success('Resume removed');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white">Manage Resume</h1>
        <p className="text-xs text-slate-400 mt-1">
          Upload and preview your latest PDF CV attached automatically to job applications.
        </p>
      </div>

      {resume ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-indigo-600/20 text-indigo-400 rounded-2xl border border-indigo-500/30">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">{resume.name}</h3>
                <p className="text-xs text-slate-400">
                  Size: {resume.size} • Uploaded: {resume.uploadedAt}
                </p>
                <span className="inline-flex items-center gap-1 mt-1 text-[11px] font-semibold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified PDF
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toast.success('Downloading resume...')}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 flex items-center gap-1.5"
              >
                <Download className="w-4 h-4 text-indigo-400" /> Download
              </button>
              <button
                onClick={handleRemove}
                className="p-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl text-xs font-bold border border-rose-500/30"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Upload Drop Zone */}
      <div className="bg-slate-900/60 border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-3xl p-8 sm:p-12 text-center space-y-4 transition-colors">
        <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto">
          <Upload className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Upload New Resume</h3>
          <p className="text-xs text-slate-400 mt-1">Supported formats: PDF, DOCX (Max size: 5MB)</p>
        </div>

        <label className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg cursor-pointer transition-all">
          Browse File
          <input type="file" accept=".pdf,.docx" onChange={handleFileChange} className="hidden" />
        </label>
      </div>
    </div>
  );
}
