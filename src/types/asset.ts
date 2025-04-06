
export type AssetType = 'stock' | 'bond' | 'crypto' | 'forex' | 'commodity';

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  type: AssetType;
  price: number;
  previousPrice: number;
  change: number;
  changePercent: number;
  marketCap?: number;
  volume?: number;
  loanToValue: number; // LTV as a percentage
  riskRating: 'low' | 'medium' | 'high';
  collateralValue: number;
  maxLoanAmount: number;
  liquidationThreshold: number;
  sector?: string;
  timestamp: string; // ISO date string
}

export interface AssetsResponse {
  assets: Asset[];
  totalAssets: number;
  timestamp: string;
}
