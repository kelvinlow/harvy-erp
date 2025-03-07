'use client';

import * as React from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UOMTable } from './uom-table';
import { UOMDialog } from './uom-dialog';
import { DeleteConfirmation } from '@/components/delete-confirmation';
import type { UOM } from '@/types/uom';

// Mock data
const mockUoms: UOM[] = [
  {
    id: '1',
    code: 'BAG',
    description: 'Bag',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    code: 'BDL',
    description: 'Bundle',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    code: 'BK',
    description: 'Book',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    code: 'BOT',
    description: 'Bottle',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    code: 'BOX',
    description: 'Box',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '6',
    code: 'BUCKET',
    description: 'Bucket',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '7',
    code: 'CAN',
    description: 'Can',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export function UOMMaster() {
  const [uoms, setUoms] = React.useState<UOM[]>(mockUoms);
  const [open, setOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [selectedUom, setSelectedUom] = React.useState<UOM | null>(null);
  const [uomToDelete, setUomToDelete] = React.useState<UOM | null>(null);

  const handleCreate = () => {
    setSelectedUom(null);
    setOpen(true);
  };

  const handleEdit = (uom: UOM) => {
    setSelectedUom(uom);
    setOpen(true);
  };

  const handleDeleteClick = (uom: UOM) => {
    setUomToDelete(uom);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (uomToDelete) {
      // In a real app, you would call an API here
      setUoms(uoms.filter((uom) => uom.id !== uomToDelete.id));
      setDeleteOpen(false);
      setUomToDelete(null);
    }
  };

  const handleSave = async (data: Partial<UOM>) => {
    if (selectedUom) {
      // Update existing UOM
      setUoms(
        uoms.map((uom) =>
          uom.id === selectedUom.id
            ? {
                ...selectedUom,
                ...data,
                updatedAt: new Date().toISOString()
              }
            : uom
        )
      );
    } else {
      // Create new UOM
      const newUom: UOM = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as UOM;
      setUoms([...uoms, newUom]);
    }
    setOpen(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>UOM Master</CardTitle>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          New UOM
        </Button>
      </CardHeader>
      <CardContent>
        <UOMTable
          data={uoms}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
        <UOMDialog
          open={open}
          onOpenChange={setOpen}
          uom={selectedUom}
          onSubmit={handleSave}
        />
        <DeleteConfirmation
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          onConfirm={handleDeleteConfirm}
          title="Delete UOM"
          description={`Are you sure you want to delete ${uomToDelete?.code}? This action cannot be undone.`}
        />
      </CardContent>
    </Card>
  );
}
