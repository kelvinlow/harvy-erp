import { format } from "date-fns"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function StockIssueHeader() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="space-y-2">
        <Label htmlFor="issueNo">Issue No</Label>
        <Input id="issueNo" placeholder="NEW" readOnly />
      </div>
      <div className="space-y-2">
        <Label htmlFor="referenceNo">Reference No</Label>
        <Input id="referenceNo" placeholder="Enter reference number" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input id="date" value={format(new Date(), "MMMM do, yyyy")} readOnly />
      </div>
    </div>
  )
}

