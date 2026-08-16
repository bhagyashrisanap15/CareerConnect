import React, { useState } from 'react';
import { Grid, Plus, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ManageCategories() {
  const [categories, setCategories] = useState([
    { id: 'cat-1', name: 'Software Development', jobsCount: 450 },
    { id: 'cat-2', name: 'Data Science', jobsCount: 180 },
    { id: 'cat-3', name: 'UI/UX Design', jobsCount: 120 },
    { id: 'cat-4', name: 'Marketing', jobsCount: 95 },
    { id: 'cat-5', name: 'Finance', jobsCount: 80 },
    { id: 'cat-6', name: 'HR', jobsCount: 60 }
  ]);

  const [newCatName, setNewCatName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const catNode = {
      id: `cat-${Date.now()}`,
      name: newCatName.trim(),
      jobsCount: 0
    };
    setCategories([...categories, catNode]);
    setNewCatName('');
    setIsAdding(false);
    toast.success('Category created!');
  };

  const handleDelete = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    toast.success('Category removed');
  };

  const handleEdit = (id) => {
    const current = categories.find((c) => c.id === id);
    const updated = prompt('Enter new category name:', current.name);
    if (updated && updated.trim()) {
      setCategories((prev) =>
        prev.map((c) => (c.id === id ? { ...c, name: updated.trim() } : c))
      );
      toast.success('Category updated');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Grid className="w-6 h-6 text-emerald-400" /> Manage Job Categories
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure system domain taxonomy and job search filter categories.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {/* Add Form */}
      {isAdding && (
        <form onSubmit={handleAdd} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex gap-3">
          <input
            type="text"
            required
            placeholder="Category name (e.g. Cybersecurity)..."
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
          />
          <button type="submit" className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl">
            Save
          </button>
        </form>
      )}

      {/* Categories Grid / Table matching exact prompt spec */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between shadow-xl"
          >
            <div>
              <h3 className="font-bold text-white text-base">{cat.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{cat.jobsCount} roles listed</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleEdit(cat.id)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-indigo-300 rounded-lg text-xs font-semibold flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>

              <button
                onClick={() => handleDelete(cat.id)}
                className="p-1.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 rounded-lg text-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
