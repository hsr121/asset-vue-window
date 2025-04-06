
import React, { useEffect, useState } from 'react';
import { Asset } from '@/types/asset';
import { fetchAssets } from '@/services/assetService';
import AssetTable from '@/components/AssetTable';
import DataCard from '@/components/DataCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, formatMarketCap } from '@/utils/formatters';
import { DollarSign, TrendingUp, TrendingDown, PieChart, AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AssetDetails from '@/components/AssetDetails';

const HomePage: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [assetTab, setAssetTab] = useState('all');

  useEffect(() => {
    const loadAssets = async () => {
      try {
        setLoading(true);
        const response = await fetchAssets();
        setAssets(response.assets);
        if (response.assets.length > 0) {
          setSelectedAsset(response.assets[0]);
        }
      } catch (error) {
        console.error('Failed to fetch assets:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadAssets();
  }, []);

  // Calculate summary data
  const totalLoanValue = assets.reduce((sum, asset) => sum + asset.maxLoanAmount, 0);
  const averageLtv = assets.length 
    ? assets.reduce((sum, asset) => sum + asset.loanToValue, 0) / assets.length 
    : 0;
  
  const highRiskAssets = assets.filter(asset => asset.riskRating === 'high');
  const highLtvAssets = assets.filter(asset => asset.loanToValue > 80);

  const filteredAssets = assetTab === 'all' 
    ? assets 
    : assets.filter(asset => asset.type === assetTab);

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DataCard 
          title="Total Available Loan Value" 
          value={formatCurrency(totalLoanValue)}
          icon={<DollarSign className="h-4 w-4" />}
          trend="neutral"
        />
        <DataCard 
          title="Average LTV" 
          value={`${averageLtv.toFixed(2)}%`}
          icon={<PieChart className="h-4 w-4" />}
          trend={averageLtv < 65 ? 'up' : averageLtv < 80 ? 'neutral' : 'down'}
        />
        <DataCard 
          title="High Risk Assets" 
          value={highRiskAssets.length}
          icon={<AlertTriangle className="h-4 w-4" />}
          trend={highRiskAssets.length > 2 ? 'down' : 'neutral'}
        />
        <DataCard 
          title="Near Liquidation" 
          value={highLtvAssets.length}
          icon={<TrendingDown className="h-4 w-4" />}
          trend={highLtvAssets.length > 0 ? 'down' : 'up'}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Asset Portfolio</CardTitle>
              <CardDescription>View and analyze your available assets</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" value={assetTab} onValueChange={setAssetTab} className="space-y-4">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="stock">Stocks</TabsTrigger>
                  <TabsTrigger value="crypto">Crypto</TabsTrigger>
                  <TabsTrigger value="bond">Bonds</TabsTrigger>
                  <TabsTrigger value="commodity">Commodities</TabsTrigger>
                </TabsList>
                <TabsContent value={assetTab} className="mt-0 p-0">
                  <AssetTable 
                    assets={filteredAssets} 
                    isLoading={loading} 
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-1">
          {selectedAsset ? (
            <AssetDetails asset={selectedAsset} />
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center p-6">
                <p className="text-muted-foreground">Select an asset to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
