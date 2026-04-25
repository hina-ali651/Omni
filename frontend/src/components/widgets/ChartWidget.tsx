'use client';

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface ChartWidgetProps {
  title: string;
  data: {
    labels: string[];
    datasets: { label: string; data: number[] }[];
  };
}

export default function ChartWidget({ title, data }: ChartWidgetProps) {
  // Transfering basic labels/data format to recharts format
  const chartData = data.labels.map((label, index) => {
    const obj: any = { name: label };
    data.datasets.forEach(dataset => {
      obj[dataset.label] = dataset.data[index];
    });
    return obj;
  });

  return (
    <div className="glass-panel p-6 rounded-2xl h-[400px] flex flex-col">
      <h3 className="text-slate-400 font-bold text-sm uppercase tracking-widest mb-6">{title}</h3>
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#475569" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              dy={10}
            />
            <YAxis 
              stroke="#475569" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(v) => `${v}`}
            />
            <Tooltip 
              contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
              itemStyle={{ color: '#38bdf8' }}
            />
            {data.datasets.map((ds, i) => (
              <Area 
                key={i}
                type="monotone" 
                dataKey={ds.label} 
                stroke="#38bdf8" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
