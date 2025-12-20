'use client';

import { ArrowLeft, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { BottomNav } from '@/components/layout/BottomNav';
import { PRODUCTS } from '@/lib/data';

export default function CartPage() {
    const router = useRouter();

    // Dummy Cart Data
    const cartItems = [
        { ...PRODUCTS[0], size: 9, quantity: 1 },
        { ...PRODUCTS[2], size: 8, quantity: 1 }
    ];

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 0; // Free
    const total = subtotal + shipping;

    return (
        <div className="min-h-screen bg-[#f9f9f7] pb-32">
            <div className="sticky top-0 z-40 bg-[#f9f9f7]/95 backdrop-blur-sm px-4 h-16 flex items-center gap-3 border-b border-[#e5e3d9]">
                <button onClick={() => router.back()} className="p-2 -ml-2 text-[#1a1a1a]">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold text-[#1a1a1a]">Shopping Cart ({cartItems.length})</h1>
            </div>

            <main className="container mx-auto max-w-2xl p-4">
                {cartItems.length > 0 ? (
                    <div className="space-y-6">
                        {cartItems.map((item, i) => (
                            <div key={i} className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm">
                                <div className="relative w-24 h-24 bg-[#f4f3ef] rounded-xl overflow-hidden shrink-0">
                                    <Image src={item.images[0]} alt={item.name} fill className="object-cover mix-blend-multiply" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-[#1a1a1a]">{item.name}</h3>
                                            <p className="font-bold">${item.price}</p>
                                        </div>
                                        <p className="text-sm text-[#1a1a1a]/60 capitalize">{item.category} • Size {item.size}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-3 bg-[#f9f9f7] rounded-full px-3 py-1">
                                            <button className="w-6 text-center text-lg leading-none">-</button>
                                            <span className="text-sm font-medium">{item.quantity}</span>
                                            <button className="w-6 text-center text-lg leading-none">+</button>
                                        </div>
                                        <button className="text-red-500 p-2"><Trash2 size={18} /></button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Summary */}
                        <div className="bg-white p-6 rounded-3xl shadow-sm space-y-4 mt-8">
                            <div className="flex justify-between text-sm">
                                <span className="text-[#1a1a1a]/60">Subtotal</span>
                                <span className="font-medium">${subtotal}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-[#1a1a1a]/60">Shipping</span>
                                <span className="font-medium text-green-600">Free</span>
                            </div>
                            <div className="border-t border-[#f9f9f7] pt-4 flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>${total}</span>
                            </div>
                        </div>

                        <button className="w-full bg-[#1a1a1a] text-white font-bold py-4 rounded-full text-lg shadow-lg active:scale-95 transition-transform">
                            Checkout
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-20 h-20 bg-[#e5e3d9] rounded-full flex items-center justify-center mb-6 text-[#1a1a1a]/40">
                            <ShoppingBag size={40} />
                        </div>
                        <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
                        <p className="text-[#1a1a1a]/60 mb-8">Looks like you haven&apos;t added anything yet.</p>
                        <Link href="/" className="bg-[#1a1a1a] text-white px-8 py-3 rounded-full font-bold">
                            Start Shopping
                        </Link>
                    </div>
                )}
            </main>

            <BottomNav />
        </div>
    );
}
