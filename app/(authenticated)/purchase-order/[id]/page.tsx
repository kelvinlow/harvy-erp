import { PurchaseOrderDetails } from '@/components/purchase-order-details';

export default function PurchaseOrderDetailsPage({
  params
}: {
  params: { id: string };
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-emerald-50 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Purchase Order Details</h1>
      </div>
      <PurchaseOrderDetails id={params.id} />
    </div>
  );
}
