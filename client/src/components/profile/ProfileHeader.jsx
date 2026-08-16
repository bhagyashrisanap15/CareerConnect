import React from 'react';
import { Camera, MapPin, Mail, Globe, Phone, FileText } from 'lucide-react';

export default function ProfileHeader({ user, onAvatarChange }) {
  const {
    name = 'Jane Doe',
    email = 'jane@example.com',
    role = 'candidate',
    avatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
    bio = 'Full Stack Software Engineer',
    location = 'San Francisco, CA',
    phone = '+1 (555) 019-2834',
    website = 'https://janedoe.dev'
  } = user || {};

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onAvatarChange) {
      const url = URL.createObjectURL(file);
      onAvatarChange(url);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl text-slate-300">
      {/* Cover Image banner */}
      <div className="h-32 bg-gradient-to-r from-indigo-950 via-slate-900 to-violet-950 border-b border-slate-800 relative"></div>

      {/* Header Info Panel */}
      <div className="px-6 pb-6 relative flex flex-col md:flex-row items-center md:items-end gap-5 -mt-10">
        
        {/* Avatar Upload Container */}
        <div className="relative group">
          <img
            src={avatar}
            alt={name}
            className="w-24 h-24 rounded-2xl object-cover border-4 border-slate-900 shadow-xl bg-slate-950"
          />
          <label className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="h-6 w-6 text-white" />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Info panel */}
        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-wide">{name}</h2>
            <span className="self-center md:self-start px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-indigo-500/10 border border-indigo-500/25 text-indigo-300">
              {role}
            </span>
          </div>

          <p className="text-sm text-slate-400 font-medium">
            {bio}
          </p>

          {/* Location / links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-slate-500 font-semibold pt-1">
            {location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-indigo-400" />
                {location}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Mail className="h-4 w-4 text-indigo-400" />
              {email}
            </span>
            {phone && (
              <span className="flex items-center gap-1">
                <Phone className="h-4 w-4 text-indigo-400" />
                {phone}
              </span>
            )}
            {website && (
              <a href={website} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-indigo-400 hover:underline">
                <Globe className="h-4 w-4 text-indigo-400" />
                Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
