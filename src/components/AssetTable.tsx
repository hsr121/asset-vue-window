
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Asset } from '@/types/asset';
import { formatCurrency, formatMarketCap, formatPercent, formatVolume, getLtvClass } from '@/utils/formatters';
import { cn } from '@/lib/utils';

interface AssetTableProps {
  assets: Asset[];
  isLoading?: boolean;
}

type SortKey = keyof Asset | null;
type SortDirection = 'asc' | 'desc';

const AssetTable: React.FC<AssetTableProps> = ({ assets, isLoading = false }) => {
  const [sortKey, setSortKey] = useState<SortKey>('symbol');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedAssets = React.useMemo(() => {
    if (!sortKey) return assets;

    return [...assets].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }, [assets, sortKey, sortDirection]);

  const SortHeader: React.FC<{ column: SortKey; label: string }> = ({ column, label }) => (
    <Button
      variant="ghost"
      onClick={() => handleSort(column)}
      className="p-0 font-semibold hover:bg-transparent"
    >
      {label}
      {sortKey === column ? (
        sortDirection === 'asc' ? (
          <ChevronUp className="ml-1 h-4 w-4" />
        ) : (
          <ChevronDown className="ml-1 h-4 w-4" />
        )
      ) : (
        <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />
      )}
    </Button>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead><SortHeader column="symbol" label="Asset" /></TableHead>
            <TableHead className="text-right"><SortHeader column="price" label="Price" /></TableHead>
            <TableHead className="text-right"><SortHeader column="changePercent" label="24h Change" /></TableHead>
            <TableHead className="text-right"><SortHeader column="marketCap" label="Market Cap" /></TableHead>
            <TableHead className="text-right"><SortHeader column="loanToValue" label="LTV %" /></TableHead>
            <TableHead className="text-right"><SortHeader column="maxLoanAmount" label="Max Loan" /></TableHead>
            <TableHead className="text-right"><SortHeader column="riskRating" label="Risk" /></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAssets.length > 0 ? (
            sortedAssets.map((asset) => (
              <TableRow key={asset.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell>
                  <div className="font-medium">{asset.symbol}</div>
                  <div className="text-xs text-muted-foreground">{asset.name}</div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(asset.price)}
                </TableCell>
                <TableCell className={cn(
                  "text-right",
                  asset.changePercent > 0 ? "text-financial-green" : "text-financial-red"
                )}>
                  {formatPercent(asset.changePercent)}
                </TableCell>
                <TableCell className="text-right">
                  {asset.marketCap ? formatMarketCap(asset.marketCap) : "-"}
                </TableCell>
                <TableCell className="text-right">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <span className={getLtvClass(asset.loanToValue)}>
                          {asset.loanToValue}%
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Liquidation threshold: {asset.liquidationThreshold}%</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(asset.maxLoanAmount)}
                </TableCell>
                <TableCell className="text-right">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    asset.riskRating === "low" && "bg-financial-green/10 text-financial-green",
                    asset.riskRating === "medium" && "bg-financial-highlight/10 text-financial-highlight",
                    asset.riskRating === "high" && "bg-financial-red/10 text-financial-red",
                  )}>
                    {asset.riskRating.charAt(0).toUpperCase() + asset.riskRating.slice(1)}
                  </span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No assets found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AssetTable;
