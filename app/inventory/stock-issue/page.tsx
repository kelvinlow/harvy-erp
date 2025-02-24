import { StockIssueForm } from '@/components/stock-issue/stock-issue-form';

// This would come from your API
const mockStocks = [
  { id: '1', code: 'ST001', name: 'Item 1' },
  { id: '2', code: 'ST002', name: 'Item 2' },
  { id: '3', code: 'ST003', name: 'Item 3' }
];

interface StockItem {
  id: string;
  stockCode: string;
  description: string;
  cost: number;
  station: string;
  machineNo: string;
  sicNo: string;
  receivedBy: string;
  uom: string;
  quantity: number;
}

export default function StockIssuePage() {
  const [items, setItems] = React.useState<StockItem[]>([
    {
      id: '1',
      stockCode: '',
      description: '',
      cost: 0,
      station: '',
      machineNo: '',
      sicNo: '',
      receivedBy: '',
      uom: '',
      quantity: 0
    }
  ]);
  const [loading, setLoading] = React.useState(false);

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: (prev.length + 1).toString(),
        stockCode: '',
        description: '',
        cost: 0,
        station: '',
        machineNo: '',
        sicNo: '',
        receivedBy: '',
        uom: '',
        quantity: 0
      }
    ]);
  };

  const handlePrintIssue = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-emerald-50 p-8">
      <StockIssueForm />
    </div>
  );
}
