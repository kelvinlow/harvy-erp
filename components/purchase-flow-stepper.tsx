"use client"

import { FileText, UserCheck, ShoppingCart, Truck, Package, Receipt } from 'lucide-react'
import { cn } from "@/lib/utils"

export type PurchaseStatus = 
  | "PURCHASE_REQUISITION"
  | "MANAGER_APPROVAL"
  | "PURCHASE_ORDER"
  | "DELIVERY_ORDER"
  | "INVENTORY_UPDATE"
  | "INVOICE"

interface PurchaseFlowStepperProps {
  currentStatus: PurchaseStatus
  className?: string
}

const steps = [
  {
    id: "PURCHASE_REQUISITION",
    title: "Purchase Requisition",
    description: "Initial purchase request",
    icon: FileText
  },
  {
    id: "MANAGER_APPROVAL",
    title: "Manager Approval",
    description: "Waiting for approval",
    icon: UserCheck
  },
  {
    id: "PURCHASE_ORDER",
    title: "Purchase Order",
    description: "Order processing",
    icon: ShoppingCart
  },
  {
    id: "DELIVERY_ORDER",
    title: "Delivery Order",
    description: "Item delivery status",
    icon: Truck
  },
  {
    id: "INVENTORY_UPDATE",
    title: "Inventory Update",
    description: "Stock management",
    icon: Package
  },
  {
    id: "INVOICE",
    title: "Invoice",
    description: "Payment processing",
    icon: Receipt
  }
] as const

export function PurchaseFlowStepper({ currentStatus, className }: PurchaseFlowStepperProps) {
  // Find the index of the current status
  const currentIndex = steps.findIndex(step => step.id === currentStatus)

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isActive = index <= currentIndex
          const isLastStep = index === steps.length - 1

          return (
            <div key={step.id} className="relative flex flex-1 flex-col items-center">
              {/* Step indicator */}
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted bg-background text-muted-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
              </div>

              {/* Step title and description */}
              <div className="mt-2 space-y-1 text-center">
                <p className={cn(
                  "text-sm font-medium",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {step.description}
                </p>
              </div>

              {/* Connector line */}
              {!isLastStep && (
                <div
                  className={cn(
                    "absolute left-[50%] top-5 h-[2px] w-full",
                    isActive ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

