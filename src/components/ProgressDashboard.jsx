import { BarChart3 } from 'lucide-react';

export default function ProgressDashboard({ totals, goals }) {
  const deficit = goals.dailyCalories ? goals.dailyCalories - totals.netCalories : 0;
  const macroRatio = (() => {
    const sum = totals.protein + totals.carbs + totals.fat;
    if (!sum) return { p: 0, c: 0, f: 0 };
    return {
      p: Math.round((totals.protein / sum) * 100),
      c: Math.round((totals.carbs / sum) * 100),
      f: Math.round((totals.fat / sum) * 100),
    };
  })();

  return (
    <section className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-50 to-sky-50 text-emerald-600">
          <BarChart3 className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-semibold">Today's Progress</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Calories (Net)" value={`${totals.netCalories} kcal`} subtitle={`Goal ${goals.dailyCalories}`} accent="emerald" />
        <Card title="Burned" value={`${totals.burned} kcal`} subtitle="From exercise" accent="sky" />
        <Card title="Deficit" value={`${deficit} kcal`} subtitle="Goal - Net" accent="emerald" />
        <div className="rounded-xl ring-1 ring-slate-200 p-4">
          <p className="text-sm text-slate-500">Macro Ratios</p>
          <div className="mt-2 h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
            <div className="bg-emerald-500" style={{ width: `${macroRatio.p}%` }} title={`Protein ${macroRatio.p}%`} />
            <div className="bg-sky-400" style={{ width: `${macroRatio.c}%` }} title={`Carbs ${macroRatio.c}%`} />
            <div className="bg-emerald-300" style={{ width: `${macroRatio.f}%` }} title={`Fat ${macroRatio.f}%`} />
          </div>
          <div className="mt-2 flex justify-between text-xs text-slate-600">
            <span>P {macroRatio.p}%</span>
            <span>C {macroRatio.c}%</span>
            <span>F {macroRatio.f}%</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ title, value, subtitle, accent = 'emerald' }) {
  const dot = accent === 'emerald' ? 'bg-emerald-500' : 'bg-sky-400';
  return (
    <div className="rounded-xl ring-1 ring-slate-200 p-4">
      <div className="flex items-center gap-2 text-slate-500 text-sm">
        <span className={`w-2 h-2 rounded-full ${dot}`}></span>
        {title}
      </div>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
      <p className="text-xs text-slate-500">{subtitle}</p>
    </div>
  );
}
