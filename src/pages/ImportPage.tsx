
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { FileUp, Upload } from 'lucide-react';
import { importPortfolio } from '@/services/assetService';
import { useToast } from '@/hooks/use-toast';

const ImportPage: React.FC = () => {
  const [importMethod, setImportMethod] = useState('file');
  const [jsonData, setJsonData] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleJsonImport = async () => {
    if (!jsonData.trim()) {
      toast({
        title: "Import Error",
        description: "Please enter valid JSON data",
        variant: "destructive",
      });
      return;
    }

    try {
      // Basic JSON validation
      JSON.parse(jsonData);
      
      setIsLoading(true);
      const result = await importPortfolio(jsonData);
      
      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        });
        setJsonData('');
      } else {
        toast({
          title: "Import Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (e) {
      toast({
        title: "Invalid JSON",
        description: "The provided data is not valid JSON",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileImport = async () => {
    if (!file) {
      toast({
        title: "Import Error",
        description: "Please select a file to import",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // In a real app, this would read the file and process it
      // For demo purposes, we'll just simulate a successful import
      const result = await importPortfolio(file.name);
      
      if (result.success) {
        toast({
          title: "Success",
          description: `Successfully imported portfolio from ${file.name}`,
        });
        setFile(null);
      } else {
        toast({
          title: "Import Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Import Error",
        description: "An error occurred while importing the file",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Import Portfolio</CardTitle>
          <CardDescription>
            Import your asset portfolio from a file or paste JSON data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="file" value={importMethod} onValueChange={setImportMethod}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="file">Upload File</TabsTrigger>
              <TabsTrigger value="json">Paste JSON</TabsTrigger>
            </TabsList>
            
            <TabsContent value="file" className="py-4 space-y-4">
              <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 text-center">
                <Upload className="h-8 w-8 mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Drag & Drop your file here</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Supported formats: .json, .csv, .xlsx
                </p>
                <div className="flex items-center">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Button type="button" variant="outline">
                      <FileUp className="mr-2 h-4 w-4" />
                      Browse Files
                    </Button>
                    <Input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept=".json,.csv,.xlsx"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                {file && (
                  <div className="mt-4 text-sm">
                    Selected: <span className="font-medium">{file.name}</span>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="json" className="py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Paste your JSON data below</label>
                <Textarea
                  placeholder='{"assets": [{"symbol": "AAPL", "name": "Apple Inc.", ...}]}'
                  rows={10}
                  value={jsonData}
                  onChange={(e) => setJsonData(e.target.value)}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Ensure your JSON matches the expected format for asset data
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => {
            setJsonData('');
            setFile(null);
          }}>
            Clear
          </Button>
          <Button 
            onClick={importMethod === 'file' ? handleFileImport : handleJsonImport}
            disabled={isLoading || (importMethod === 'file' ? !file : !jsonData.trim())}
          >
            {isLoading ? 'Importing...' : 'Import Portfolio'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ImportPage;
