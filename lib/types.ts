export interface ProfileData {
  age: number;
  totalPortfolioValue: number;
  riskTolerance: string;
  timeHorizon: string;
  primaryTicker: string;
  currentPosition: string;
  directionalView: string;
  concerns: string;
}

export interface Holding {
  id: string;
  ticker: string;
  allocation: number;
  value: number;
  notes: string;
}

export interface ModelingData {
  companyName: string;
  industry: string;
  financials: string;
  revGrowth: string;
  wacc: string;
}