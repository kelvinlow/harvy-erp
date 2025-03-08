'use client';

import * as React from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UOMTable } from './uom-table';
import { UOMDialog } from './uom-dialog';
import { DeleteConfirmation } from '@/components/delete-confirmation';
import type { UOM, UOMRelationship } from '@/types/uom';

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
  },
  {
    id: '8',
    code: 'L',
    description: 'Liter',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    relationships: [
      {
        id: 'rel1',
        fromUOMId: '8',
        toUOMId: '9',
        conversionRate: 1000,
        fromUOMCode: 'L',
        toUOMCode: 'ML'
      }
    ]
  },
  {
    id: '9',
    code: 'ML',
    description: 'Milliliter',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    relationships: [
      {
        id: 'rel2',
        fromUOMId: '9',
        toUOMId: '8',
        conversionRate: 0.001,
        fromUOMCode: 'ML',
        toUOMCode: 'L'
      }
    ]
  },
  {
    id: '10',
    code: 'KG',
    description: 'Kilogram',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    relationships: [
      {
        id: 'rel3',
        fromUOMId: '10',
        toUOMId: '11',
        conversionRate: 1000,
        fromUOMCode: 'KG',
        toUOMCode: 'G'
      }
    ]
  },
  {
    id: '11',
    code: 'G',
    description: 'Gram',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    relationships: [
      {
        id: 'rel4',
        fromUOMId: '11',
        toUOMId: '10',
        conversionRate: 0.001,
        fromUOMCode: 'G',
        toUOMCode: 'KG'
      }
    ]
  }
];

export function UOMMaster() {
  const [uoms, setUoms] = React.useState<UOM[]>(mockUoms);
  const [open, setOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [selectedUom, setSelectedUom] = React.useState<UOM | null>(null);
  const [uomToDelete, setUomToDelete] = React.useState<UOM | null>(null);
  const [relationshipToDelete, setRelationshipToDelete] = React.useState<{
    uomId: string;
    relationshipId: string;
  } | null>(null);
  const [deleteRelationshipOpen, setDeleteRelationshipOpen] =
    React.useState(false);

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

  const handleDeleteRelationshipClick = (
    uomId: string,
    relationshipId: string
  ) => {
    setRelationshipToDelete({ uomId, relationshipId });
    setDeleteRelationshipOpen(true);
  };

  const handleDeleteRelationshipConfirm = async () => {
    if (relationshipToDelete) {
      // In a real app, you would call an API here
      setUoms(
        uoms.map((uom) => {
          if (uom.id === relationshipToDelete.uomId) {
            return {
              ...uom,
              relationships:
                uom.relationships?.filter(
                  (rel) => rel.id !== relationshipToDelete.relationshipId
                ) || []
            };
          }
          return uom;
        })
      );
      setDeleteRelationshipOpen(false);
      setRelationshipToDelete(null);
    }
  };

  const handleSave = async (
    data: Partial<UOM> & { relationships?: UOMRelationship[] }
  ) => {
    if (selectedUom) {
      // Update existing UOM
      setUoms(
        uoms.map((uom) =>
          uom.id === selectedUom.id
            ? {
                ...selectedUom,
                ...data,
                relationships:
                  data.relationships || selectedUom.relationships || [],
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
        relationships: data.relationships || [],
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
          onDeleteRelationship={handleDeleteRelationshipClick}
        />
        <UOMDialog
          open={open}
          onOpenChange={setOpen}
          uom={selectedUom}
          uoms={uoms}
          onSubmit={handleSave}
        />
        <DeleteConfirmation
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          onConfirm={handleDeleteConfirm}
          title="Delete UOM"
          description={`Are you sure you want to delete ${uomToDelete?.code}? This action cannot be undone.`}
        />
        <DeleteConfirmation
          open={deleteRelationshipOpen}
          onOpenChange={setDeleteRelationshipOpen}
          onConfirm={handleDeleteRelationshipConfirm}
          title="Delete UOM Relationship"
          description="Are you sure you want to delete this UOM relationship? This action cannot be undone."
        />
      </CardContent>
    </Card>
  );
}
