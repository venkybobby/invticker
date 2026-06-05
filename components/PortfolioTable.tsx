'use client';

import { Holding } from '@/lib/types';
import { Plus, Trash2 } from 'lucide-react';

interface PortfolioTableProps {
  holdings: Holding[];
  setHoldings: (holdings: Holding[]) => void;
}

export function PortfolioTable({ holdings, setHoldings }: PortfolioTableProps) {
  const addHolding = () => {
    const newHolding: Holding = {
      id: Date.now().toString(),
      ticker: 'NEW',
      allocation: 5,
      value: 20000,
      notes: '',
    };
    setHoldings([...holdings, newHolding]);
  };

  const updateHolding = (id: string, field: keyof Holding, value: any) => {
    setHoldings(
      holdings.map(h => 
        h.id === id ? { ...h, [field]: field === 'allocation' || field === 'value' ? Number(value) : value } : h
      )
    );
  };

  const removeHolding = (id: string) => {
    setHoldings(holdings.filter(h => h.id !== id));
  };

  const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);
  const totalAllocation = holdings.reduce((sum, h) => sum + h.allocation, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-4xl font-semibold tracking-tighter">Portfolio Holdings</h1>
          <p className="text-slate-400">Live allocation sum: <span className={totalAllocation > 103 || totalAllocation < 97 ? 'text-red-400' : 'text-emerald-400'}>{totalAllocation.toFixed(1)}%</span></p>
        </div>
        <button onClick={addHolding} className="flex items-center gap-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-2xl text-sm font-semibold transition-colors">
          <Plus className="w-4 h-4" /> Add Position
        </button>
      </div>

      <div className="finance-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700 text-xs text-slate-400">
              <th className="text-left py-4 px-6 font-medium">TICKER</th>
              <th className="text-right py-4 px-6 font-medium">ALLOCATION %</th>
              <th className="text-right py-4 px-6 font-medium">VALUE ($)</th>
              <th className="text-left py-4 px-6 font-medium">NOTES / THESIS</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {holdings.map((holding) => (
              <tr key={holding.id} className="group">
                <td className="px-6 py-4">
                  <input value={holding.ticker} onChange={(e) => updateHolding(holding.id, 'ticker', e.target.value.toUpperCase())} className="table-input w-24 font-mono font-bold" />
                </td>
                <td className="px-6 py-4 text-right">
                  <input type="number" value={holding.allocation} onChange={(e) => updateHolding(holding.id, 'allocation', e.target.value)} className="table-input w-20 text-right font-mono" />
                  <span className="ml-1 text-xs text-slate-500">%</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <input type="number" value={holding.value} onChange={(e) => updateHolding(holding.id, 'value', e.target.value)} className="table-input w-28 text-right font-mono" />
                </td>
                <td className="px-6 py-4">
                  <input value={holding.notes} onChange={(e) => updateHolding(holding.id, 'notes', e.target.value)} className="table-input w-full" placeholder="Core position / High conviction" />
                </td>
                <td className="px-4 py-4">
                  <button onClick={() => removeHolding(holding.id)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-500 p-2 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-right text-sm text-slate-400">
        Total Portfolio Value: <span className="font-mono text-white">${totalValue.toLocaleString()}</span>
      </div>
    </div>
  );
}
