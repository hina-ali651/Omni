'use client';

import { motion } from 'framer-motion';
import { OmniResponse, WidgetData } from '@/types/dashboard';
import MarkdownWidget from '../widgets/MarkdownWidget';
import ChartWidget from '../widgets/ChartWidget';
import MetricsWidget from '../widgets/MetricsWidget';
import { Share2, Clock, ShieldCheck } from 'lucide-react';

interface DashboardProps {
  data: OmniResponse;
}

export default function Dashboard({ data }: DashboardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 pb-20"
    >
      {/* Dashboard Top Metrics */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 glass-panel p-6 rounded-2xl border-l-4 border-l-sky-500">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] tracking-[0.2em] font-bold text-slate-500 uppercase">Intelligence Briefing</span>
          </div>
          <p className="text-xl text-slate-200 leading-relaxed font-medium">
            {data.summary}
          </p>
        </div>
        <div className="flex gap-4">
          <button className="p-3 glass-card rounded-xl hover:text-sky-400"><Share2 className="w-5 h-5" /></button>
          <div className="p-3 glass-card rounded-xl flex items-center gap-2 text-slate-400">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-mono">Real-time</span>
          </div>
        </div>
      </div>

      {/* Dynamic Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.widgets.map((widget, index) => (
          <motion.div
            key={widget.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${widget.width === 'full' ? 'md:col-span-2' : 'col-span-1'}`}
          >
            {renderWidget(widget)}
          </motion.div>
        ))}
      </div>

      {/* Sources Footer */}
      <div className="mt-12 glass-panel p-8 rounded-2xl">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Verified Intelligence Sources</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.sources.map((source, i) => (
            <a 
              key={i} 
              href={source.url} 
              target="_blank" 
              className="glass-card p-4 rounded-xl flex items-center justify-between hover:scale-[1.02] transition-transform"
            >
              <span className="text-slate-300 font-medium truncate">{source.title}</span>
              <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${source.relevance === 'High' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                {source.relevance}
              </span>
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function renderWidget(widget: WidgetData) {
  switch (widget.type) {
    case 'markdown':
      return <MarkdownWidget title={widget.title} data={widget.data} />;
    case 'chart':
      return <ChartWidget title={widget.title} data={widget.data} />;
    case 'metrics':
      return <MetricsWidget title={widget.title} data={widget.data} />;
    default:
      return null;
  }
}
