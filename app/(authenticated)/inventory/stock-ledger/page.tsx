import { StockLedgerCard } from '@/components/stock-ledger-card';

export default function StockLedgerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-emerald-50 p-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Stock Ledger</h1>
        </div>
        <StockLedgerCard />
      </div>
    </div>
  );
}
