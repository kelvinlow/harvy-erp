'use client';

import { format } from 'date-fns';
import { ArrowLeft, Download, Printer } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import type { PurchaseOrder } from '@/types';

// Mock function to fetch PO details - replace with actual API call
const getPurchaseOrder = async (id: string): Promise<PurchaseOrder> => {
  // This would be an API call in a real application
  return {
    id: 'PO001',
    poNumber: 'PO-2024-001',
    date: '2024-01-15',
    prNumber: 'PR-2024-001',
    supplierName: 'ABC Hardware Supplies',
    status: 'Pending',
    items: [
      {
        id: '1',
        stockCode: 'HW001',
        description: 'Power Tools Set',
        quantity: 2,
        uom: 'SET',
        unitPrice: 1500,
        amount: 3000
      },
      {
        id: '2',
        stockCode: 'HW002',
        description: 'Safety Equipment',
        quantity: 5,
        uom: 'SET',
        unitPrice: 200,
        amount: 1000
      }
    ],
    total: 4000
  };
};

export function PurchaseOrderDetails({ id }: { id: string }) {
  // In a real application, you would fetch this data from an API
  const order = getPurchaseOrder(id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'Approved':
        return 'text-green-600 bg-green-50';
      case 'Delivered':
        return 'text-blue-600 bg-blue-50';
      case 'Completed':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild>
          <Link href="/purchase-order" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Purchase Orders
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Purchase Order Details</CardTitle>
            <CardDescription>PO Number: {order.poNumber}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Date
                </p>
                <p>{format(new Date(order.date), 'dd MMM yyyy')}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Status
                </p>
                <p>
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                      getStatusColor(order.status)
                    )}
                  >
                    {order.status}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  PR Number
                </p>
                <p>{order.prNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Supplier
                </p>
                <p>{order.supplierName}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Total Items: {order.items.length}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  Subtotal
                </p>
                <p className="font-medium">RM {order.total.toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  Tax (0%)
                </p>
                <p className="font-medium">RM 0.00</p>
              </div>
              <div className="flex items-center justify-between border-t pt-4">
                <p className="text-base font-medium">Total</p>
                <p className="text-xl font-bold">RM {order.total.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Stock Code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead>UOM</TableHead>
                <TableHead className="text-right">Unit Price (RM)</TableHead>
                <TableHead className="text-right">Amount (RM)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.stockCode}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell>{item.uom}</TableCell>
                  <TableCell className="text-right">
                    {item.unitPrice.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
