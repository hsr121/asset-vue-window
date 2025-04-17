
import React from 'react';
import { Asset } from '@/types/asset';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Send, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatNumber } from '@/utils/formatters';

interface LTVResultCardProps {
  asset: Asset;
}

const LTVResultCard: React.FC<LTVResultCardProps> = ({ asset }) => {
  // Calculate additional metrics
  const marginCall = asset.loanToValue + 3.75; // Example calculation
  const stopLoss = asset.loanToValue + 7.5; // Example calculation
  
  return (
    <div className="space-y-6">
      {/* Warning Banner */}
      <div className="bg-japan-maple/10 border border-japan-maple/30 rounded-md p-3 text-sm text-japan-sumi">
        <p>1. No single China A-share counter to exceed 25% of the portfolio collateral value. Monthly and ad hoc monitoring and LTV adjustments to be expected.</p>
        <p>2. No financing to Virtual Assets ETFs, Crypto and MBS related ETFs.</p>
      </div>
      
      {/* Asset Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-japan-sumi">{asset.name}</h1>
          <h2 className="text-xl font-semibold text-japan-sumi/80">{asset.symbol}</h2>
        </div>
        
        <div className="flex space-x-2">
          <div className="bg-japan-shoji border border-japan-sand rounded-md p-3 flex flex-col">
            <span className="text-xs text-japan-sumi mb-1">LTV</span>
            <span className="text-xl font-bold text-japan-indigo">{asset.loanToValue}%</span>
          </div>
        </div>
      </div>
      
      {/* Asset Details */}
      <div className="grid grid-cols-4 gap-4 text-sm">
        <div className="flex flex-col">
          <span className="text-japan-sumi/70">ISIN</span>
          <span className="font-medium">US{asset.id}67</span>
        </div>
        <div className="flex flex-col">
          <span className="text-japan-sumi/70">Exchange</span>
          <span className="font-medium">UW</span>
        </div>
        <div className="flex flex-col">
          <span className="text-japan-sumi/70">TICKER</span>
          <span className="font-medium">{asset.symbol} UW</span>
        </div>
        <div className="flex flex-col">
          <span className="text-japan-sumi/70">Currency</span>
          <span className="font-medium">USD</span>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-end space-x-2">
        <Button variant="outline" size="sm" className="text-japan-fuji border-japan-fuji/30 hover:bg-japan-fuji/10">
          <Send className="h-4 w-4 mr-1" />
          Send
        </Button>
        <Button variant="outline" size="sm" className="text-japan-matcha border-japan-matcha/30 hover:bg-japan-matcha/10">
          <Download className="h-4 w-4 mr-1" />
          Download
        </Button>
      </div>
      
      {/* LTV and Key Metrics */}
      <div className="grid grid-cols-2 gap-6">
        {/* LTV Section */}
        <Card className="bg-japan-sakura/10 border-japan-sakura/20">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-2xl font-bold text-japan-sumi">LTV</h3>
                <p className="text-sm text-japan-sumi/70">Loan-To-Value</p>
              </div>
            </div>
            
            <div className="space-y-4 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-japan-sumi">Initial Margin</span>
                <span className="font-bold text-japan-sumi">{asset.loanToValue}%</span>
              </div>
              <Progress 
                value={asset.loanToValue} 
                max={100} 
                className="h-1 bg-japan-sand" 
                indicatorClassName="bg-japan-sakura"
              />
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-japan-sumi">Margin Call</span>
                <span className="font-bold text-japan-sumi">{marginCall.toFixed(2)}%</span>
              </div>
              <Progress 
                value={marginCall} 
                max={100} 
                className="h-1 bg-japan-sand" 
                indicatorClassName="bg-japan-fuji"
              />
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-japan-sumi">Stop Loss</span>
                <span className="font-bold text-japan-sumi">{stopLoss.toFixed(1)}%</span>
              </div>
              <Progress 
                value={stopLoss} 
                max={100} 
                className="h-1 bg-japan-sand" 
                indicatorClassName="bg-japan-maple"
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Key Metrics Section */}
        <Card className="bg-japan-fuji/5 border-japan-fuji/20">
          <CardContent className="p-4">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-japan-sumi">Key</h3>
              <p className="text-xl font-bold text-japan-sumi">Metrics</p>
            </div>
            
            <div className="space-y-4 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-japan-sumi">Quantity</span>
                <span className="font-bold text-japan-sumi">{formatNumber(asset.volume || 0)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-japan-sumi">Market Value (USD)</span>
                <span className="font-bold text-japan-sumi">{formatCurrency(asset.price * (asset.volume || 0))}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-japan-sumi">Collateral Value (USD)</span>
                <span className="font-bold text-japan-sumi">{formatCurrency(asset.collateralValue * (asset.volume || 0))}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Equity Information */}
      <Card className="border-japan-sand">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-japan-sumi mb-4">Equity Information</h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <div className="grid grid-cols-1 gap-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-japan-sumi/70">Country</span>
                  <span className="text-sm font-medium">US</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-japan-sumi/70">Security Type</span>
                  <span className="text-sm font-medium">EQUITY</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-japan-sumi/70">Market</span>
                  <span className="text-sm font-medium">UW</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-japan-sumi/70">Last Close Price</span>
                  <span className="text-sm font-medium">${asset.price.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-japan-sumi/70">Market Cap (USD)</span>
                  <span className="text-sm font-medium">{formatCurrency(asset.marketCap || 0)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-japan-sumi/70">30d Day Volatility (%)</span>
                  <span className="text-sm font-medium">28.81%</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-japan-sumi/70">Exchange Rate</span>
                  <span className="text-sm font-medium">1</span>
                </div>
              </div>
            </div>
            
            <div className="col-span-1">
              <div className="grid grid-cols-1 gap-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-japan-sumi/70">LTV at IM in Full Equity Financing</span>
                  <span className="text-sm font-medium">{asset.loanToValue}%</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-japan-sumi/70">LTV at MC in Full Equity Financing</span>
                  <span className="text-sm font-medium">{marginCall.toFixed(2)}%</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-japan-sumi/70">LTV at SL in Full Equity Financing</span>
                  <span className="text-sm font-medium">{stopLoss.toFixed(1)}%</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-japan-sumi/70">Liquidation Period</span>
                  <span className="text-sm font-medium">1.000000</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-japan-sumi/70">3 month Average Liquidity</span>
                  <span className="text-sm font-medium">12,111,620</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-japan-sumi/70">3 month Average Traded Value (USD)</span>
                  <span className="text-sm font-medium">2,409,184,498</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Disclaimer and Notes */}
      <Card className="border-japan-sand bg-japan-shoji/50">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-japan-sumi mb-2">Disclaimer and Notes</h3>
          
          <div>
            <h4 className="text-sm font-medium text-japan-sumi mb-1">Notes:</h4>
            <p className="text-sm text-japan-sumi/80">Quantity and LTV ratio is calculated based on financing with LP's data. Enter the quantity for accurate LTV result.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LTVResultCard;
