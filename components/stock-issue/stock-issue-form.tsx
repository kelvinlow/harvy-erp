"use client"

import * as React from "react"
import { Loader2, PackagePlus, Printer, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { StockIssueHeader } from "@/components/stock-issue/stock-issue-header"
import { StockIssueTable } from "@/components/stock-issue/stock-issue-table"
import type { Stock } from '@/types/stock';

export const mockStocks: Stock[] = [
  { id: '1', code: 'ST001', name: 'Item 1' },
  { id: '2', code: 'ST002', name: 'Item 2' },
  { id: '3', code: 'ST003', name: 'Item 3' }
];


export function StockIssueForm() {
  const [items, setItems] = React.useState<StockItem[]>([
    {
      id: "1",
      stockCode: "",
      description: "",
      cost: 0,
      station: "",
      machineNo: "",
      sicNo: "",
      receivedBy: "",
      uom: "",
      quantity: 0,
    },
  ])
  const [loading, setLoading] = React.useState(false)

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: (prev.length + 1).toString(),
        stockCode: "",
        description: "",
        cost: 0,
        station: "",
        machineNo: "",
        sicNo: "",
        receivedBy: "",
        uom: "",
        quantity: 0,
      },
    ])
  }

  const handlePrintIssue = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
  }

  return (
    <Card className="mx-auto max-w-[1400px] shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight">Stock Issue Form</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <StockIssueHeader />
        <StockIssueTable items={items} />
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
        <Button variant="destructive" className="gap-2">
          <X className="h-4 w-4" />
          Void Issue
        </Button>
        <Button className="gap-2" onClick={handlePrintIssue} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Printer className="h-4 w-4" />}
          Print Issue
        </Button>
      </CardFooter>
    </Card>
  )
}

