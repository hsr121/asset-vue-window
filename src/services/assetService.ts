
import { Asset, AssetsResponse } from "@/types/asset";

// Mock data for demonstration purposes 
// In a real app, this would be replaced with actual API calls
const mockAssets: Asset[] = [
  {
    id: "1",
    symbol: "AAPL",
    name: "Apple Inc.",
    type: "stock",
    price: 189.84,
    previousPrice: 188.22,
    change: 1.62,
    changePercent: 0.86,
    marketCap: 2950000000000,
    volume: 58930000,
    loanToValue: 75,
    riskRating: "low",
    collateralValue: 189.84 * 0.75,
    maxLoanAmount: 189.84 * 0.75,
    liquidationThreshold: 80,
    sector: "Technology",
    timestamp: new Date().toISOString()
  },
  {
    id: "2",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    type: "stock",
    price: 418.56,
    previousPrice: 412.65,
    change: 5.91,
    changePercent: 1.43,
    marketCap: 3110000000000,
    volume: 22190000,
    loanToValue: 80,
    riskRating: "low",
    collateralValue: 418.56 * 0.80,
    maxLoanAmount: 418.56 * 0.80,
    liquidationThreshold: 85,
    sector: "Technology",
    timestamp: new Date().toISOString()
  },
  {
    id: "3",
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    type: "stock",
    price: 183.92,
    previousPrice: 185.07,
    change: -1.15,
    changePercent: -0.62,
    marketCap: 1900000000000,
    volume: 42680000,
    loanToValue: 70,
    riskRating: "medium",
    collateralValue: 183.92 * 0.70,
    maxLoanAmount: 183.92 * 0.70,
    liquidationThreshold: 75,
    sector: "Consumer Cyclical",
    timestamp: new Date().toISOString()
  },
  {
    id: "4",
    symbol: "TSLA",
    name: "Tesla Inc.",
    type: "stock",
    price: 177.58,
    previousPrice: 172.63,
    change: 4.95,
    changePercent: 2.87,
    marketCap: 564000000000,
    volume: 97620000,
    loanToValue: 60,
    riskRating: "high",
    collateralValue: 177.58 * 0.60,
    maxLoanAmount: 177.58 * 0.60,
    liquidationThreshold: 65,
    sector: "Automotive",
    timestamp: new Date().toISOString()
  },
  {
    id: "5",
    symbol: "BTC",
    name: "Bitcoin",
    type: "crypto",
    price: 68293.15,
    previousPrice: 67589.45,
    change: 703.70,
    changePercent: 1.04,
    marketCap: 1345000000000,
    volume: 29640000000,
    loanToValue: 50,
    riskRating: "high",
    collateralValue: 68293.15 * 0.50,
    maxLoanAmount: 68293.15 * 0.50,
    liquidationThreshold: 55,
    timestamp: new Date().toISOString()
  },
  {
    id: "6",
    symbol: "ETH",
    name: "Ethereum",
    type: "crypto",
    price: 3457.82,
    previousPrice: 3402.18,
    change: 55.64,
    changePercent: 1.64,
    marketCap: 415000000000,
    volume: 13580000000,
    loanToValue: 45,
    riskRating: "high",
    collateralValue: 3457.82 * 0.45,
    maxLoanAmount: 3457.82 * 0.45,
    liquidationThreshold: 50,
    timestamp: new Date().toISOString()
  },
  {
    id: "7",
    symbol: "10Y-T",
    name: "10-Year Treasury Note",
    type: "bond",
    price: 98.76,
    previousPrice: 99.12,
    change: -0.36,
    changePercent: -0.36,
    loanToValue: 90,
    riskRating: "low",
    collateralValue: 98.76 * 0.90,
    maxLoanAmount: 98.76 * 0.90,
    liquidationThreshold: 95,
    sector: "Government",
    timestamp: new Date().toISOString()
  },
  {
    id: "8",
    symbol: "XAU",
    name: "Gold",
    type: "commodity",
    price: 2326.50,
    previousPrice: 2317.80,
    change: 8.70,
    changePercent: 0.38,
    loanToValue: 85,
    riskRating: "low",
    collateralValue: 2326.50 * 0.85,
    maxLoanAmount: 2326.50 * 0.85,
    liquidationThreshold: 90,
    timestamp: new Date().toISOString()
  }
];

// Simulate API fetch with a delay
export const fetchAssets = async (): Promise<AssetsResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        assets: mockAssets,
        totalAssets: mockAssets.length,
        timestamp: new Date().toISOString()
      });
    }, 500);
  });
};

export const searchAssets = async (query: string): Promise<AssetsResponse> => {
  const filteredAssets = mockAssets.filter(asset => 
    asset.symbol.toLowerCase().includes(query.toLowerCase()) || 
    asset.name.toLowerCase().includes(query.toLowerCase())
  );
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        assets: filteredAssets,
        totalAssets: filteredAssets.length,
        timestamp: new Date().toISOString()
      });
    }, 300);
  });
};

export const importPortfolio = async (portfolioData: string): Promise<{ success: boolean; message: string; }> => {
  // This would parse the incoming portfolio data and process it
  // For demo, just return success after a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Portfolio successfully imported"
      });
    }, 800);
  });
};
