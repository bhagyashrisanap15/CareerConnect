import React, { useState } from 'react';
import { GraduationCap, Plus, Trash2, Calendar, Award } from 'lucide-react';

export default function EducationForm({ initialEducation = [], onEducationChange }) {
  const [eduList, setEduList] = useState(initialEducation.length > 0 ? initialEducation : [
    { school: 'University of California, Berkeley', degree: 'B.S. Computer Science', startYear: '2019', endYear: '2023' }
  ]);

  const handleChange = (index, field, value) => {
    const nextList = [...eduList];
    nextList[index][field] = value;
    setEduList(nextList);
    if (onEducationChange) onEducationChange(nextList);
  };

  const handleAdd = () => {
    const nextList = [...eduList, { school: '', degree: '', startYear: '', endYear: '' }];
    setEduList(nextList);
    if (onEducationChange) onEducationChange(nextList);
  };

  const handleRemove = (index) => {
    const nextList = eduList.filter((_, i) => i !== index);
    setEduList(nextList);
    if (onEducationChange) onEducationChange(nextList);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 text-slate-350 shadow-xl">
      <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
        <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-indigo-400" />
          <span>Education History</span>
        </h3>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-semibold bg-indigo-500/10 border border-indigo-500/25 px-3 py-1.5 rounded-lg hover:scale-[1.01] transition-all"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Education
        </button>
      </div>

      <div className="space-y-6">
        {eduList.length === 0 ? (
          <p className="text-xs text-slate-500 italic">No education entries added yet. Click "Add Education" to begin.</p>
        ) : (
          eduList.map((edu, index) => (
            <div key={index} className="relative bg-slate-950/40 border border-slate-800 rounded-2xl p-5 space-y-4 animate-in fade-in-50 duration-150">
              
              {/* Delete button */}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-4 right-4 p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all"
                title="Remove entry"
              >
                <Trash2 className="h-4.5 w-4.5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* School */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Institution / School</label>
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) => handleChange(index, 'school', e.target.value)}
                    placeholder="e.g. Stanford University"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-2 px-3 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-650"
                  />
                </div>

                {/* Degree */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Degree / Certification</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleChange(index, 'degree', e.target.value)}
                    placeholder="e.g. B.S. Computer Science"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-2 px-3 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-650"
                  />
                </div>

                {/* Start Year */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Start Year</label>
                  <input
                    type="text"
                    value={edu.startYear}
                    onChange={(e) => handleChange(index, 'startYear', e.target.value)}
                    placeholder="e.g. 2019"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-2 px-3 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-655"
                  />
                </div>

                {/* End Year */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">End Year (or Expected)</label>
                  <input
                    type="text"
                    value={edu.endYear}
                    onChange={(e) => handleChange(index, 'endYear', e.target.value)}
                    placeholder="e.g. 2023"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/50 rounded-xl py-2 px-3 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-655"
                  />
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
