'use client';

import { Home, Search, ShoppingBag, ListOrdered, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function BottomNav() {
    const pathname = usePathname();

    const NAV_ITEMS = [
        { label: 'Home', icon: Home, href: '/' },
        { label: 'Search', icon: Search, href: '/search' }, // Will open overlay
        { label: 'Cart', icon: ShoppingBag, href: '/cart' },
        { label: 'Orders', icon: ListOrdered, href: '/orders' },
        { label: 'Account', icon: User, href: '/account' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 block md:hidden bg-white/90 backdrop-blur-lg border-t border-[#e5e3d9] pb-safe pt-2 px-2 shadow-lg">
            <nav className="flex items-center justify-around h-[60px]">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${isActive ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/40'
                                }`}
                        >
                            <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
            {/* Safe area spacer for notched devices */}
            <div className="h-safe-bottom" />
        </div>
    );
}
