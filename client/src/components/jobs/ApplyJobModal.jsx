import React, { useState, useEffect } from 'react';
import { X, UploadCloud, AlertCircle, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { InlineError } from '../common/ErrorMessage';

export default function ApplyJobModal({ isOpen, onClose, job, onSubmit, existingResume }) {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [useProfileResume, setUseProfileResume] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setResume(null);
      setCoverLetter('');
      setError('');
      setIsSuccess(false);
      setIsSubmitting(false);
      setUseProfileResume(Boolean(existingResume?.fileUrl));
    }
  }, [isOpen, existingResume]);

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
        setUseProfileResume(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume && !useProfileResume) {
      setError('Please upload your resume to apply.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit({
          resume: useProfileResume ? null : resume,
          resumeUrl: useProfileResume ? existingResume?.fileUrl : null,
          coverLetter
        });
      }
      setIsSuccess(true);
    } catch (err) {
      console.error('Application submission error:', err);
      setError(typeof err === 'string' ? err : err?.message || 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  const jobTitle = job?.title || 'Job Opening';
  const companyName = job?.company?.name || job?.company || 'Company';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

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
                Thank you for applying to the <span className="text-white font-medium">{jobTitle}</span> position. The hiring team has been notified.
              </p>
            </div>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-xs font-bold rounded-xl text-white transition-colors shadow-lg shadow-violet-600/20"
              >
                Close & View Application
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
                {jobTitle} @ {companyName}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-slate-300">
              {/* Existing Profile Resume Option */}
              {existingResume?.fileUrl && (
                <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300">Saved Profile Resume</span>
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-indigo-400 font-semibold">
                      <input
                        type="checkbox"
                        checked={useProfileResume}
                        onChange={(e) => {
                          setUseProfileResume(e.target.checked);
                          if (e.target.checked) setResume(null);
                        }}
                        className="rounded accent-indigo-600"
                      />
                      <span>Use this resume</span>
                    </label>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <FileText className="h-4 w-4 text-indigo-400" />
                    <span className="truncate">{existingResume.fileName || 'profile_resume.pdf'}</span>
                  </div>
                </div>
              )}

              {/* Resume File Upload (if not using existing or user wants to upload new) */}
              {(!useProfileResume || !existingResume?.fileUrl) && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Upload Resume (PDF only) *
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
                      <span className="text-[10px] text-slate-500 mt-1">Accepts PDF file format (Max 5MB)</span>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              )}

              <InlineError message={error} />

              {/* Cover Letter */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Cover Letter / Note (Optional)
                </label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Introduce yourself to the hiring team and highlight your relevant experience..."
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-2xl p-3 text-xs text-slate-200 outline-none transition-all placeholder:text-slate-600 resize-none"
                />
              </div>

              {/* Footer Actions */}
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-4.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-xs font-semibold text-slate-350 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-bold text-xs transition-all hover:scale-[1.02] shadow-lg shadow-indigo-600/20 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
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
