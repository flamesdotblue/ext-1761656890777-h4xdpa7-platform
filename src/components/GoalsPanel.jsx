import { useEffect, useState } from 'react';
import { Target } from 'lucide-react';

export default function GoalsPanel({ goals, setGoals, totals }) {
  const [form, setForm] = useState(goals);

  useEffect(() => {
    setForm(goals);
  }, [goals]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setGoals({
      targetWeight: Number(form.targetWeight) || 0,
      dailyCalories: Number(form.dailyCalories) || 0,
      protein: Number(form.protein) || 0,
      carbs: Number(form.carbs) || 0,
      fat: Number(form.fat) || 0,
    });
  };

  return (
    <aside id="goals" className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-6 sticky top-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
          <Target className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-semibold">Personalized Goals</h2>
      </div>

      <form onSubmit={handleSave} className="space-y-3">
        <NumberInput label="Target Weight (kg)" name="targetWeight" value={form.targetWeight} onChange={handleChange} />
        <NumberInput label="Daily Calories" name="dailyCalories" value={form.dailyCalories} onChange={handleChange} />
        <div className="grid grid-cols-3 gap-3">
          <NumberInput label="Protein (g)" name="protein" value={form.protein} onChange={handleChange} />
          <NumberInput label="Carbs (g)" name="carbs" value={form.carbs} onChange={handleChange} />
          <NumberInput label="Fat (g)" name="fat" value={form.fat} onChange={handleChange} />
        </div>
        <button type="submit" className="w-full rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-2 transition">
          Save Goals
        </button>
      </form>

      <div className="mt-6 space-y-3 text-sm">
        <Progress label="Calories" current={totals.netCalories} target={goals.dailyCalories} color="emerald" />
        <Progress label="Protein" current={totals.protein} target={goals.protein} color="sky" />
        <Progress label="Carbs" current={totals.carbs} target={goals.carbs} color="sky" />
        <Progress label="Fat" current={totals.fat} target={goals.fat} color="emerald" />
      </div>
    </aside>
  );
}

function NumberInput({ label, name, value, onChange }) {
  return (
    <label className="block">
      <span className="text-xs text-slate-600">{label}</span>
      <input type="number" name={name} value={value} onChange={onChange} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
    </label>
  );
}

function Progress({ label, current, target, color = 'emerald' }) {
  const pct = Math.max(0, Math.min(100, target > 0 ? Math.round((current / target) * 100) : 0));
  const bar = color === 'emerald' ? 'bg-emerald-500' : 'bg-sky-400';
  return (
    <div>
      <div className="flex items-center justify-between text-slate-600">
        <span>{label}</span>
        <span>{isFinite(current) ? Math.max(0, Math.round(current)) : 0}/{target}</span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full mt-1 overflow-hidden">
        <div className={`h-full ${bar}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
