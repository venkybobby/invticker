import { create } from 'zustand';
import { ProfileData, Holding, ModelingData } from './types';

interface ForgeState {
  profile: ProfileData;
  holdings: Holding[];
  modelingData: ModelingData;
  setProfile: (profile: Partial<ProfileData>) => void;
  setHoldings: (holdings: Holding[]) => void;
  setModelingData: (data: Partial<ModelingData>) => void;
  addHolding: () => void;
  removeHolding: (id: string) => void;
  updateHolding: (id: string, field: keyof Holding, value: any) => void;
}

const initialProfile: ProfileData = {
  age: 50,
  totalPortfolioValue: 425000,
  riskTolerance: 'Balanced',
  timeHorizon: '5-10 years',
  primaryTicker: 'NVDA',
  currentPosition: 'LONG',
  directionalView: 'BULLISH',
  concerns: '',
};

const initialHoldings: Holding[] = [
  { id: '1', ticker: 'VOO', allocation: 35, value: 148750, notes: 'Core S&P 500' },
  { id: '2', ticker: 'QQQM', allocation: 18, value: 76500, notes: 'AI growth' },
  { id: '3', ticker: 'NVDA', allocation: 9, value: 38250, notes: 'High conviction' },
];

const initialModeling: ModelingData = {
  companyName: 'NVIDIA Corporation',
  industry: 'Semiconductors / AI Infrastructure',
  financials: 'Revenue: $96.3B | EBITDA: $55.2B | FCF: ~$32B',
  revGrowth: '28%',
  wacc: '9.2%',
};

export const useForgeStore = create<ForgeState>((set) => ({
  profile: initialProfile,
  holdings: initialHoldings,
  modelingData: initialModeling,

  setProfile: (newProfile) => set((state) => ({ profile: { ...state.profile, ...newProfile } })),
  setHoldings: (holdings) => set({ holdings }),
  setModelingData: (data) => set((state) => ({ modelingData: { ...state.modelingData, ...data } })),

  addHolding: () => set((state) => {
    const newHolding: Holding = {
      id: Date.now().toString(),
      ticker: 'NEW',
      allocation: 5,
      value: 20000,
      notes: '',
    };
    return { holdings: [...state.holdings, newHolding] };
  }),

  removeHolding: (id) => set((state) => ({
    holdings: state.holdings.filter(h => h.id !== id)
  })),

  updateHolding: (id, field, value) => set((state) => ({
    holdings: state.holdings.map(h =>
      h.id === id ? { ...h, [field]: field === 'allocation' || field === 'value' ? Number(value) : value } : h
    )
  })),
}));