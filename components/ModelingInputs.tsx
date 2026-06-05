'use client';

import { useForgeStore } from '@/lib/store';

export function ModelingInputs() {
  const { modelingData, setModelingData } = useForgeStore();

  const update = (field: string, value: string) => {
    setModelingData({ [field]: value });
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-semibold tracking-tighter">Financial Modeling Inputs</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="finance-card space-y-5">
          <div>
            <label className="text-xs font-bold text-orange-300 tracking-wider">COMPANY NAME</label>
            <input value={modelingData.companyName} onChange={(e) => update('companyName', e.target.value)} className="metric-input w-full text-2xl font-semibold mt-1.5" />
          </div>
          <div>
            <label className="text-xs font-bold text-orange-300 tracking-wider">INDUSTRY</label>
            <input value={modelingData.industry} onChange={(e) => update('industry', e.target.value)} className="metric-input w-full mt-1.5" />
          </div>
          <div>
            <label className="text-xs font-bold text-orange-300 tracking-wider">KEY FINANCIALS</label>
            <textarea value={modelingData.financials} onChange={(e) => update('financials', e.target.value)} rows={3} className="metric-input w-full mt-1.5 text-sm" />
          </div>
        </div>

        <div className="finance-card space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-orange-300 tracking-wider">BASE REVENUE CAGR</label>
              <input value={modelingData.revGrowth} onChange={(e) => update('revGrowth', e.target.value)} className="metric-input w-full mt-1.5 font-mono" />
            </div>
            <div>
              <label className="text-xs font-bold text-orange-300 tracking-wider">WACC</label>
              <input value={modelingData.wacc} onChange={(e) => update('wacc', e.target.value)} className="metric-input w-full mt-1.5 font-mono" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
