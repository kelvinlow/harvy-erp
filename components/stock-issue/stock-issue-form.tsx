'use client';

import * as React from 'react';
import { Loader2, PackagePlus, Printer, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { StockIssueHeader } from '@/components/stock-issue/stock-issue-header';
import { StockIssueTable } from '@/components/stock-issue/stock-issue-table';
import { useToast } from '@/components/ui/use-toast';
import type { StockItem } from '@/types/stock';

export function StockIssueForm() {
  const { toast } = useToast();
  const [items, setItems] = React.useState<StockItem[]>([
    {
      id: '1',
      stockCode: '',
      description: '',
      cost: 0,
      station: '',
      machineNo: '',
      sicNo: '',
      receivedBy: '',
      uom: '',
      quantity: 0
    }
  ]);
  const [loading, setLoading] = React.useState(false);

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: (prev.length + 1).toString(),
        stockCode: '',
        description: '',
        cost: 0,
        station: '',
        machineNo: '',
        sicNo: '',
        receivedBy: '',
        uom: '',
        quantity: 0
      }
    ]);
  };

  const handlePrintIssue = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: 'Success',
        description: 'Stock issue has been printed successfully.'
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to print stock issue.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVoidIssue = () => {
    if (window.confirm('Are you sure you want to void this issue?')) {
      toast({
        title: 'Issue Voided',
        description: 'The stock issue has been voided.'
      });
      setItems([
        {
          id: '1',
          stockCode: '',
          description: '',
          cost: 0,
          station: '',
          machineNo: '',
          sicNo: '',
          receivedBy: '',
          uom: '',
          quantity: 0
        }
      ]);
    }
  };

  return (
    <div className="container mx-auto max-w-full px-4 py-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Stock Issue Form
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <StockIssueHeader />
          <StockIssueTable items={items} setItems={setItems} />
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 hover:bg-primary hover:text-primary-foreground"
            onClick={handleAddItem}
          >
            <PackagePlus className="h-4 w-4" />
            Add Item
          </Button>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button variant="outline" className="gap-2">
            <X className="h-4 w-4" />
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="gap-2"
            onClick={handleVoidIssue}
          >
            <X className="h-4 w-4" />
            Void Issue
          </Button>
          <Button
            className="gap-2"
            onClick={handlePrintIssue}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Printer className="h-4 w-4" />
            )}
            Print Issue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
