"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon, Download, Printer, Search } from 'lucide-react'
import { useReactToPrint } from 'react-to-print'

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface StockTransaction {
  no: number
  transactionNo: string
  date: Date
  quantityIn: number
  quantityOut: number
  amountIn: number
  amountOut: number
}

interface StockItem {
  code: string
  description: string
  openingBalance: {
    quantity: number
    amount: number
  }
  transactions: StockTransaction[]
}

// Sample data
const stockItems: StockItem[] = [
  {
    code: "AW0011",
    description: "LIFT CYLINDER PUMP SEAL KIT",
    openingBalance: {
      quantity: 0,
      amount: 0
    },
    transactions: [
      {
        no: 1,
        transactionNo: "DL2412203",
        date: new Date(2024, 11, 14),
        quantityIn: 2,
        quantityOut: 0,
        amountIn: 430,
        amountOut: 0
      }
    ]
  },
  {
    code: "AW0076",
    description: "SWING ARM",
    openingBalance: {
      quantity: 2,
      amount: 164.59
    },
    transactions: [
      {
        no: 1,
        transactionNo: "DL2412224",
        date: new Date(2024, 11, 18),
        quantityIn: 1,
        quantityOut: 0,
        amountIn: 75,
        amountOut: 0
      }
    ]
  },
  {
    code: "AW0145",
    description: "SEAT COVER",
    openingBalance: {
      quantity: 13,
      amount: 139.37
    },
    transactions: [
      {
        no: 1,
        transactionNo: "DL2412224",
        date: new Date(2024, 11, 18),
        quantityIn: 1,
        quantityOut: 0,
        amountIn: 9,
        amountOut: 0
      }
    ]
  }
]

export function StockLedgerCard() {
  const [date, setDate] = React.useState<Date>(new Date())
  const [search, setSearch] = React.useState("")
  const componentRef = React.useRef(null)

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const filteredItems = stockItems.filter(item => 
    item.code.toLowerCase().includes(search.toLowerCase()) ||
    item.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "MMMM yyyy") : "Select month"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stock code or description..."
              className="pl-8 md:w-[240px]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="print:hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Stock Ledger Card</h2>
            <p className="text-sm text-muted-foreground">
              For the month of {format(date, "MMMM yyyy")}
            </p>
          </div>
        </CardHeader>
        <CardContent ref={componentRef}>
          <div className="space-y-8 print:space-y-6">
            {/* Company Header - Only visible in print */}
            <div className="hidden print:block text-center space-y-1">
              <h1 className="text-xl font-bold">HAVYS OIL MILL SDN. BHD.</h1>
              <p className="text-sm">O PARAMOUNT ESTATE, KM 31 JALAN BAHAU-KERATONG,</p>
              <p className="text-sm">KARUNG BERKUNCI NO.4, POS MALAYSIA, BAHAU, 72100 NEGERI SEMBILAN</p>
              <p className="text-sm">TEL: 012-6367717 FAX: 06-4665357</p>
              <h2 className="text-lg font-semibold mt-4">
                STOCK LEDGER CARD FOR THE MONTH OF {format(date, "MMMM yyyy").toUpperCase()}
              </h2>
            </div>

            {filteredItems.map((item) => {
              // Calculate running balances
              let runningQuantity = item.openingBalance.quantity
              let runningAmount = item.openingBalance.amount

              return (
                <div key={item.code} className="space-y-2">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Transaction</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Quantity In</TableHead>
                        <TableHead className="text-right">Quantity Out</TableHead>
                        <TableHead className="text-right">Amount (RM) In</TableHead>
                        <TableHead className="text-right">Amount (RM) Out</TableHead>
                        <TableHead className="text-right">Balance Qty</TableHead>
                        <TableHead className="text-right">Balance (RM)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={9} className="font-medium">
                          OPEN BALANCE ({item.code} {item.description})
                        </TableCell>
                      </TableRow>
                      {item.transactions.map((transaction) => {
                        runningQuantity += transaction.quantityIn - transaction.quantityOut
                        runningAmount += transaction.amountIn - transaction.amountOut

                        return (
                          <TableRow key={transaction.transactionNo}>
                            <TableCell>{transaction.no}</TableCell>
                            <TableCell>{transaction.transactionNo}</TableCell>
                            <TableCell>{format(transaction.date, "dd MMM yyyy")}</TableCell>
                            <TableCell className="text-right">{transaction.quantityIn.toFixed(2)}</TableCell>
                            <TableCell className="text-right">{transaction.quantityOut.toFixed(2)}</TableCell>
                            <TableCell className="text-right">{transaction.amountIn.toFixed(2)}</TableCell>
                            <TableCell className="text-right">{transaction.amountOut.toFixed(2)}</TableCell>
                            <TableCell className="text-right">{runningQuantity.toFixed(2)}</TableCell>
                            <TableCell className="text-right">{runningAmount.toFixed(2)}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

