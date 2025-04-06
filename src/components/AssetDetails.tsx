
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Asset } from '@/types/asset';
import { formatCurrency, formatMarketCap, formatPercent, formatVolume, getLtvClass } from '@/utils/formatters';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ArrowDown, ArrowUp, BarChart4, Clock, DollarSign, Percent } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AssetDetailsProps {
  asset: Asset;
}

const AssetDetails: React.FC<AssetDetailsProps> = ({ asset }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl flex items-center">
              {asset.symbol}
              <span className="ml-2 text-sm text-muted-foreground">{asset.type}</span>
            </CardTitle>
            <CardDescription>{asset.name}</CardDescription>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold">{formatCurrency(asset.price)}</div>
            <div className={cn(
              "text-sm font-medium",
              asset.changePercent > 0 ? "text-financial-green" : "text-financial-red"
            )}>
              {asset.changePercent > 0 ? (
                <ArrowUp className="inline mr-1 h-3 w-3" />
              ) : (
                <ArrowDown className="inline mr-1 h-3 w-3" />
              )}
              {formatCurrency(asset.change)} ({formatPercent(asset.changePercent)})
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              Loan to Value Analysis
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground">Current LTV:</p>
                <p className={cn("font-medium", getLtvClass(asset.loanToValue))}>
                  {asset.loanToValue}%
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Liquidation Threshold:</p>
                <p className="font-medium">{asset.liquidationThreshold}%</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Collateral Value:</p>
                <p className="font-medium">{formatCurrency(asset.collateralValue)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Max Loan Amount:</p>
                <p className="font-medium">{formatCurrency(asset.maxLoanAmount)}</p>
              </div>
            </div>
            <div className="pt-1">
              <div className="flex justify-between text-xs mb-1">
                <span>0%</span>
                <span className="text-financial-highlight">{asset.liquidationThreshold}%</span>
                <span>100%</span>
              </div>
              <Progress 
                value={asset.loanToValue} 
                max={100} 
                className={cn(
                  "h-2",
                  asset.loanToValue < 65 ? "bg-muted" : "bg-financial-red/20"
                )}
                indicatorClassName={cn(
                  asset.loanToValue < 65 ? "bg-financial-green" : 
                  asset.loanToValue < 80 ? "bg-financial-highlight" : "bg-financial-red"
                )}
              />
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4 pt-1">
            {asset.marketCap && (
              <div className="space-y-1">
                <p className="text-sm flex items-center text-muted-foreground">
                  <BarChart4 className="h-4 w-4 mr-1" />
                  Market Cap
                </p>
                <p className="font-medium">{formatMarketCap(asset.marketCap)}</p>
              </div>
            )}
            {asset.volume && (
              <div className="space-y-1">
                <p className="text-sm flex items-center text-muted-foreground">
                  <BarChart4 className="h-4 w-4 mr-1" />
                  24h Volume
                </p>
                <p className="font-medium">{formatVolume(asset.volume)}</p>
              </div>
            )}
            <div className="space-y-1">
              <p className="text-sm flex items-center text-muted-foreground">
                <Percent className="h-4 w-4 mr-1" />
                Risk Rating
              </p>
              <p className={cn(
                "px-2 py-0.5 rounded-full text-xs font-medium w-fit",
                asset.riskRating === "low" && "bg-financial-green/10 text-financial-green",
                asset.riskRating === "medium" && "bg-financial-highlight/10 text-financial-highlight",
                asset.riskRating === "high" && "bg-financial-red/10 text-financial-red",
              )}>
                {asset.riskRating.charAt(0).toUpperCase() + asset.riskRating.slice(1)}
              </p>
            </div>
            {asset.sector && (
              <div className="space-y-1">
                <p className="text-sm flex items-center text-muted-foreground">Sector</p>
                <p className="font-medium">{asset.sector}</p>
              </div>
            )}
          </div>

          <div className="text-xs text-muted-foreground pt-2 flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            Last updated: {new Date(asset.timestamp).toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetDetails;
