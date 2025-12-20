'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowLeft, ChevronDown } from 'lucide-react';

import { PRODUCTS, CATEGORIES } from '@/lib/data';
import { ProductCard } from '@/components/ui/ProductCard';
import { BottomNav } from '@/components/layout/BottomNav';
import { FilterDrawer } from '@/components/layout/FilterDrawer';

export default function CategoryPage() {
    const params = useParams();
    const router = useRouter();
    const category = params.category as string;

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [sortBy, setSortBy] = useState('popular'); // popular | price-asc | price-desc | new

    const categoryName = category === 'all'
        ? 'All Products'
        : CATEGORIES.find(c => c.id === category)?.name || 'Products';

    // Filters State
    const [activeFilters, setActiveFilters] = useState<{
        priceRange: [number, number];
        colors: string[];
        sizes: number[];
    }>({ priceRange: [0, 500], colors: [], sizes: [] });

    const filteredProducts = useMemo(() => {
        const result = PRODUCTS.filter(p => {
            if (category !== 'all' && p.category !== category) return false;

            // Filter Logic
            if (p.price > activeFilters.priceRange[1]) return false;
            if (activeFilters.colors.length > 0 && !activeFilters.colors.some(c => p.colors.includes(c))) return false;
            if (activeFilters.sizes.length > 0 && !activeFilters.sizes.some(s => p.sizes.includes(s))) return false;

            return true;
        });

        // Sort Logic
        if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
        else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
        else if (sortBy === 'new') result.reverse(); // Simplified "new"

        return result;
    }, [category, activeFilters, sortBy]);

    return (
        <div className="min-h-screen bg-[#f9f9f7] pb-20">
            <div className="sticky top-0 z-40 bg-[#f9f9f7]/95 backdrop-blur-sm border-b border-[#e5e3d9]">
                <div className="flex items-center justify-between px-4 h-16">
                    <div className="flex items-center gap-3">
                        <button onClick={() => router.push('/')} className="p-2 -ml-2 text-[#1a1a1a]">
                            <ArrowLeft size={24} />
                        </button>
                        <h1 className="text-xl font-bold text-[#1a1a1a] capitalize">{categoryName}</h1>
                    </div>

                    <div className="flex gap-2">
                        <button onClick={() => setIsFilterOpen(true)} className="p-2 text-[#1a1a1a] hover:bg-black/5 rounded-full">
                            <SlidersHorizontal size={20} />
                        </button>
                    </div>
                </div>

                {/* Sub-header controls (Mobile scrollable) */}
                <div className="flex items-center gap-2 px-4 pb-3 overflow-x-auto no-scrollbar">
                    <div className="relative">
                        <select
                            className="appearance-none bg-white border border-[#e5e3d9] rounded-full pl-4 pr-8 py-1.5 text-sm font-medium text-[#1a1a1a] focus:outline-none"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="popular">Popular</option>
                            <option value="new">Newest</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1a1a1a]/60 pointer-events-none" />
                    </div>

                    {/* Quick Filter Badges (Could be more) */}
                    <div className="text-sm text-[#1a1a1a]/60 ml-auto whitespace-nowrap">
                        {filteredProducts.length} Results
                    </div>
                </div>
            </div>

            <div className="p-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4">
                    {filteredProducts.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="py-20 text-center text-[#1a1a1a]/40">
                        <p>No products found matching your filters.</p>
                        <button
                            onClick={() => setActiveFilters({ priceRange: [0, 500], colors: [], sizes: [] })}
                            className="mt-4 text-[#1a1a1a] font-medium underline"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>

            <FilterDrawer
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                onApply={setActiveFilters}
            />
            <BottomNav />
        </div>
    );
}
