'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export function ImageGallery({ images }: { images: string[] }) {
    const [index, setIndex] = useState(0);

    const nextImage = () => setIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

    return (
        <div className="relative w-full aspect-square md:aspect-[4/3] bg-[#f4f3ef] overflow-hidden group">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                >
                    <Image
                        src={images[index]}
                        alt={`Product image ${index + 1}`}
                        fill
                        className="object-cover mix-blend-multiply"
                        priority
                    />
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows (Desktop) */}
            <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none md:pointer-events-auto">
                <button onClick={prevImage} className="p-2 rounded-full bg-white/80 hover:bg-white text-[#1a1a1a] shadow-md pointer-events-auto">
                    <ChevronLeft size={24} />
                </button>
                <button onClick={nextImage} className="p-2 rounded-full bg-white/80 hover:bg-white text-[#1a1a1a] shadow-md pointer-events-auto">
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-[#1a1a1a]' : 'w-2 bg-[#1a1a1a]/20'}`}
                    />
                ))}
            </div>
        </div>
    );
}
