import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { PurchaseOrderList } from '@/components/purchase-order-list';

export default function PurchaseOrderPage() {
  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Purchase Orders</h1>
          </div>
          <PurchaseOrderList />
        </div>
      </SidebarProvider>
    </div>
  );
}
