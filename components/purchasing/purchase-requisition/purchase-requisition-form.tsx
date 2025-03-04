'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Loader2, Plus, Search, Trash2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useEnterNavigation } from '@/hooks/use-enter-navigation';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import type { InventoryItem, PurchaseRequisition } from '@/types';
// Import CompanySelector component
import { CompanySelector } from '@/components/company-selector'; // Adjust path as needed

// Mock inventory data - replace with API call
const inventoryItems: InventoryItem[] = [
  {
    id: '1',
    stockCode: 'WW0001',
    description: 'MOX MS6013 WELDING ROD 3.25MM',
    uomCode: 'PCS',
    quantityInHand: 100,
    lastPrice: 15.0,
    categoryCode: 'WW',
    groupCode: '01',
    partNumber: 'MS6013',
    locationNo: 'A1',
    totalCost: 1500.0,
    minStock: 50,
    maxStock: 200,
    averagePrice: 14.5,
    reorderLevel: 75,
    taxCode: 'STD',
    mode: 'SHOW'
  },
  {
    id: '2',
    stockCode: 'WW0002',
    description: 'MOX MS6013 WELDING ROD 3.25MM',
    uomCode: 'PCS',
    quantityInHand: 100,
    lastPrice: 15.0,
    categoryCode: 'WW',
    groupCode: '01',
    partNumber: 'MS6013',
    locationNo: 'A1',
    totalCost: 1500.0,
    minStock: 50,
    maxStock: 200,
    averagePrice: 14.5,
    reorderLevel: 75,
    taxCode: 'STD',
    mode: 'SHOW'
  }
  // Add more items as needed
];

export function PurchaseRequisitionForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);

  // Initialize the Enter key navigation
  useEnterNavigation(formRef);

  const form = useForm<PurchaseRequisition>({
    defaultValues: {
      company: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      items: [
        {
          id: '1',
          stockCode: '',
          description: '',
          quantity: 0,
          uom: '',
          unitPrice: 0,
          discount: 0,
          subAmount: 0,
          taxCode: '',
          taxRate: 0,
          station: '',
          totalAmount: 0
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    name: 'items',
    control: form.control
  });

  async function onSubmit(data: PurchaseRequisition) {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(data);
      toast({
        title: 'Success',
        description: 'Purchase requisition has been submitted.'
      });
      form.reset();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to submit purchase requisition.'
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const calculateTotals = React.useCallback(
    (items: PurchaseRequisition['items']) => {
      const subTotal = items.reduce((acc, item) => acc + item.subAmount, 0);
      const taxAmount = items.reduce(
        (acc, item) => acc + item.subAmount * item.taxRate,
        0
      );
      return {
        subTotal,
        taxAmount,
        total: subTotal + taxAmount
      };
    },
    []
  );

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <Card>
          <CardHeader>
            <CardTitle>Requisition Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Company</FormLabel>
                  <FormControl>
                    <CompanySelector
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={new Date(field.value)}
                          onSelect={(date) =>
                            field.onChange(format(date!, 'yyyy-MM-dd'))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="employeeNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee No</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="employeeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="referenceNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reference No</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="referenceNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department/Station Code</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="referenceNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department/Station</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="grid gap-4 md:grid-cols-6">
                <FormField
                  control={form.control}
                  name={`items.${index}.stockCode`}
                  render={({ field: itemField }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Stock Code</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                'w-full justify-between',
                                !field.stockCode && 'text-muted-foreground'
                              )}
                            >
                              {field.stockCode || 'Select stock'}
                              <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0">
                          <Command>
                            <CommandInput placeholder="Search stock..." />
                            <CommandList>
                              <CommandEmpty>No stock found.</CommandEmpty>
                              <CommandGroup>
                                {inventoryItems.map((item) => (
                                  <CommandItem
                                    key={item.stockCode}
                                    value={item.stockCode}
                                    onSelect={() => {
                                      itemField.onChange(item.stockCode);
                                      form.setValue(
                                        `items.${index}.description`,
                                        item.description
                                      );
                                      form.setValue(
                                        `items.${index}.uom`,
                                        item.uomCode
                                      );
                                      form.setValue(
                                        `items.${index}.unitPrice`,
                                        item.lastPrice
                                      );
                                    }}
                                  >
                                    {item.stockCode} - {item.description}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`items.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`items.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => {
                            field.onChange(Number(e.target.value));
                            const quantity = Number(e.target.value);
                            const unitPrice = form.getValues(
                              `items.${index}.unitPrice`
                            );
                            const subAmount = quantity * unitPrice;
                            form.setValue(
                              `items.${index}.subAmount`,
                              subAmount
                            );
                            form.setValue(
                              `items.${index}.totalAmount`,
                              subAmount
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`items.${index}.uom`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>UOM</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`items.${index}.unitPrice`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => {
                            field.onChange(Number(e.target.value));
                            const unitPrice = Number(e.target.value);
                            const quantity = form.getValues(
                              `items.${index}.quantity`
                            );
                            const subAmount = quantity * unitPrice;
                            form.setValue(
                              `items.${index}.subAmount`,
                              subAmount
                            );
                            form.setValue(
                              `items.${index}.totalAmount`,
                              subAmount
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-end">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() =>
                append({
                  id: String(fields.length + 1),
                  stockCode: '',
                  description: '',
                  quantity: 0,
                  uom: '',
                  unitPrice: 0,
                  discount: 0,
                  subAmount: 0,
                  taxCode: '',
                  taxRate: 0,
                  station: '',
                  totalAmount: 0
                })
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="remarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remarks</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm">
              {calculateTotals(form.watch('items')).total.toFixed(2)}
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Submit
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
