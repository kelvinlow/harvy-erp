import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { PurchaseRequisitionForm } from '@/components/purchase-requisition-form';

export default function PurchaseRequisitionPage() {
  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Purchase Requisition</h1>
          </div>
          <PurchaseRequisitionForm />
        </div>
      </SidebarProvider>
    </div>
  );
}
