import { useState } from 'react';
import { Apple, Trash2 } from 'lucide-react';

export default function FoodLogger({ items, onAdd, onRemove }) {
  const [form, setForm] = useState({ name: '', calories: '', protein: '', carbs: '', fat: '' });

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
      calories: Number(form.calories) || 0,
      protein: Number(form.protein) || 0,
      carbs: Number(form.carbs) || 0,
      fat: Number(form.fat) || 0,
      createdAt: Date.now(),
    };
    onAdd(entry);
    setForm({ name: '', calories: '', protein: '', carbs: '', fat: '' });
  };

  const totals = items.reduce(
    (acc, f) => {
      acc.calories += f.calories;
      acc.protein += f.protein;
      acc.carbs += f.carbs;
      acc.fat += f.fat;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return (
    <section id="track" className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
          <Apple className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-semibold">Daily Food Log</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-6 gap-3">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Food name" className="md:col-span-2 rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
        <input name="calories" value={form.calories} onChange={handleChange} placeholder="Calories" type="number" className="rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
        <input name="protein" value={form.protein} onChange={handleChange} placeholder="Protein (g)" type="number" className="rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
        <input name="carbs" value={form.carbs} onChange={handleChange} placeholder="Carbs (g)" type="number" className="rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
        <input name="fat" value={form.fat} onChange={handleChange} placeholder="Fat (g)" type="number" className="rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
        <button type="submit" className="rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-2 transition">Add</button>
      </form>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
        <Stat label="Calories" value={`${totals.calories} kcal`} color="emerald" />
        <Stat label="Protein" value={`${totals.protein} g`} color="sky" />
        <Stat label="Carbs" value={`${totals.carbs} g`} color="sky" />
        <Stat label="Fat" value={`${totals.fat} g`} color="emerald" />
        <Stat label="Items" value={`${items.length}`} color="emerald" />
      </div>

      <ul className="mt-6 space-y-2 max-h-60 overflow-auto pr-1">
        {items.map((f) => (
          <li key={f.id} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
            <div className="flex-1">
              <p className="font-medium">{f.name}</p>
              <p className="text-xs text-slate-500">{f.calories} kcal • P {f.protein}g • C {f.carbs}g • F {f.fat}g</p>
            </div>
            <button onClick={() => onRemove(f.id)} className="p-2 rounded-md text-slate-500 hover:text-red-600 hover:bg-red-50">
              <Trash2 className="w-4 h-4" />
            </button>
          </li>
        ))}
        {items.length === 0 && (
          <li className="text-sm text-slate-500">No foods logged yet. Add your first meal above.</li>
        )}
      </ul>
    </section>
  );
}

function Stat({ label, value, color = 'emerald' }) {
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
