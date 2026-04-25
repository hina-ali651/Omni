import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface MetricsWidgetProps {
  title: string;
  data: {
    label: string;
    value: string;
    trend: 'up' | 'down' | 'neutral';
  }[];
}

export default function MetricsWidget({ title, data }: MetricsWidgetProps) {
  return (
    <div className="glass-panel p-6 rounded-2xl h-full">
      <h3 className="text-slate-400 font-bold text-sm uppercase tracking-widest mb-6">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.map((metric, i) => (
          <div key={i} className="glass-card p-4 rounded-xl">
            <p className="text-slate-500 text-xs font-bold uppercase mb-1">{metric.label}</p>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-white">{metric.value}</span>
              {metric.trend === 'up' && <TrendingUp className="w-5 h-5 text-emerald-400" />}
              {metric.trend === 'down' && <TrendingDown className="w-5 h-5 text-rose-400" />}
              {metric.trend === 'neutral' && <Activity className="w-5 h-5 text-sky-400" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
