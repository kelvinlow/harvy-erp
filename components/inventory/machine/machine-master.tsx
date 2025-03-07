'use client';

import * as React from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MachineTable } from './machine-table';
import { MachineDialog } from './machine-dialog';
import { DeleteConfirmation } from '@/components/delete-confirmation';
import type { Machine } from '@/types/machine';

// Mock data
const mockMachines: Machine[] = [
  {
    id: '1',
    seqNo: 1,
    machineCode: 'OFF',
    machineName: 'OFFICE - GENERAL',
    serialNumber: '',
    purchaseDate: '2006-09-12',
    location: '',
    processCode: 'A',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    seqNo: 2,
    machineCode: 'CD-JMB',
    machineName: 'CON-JMB MULTI STEEL',
    serialNumber: '',
    purchaseDate: '2023-02-23',
    location: '',
    processCode: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    seqNo: 3,
    machineCode: 'ST-CON POND',
    machineName: 'CONDENSATE POND',
    serialNumber: '',
    purchaseDate: '2023-04-21',
    location: 'CONTRACTOR',
    processCode: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export function MachineMaster() {
  const [machines, setMachines] = React.useState<Machine[]>(mockMachines);
  const [open, setOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [selectedMachine, setSelectedMachine] = React.useState<Machine | null>(
    null
  );
  const [machineToDelete, setMachineToDelete] = React.useState<Machine | null>(
    null
  );

  const handleCreate = () => {
    setSelectedMachine(null);
    setOpen(true);
  };

  const handleEdit = (machine: Machine) => {
    setSelectedMachine(machine);
    setOpen(true);
  };

  const handleDeleteClick = (machine: Machine) => {
    setMachineToDelete(machine);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (machineToDelete) {
      // In a real app, you would call an API here
      setMachines(
        machines.filter((machine) => machine.id !== machineToDelete.id)
      );
      setDeleteOpen(false);
      setMachineToDelete(null);
    }
  };

  const handleSave = async (data: Partial<Machine>) => {
    if (selectedMachine) {
      // Update existing machine
      setMachines(
        machines.map((machine) =>
          machine.id === selectedMachine.id
            ? {
                ...selectedMachine,
                ...data,
                updatedAt: new Date().toISOString()
              }
            : machine
        )
      );
    } else {
      // Create new machine
      const newMachine: Machine = {
        id: Math.random().toString(36).substr(2, 9),
        seqNo: machines.length + 1,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as Machine;
      setMachines([...machines, newMachine]);
    }
    setOpen(false);
  };

  const handlePrintBarcode = (machine: Machine) => {
    // Implement barcode printing logic
    console.log('Print barcode for:', machine);
  };

  const handlePrintLinkStation = () => {
    // Implement link station printing logic
    console.log('Print link station');
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Machine Master</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrintLinkStation}>
            Print Link Station
          </Button>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            New Machine
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <MachineTable
          data={machines}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          onPrintBarcode={handlePrintBarcode}
        />
        <MachineDialog
          open={open}
          onOpenChange={setOpen}
          machine={selectedMachine}
          onSubmit={handleSave}
        />
        <DeleteConfirmation
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          onConfirm={handleDeleteConfirm}
          title="Delete Machine"
          description={`Are you sure you want to delete ${machineToDelete?.machineName}? This action cannot be undone.`}
        />
      </CardContent>
    </Card>
  );
}
