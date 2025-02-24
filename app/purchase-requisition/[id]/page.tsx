import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { PurchaseFlowStepper } from '@/components/purchase-flow-stepper';

// This would normally come from your database
const mockPurchaseRequisition = {
  id: 'PR001',
  status: 'MANAGER_APPROVAL'
  // ... other fields
};

export default function PurchaseRequisitionPage({
  params
}: {
  params: { id: string };
}) {
  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              Purchase Requisition #{params.id}
            </h1>
          </div>

          {/* Purchase Flow Stepper */}
          <div className="rounded-lg border bg-card p-6">
            <PurchaseFlowStepper
              currentStatus={mockPurchaseRequisition.status as any}
            />
          </div>

          {/* Rest of the purchase requisition details */}
          <div className="rounded-lg border bg-card p-6">
            {/* Your existing purchase requisition details here */}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
