import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { StockItem } from "@/types/stock"

interface StockIssueTableProps {
  items: StockItem[]
}

export function StockIssueTable({ items }: StockIssueTableProps) {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">No</TableHead>
            <TableHead>Stock Code</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Station</TableHead>
            <TableHead>Machine No</TableHead>
            <TableHead>SIC No</TableHead>
            <TableHead>Received By</TableHead>
            <TableHead>UOM</TableHead>
            <TableHead>Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stock" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockStocks.map((stock) => (
                      <SelectItem key={stock.id} value={stock.code}>
                        {stock.code} - {stock.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Input placeholder="Description" />
              </TableCell>
              <TableCell>
                <Input type="number" placeholder="0" className="w-24" />
              </TableCell>
              <TableCell>
                <Input placeholder="Station" />
              </TableCell>
              <TableCell>
                <Input placeholder="Machine No" />
              </TableCell>
              <TableCell>
                <Input placeholder="SIC No" />
              </TableCell>
              <TableCell>
                <Input placeholder="Received By" />
              </TableCell>
              <TableCell>
                <Input placeholder="UOM" className="w-20" />
              </TableCell>
              <TableCell>
                <Input type="number" placeholder="0" className="w-20" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

