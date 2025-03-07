'use client';

import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGrip,
  faTruck,
  faCubes,
  faBox,
  faClipboardList,
  faBoxArchive,
  faBook,
  faRightLeft,
  faCartShopping,
  faFileInvoice,
  faFileLines,
  faFileImport,
  faStore
} from '@fortawesome/free-solid-svg-icons';

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
    icon: faGrip
  },
  {
    title: 'Delivery Orders',
    href: '/delivery-orders',
    icon: faTruck
  },
  {
    title: 'Inventory',
    href: '/inventory',
    icon: faCubes,
    items: [
      {
        title: 'Stock Issue',
        href: '/inventory/stock-issue',
        icon: faBox
      },
      {
        title: 'Daily Transaction',
        href: '/inventory/daily-transaction',
        icon: faClipboardList
      },
      {
        title: 'Stock Adjustment',
        href: '/inventory/stock-adjustment',
        icon: faBoxArchive
      },
      {
        title: 'Stock Ledger',
        href: '/inventory/stock-ledger',
        icon: faBook
      },
      {
        title: 'Internal Transfer',
        href: '/inventory/internal-transfer',
        icon: faRightLeft
      },
      {
        title: 'UOM',
        href: '/inventory/uom',
        icon: faBook
      },
      {
        title: 'Machine',
        href: '/inventory/machine',
        icon: faBook
      }
    ]
  },
  {
    title: 'Purchase',
    href: '/purchase-order',
    icon: faCartShopping,
    items: [
      {
        title: 'Purchase Order',
        href: '/purchase-order',
        icon: faFileInvoice
      },
      {
        title: 'Purchase Requisition',
        href: '/purchase-requisition',
        icon: faFileLines
      },
      {
        title: 'Internal Purchase Requisition',
        href: '/internal-purchase-requisition',
        icon: faFileImport
      }
    ]
  },
  {
    title: 'Store Issues',
    href: '/reports/store-issues',
    icon: faStore
  }
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      className="border-r bg-gradient-to-br from-sky-50 via-indigo-50 to-white" // Remove top-0 and padding classes
      collapsible="icon"
      variant="floating"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/" className="flex items-center gap-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <FontAwesomeIcon icon={faGrip} className="size-4" />
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
                  className="whitespace-normal break-words"
                >
                  <a href={item.href}>
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="size-4 shrink-0"
                    />
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
                          className="whitespace-normal break-words py-2 leading-tight"
                        >
                          <a href={subItem.href} className="flex items-start">
                            <FontAwesomeIcon
                              icon={subItem.icon}
                              className="size-3.5 shrink-0 mr-2 mt-0.5"
                            />
                            <span>{subItem.title}</span>
                          </a>
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
