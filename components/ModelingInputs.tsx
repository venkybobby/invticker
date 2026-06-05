'use client';

import { ModelingData } from '@/lib/types';

interface ModelingInputsProps {
  data: ModelingData;
  setData: (data: ModelingData) => void;
}

export function ModelingInputs({ data, setData }: ModelingInputsProps) {
  const update = (field: keyof ModelingData, value: string) => {
    setData({ ...data, [field]: value });
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <div className="flex items-center gap-x-3">
          <div className="px-3 py-1 text-xs font-bold bg-orange-900/60 text-orange-300 rounded-2xl">GOLDMAN • KKR • JPM • CITI</div>
        </div>
        <h1 className="font-display text-4xl font-semibold tracking-tighter mt-2">Financial Modeling Inputs</h1>
        <p className="text-slate-400">Powers DCF, LBO, M&A Accretion, Three-Statement, and Comps models.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="finance-card space-y-5">
          <div>
            <label className="text-xs font-bold text-orange-300 tracking-wider">COMPANY / TARGET NAME</label>
            <input value={data.companyName} onChange={(e) => update('companyName', e.target.value)} className="metric-input w-full text-2xl font-semibold mt-1.5" />
          </div>
          <div>
            <label className="text-xs font-bold text-orange-300 tracking-wider">INDUSTRY / SECTOR</label>
            <input value={data.industry} onChange={(e) => update('industry', e.target.value)} className="metric-input w-full mt-1.5" />
          </div>
          <div>
            <label className="text-xs font-bold text-orange-300 tracking-wider">KEY CURRENT FINANCIALS</label>
            <textarea value={data.financials} onChange={(e) => update('financials', e.target.value)} rows={3} className="metric-input w-full mt-1.5 text-sm" />
          </div>
        </div>

        <div className="finance-card space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-orange-300 tracking-wider">BASE REVENUE CAGR</label>
              <input value={data.revGrowth} onChange={(e) => update('revGrowth', e.target.value)} className="metric-input w-full mt-1.5 font-mono" />
            </div>
            <div>
              <label className="text-xs font-bold text-orange-300 tracking-wider">WACC / DISCOUNT RATE</label>
              <input value={data.wacc} onChange={(e) => update('wacc', e.target.value)} className="metric-input w-full mt-1.5 font-mono" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-emerald-400 tracking-wider">BULL CASE CAGR</label>
              <input value={data.bullGrowth || ''} onChange={(e) => update('bullGrowth' as any, e.target.value)} className="metric-input w-full mt-1.5 font-mono border border-emerald-700" placeholder="35%" />
            </div>
            <div>
              <label className="text-xs font-bold text-red-400 tracking-wider">BEAR CASE CAGR</label>
              <input value={data.bearGrowth || ''} onChange={(e) => update('bearGrowth' as any, e.target.value)} className="metric-input w-full mt-1.5 font-mono border border-red-700" placeholder="18%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
