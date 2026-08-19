interface MarkdownWidgetProps {
  title: string;
  data: string | { content?: string };
}

export default function MarkdownWidget({ title, data }: MarkdownWidgetProps) {
  const content =
    typeof data === 'string'
      ? data
      : data !== null && typeof data === 'object' && 'content' in data
        ? data.content
        : JSON.stringify(data);

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
