'use client';
import { usePathname } from 'next/navigation';
import {
  Box,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Store,
  Truck
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from '@/components/ui/sidebar';

// Navigation data based on your file structure
const navigation = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'Delivery Orders',
    href: '/delivery-orders',
    icon: Truck
  },
  {
    title: 'Inventory',
    href: '/inventory',
    icon: Package,
    items: [
      {
        title: 'Stock Issue',
        href: '/inventory/stock-issue'
      },
      {
        title: 'Daily Transaction',
        href: '/inventory/daily-transaction'
      },
      {
        title: 'Stock Adjustment',
        href: '/inventory/stock-adjustment'
      },
      {
        title: 'Stock Ledger',
        href: '/inventory/stock-ledger'
      },
      {
        title: 'Internal Transfer',
        href: '/inventory/internal-transfer'
      }
    ]
  },
  {
    title: 'Purchase',
    href: '/purchase-order',
    icon: ShoppingCart,
    items: [
      {
        title: 'Purchase Order',
        href: '/purchase-order'
      },
      {
        title: 'Purchase Requisition',
        href: '/purchase-requisition'
      },
      {
        title: 'Internal Purchase Requisition',
        href: '/internal-purchase-requisition'
      }
    ]
  },
  {
    title: 'Store Issues',
    href: '/reports/store-issues',
    icon: Store
  }
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="h-[calc(100vh-4rem)] bg-gradient-to-br from-sky-50 via-indigo-50">
      {' '}
      {/* Adjust height to account for top nav */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Box className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">HARVY-ERP</span>
                  <span className="text-xs text-muted-foreground">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navigation.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.title}
                >
                  <a href={item.href}>
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === subItem.href}
                        >
                          <a href={subItem.href}>{subItem.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
