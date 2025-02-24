import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { PurchaseOrderDetails } from '@/components/purchase-order-details';

export default function PurchaseOrderDetailsPage({
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
            <h1 className="text-2xl font-bold">Purchase Order Details</h1>
          </div>
          <PurchaseOrderDetails id={params.id} />
        </div>
      </SidebarProvider>
    </div>
  );
}
