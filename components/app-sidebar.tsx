'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Menu, X } from 'lucide-react';
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

import { Button } from '@/components/ui/button';
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
  SidebarRail,
  useSidebar
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

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
  const { openMobile, setOpenMobile } = useSidebar();

  // Close sidebar when route changes on mobile
  useEffect(() => {
    const handleRouteChange = () => {
      if (window.innerWidth < 768) {
        setOpenMobile(false);
      }
    };

    handleRouteChange();
    window.addEventListener('resize', handleRouteChange);

    return () => {
      window.removeEventListener('resize', handleRouteChange);
    };
  }, [pathname, setOpenMobile]);

  return (
    <>
      {/* Semi-transparent overlay with lower z-index */}
      {openMobile && (
        <div
          className="fixed inset-0 z-20 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ease-in-out md:hidden"
          onClick={() => setOpenMobile(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar wrapper with higher z-index */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-30 flex w-72 transform flex-col transition-transform duration-300 ease-in-out md:sticky md:translate-x-0',
          openMobile ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <Sidebar
          className="h-full border-r bg-background/95 backdrop-blur-sm"
          collapsible="icon"
          variant="floating"
        >
          <SidebarHeader className="bg-gradient-to-br from-sky-50 to-emerald-80">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <a href="/" className="flex items-center gap-2">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <FontAwesomeIcon icon={faGrip} className="size-4" />
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none">
                      <span className="font-semibold">HARVY-ERP</span>
                      <span className="text-xs text-muted-foreground">
                        v1.0.0
                      </span>
                    </div>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarContent className="bg-gradient-to-br from-sky-50 to-emerald-80">
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
                              <a
                                href={subItem.href}
                                className="flex items-start"
                              >
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
      </div>

      {/* Toggle button with highest z-index */}
      <Button
        variant="outline"
        size="icon"
        className="fixed left-4 top-4 z-40 md:hidden"
        onClick={() => setOpenMobile(!openMobile)}
        aria-label={openMobile ? 'Close sidebar' : 'Open sidebar'}
      >
        {openMobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
    </>
  );
}
