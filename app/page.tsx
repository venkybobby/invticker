'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ProfileSection } from '@/components/ProfileSection';
import { PortfolioTable } from '@/components/PortfolioTable';
import { ModelingInputs } from '@/components/ModelingInputs';
import { OutputCenter } from '@/components/OutputCenter';
import { ProfileData, Holding, ModelingData } from '@/lib/types';

export default function ForgeDashboard() {
  const [activeSection, setActiveSection] = useState<'profile' | 'portfolio' | 'modeling' | 'output'>('profile');

  const [profile, setProfile] = useState<ProfileData>({
    age: 50,
    totalPortfolioValue: 425000,
    riskTolerance: 'Balanced',
    timeHorizon: '5-10 years',
    primaryTicker: 'NVDA',
    currentPosition: 'LONG',
    directionalView: 'BULLISH',
    concerns: '',
  });

  const [holdings, setHoldings] = useState<Holding[]>([
    { id: '1', ticker: 'VOO', allocation: 35, value: 148750, notes: 'Core S&P 500' },
    { id: '2', ticker: 'QQQM', allocation: 18, value: 76500, notes: 'AI growth' },
    { id: '3', ticker: 'NVDA', allocation: 9, value: 38250, notes: 'High conviction' },
  ]);

  const [modelingData, setModelingData] = useState<ModelingData>({
    companyName: 'NVIDIA Corporation',
    industry: 'Semiconductors / AI Infrastructure',
    financials: 'Revenue: $96.3B | EBITDA: $55.2B | FCF: ~$32B',
    revGrowth: '28%',
    wacc: '9.2%',
  });

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-14 border-b border-slate-800 px-8 flex items-center bg-slate-900/60">
          <div className="font-display text-2xl font-semibold tracking-tighter">Forge</div>
          <div className="ml-auto text-xs px-3 py-1 bg-slate-800 rounded-full border border-slate-700">Week 1 • Dashboard Ready</div>
        </div>

        <div className="flex-1 overflow-auto p-8">
          {activeSection === 'profile' && <ProfileSection profile={profile} setProfile={setProfile} />}
          {activeSection === 'portfolio' && <PortfolioTable holdings={holdings} setHoldings={setHoldings} />}
          {activeSection === 'modeling' && <ModelingInputs data={modelingData} setData={setModelingData} />}
          {activeSection === 'output' && <OutputCenter profile={profile} holdings={holdings} modelingData={modelingData} />}
        </div>
      </div>
    </div>
  );
}
