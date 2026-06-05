'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ProfileSection } from '@/components/ProfileSection';
import { PortfolioTable } from '@/components/PortfolioTable';
import { ModelingInputs } from '@/components/ModelingInputs';
import { OutputCenter } from '@/components/OutputCenter';

export default function ForgeDashboard() {
  const [activeSection, setActiveSection] = useState<'profile' | 'portfolio' | 'modeling' | 'output'>('profile');

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-14 border-b border-slate-800 px-8 flex items-center bg-slate-900/60">
          <div className="font-display text-2xl font-semibold tracking-tighter">Forge</div>
          <div className="ml-auto text-xs px-3 py-1 bg-slate-800 rounded-full border border-slate-700">B+C Ready</div>
        </div>

        <div className="flex-1 overflow-auto p-8">
          {activeSection === 'profile' && <ProfileSection />}
          {activeSection === 'portfolio' && <PortfolioTable />}
          {activeSection === 'modeling' && <ModelingInputs />}
          {activeSection === 'output' && <OutputCenter />}
        </div>
      </div>
    </div>
  );
}
