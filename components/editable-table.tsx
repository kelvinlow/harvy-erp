'use client';

import * as React from 'react';
import { Pencil, Settings2 } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { ItemEditDialog } from './item-edit-dialog';

interface Item {
  id: number;
  itemCode: string;
  itemName: string;
  requiredBy: string;
  quantity: number;
  targetWarehouse: string;
  uom: string;
  stockUom: string;
  uomConversionFactor: number;
  stockQty: number;
}

export function EditableTable() {
  const [items, setItems] = React.useState<Item[]>(
    Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      itemCode: '',
      itemName: '',
      requiredBy: '',
      quantity: 0,
      targetWarehouse: '',
      uom: '',
      stockUom: 'Nos',
      uomConversionFactor: 1,
      stockQty: 0
    }))
  );
  const [selectedItem, setSelectedItem] = React.useState<Item | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleSave = (data: Item) => {
    setItems((prev) =>
      prev.map((item) => (item.id === data.id ? { ...item, ...data } : item))
    );
  };

  const handleRowClick = (item: Item) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[40px]">
                <Checkbox />
              </TableHead>
              <TableHead className="w-[60px]">No.</TableHead>
              <TableHead>
                Item Code <span className="text-red-500">*</span>
              </TableHead>
              <TableHead>
                Required By <span className="text-red-500">*</span>
              </TableHead>
              <TableHead>
                Quantity <span className="text-red-500">*</span>
              </TableHead>
              <TableHead>Target Warehouse</TableHead>
              <TableHead>
                UOM <span className="text-red-500">*</span>
              </TableHead>
              <TableHead className="w-[40px]">
                <Settings2 className="h-4 w-4" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow
                key={item.id}
                className="h-[52px] cursor-pointer hover:bg-muted/50"
                onClick={() => handleRowClick(item)}
              >
                <TableCell
                  className="border-r"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Checkbox />
                </TableCell>
                <TableCell className="border-r font-medium">
                  {item.id}
                </TableCell>
                <TableCell className="border-r">
                  {item.itemCode ? (
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-red-500" />
                      {item.itemCode}
                    </div>
                  ) : (
                    'Click to edit'
                  )}
                </TableCell>
                <TableCell className="border-r">
                  {item.requiredBy || 'Click to edit'}
                </TableCell>
                <TableCell className="border-r">
                  {item.quantity === 0 ? '0.000' : item.quantity.toFixed(3)}
                </TableCell>
                <TableCell className="border-r">
                  {item.targetWarehouse || 'Click to edit'}
                </TableCell>
                <TableCell className="border-r">
                  {item.uom || 'Click to edit'}
                </TableCell>
                <TableCell>
                  <button className="p-2 hover:bg-muted rounded-md">
                    <Pencil className="h-4 w-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedItem && (
        <ItemEditDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          rowNumber={selectedItem.id}
          data={selectedItem}
          onSave={handleSave}
        />
      )}
    </>
  );
}
