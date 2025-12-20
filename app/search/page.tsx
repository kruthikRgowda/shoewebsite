'use client';

import { Search, X, TrendingUp, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';

import { PRODUCTS } from '@/lib/data';
import { ProductCard } from '@/components/ui/ProductCard';
import { BottomNav } from '@/components/layout/BottomNav';

export default function SearchPage() {
    const router = useRouter();
    const [query, setQuery] = useState('');

    // Auto-focus logic could go here if we were using a ref, but standard input focus is often blocked on mobile nav without user interaction.
    // However, since this is a page navigation, we can autoFocus the input.

    const filteredProducts = useMemo(() => {
        if (!query) return [];
        const lowerQuery = query.toLowerCase();
        return PRODUCTS.filter(p =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.category.toLowerCase().includes(lowerQuery) ||
            p.badges?.some(b => b.toLowerCase().includes(lowerQuery))
        );
    }, [query]);

    const TRENDING = ['Running', 'White Shoes', 'Summer Sale', 'Kids Boots'];

    return (
        <div className="min-h-screen bg-[#f9f9f7] pb-20">
            {/* Search Header */}
            <div className="sticky top-0 z-50 bg-[#f9f9f7] p-4 shadow-sm">
                <div className="relative flex items-center gap-3">
                    <button onClick={() => router.back()} className="p-2 -ml-2 text-[#1a1a1a]/60">
                        <ArrowLeft size={24} />
                    </button>
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1a1a1a]/40" size={18} />
                        <input
                            type="text"
                            placeholder="Search shoes, gear..."
                            className="w-full rounded-full bg-[#e5e3d9]/50 py-3 pl-10 pr-10 text-base font-medium text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/10"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoFocus
                        />
                        {query && (
                            <button
                                onClick={() => setQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1a1a1a]/40 p-1"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="px-4 py-6">
                {/* Initial State / Trending */}
                {!query && (
                    <div className="space-y-8">
                        <section>
                            <div className="flex items-center gap-2 mb-4 text-[#1a1a1a]/60 font-semibold text-sm uppercase tracking-wider">
                                <TrendingUp size={16} />
                                Trending Searches
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {TRENDING.map(term => (
                                    <button
                                        key={term}
                                        onClick={() => setQuery(term)}
                                        className="rounded-full border border-[#e5e3d9] bg-white px-4 py-2 text-sm font-medium text-[#1a1a1a] transition-colors hover:bg-[#1a1a1a] hover:text-white"
                                    >
                                        {term}
                                    </button>
                                ))}
                            </div>
                        </section>
                    </div>
                )}

                {/* Results */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4">
                    {filteredProducts.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>

                {query && filteredProducts.length === 0 && (
                    <div className="text-center py-20 text-[#1a1a1a]/40">
                        <p>No results found for &quot;{query}&quot;</p>
                    </div>
                )}
            </div>

            <BottomNav />
        </div>
    );
}
