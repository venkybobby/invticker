'use client';

import { useState } from 'react';
import { ProfileData, Holding, ModelingData } from '@/lib/types';
import { Copy, Play } from 'lucide-react';
import { toast } from 'sonner';

interface OutputCenterProps {
  profile: ProfileData;
  holdings: Holding[];
  modelingData: ModelingData;
}

const ANALYSIS_TYPES = [
  "Goldman Sachs DCF Valuation Model",
  "Morgan Stanley Three-Statement Model",
  "JPMorgan M&A Accretion Dilution",
  "KKR LBO Model",
  "Citi Comparable Company Analysis",
  "Goldman Sachs Fundamental Analysis Screener",
  "Bridgewater Risk Assessment Framework",
  "Two Sigma Macro Market Outlook",
];

export function OutputCenter({ profile, holdings, modelingData }: OutputCenterProps) {
  const [selectedAnalysis, setSelectedAnalysis] = useState(ANALYSIS_TYPES[0]);
  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const holdingsSummary = holdings.map(h => `${h.ticker}: ${h.allocation}% (~$${h.value.toLocaleString()}) ${h.notes ? '— ' + h.notes : ''}`).join('\n');

  const generatePrompt = () => {
    setIsGenerating(true);

    const prompt = `You are a senior institutional analyst. Perform a ${selectedAnalysis} for ${profile.primaryTicker || modelingData.companyName}.

**Investor Profile**
- Age: ${profile.age}
- Portfolio Value: $${profile.totalPortfolioValue.toLocaleString()}
- Risk Tolerance: ${profile.riskTolerance}
- Time Horizon: ${profile.timeHorizon}
- Current Position: ${profile.currentPosition} | View: ${profile.directionalView}

**Holdings Context**
${holdingsSummary || 'No detailed holdings provided.'}

**Company / Target**
${modelingData.companyName} (${modelingData.industry})
Financial Snapshot: ${modelingData.financials}
Base Assumptions: Revenue CAGR ${modelingData.revGrowth} | WACC ${modelingData.wacc}

**Specific Concerns**
${profile.concerns || 'Perform balanced institutional analysis with bull/base/bear cases.'}

Please provide a complete, professional analysis in the exact format expected for this model type.`;

    setTimeout(() => {
      setOutput(prompt);
      setIsGenerating(false);
      toast.success('Prompt generated. Ready for LLM or backend call.');
    }, 600);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-semibold tracking-tighter">Output Center</h1>
        <p className="text-slate-400">Generate institutional-grade prompts ready for LLM or live backend.</p>
      </div>

      <div className="finance-card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="text-xs font-bold text-slate-400 tracking-wider">SELECT ANALYSIS TYPE</label>
            <select value={selectedAnalysis} onChange={(e) => setSelectedAnalysis(e.target.value)} className="metric-input w-full mt-2 text-base">
              {ANALYSIS_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          
          <div className="flex items-end">
            <button onClick={generatePrompt} disabled={isGenerating} className="flex items-center gap-x-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 rounded-3xl font-bold text-lg transition-all active:scale-[0.985]">
              <Play className="w-5 h-5" />
              {isGenerating ? 'GENERATING...' : 'GENERATE PROMPT'}
            </button>
          </div>
        </div>
      </div>

      <div className="finance-card">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-bold text-slate-400">GENERATED PROMPT / ANALYSIS</div>
          {output && <button onClick={copyToClipboard} className="flex items-center gap-x-2 text-xs px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-2xl border border-slate-700"><Copy className="w-3.5 h-3.5" /> COPY</button>}
        </div>

        <textarea value={output} onChange={(e) => setOutput(e.target.value)} placeholder="Click 'GENERATE PROMPT' above to create a fully personalized institutional prompt..." className="w-full h-[420px] bg-slate-950 border border-slate-700 rounded-3xl p-6 font-mono text-xs leading-relaxed resize-y focus:border-blue-500" />
      </div>
    </div>
  );
}
