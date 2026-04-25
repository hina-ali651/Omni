interface MarkdownWidgetProps {
  title: string;
  data: string;
}

export default function MarkdownWidget({ title, data }: MarkdownWidgetProps) {
  const content = typeof data === 'object' && data !== null && 'content' in data 
    ? (data as any).content 
    : typeof data === 'string' ? data : JSON.stringify(data);

  return (
    <div className="glass-panel p-6 rounded-2xl h-full">
      <h3 className="text-slate-400 font-bold text-sm uppercase tracking-widest mb-6">{title}</h3>
      <div className="prose prose-invert max-w-none">
        <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      </div>
    </div>
  );
}
