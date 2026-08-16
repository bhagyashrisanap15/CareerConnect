import React, { useState } from 'react';
import { Plus, X, Award } from 'lucide-react';

export default function SkillsInput({ initialSkills = [], onSkillsChange }) {
  const [skills, setSkills] = useState(initialSkills);
  const [input, setInput] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    const cleanInput = input.trim();
    if (cleanInput && !skills.includes(cleanInput)) {
      const nextSkills = [...skills, cleanInput];
      setSkills(nextSkills);
      setInput('');
      if (onSkillsChange) onSkillsChange(nextSkills);
    }
  };

  const handleRemove = (skillToRemove) => {
    const nextSkills = skills.filter((s) => s !== skillToRemove);
    setSkills(nextSkills);
    if (onSkillsChange) onSkillsChange(nextSkills);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-5 text-slate-350 shadow-xl">
      <div>
        <h3 className="text-lg font-bold text-white tracking-wide border-b border-slate-800 pb-2.5 flex items-center gap-2">
          <Award className="h-5 w-5 text-indigo-400" />
          <span>Professional Skills</span>
        </h3>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          Add languages, frameworks, libraries, or methodologies that represent your engineering experience.
        </p>
      </div>

      {/* Input controls */}
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. React, Kubernetes, Tailwind..."
          className="flex-1 bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-2.5 px-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-650"
        />
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all hover:scale-[1.02] shadow-lg hover:shadow-indigo-500/10 flex items-center gap-1 shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Add</span>
        </button>
      </form>

      {/* Skills Badges Container */}
      <div className="flex flex-wrap gap-2 pt-2 min-h-[40px] items-center">
        {skills.length === 0 ? (
          <span className="text-xs text-slate-600 italic">No skills added yet.</span>
        ) : (
          skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold animate-in zoom-in-95 duration-100"
            >
              {skill}
              <button
                type="button"
                onClick={() => handleRemove(skill)}
                className="hover:bg-indigo-500/20 rounded-full p-0.5 text-indigo-400 hover:text-white transition-colors"
                title={`Remove ${skill}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))
        )}
      </div>
    </div>
  );
}
