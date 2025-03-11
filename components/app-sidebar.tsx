'use client';

import type React from 'react';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo } from 'react';
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
  },
  {
    title: 'Delivery Orders',
    href: '/delivery-orders',
    icon: faTruck
  }
];

export function AppSidebar() {
  const pathname = usePathname();
  const { openMobile, setOpenMobile } = useSidebar();

  // Calculate total menu items including subitems
  const totalMenuItems = useMemo(() => {
    return navigation.reduce((total, item) => {
      return total + 1 + (item.items?.length || 0);
    }, 0);
  }, []);

  // Calculate dynamic width based on menu items
  const sidebarWidth = useMemo(() => {
    const baseWidth = 16; // 16rem = 256px
    const itemWidth = 0.5; // 0.5rem = 8px per item
    const maxWidth = 20; // 24rem = 384px
    const calculatedWidth = baseWidth + totalMenuItems * itemWidth;
    return Math.min(calculatedWidth, maxWidth);
  }, [totalMenuItems]);

  // Handle mobile sidebar and resize events
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      if (!isMobile && openMobile) {
        setOpenMobile(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [openMobile, setOpenMobile]);

  return (
    <>
      {/* Mobile overlay with improved backdrop filter */}
      {openMobile && (
        <div
          className={cn(
            'fixed inset-0 z-40 bg-background/80 backdrop-blur-sm',
            'transition-opacity duration-300 ease-in-out md:hidden'
          )}
          onClick={() => setOpenMobile(false)}
          aria-hidden="true"
        />
      )}

      {/* Unified sidebar wrapper for both mobile and desktop */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-30 flex transform flex-col shadow-lg transition-all duration-300 ease-in-out md:sticky',
          'md:transition-[width,transform] md:duration-300',
          openMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          `w-[${sidebarWidth}rem]`
        )}
        style={
          {
            '--sidebar-width': `${sidebarWidth}rem`,
            '--sidebar-width-collapsed': '4rem'
          } as React.CSSProperties
        }
      >
        <Sidebar
          className={cn(
            'h-full border-r bg-background/95 backdrop-blur-md',
            'transition-[width,padding] duration-300 ease-in-out'
          )}
          collapsible="icon"
          variant="floating"
        >
          <SidebarHeader
            className={cn(
              'bg-gradient-to-br from-sky-50 via-indigo-50 to-emerald-50',
              'border-b border-border/50 backdrop-blur-sm'
            )}
          >
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <a href="/dashboard" className="flex items-center gap-2">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <FontAwesomeIcon icon={faGrip} className="size-4" />
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none">
                      <span className="font-semibold">HARVY DIGITAL CLOUD</span>
                      <span className="text-xs text-muted-foreground">
                        v0.0.1-prototype
                      </span>
                    </div>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent
            className={cn(
              'bg-gradient-to-br from-sky-50 via-indigo-50 to-emerald-50',
              'transition-[width,padding] duration-300 ease-in-out'
            )}
          >
            <SidebarGroup>
              <SidebarMenu>
                {navigation.map((item) => (
                  <SidebarMenuItem key={item.title} className="group">
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={!openMobile ? item.title : undefined}
                      className={cn(
                        'relative flex items-center gap-3 rounded-md px-3 py-2',
                        'transition-all duration-200 ease-in-out active:scale-[0.98]',
                        'hover:bg-accent/50 active:bg-accent',
                        pathname === item.href &&
                          'bg-accent font-medium text-accent-foreground',
                        'touch-manipulation md:touch-auto' // Better touch handling
                      )}
                    >
                      <a
                        href={item.href}
                        className="group/link relative z-10 flex items-center gap-2"
                      >
                        <FontAwesomeIcon
                          icon={item.icon}
                          className={cn(
                            'size-4 shrink-0 transition-colors duration-200',
                            pathname === item.href
                              ? 'text-primary'
                              : 'group-hover/link:text-primary'
                          )}
                        />
                        <span className="relative">
                          {pathname === item.href ? (
                            <span className="font-medium">{item.title}</span>
                          ) : (
                            item.title
                          )}
                        </span>
                      </a>
                    </SidebarMenuButton>

                    {item.items?.length && (
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem
                            key={subItem.title}
                            className="group"
                          >
                            <SidebarMenuSubButton
                              asChild
                              isActive={pathname === subItem.href}
                              className={cn(
                                'relative whitespace-normal break-words py-2 leading-tight transition-all duration-200 ease-in-out',
                                'before:absolute before:inset-0 before:z-0 before:rounded-sm before:opacity-0 before:transition-opacity before:duration-200',
                                'hover:before:opacity-100 before:bg-primary/5',
                                pathname === subItem.href &&
                                  'border-primary pl-3 bg-primary/10 font-medium'
                              )}
                            >
                              <a
                                href={subItem.href}
                                className="flex items-start group/link relative z-10"
                              >
                                <FontAwesomeIcon
                                  icon={subItem.icon}
                                  className={cn(
                                    'size-3.5 shrink-0 mr-2 mt-0.5 transition-colors duration-200',
                                    pathname === subItem.href
                                      ? 'text-primary'
                                      : 'group-hover/link:text-primary'
                                  )}
                                />
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          <SidebarRail className="hidden md:block" />
        </Sidebar>
      </div>

      {/* Mobile toggle button */}
      <Button
        variant="outline"
        size="icon"
        className={cn(
          'fixed left-4 top-4 z-50 md:hidden',
          'bg-background/95 backdrop-blur-md',
          'transition-transform duration-300',
          openMobile && 'translate-x-[calc(min(20rem,85vw)-1rem)]'
        )}
        onClick={() => setOpenMobile(!openMobile)}
        aria-label={openMobile ? 'Close sidebar' : 'Open sidebar'}
      >
        {openMobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
    </>
  );
}
