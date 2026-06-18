'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';

type FilterState = {
    priceRange: [number, number];
    colors: string[];
    sizes: number[];
};

interface FilterDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (filters: FilterState) => void;
}

export function FilterDrawer({ isOpen, onClose, onApply }: FilterDrawerProps) {
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<number[]>([]);

    const COLORS = ['Black', 'White', 'Navy', 'Red', 'Grey', 'Beige'];
    const SIZES = [7, 8, 8.5, 9, 9.5, 10, 11, 12];

    const handleApply = () => {
        onApply({ priceRange, colors: selectedColors, sizes: selectedSizes });
        onClose();
    };

    const toggleColor = (color: string) => {
        setSelectedColors(prev =>
            prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
        );
    };

    const toggleSize = (size: number) => {
        setSelectedSizes(prev =>
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        );
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                    />



                    {/* Drawer */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed bottom-0 left-0 right-0 z-50 h-[85vh] rounded-t-3xl bg-white shadow-2xl flex flex-col"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h3 className="text-xl font-bold text-[#1a1a1a]">Filters</h3>
                            <button onClick={onClose} className="p-2 -mr-2 text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-10">
                            {/* Price */}
                            <section>
                                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Price Range</h4>
                                <div className="flex gap-4 items-center">
                                    <span className="text-lg font-medium">${priceRange[0]}</span>
                                    <input
                                        type="range"
                                        min="0"
                                        max="500"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                        className="flex-1 accent-[#1a1a1a] h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <span className="text-lg font-medium">${priceRange[1]}</span>
                                </div>
                            </section>

                            {/* Colors */}
                            <section>
                                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Color</h4>
                                <div className="flex flex-wrap gap-3">
                                    {COLORS.map(color => (
                                        <button
                                            key={color}
                                            onClick={() => toggleColor(color)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${selectedColors.includes(color)
                                                ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white'
                                                : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                                }`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </section>

                            {/* Sizes */}
                            <section>
                                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Size (US)</h4>
                                <div className="grid grid-cols-4 gap-3">
                                    {SIZES.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => toggleSize(size)}
                                            className={`flex items-center justify-center py-3 rounded-xl border transition-all font-medium ${selectedSizes.includes(size)
                                                ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white'
                                                : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </section>
                        </div>

                        <div className="p-6 border-t border-gray-100 bg-white pb-safe">
                            <button
                                onClick={handleApply}
                                className="w-full bg-[#1a1a1a] text-white font-bold py-4 rounded-full text-lg shadow-lg active:scale-95 transition-transform"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
