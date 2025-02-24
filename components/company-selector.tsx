"use client"

import { Building2, Factory } from 'lucide-react'
import { cn } from "@/lib/utils"

interface CompanySelectorProps {
  value: string
  onChange: (value: string) => void
}

export function CompanySelector({ value, onChange }: CompanySelectorProps) {
  const companies = [
    {
      id: "thian",
      name: "Thian Company",
      description: "Request items for Thian Company operations",
      icon: Building2
    },
    {
      id: "he",
      name: "HE Company",
      description: "Request items for HE Company operations",
      icon: Factory
    },
    {
      id: "shin",
      name: "Shin Company",
      description: "Request items for Shin Company operations",
      icon: Building2
    },
    {
      id: "sheng",
      name: "Sheng Company",
      description: "Request items for Sheng Company operations",
      icon: Factory
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {companies.map((company) => {
        const Icon = company.icon
        return (
          <div
            key={company.id}
            className={cn(
              "relative rounded-lg border-2 p-4 cursor-pointer transition-colors hover:bg-accent",
              value === company.id 
                ? "border-primary bg-accent" 
                : "border-muted hover:border-accent"
            )}
            onClick={() => onChange(company.id)}
          >
            <div className="mb-3">
              <Icon className={cn(
                "h-6 w-6",
                value === company.id ? "text-primary" : "text-muted-foreground"
              )} />
            </div>
            <h3 className="font-medium">{company.name}</h3>
            <p className="text-sm text-muted-foreground">{company.description}</p>
          </div>
        )
      })}
    </div>
  )
}

