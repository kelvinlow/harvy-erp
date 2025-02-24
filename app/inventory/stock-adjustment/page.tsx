import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { StockAdjustmentForm } from '@/components/stock-adjustment-form';

export default function StockAdjustmentPage() {
  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Stock Adjustment</h1>
          </div>
          <StockAdjustmentForm />
        </div>
      </SidebarProvider>
    </div>
  );
}
