import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Package, CheckSquare, FileSpreadsheet, ArrowUp, ArrowDown } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Purchase Requisitions
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
              +2 from last month
            </p>
          </CardContent>
        </Card>
        {/* Repeat other cards... */}
      </div>
    </div>
  )
}

