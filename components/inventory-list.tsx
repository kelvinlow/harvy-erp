"use client"

import { useState } from "react"
import { Clock, Download, Search } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PriceHistoryDialog } from "@/components/price-history-dialog"

interface InventoryItem {
  stockCode: string
  description: string
  uom: string
  quantity: number
  unitCost: number
  totalValue: number
  priceHistory: {
    date: string
    documentNo: string
    supplier: string
    price: number
  }[]
}

// Sample data
const inventoryItems: InventoryItem[] = [
  {
    stockCode: "EP0001",
    description: "PVC INSULATION TAPE (ELECTRICAL)",
    uom: "PCS",
    quantity: 100,
    unitCost: 23.99,
    totalValue: 2399.00,
    priceHistory: [
      {
        date: "2024-01-01",
        documentNo: "PO-240101",
        supplier: "Electrical Supplies Co",
        price: 23.99
      },
      {
        date: "2023-12-01",
        documentNo: "PO-231201",
        supplier: "Electrical Supplies Co",
        price: 22.50
      },
      {
        date: "2023-11-01",
        documentNo: "PO-231101",
        supplier: "Best Electronics",
        price: 21.99
      }
    ]
  },
  {
    stockCode: "BN0013",
    description: "1\"X 5\" M/S BOLT & NUT",
    uom: "PCS",
    quantity: 44,
    unitCost: 5.76,
    totalValue: 253.44,
    priceHistory: [
      {
        date: "2024-01-01",
        documentNo: "PO-240101",
        supplier: "Hardware Solutions",
        price: 5.76
      },
      {
        date: "2023-12-15",
        documentNo: "PO-231215",
        supplier: "Hardware Solutions",
        price: 5.50
      }
    ]
  }
]

export function InventoryList() {
  const [search, setSearch] = useState("")
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
  const [priceHistoryOpen, setPriceHistoryOpen] = useState(false)

  const filteredItems = inventoryItems.filter(item =>
    item.stockCode.toLowerCase().includes(search.toLowerCase()) ||
    item.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search inventory..."
            className="pl-8 md:w-[300px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Stock Code</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>UOM</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Unit Cost (RM)</TableHead>
              <TableHead className="text-right">Total Value (RM)</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.stockCode}>
                <TableCell>{item.stockCode}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.uom}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">{item.unitCost.toFixed(2)}</TableCell>
                <TableCell className="text-right">{item.totalValue.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedItem(item)
                      setPriceHistoryOpen(true)
                    }}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Price History
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedItem && (
        <PriceHistoryDialog
          open={priceHistoryOpen}
          onOpenChange={setPriceHistoryOpen}
          stockCode={selectedItem.stockCode}
          description={selectedItem.description}
          priceHistory={selectedItem.priceHistory}
        />
      )}
    </div>
  )
}

