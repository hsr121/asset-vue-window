
import React from 'react';
import { Asset } from '@/types/asset';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency, formatPercent } from '@/utils/formatters';
import { cn } from '@/lib/utils';

interface AssetTableProps {
  assets: Asset[];
  isLoading?: boolean;
  onAssetSelect?: (asset: Asset) => void;
}

const AssetTable: React.FC<AssetTableProps> = ({ 
  assets, 
  isLoading = false,
  onAssetSelect = () => {}
}) => {
  if (isLoading) {
    return <div className="text-center py-8">Loading assets...</div>;
  }

  if (assets.length === 0) {
    return <div className="text-center py-8">No assets found</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Change</TableHead>
            <TableHead className="text-right">LTV</TableHead>
            <TableHead className="text-right">Max Loan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((asset) => (
            <TableRow 
              key={asset.id}
              onClick={() => onAssetSelect(asset)}
              className="cursor-pointer hover:bg-japan-shoji/50"
            >
              <TableCell className="font-medium">{asset.symbol}</TableCell>
              <TableCell>{asset.name}</TableCell>
              <TableCell className="capitalize">{asset.type}</TableCell>
              <TableCell className="text-right">{formatCurrency(asset.price)}</TableCell>
              <TableCell className={cn(
                "text-right",
                asset.changePercent > 0 ? "text-japan-matcha" : asset.changePercent < 0 ? "text-japan-maple" : ""
              )}>
                {formatPercent(asset.changePercent)}
              </TableCell>
              <TableCell className="text-right">
                <span className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium",
                  asset.loanToValue > 70 ? "bg-japan-matcha/10 text-japan-matcha" : 
                  asset.loanToValue > 50 ? "bg-japan-hinoki/10 text-japan-hinoki" : 
                  "bg-japan-maple/10 text-japan-maple"
                )}>
                  {asset.loanToValue}%
                </span>
              </TableCell>
              <TableCell className="text-right">{formatCurrency(asset.maxLoanAmount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AssetTable;
