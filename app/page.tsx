'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, ArrowRight, Plus } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

// --- Dummy Data ---
// Generating 25 dummy products with realistic names
const PRODUCTS = Array.from({ length: 25 }).map((_, i) => {
  const names = [
    'Air Stride One', 'Urban Trekker', 'Cloud Walker', 'Summit Peak', 'Metro Glide',
    'Velocity X', 'Terra Firma', 'Zenith Runner', 'Apex Drift', 'Nova Blast',
    'Horizon Dash', 'Quantum Leap', 'Stellar Pace', 'Gravity Defy', 'Aero Flux'
  ];
  return {
    id: i + 1,
    name: names[i % names.length] + (Math.floor(i / names.length) > 0 ? ` V${Math.floor(i / names.length) + 1}` : ''),
    price: 120 + (i * 17) % 330, // Deterministic price
    category: ['Running', 'Lifestyle', 'Trail'][i % 3],
    image: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff', // Red/White Nike
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa', // Green Nike
      'https://images.unsplash.com/photo-1560769625-ed597487d9dd', // White
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a', // Blue/Yellow
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5', // New Balance Grey
      'https://images.unsplash.com/photo-1525966543048-b8ac86af3267', // Hanging sneakers
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d', // Black
      'https://images.unsplash.com/photo-1543508282-6319a3e2621f', // Brown boots style
      'https://images.unsplash.com/photo-1603808033192-082d6919d3e1', // Converse style
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2'  // White running
    ][i % 10] + '?w=800&q=80'
  };
});

// --- Components ---

function HeroSection() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]); // Parallax effect

  return (
    <section ref={ref} className="relative h-[90vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center bg-[#f9f9f7]">
      {/* Parallax Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0 opacity-90"
      >
        <Image
          src="https://images.unsplash.com/photo-1556906781-9a412961d28c?w=1600&q=80"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#f9f9f7]/30 mix-blend-overlay" />
        <div className="absolute inset-0 bg-black/10" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 1
          }}
          className="text-6xl md:text-8xl font-bold tracking-tighter text-[#1a1a1a] mb-8 mix-blend-color-dodge md:mix-blend-darken drop-shadow-sm"
        >
          Walk Your Way
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.2
          }}
        >
          <button className="group relative overflow-hidden rounded-full bg-[#1a1a1a] px-8 py-4 text-white transition-all hover:bg-neutral-800 hover:scale-105 hover:shadow-xl active:scale-95">
            <span className="relative flex items-center gap-2 text-lg font-medium">
              Shop Collection <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-[#1a1a1a]"
      >
        <div className="h-10 w-[1px] bg-[#1a1a1a]/20 mx-auto mb-2" />
        <span className="text-xs uppercase tracking-widest text-[#1a1a1a]/60">Scroll</span>
      </motion.div>
    </section>
  );
}

function ProductCard({ product, index }: { product: typeof PRODUCTS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: (index % 4) * 0.1, // Stagger effect based on column position approx
        ease: [0.215, 0.610, 0.355, 1.000] // Cubic bezier for "heavy" feel
      }}
      className="group relative flex flex-col gap-4"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-[#f4f3ef] shadow-sm transition-all duration-500 hover:shadow-lg hover:scale-[1.02]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Hover overlay and Add Button */}
        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5" />

        <button
          className="absolute bottom-4 right-4 translate-y-12 rounded-full bg-white p-3 text-[#1a1a1a] shadow-lg transition-all duration-300 hover:bg-[#1a1a1a] hover:text-white group-hover:translate-y-0"
          aria-label="Add to cart"
        >
          <Plus size={20} />
        </button>

        {/* Badge example */}
        {index < 3 && (
          <span className="absolute top-4 left-4 rounded-full bg-[#e5e3d9] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#1a1a1a]">New</span>
        )}
      </div>

      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-[#1a1a1a]/60 mb-1">{product.category}</p>
          <h3 className="text-lg font-medium text-[#1a1a1a] group-hover:underline decoration-1 underline-offset-4">{product.name}</h3>
        </div>
        <span className="text-lg font-semibold text-[#1a1a1a]">${product.price}</span>
      </div>
    </motion.div>
  );
}

// --- Main Page Component ---

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f9f9f7] text-[#1a1a1a]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 mix-blend-difference text-white pointer-events-none">
        <div className="pointer-events-auto">
          <span className="text-2xl font-bold tracking-tight">One Stop.</span>
        </div>
        <div className="pointer-events-auto flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#" className="hover:opacity-70 transition-opacity">Men</a>
            <a href="#" className="hover:opacity-70 transition-opacity">Women</a>
            <a href="#" className="hover:opacity-70 transition-opacity">Sale</a>
          </div>
          <button aria-label="Cart" className="hover:opacity-70 transition-opacity">
            <ShoppingBag />
          </button>
        </div>
      </nav>

      <HeroSection />

      <main className="container mx-auto px-4 py-24">
        <div className="mb-20 flex flex-col md:flex-row items-end justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold tracking-tight text-[#1a1a1a] md:text-5xl"
          >
            Latest Arrivals
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[#1a1a1a]/60 max-w-md text-left md:text-right"
          >
            Explore our new collection of performance and lifestyle footwear designed for the urban explorer.
          </motion.p>
        </div>

        {/* Waterfall Grid */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="mt-24 flex justify-center">
          <button className="border-b border-[#1a1a1a] pb-1 text-lg font-medium text-[#1a1a1a] transition-colors hover:text-[#1a1a1a]/60">
            View All Products
          </button>
        </div>
      </main>

      <footer className="bg-[#e5e3d9] py-16 text-center text-[#1a1a1a]">
        <h3 className="text-2xl font-bold mb-6">One Stop.</h3>
        <div className="flex justify-center gap-6 mb-8 text-sm font-medium text-[#1a1a1a]/70">
          <a href="#" className="hover:text-[#1a1a1a]">Instagram</a>
          <a href="#" className="hover:text-[#1a1a1a]">Twitter</a>
          <a href="#" className="hover:text-[#1a1a1a]">Facebook</a>
        </div>
        <p className="text-[#1a1a1a]/40 text-sm">&copy; {new Date().getFullYear()} One Stop. All rights reserved.</p>
      </footer>
    </div>
  );
}
