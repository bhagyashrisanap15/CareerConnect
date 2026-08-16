import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { InlineError } from '../common/ErrorMessage';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email address is required');
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        {/* Back Link */}
        <Link to="/login" className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Sign In</span>
        </Link>

        {isSubmitted ? (
          /* Success Screen */
          <div className="text-center space-y-4 py-4 animate-in zoom-in-95 duration-150 text-slate-300">
            <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white tracking-wide">Check Your Inbox</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                We've sent a password reset link to <span className="text-slate-200 font-medium">{email}</span>.
              </p>
            </div>
            <p className="text-xs text-slate-500 pt-4">
              Didn't receive the email? Check your spam folder or try resending.
            </p>
          </div>
        ) : (
          /* Input Form */
          <div className="space-y-5">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white tracking-wide">Reset Password</h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Enter your email address and we'll send you a secure link to reset your account credentials.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-slate-300">
              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3 h-5 w-5 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600"
                  />
                </div>
                <InlineError message={error} />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-medium text-sm py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/10 hover:shadow-indigo-500/20 active:scale-[0.99] disabled:scale-100 disabled:cursor-not-allowed mt-2"
              >
                {isLoading ? (
                  <span className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send Reset Link</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
