"use client"

import { Toaster } from "@/components/ui/toaster"
import { useRouter } from "next/navigation"

// This layout doesn't wrap content in html/body tags
export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  return (
    <div className="flex min-h-screen">
        <div className="container mx-auto p-6">{children}</div>
        <Toaster />
    </div>
  );
}

