'use client';

import { useState } from 'react';
import { Edit2, Search, Trash2, Printer } from 'lucide-react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import type { Machine } from '@/types/machine';

interface MachineTableProps {
  data: Machine[];
  onEdit: (machine: Machine) => void;
  onDelete: (id: string) => void;
  onPrintBarcode: (machine: Machine) => void;
}

export function MachineTable({
  data,
  onEdit,
  onDelete,
  onPrintBarcode
}: MachineTableProps) {
  const [search, setSearch] = useState('');

  const filteredData = data.filter(
    (machine) =>
      machine.machineCode.toLowerCase().includes(search.toLowerCase()) ||
      machine.machineName.toLowerCase().includes(search.toLowerCase()) ||
      machine.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search machines..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Seq No</TableHead>
              <TableHead>Machine Code</TableHead>
              <TableHead>Machine Name</TableHead>
              <TableHead>Serial No</TableHead>
              <TableHead>Purchase Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Process Code</TableHead>
              <TableHead className="w-[140px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((machine) => (
              <TableRow key={machine.id}>
                <TableCell>{machine.seqNo}</TableCell>
                <TableCell className="font-medium">
                  {machine.machineCode}
                </TableCell>
                <TableCell>{machine.machineName}</TableCell>
                <TableCell>{machine.serialNumber}</TableCell>
                <TableCell>
                  {format(new Date(machine.purchaseDate), 'dd MMM yyyy')}
                </TableCell>
                <TableCell>{machine.location}</TableCell>
                <TableCell>{machine.processCode}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(machine)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(machine.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onPrintBarcode(machine)}
                    >
                      <Printer className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
