import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger' // 'danger' | 'warning' | 'info'
}) {
  if (!isOpen) return null;

  const colorStyles = {
    danger: {
      bg: 'bg-rose-500/10 border-rose-500/30',
      icon: 'text-rose-400 bg-rose-500/20',
      button: 'bg-rose-600 hover:bg-rose-500 text-white focus:ring-rose-500/20 shadow-rose-950/20'
    },
    warning: {
      bg: 'bg-amber-500/10 border-amber-500/30',
      icon: 'text-amber-400 bg-amber-500/20',
      button: 'bg-amber-600 hover:bg-amber-500 text-white focus:ring-amber-500/20 shadow-amber-950/20'
    },
    info: {
      bg: 'bg-indigo-500/10 border-indigo-500/30',
      icon: 'text-indigo-400 bg-indigo-500/20',
      button: 'bg-indigo-600 hover:bg-indigo-500 text-white focus:ring-indigo-500/20 shadow-indigo-950/20'
    }
  };

  const style = colorStyles[type] || colorStyles.danger;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      ></div>

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl z-10 animate-in zoom-in-95 duration-200 text-slate-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header Icon + Info */}
        <div className="flex gap-4 items-start pt-2">
          <div className={`p-3 rounded-xl shrink-0 ${style.icon}`}>
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white tracking-wide">
              {title}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-sm font-semibold text-slate-300 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              if (onConfirm) onConfirm();
              if (onClose) onClose();
            }}
            className={`px-4.5 py-2 rounded-xl text-sm font-semibold shadow-lg transition-all hover:scale-[1.02] ${style.button}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
