'use client';

import { User, Briefcase, Calculator, Zap } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: 'profile' | 'portfolio' | 'modeling' | 'output') => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const navItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'modeling', label: 'Modeling Inputs', icon: Calculator },
    { id: 'output', label: 'Output Center', icon: Zap },
  ];

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center">
            <span className="font-bold text-white text-2xl tracking-tighter">F</span>
          </div>
          <div>
            <div className="font-display text-2xl font-semibold tracking-tighter">Forge</div>
            <div className="text-[10px] text-blue-400 -mt-1">INSTITUTIONAL DESK</div>
          </div>
        </div>
      </div>

      <div className="p-3 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id as any)}
              className={`w-full flex items-center gap-x-3 px-4 py-3 rounded-2xl mb-1 text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'hover:bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
        Week 1 • Dashboard Foundation
      </div>
    </div>
  );
}
