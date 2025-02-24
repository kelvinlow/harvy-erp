import { InventoryList } from "@/components/inventory-list"

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Inventory</h1>
      </div>
      <InventoryList />
    </div>
  )
}

