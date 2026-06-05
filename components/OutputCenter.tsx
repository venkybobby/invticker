'use client';

import { useState } from 'react';
import { useForgeStore } from '@/lib/store';
import { Copy, Play } from 'lucide-react';
import { toast } from 'sonner';

const ANALYSIS_TYPES = [
  "Goldman Sachs DCF Valuation Model",
  "Morgan Stanley Three-Statement Model",
  "JPMorgan M&A Accretion Dilution",
  "KKR LBO Model",
  "Citi Comparable Company Analysis",
];

export function OutputCenter() {
  const { profile, holdings, modelingData } = useForgeStore();
  const [selectedAnalysis, setSelectedAnalysis] = useState(ANALYSIS_TYPES[0]);
  const [output, setOutput] = useState('');
  const [useLiveBackend, setUseLiveBackend] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const holdingsSummary = holdings.map(h => `${h.ticker}: ${h.allocation}% (~$${h.value.toLocaleString()})`).join('\n');

  const generateAnalysis = async () => {
    setIsLoading(true);

    if (!useLiveBackend) {
      // Static mode (original behavior)
      const staticPrompt = `You are performing ${selectedAnalysis} for ${profile.primaryTicker}...`;
      setOutput(staticPrompt);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: {
            age: profile.age,
            total_portfolio_value: profile.totalPortfolioValue,
            risk_tolerance: profile.riskTolerance,
            time_horizon: profile.timeHorizon,
            primary_ticker: profile.primaryTicker,
            current_position: profile.currentPosition,
            directional_view: profile.directionalView,
            concerns: profile.concerns,
          },
          ticker: profile.primaryTicker || modelingData.companyName,
          analysis_type: selectedAnalysis,
          additional_context: profile.concerns,
        })
      });

      const result = await response.json();

      if (result.status === 'success') {
        setOutput(result.prompt);
        toast.success('Live analysis generated with real market data!');
      } else {
        toast.error('Backend error: ' + result.detail);
      }
    } catch (error) {
      toast.error('Could not connect to backend. Is it running on port 8000?');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-semibold tracking-tighter">Output Center</h1>
        <p className="text-slate-400">B + C Ready — Live backend integration active</p>
      </div>

      <div className="finance-card mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-x-3">
            <label className="flex items-center gap-x-2 text-sm cursor-pointer">
              <input 
                type="checkbox" 
                checked={useLiveBackend} 
                onChange={(e) => setUseLiveBackend(e.target.checked)}
                className="accent-blue-500 w-4 h-4" 
              />
              <span className="font-medium">Use Live Backend + Real Market Data</span>
            </label>
          </div>

          <button 
            onClick={generateAnalysis} 
            disabled={isLoading}
            className="flex items-center gap-x-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 rounded-3xl font-bold text-lg transition-all"
          >
            <Play className="w-5 h-5" />
            {isLoading ? 'GENERATING...' : 'GENERATE ANALYSIS'}
          </button>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-400 tracking-wider">ANALYSIS TYPE</label>
          <select value={selectedAnalysis} onChange={(e) => setSelectedAnalysis(e.target.value)} className="metric-input w-full mt-2">
            {ANALYSIS_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
      </div>

      <div className="finance-card">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-bold text-slate-400">GENERATED PROMPT / ANALYSIS</div>
          {output && <button onClick={copyToClipboard} className="flex items-center gap-x-2 text-xs px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-2xl border border-slate-700"><Copy className="w-3.5 h-3.5" /> COPY</button>}
        </div>

        <textarea 
          value={output} 
          onChange={(e) => setOutput(e.target.value)}
          placeholder="Toggle 'Use Live Backend' and click Generate Analysis..."
          className="w-full h-[420px] bg-slate-950 border border-slate-700 rounded-3xl p-6 font-mono text-xs leading-relaxed resize-y focus:border-blue-500" 
        />
      </div>
    </div>
  );
}
