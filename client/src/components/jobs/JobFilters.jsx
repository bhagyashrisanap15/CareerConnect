import React, { useState } from 'react';
import { Filter, RotateCcw } from 'lucide-react';

export default function JobFilters({ onFilterChange }) {
  const [types, setTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [salaryRange, setSalaryRange] = useState(150000);

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];
  const locationsList = ['San Francisco, CA', 'New York, NY', 'Remote', 'London, UK', 'Berlin, Germany'];

  const handleTypeChange = (type) => {
    const next = types.includes(type) ? types.filter((t) => t !== type) : [...types, type];
    setTypes(next);
    triggerChange(next, locations, salaryRange);
  };

  const handleLocationChange = (loc) => {
    const next = locations.includes(loc) ? locations.filter((l) => l !== loc) : [...locations, loc];
    setLocations(next);
    triggerChange(types, next, salaryRange);
  };

  const handleSalaryChange = (val) => {
    setSalaryRange(val);
    triggerChange(types, locations, val);
  };

  const triggerChange = (t, l, s) => {
    if (onFilterChange) {
      onFilterChange({ types: t, locations: l, maxSalary: s });
    }
  };

  const handleReset = () => {
    setTypes([]);
    setLocations([]);
    setSalaryRange(150000);
    if (onFilterChange) {
      onFilterChange({ types: [], locations: [], maxSalary: 150000 });
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 text-slate-300">
      
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 font-bold text-white text-sm uppercase tracking-wider">
          <Filter className="h-4 w-4 text-indigo-400" />
          <span>Filters</span>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
        >
          <RotateCcw className="h-3 w-3" />
          Reset
        </button>
      </div>

      {/* Job Types */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Job Type</h4>
        <div className="space-y-2">
          {jobTypes.map((type) => (
            <label key={type} className="flex items-center gap-2.5 text-sm cursor-pointer select-none">
              <input
                type="checkbox"
                checked={types.includes(type)}
                onChange={() => handleTypeChange(type)}
                className="w-4 h-4 bg-slate-950 border-slate-800 rounded text-indigo-600 focus:ring-indigo-500/20"
              />
              <span className="text-slate-400 hover:text-slate-300">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Locations */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Location</h4>
        <div className="space-y-2">
          {locationsList.map((loc) => (
            <label key={loc} className="flex items-center gap-2.5 text-sm cursor-pointer select-none">
              <input
                type="checkbox"
                checked={locations.includes(loc)}
                onChange={() => handleLocationChange(loc)}
                className="w-4 h-4 bg-slate-950 border-slate-800 rounded text-indigo-600 focus:ring-indigo-500/20"
              />
              <span className="text-slate-400 hover:text-slate-300">{loc}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Salary Range */}
      <div className="space-y-3 pt-2">
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Max Salary</h4>
          <span className="text-xs font-semibold text-indigo-400">${(salaryRange / 1000).toFixed(0)}k</span>
        </div>
        <input
          type="range"
          min="40000"
          max="200000"
          step="5000"
          value={salaryRange}
          onChange={(e) => handleSalaryChange(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
        <div className="flex justify-between text-[10px] text-slate-500">
          <span>$40k</span>
          <span>$200k</span>
        </div>
      </div>
    </div>
  );
}
