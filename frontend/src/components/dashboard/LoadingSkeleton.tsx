export default function LoadingSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
      {/* Summary Bone */}
      <div className="h-24 glass-panel rounded-2xl w-full" />
      
      {/* Grid Bones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-64 glass-panel rounded-2xl" />
        <div className="h-64 glass-panel rounded-2xl" />
        <div className="h-80 md:col-span-2 glass-panel rounded-2xl" />
      </div>

      {/* Footer Bones */}
      <div className="h-40 glass-panel rounded-2xl w-full" />
    </div>
  );
}
