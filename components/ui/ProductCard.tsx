'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export type Product = {
    id: string;
    name: string;
    price: number;
    category: string;
    images: string[];
    badges?: string[];
};

interface ProductCardProps {
    product: Product;
    index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
    return (
        <Link href={`/product/${product.id}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                    duration: 0.5,
                    delay: (index % 4) * 0.1,
                    ease: "easeOut"
                }}
                className="group relative flex flex-col gap-3 cursor-pointer"
            >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#f4f3ef] shadow-sm transition-all duration-300 hover:shadow-md">
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />

                    <button
                        className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white text-black shadow-lg opacity-0 transition-all duration-300 hover:bg-black hover:text-white group-hover:translate-y-0 group-hover:opacity-100"
                        aria-label="Add to cart"
                        onClick={(e) => {
                            e.preventDefault();
                            // Add to cart logic will go here
                        }}
                    >
                        <Plus size={20} />
                    </button>

                    {product.badges && product.badges.length > 0 && (
                        <span className="absolute top-3 left-3 rounded-full bg-[#e5e3d9] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black/80">
                            {product.badges[0]}
                        </span>
                    )}
                </div>

                <div>
                    <h3 className="text-base font-medium text-[#1a1a1a] leading-tight group-hover:underline underline-offset-2 decoration-black/50">{product.name}</h3>
                    <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-[#1a1a1a]/60 capitalize">{product.category}</p>
                        <span className="text-base font-semibold text-[#1a1a1a]">${product.price}</span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
