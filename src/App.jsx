import { useEffect, useMemo, useState } from 'react';
import Hero from './components/Hero';
import FoodLogger from './components/FoodLogger';
import ExerciseTracker from './components/ExerciseTracker';
import GoalsPanel from './components/GoalsPanel';
import ProgressDashboard from './components/ProgressDashboard';

export default function App() {
  const [foods, setFoods] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [goals, setGoals] = useState({
    targetWeight: 70,
    dailyCalories: 2200,
    protein: 140,
    carbs: 250,
    fat: 70,
  });

  useEffect(() => {
    const savedFoods = localStorage.getItem('foods');
    const savedExercises = localStorage.getItem('exercises');
    const savedGoals = localStorage.getItem('goals');
    if (savedFoods) setFoods(JSON.parse(savedFoods));
    if (savedExercises) setExercises(JSON.parse(savedExercises));
    if (savedGoals) setGoals(JSON.parse(savedGoals));
  }, []);

  useEffect(() => {
    localStorage.setItem('foods', JSON.stringify(foods));
  }, [foods]);

  useEffect(() => {
    localStorage.setItem('exercises', JSON.stringify(exercises));
  }, [exercises]);

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  const totals = useMemo(() => {
    const foodTotals = foods.reduce(
      (acc, f) => {
        acc.calories += Number(f.calories) || 0;
        acc.protein += Number(f.protein) || 0;
        acc.carbs += Number(f.carbs) || 0;
        acc.fat += Number(f.fat) || 0;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
    const burned = exercises.reduce((acc, e) => acc + (Number(e.caloriesBurned) || 0), 0);
    const netCalories = foodTotals.calories - burned;
    return { ...foodTotals, burned, netCalories };
  }, [foods, exercises]);

  const addFood = (entry) => setFoods((prev) => [entry, ...prev]);
  const removeFood = (id) => setFoods((prev) => prev.filter((f) => f.id !== id));
  const addExercise = (entry) => setExercises((prev) => [entry, ...prev]);
  const removeExercise = (id) => setExercises((prev) => prev.filter((e) => e.id !== id));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Hero />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ProgressDashboard totals={totals} goals={goals} />
            <FoodLogger onAdd={addFood} onRemove={removeFood} items={foods} />
            <ExerciseTracker onAdd={addExercise} onRemove={removeExercise} items={exercises} />
          </div>
          <div className="lg:col-span-1">
            <GoalsPanel goals={goals} setGoals={setGoals} totals={totals} />
          </div>
        </div>
      </main>

      <footer className="mt-16 py-10 text-center text-sm text-slate-500">
        Built for a healthier you. Stay consistent.
      </footer>
    </div>
  );
}
