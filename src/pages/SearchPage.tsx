
import React, { useState } from 'react';
import { Asset } from '@/types/asset';
import { searchAssets } from '@/services/assetService';
import AssetTable from '@/components/AssetTable';
import LTVResultCard from '@/components/LTVResultCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon, Filter, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      toast({
        title: "Search Error",
        description: "Please enter a search term",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      const response = await searchAssets(searchTerm);
      setResults(response.assets);
      setHasSearched(true);
      setSelectedAsset(null);
      
      if (response.assets.length === 0) {
        toast({
          title: "No results found",
          description: `No assets matching "${searchTerm}" were found`,
          variant: "default",
        });
      }
    } catch (error) {
      console.error('Search failed:', error);
      toast({
        title: "Search Failed",
        description: "An error occurred while searching for assets",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAssetSelect = (asset: Asset) => {
    setSelectedAsset(asset);
  };

  const handleBackToResults = () => {
    setSelectedAsset(null);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {!selectedAsset ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Search Assets</CardTitle>
              <CardDescription>
                Search for assets by symbol or name
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search by symbol or name (e.g., AAPL, Bitcoin)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Searching...' : 'Search'}
                </Button>
                <Button variant="outline" type="button">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </form>
            </CardContent>
          </Card>

          {hasSearched && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Search Results</CardTitle>
                <CardDescription>
                  {results.length === 0
                    ? 'No assets found matching your search criteria'
                    : `Found ${results.length} asset${results.length !== 1 ? 's' : ''} matching "${searchTerm}"`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AssetTable 
                  assets={results} 
                  isLoading={loading} 
                  onAssetSelect={handleAssetSelect}
                />
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <>
          <div className="flex items-center mb-4">
            <Button 
              variant="ghost" 
              onClick={handleBackToResults} 
              className="flex items-center text-japan-fuji hover:text-japan-fuji/80 hover:bg-japan-shoji/50 -ml-2"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to search results
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>LTV Result</CardTitle>
              <CardDescription>
                Loan-to-Value assessment and metrics for {selectedAsset.name} ({selectedAsset.symbol})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LTVResultCard asset={selectedAsset} />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default SearchPage;
