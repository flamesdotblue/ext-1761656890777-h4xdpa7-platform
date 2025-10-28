import { useState } from 'react';
import { Dumbbell, Trash2 } from 'lucide-react';

export default function ExerciseTracker({ items, onAdd, onRemove }) {
  const [form, setForm] = useState({ name: '', duration: '', caloriesBurned: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) return;
    const entry = {
      id: crypto.randomUUID(),
      name: form.name.trim(),
      duration: Number(form.duration) || 0,
      caloriesBurned: Number(form.caloriesBurned) || 0,
      createdAt: Date.now(),
    };
    onAdd(entry);
    setForm({ name: '', duration: '', caloriesBurned: '' });
  };

  const totals = items.reduce(
    (acc, it) => {
      acc.duration += it.duration;
      acc.caloriesBurned += it.caloriesBurned;
      return acc;
    },
    { duration: 0, caloriesBurned: 0 }
  );

  return (
    <section className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-sky-50 text-sky-600">
          <Dumbbell className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-semibold">Exercise Tracker</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Exercise name" className="md:col-span-2 rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400" />
        <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duration (min)" type="number" className="rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400" />
        <input name="caloriesBurned" value={form.caloriesBurned} onChange={handleChange} placeholder="Calories burned" type="number" className="rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400" />
        <button type="submit" className="rounded-lg bg-sky-400 hover:bg-sky-500 text-white font-medium px-4 py-2 transition">Add</button>
      </form>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
        <Stat label="Sessions" value={`${items.length}`} color="sky" />
        <Stat label="Duration" value={`${totals.duration} min`} color="emerald" />
        <Stat label="Calories Burned" value={`${totals.caloriesBurned} kcal`} color="sky" />
      </div>

      <ul className="mt-6 space-y-2 max-h-60 overflow-auto pr-1">
        {items.map((it) => (
          <li key={it.id} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
            <div className="flex-1">
              <p className="font-medium">{it.name}</p>
              <p className="text-xs text-slate-500">{it.duration} min • {it.caloriesBurned} kcal</p>
            </div>
            <button onClick={() => onRemove(it.id)} className="p-2 rounded-md text-slate-500 hover:text-red-600 hover:bg-red-50">
              <Trash2 className="w-4 h-4" />
            </button>
          </li>
        ))}
        {items.length === 0 && (
          <li className="text-sm text-slate-500">No exercises logged yet. Add your first activity above.</li>
        )}
      </ul>
    </section>
  );
}

function Stat({ label, value, color = 'sky' }) {
  const colors = color === 'emerald'
    ? 'bg-emerald-50 text-emerald-700 ring-emerald-100'
    : 'bg-sky-50 text-sky-700 ring-sky-100';
  return (
    <div className={`rounded-lg ${colors} ring-1 p-3`}>
      <p className="text-xs">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
