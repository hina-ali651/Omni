'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, Cpu, Globe, Zap, ArrowLeft } from 'lucide-react';
import { OmniResponse } from '@/types/dashboard';
import Dashboard from '@/components/dashboard/Dashboard';
import LoadingSkeleton from '@/components/dashboard/LoadingSkeleton';
import axios from 'axios';

export default function Home() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<OmniResponse | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/query', { query });
      setData(response.data);
    } catch (error) {
      console.error("Analysis Failed:", error);
      alert("Failed to analyze global nodes. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen p-8 md:p-12">
      <div className="mesh-bg" />
      
      {/* Header Area */}
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sky-500/20 rounded-lg border border-sky-400/30">
            <Cpu className="w-6 h-6 text-sky-400" />
          </div>
          <h1 className="text-2xl font-bold tracking-tighter text-white uppercase">
            Omni<span className="text-sky-400">Sight</span>
          </h1>
        </div>
        
        <div className="flex gap-6 text-sm font-medium text-slate-400">
          <span className="flex items-center gap-2"><Globe className="w-4 h-4" /> Global Intelligence</span>
          <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-500" /> Real-time Nodes</span>
        </div>
      </header>

      {/* Main Command Center */}
      <section className="max-w-4xl mx-auto mt-20">
        <AnimatePresence mode="wait">
          {!data && !loading && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center"
            >
              <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-slate-300 to-sky-400 bg-clip-text text-transparent">
                World Intelligence <br /> on Demand.
              </h2>
              <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto">
                Ask anything about the world context. OmniSight synthesizes real-time data into a customized intelligence dashboard.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSearch} className="relative group max-w-2xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative glass-panel rounded-2xl p-2 flex items-center shadow-2xl">
            <Search className="ml-4 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Query any global niche, trend, or market..."
              className="w-full bg-transparent border-none text-white px-4 py-4 focus:ring-0 placeholder:text-slate-500 text-lg"
            />
            <button 
              type="submit"
              disabled={loading}
              className="bg-white text-black font-bold px-6 py-3 rounded-xl hover:bg-sky-400 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Analyzing
                </>
              ) : (
                'Generate Insights'
              )}
            </button>
          </div>
        </form>
      </section>

      {/* Dynamic Dashboard will be rendered here */}
      {loading && !data && (
        <section className="mt-12">
          <LoadingSkeleton />
        </section>
      )}

      {data && (
        <section className="mt-12 max-w-6xl mx-auto">
          <button 
            onClick={() => setData(null)}
            className="flex items-center gap-2 text-slate-500 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            New Intelligence Query
          </button>
          <Dashboard data={data} />
        </section>
      )}
    </main>
  );
}
