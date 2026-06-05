'use client';

import { ProfileData } from '@/lib/types';

interface ProfileSectionProps {
  profile: ProfileData;
  setProfile: (profile: ProfileData) => void;
}

export function ProfileSection({ profile, setProfile }: ProfileSectionProps) {
  const updateField = (field: keyof ProfileData, value: any) => {
    setProfile({ ...profile, [field]: value });
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-semibold tracking-tighter">Personal Investment Profile</h1>
        <p className="text-slate-400 mt-2">This data powers every institutional analysis across all 15 models.</p>
      </div>

      <div className="finance-card grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2 tracking-wider">YOUR AGE</label>
          <input type="number" value={profile.age} onChange={(e) => updateField('age', parseInt(e.target.value))} className="metric-input w-full text-2xl font-semibold" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2 tracking-wider">TOTAL PORTFOLIO VALUE</label>
          <div className="relative">
            <div className="absolute left-4 top-3.5 text-slate-400">$</div>
            <input type="number" value={profile.totalPortfolioValue} onChange={(e) => updateField('totalPortfolioValue', parseInt(e.target.value))} className="metric-input w-full pl-8 text-2xl font-semibold" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2 tracking-wider">RISK TOLERANCE</label>
          <select value={profile.riskTolerance} onChange={(e) => updateField('riskTolerance', e.target.value)} className="metric-input w-full text-lg">
            <option value="Conservative">Conservative</option>
            <option value="Moderate">Moderate</option>
            <option value="Balanced">Balanced</option>
            <option value="Growth">Growth-oriented</option>
            <option value="Aggressive">Aggressive</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2 tracking-wider">TIME HORIZON</label>
          <select value={profile.timeHorizon} onChange={(e) => updateField('timeHorizon', e.target.value)} className="metric-input w-full text-lg">
            <option value="1-3 years">1-3 years</option>
            <option value="3-5 years">3-5 years</option>
            <option value="5-10 years">5-10 years</option>
            <option value="10+ years">10+ years</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-400 mb-2 tracking-wider">PRIMARY TICKER OF INTEREST</label>
          <input type="text" value={profile.primaryTicker} onChange={(e) => updateField('primaryTicker', e.target.value.toUpperCase())} className="metric-input w-full text-3xl font-mono font-bold tracking-wider" placeholder="NVDA" />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2 tracking-wider">CURRENT POSITION</label>
          <select value={profile.currentPosition} onChange={(e) => updateField('currentPosition', e.target.value)} className="metric-input w-full">
            <option value="LONG">LONG</option>
            <option value="SHORT">SHORT</option>
            <option value="WATCHING">WATCHING</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2 tracking-wider">DIRECTIONAL VIEW</label>
          <select value={profile.directionalView} onChange={(e) => updateField('directionalView', e.target.value)} className="metric-input w-full">
            <option value="BULLISH">BULLISH</option>
            <option value="BEARISH">BEARISH</option>
            <option value="NEUTRAL">NEUTRAL</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-400 mb-2 tracking-wider">SPECIFIC CONCERNS / QUESTIONS</label>
          <textarea value={profile.concerns} onChange={(e) => updateField('concerns', e.target.value)} rows={4} className="metric-input w-full resize-y" placeholder="e.g. Concerned about AI capex sustainability and China exposure..." />
        </div>
      </div>
    </div>
  );
}
