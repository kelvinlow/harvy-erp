import { PurchaseRequisitionForm } from '@/components/purchasing/purchase-requisition/purchase-requisition-form';

export default function PurchaseRequisitionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-emerald-50 p-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Purchase Requisition</h1>
        </div>
        <PurchaseRequisitionForm />
      </div>
    </div>
  );
}
