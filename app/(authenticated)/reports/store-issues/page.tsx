import { StoreIssuesReport } from "@/components/store-issues-report"

export default function StoreIssuesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Store Issues Report</h1>
      </div>
      <StoreIssuesReport />
    </div>
  )
}

