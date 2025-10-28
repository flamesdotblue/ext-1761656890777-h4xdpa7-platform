import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full" style={{ height: '70vh' }}>
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/2fSS9b44gtYBt4RI/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-transparent pointer-events-none" />

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl text-white space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 text-emerald-200 px-3 py-1 text-xs font-medium ring-1 ring-emerald-400/40">
            <Rocket className="w-4 h-4" />
            Your wellness, accelerated
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Track nutrition, workouts, and goals in one place
          </h1>
          <p className="text-slate-200/90 text-lg">
            A vibrant health and fitness tracker to help you log meals, monitor macros, record exercises, set personalized goals, and visualize progress.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#track" className="inline-flex items-center justify-center rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 font-medium transition">
              Start Tracking
            </a>
            <a href="#goals" className="inline-flex items-center justify-center rounded-lg bg-sky-400/20 hover:bg-sky-400/30 text-sky-100 ring-1 ring-sky-300/40 px-5 py-3 font-medium transition">
              Set Goals
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
