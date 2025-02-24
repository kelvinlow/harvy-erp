import { StockLedgerCard } from '@/components/stock-ledger-card';

export default function StockLedgerPage() {
  return (
    <div className="flex min-h-screen">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Stock Ledger</h1>
        </div>
        <StockLedgerCard />
      </div>  
    </div>
  );
}
