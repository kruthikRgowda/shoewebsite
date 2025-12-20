'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Star, Truck, ShieldCheck, Heart, Share2, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

import { PRODUCTS } from '@/lib/data';
import { ImageGallery } from '@/components/ui/ImageGallery';
import { ProductCard } from '@/components/ui/ProductCard';

export default function ProductPage() {
    const params = useParams();
    const router = useRouter();
    const product = PRODUCTS.find(p => p.id === params.id);

    const [selectedSize, setSelectedSize] = useState<number | null>(null);
    const [quantity, setQuantity] = useState(1);

    if (!product) return <div className="p-20 text-center">Product not found</div>;

    return (
        <div className="min-h-screen bg-[#f9f9f7] pb-32">
            {/* Sticky Header */}
            <div className="sticky top-0 z-40 bg-[#f9f9f7]/95 backdrop-blur-sm px-4 h-16 flex items-center justify-between border-b border-[#e5e3d9] md:hidden">
                <button onClick={() => router.back()} className="p-2 -ml-2 text-[#1a1a1a]">
                    <ArrowLeft size={24} />
                </button>
                <div className="flex gap-4">
                    <button className="text-[#1a1a1a]"><Share2 size={24} /></button>
                    <button className="text-[#1a1a1a]"><Heart size={24} /></button>
                </div>
            </div>

            <main className="container mx-auto max-w-6xl md:pt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                    {/* Left: Gallery */}
                    <div className="space-y-4">
                        <ImageGallery images={product.images} />
                        <div className="hidden md:flex gap-4 overflow-x-auto pb-4">
                            {product.images.map((img, i) => (
                                <div key={i} className="relative w-24 h-24 flex-shrink-0 bg-[#f4f3ef] rounded-lg overflow-hidden cursor-pointer border hover:border-black">
                                    {/* Thumbnail impl would go here, reusing Image logic */}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div className="px-4 md:px-0">
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-medium text-[#1a1a1a]/60 capitalize">{product.category}</p>
                                <div className="flex items-center gap-1 text-sm font-medium">
                                    <Star size={14} className="fill-black" />
                                    {product.reviews.rating} ({product.reviews.count} reviews)
                                </div>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] mb-2">{product.name}</h1>
                            <p className="text-2xl font-semibold text-[#1a1a1a]">${product.price}</p>
                        </div>

                        <div className="mb-8">
                            <p className="text-[#1a1a1a]/80 leading-relaxed">{product.description}</p>
                        </div>

                        {/* Size Selector */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-bold text-[#1a1a1a]">Select Size (US)</span>
                                <button className="text-sm underline text-[#1a1a1a]/60">Size Guide</button>
                            </div>
                            <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                                {product.sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`h-12 rounded-lg border font-medium transition-all ${selectedSize === size
                                            ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                                            : 'bg-white border-[#e5e3d9] text-[#1a1a1a] hover:border-[#1a1a1a]'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Delivery & Trust */}
                        <div className="space-y-4 border-t border-[#e5e3d9] pt-6 mb-8">
                            <div className="flex items-start gap-4">
                                <Truck className="shrink-0 mt-1" />
                                <div>
                                    <p className="font-bold text-sm">Free Delivery</p>
                                    <p className="text-sm text-[#1a1a1a]/60">Expected delivery: 2-4 business days</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <ShieldCheck className="shrink-0 mt-1" />
                                <div>
                                    <p className="font-bold text-sm">Authenticity Guaranteed</p>
                                    <p className="text-sm text-[#1a1a1a]/60">Verified by our experts</p>
                                </div>
                            </div>
                        </div>

                        {/* Details Accordion (Simulated) */}
                        <div className="space-y-4 border-t border-[#e5e3d9] pt-6">
                            <h3 className="font-bold">Product Details</h3>
                            <ul className="list-disc list-inside text-sm text-[#1a1a1a]/70 space-y-2">
                                <li>Material: {product.details.material}</li>
                                <li>Sole: {product.details.sole}</li>
                                <li>Fit: {product.details.fit}</li>
                                <li>Care: {product.details.care}</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <div className="mt-20 px-4 md:px-0">
                    <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {PRODUCTS.slice(4, 8).map((p, i) => (
                            <ProductCard key={p.id} product={p} index={i} />
                        ))}
                    </div>
                </div>
            </main>

            {/* Sticky Bottom Action Bar (Mobile) */}
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#e5e3d9] p-4 pb-safe flex items-center gap-4 md:hidden shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-3 border rounded-full px-3 py-2">
                    <button disabled={quantity <= 1} onClick={() => setQuantity(q => q - 1)}><Minus size={16} /></button>
                    <span className="font-medium w-4 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(q => q + 1)}><Plus size={16} /></button>
                </div>
                <button
                    className="flex-1 bg-[#1a1a1a] text-white font-bold py-3 rounded-full shadow-lg active:scale-95 transition-transform"
                    disabled={!selectedSize}
                >
                    {selectedSize ? `Add to Cart - $${product.price * quantity}` : 'Select Size'}
                </button>
            </div>
        </div>
    );
}
