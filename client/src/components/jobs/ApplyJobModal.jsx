import React, { useState } from 'react';
import { X, UploadCloud, AlertCircle, FileText, CheckCircle } from 'lucide-react';
import { InlineError } from '../common/ErrorMessage';

export default function ApplyJobModal({ isOpen, onClose, job, onSubmit }) {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Only PDF resumes are accepted.');
        setResume(null);
      } else {
        setError('');
        setResume(file);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resume) {
      setError('Please upload your resume to apply.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (onSubmit) {
        onSubmit({ resume, coverLetter });
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/65 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      ></div>

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 shadow-2xl z-10 animate-in zoom-in-95 duration-200 text-slate-350">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {isSuccess ? (
          /* Success Screen */
          <div className="text-center space-y-4 py-6 animate-in zoom-in-95 duration-150">
            <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle className="h-12 w-12" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white tracking-wide">Application Submitted!</h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
                Thank you for applying to the <span className="text-white font-medium">{job?.title || 'Software Engineer'}</span> position. The hiring team has been notified.
              </p>
            </div>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-sm font-semibold rounded-xl text-white transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">
                Apply for Position
              </h3>
              <p className="text-xs text-indigo-400 font-semibold uppercase tracking-wider mt-1">
                {job?.title} @ {job?.company}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-slate-300">
              {/* Resume File Upload */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Upload Resume (PDF only)
                </label>
                
                {resume ? (
                  <div className="flex items-center justify-between p-3.5 bg-slate-950 border border-slate-800 rounded-2xl">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-200">
                      <FileText className="h-5 w-5 text-indigo-400" />
                      <span className="truncate max-w-[240px]">{resume.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setResume(null)}
                      className="text-xs text-rose-400 hover:text-rose-350 font-bold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-800 hover:border-indigo-500/40 rounded-2xl py-6 px-4 bg-slate-950/40 cursor-pointer transition-colors group">
                    <UploadCloud className="h-8 w-8 text-slate-500 group-hover:text-indigo-400 transition-colors mb-2" />
                    <span className="text-xs font-semibold text-slate-300">Drag or click to browse</span>
                    <span className="text-[10px] text-slate-500 mt-1">Accepts PDF file format</span>
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

              {/* Cover Letter */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Cover Letter (Optional)
                </label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Introduce yourself to the hiring team..."
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-2xl p-3 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600 resize-none"
                />
              </div>

              {/* Footer Actions */}
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-sm font-semibold text-slate-350 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-semibold text-sm transition-all hover:scale-[1.02] shadow-lg shadow-indigo-600/10 hover:shadow-indigo-500/20 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
