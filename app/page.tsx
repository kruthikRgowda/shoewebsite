'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

import { BottomNav } from '@/components/layout/BottomNav';
import { ProductCard } from '@/components/ui/ProductCard';
import { CATEGORIES, PRODUCTS } from '@/lib/data';

// --- Components ---

function HeroSection() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]); // Parallax effect

  return (
    <section ref={ref} className="relative h-[85vh] min-h-[550px] w-full overflow-hidden flex items-center justify-center bg-[#f9f9f7]">
      {/* Parallax Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0 opacity-100"
      >
        <Image
          src="https://images.unsplash.com/photo-1556906781-9a412961d28c?w=1600&q=80"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/10" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 1
          }}
          className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6 drop-shadow-md"
        >
          Walk Your Way
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.2
          }}
        >
          <Link href="/shop/all" className="inline-block">
            <button className="group relative overflow-hidden rounded-full bg-white px-8 py-3.5 text-black transition-all hover:bg-neutral-100 hover:scale-105 active:scale-95">
              <span className="relative flex items-center gap-2 text-base font-semibold">
                Shop Collection <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function CategoryGrid() {
  return (
    <section className="py-16 overflow-x-auto no-scrollbar">
      <div className="px-6 mb-6 flex justify-between items-end">
        <h2 className="text-2xl font-bold tracking-tight text-[#1a1a1a]">Shop by Category</h2>
      </div>
      <div className="flex gap-4 px-6 md:grid md:grid-cols-6 md:gap-4 overflow-visible">
        {CATEGORIES.map((cat) => (
          <Link key={cat.id} href={`/shop/${cat.id}`} className="flex-shrink-0 group">
            <div className="relative w-32 h-32 md:w-full md:h-40 rounded-full md:rounded-2xl overflow-hidden mb-3 border-2 border-transparent group-hover:border-[#1a1a1a] transition-all">
              <Image src={cat.image} alt={cat.name} fill className="object-cover" sizes="150px" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            </div>
            <p className="text-center text-sm font-medium text-[#1a1a1a]">{cat.name}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

// --- Main Page Component ---

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f9f9f7] text-[#1a1a1a] pb-24 md:pb-0">
      {/* Desktop Navigation Override (Mobile uses BottomNav) */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 items-center justify-between px-8 py-6 mix-blend-difference text-white pointer-events-none">
        <div className="pointer-events-auto">
          <span className="text-2xl font-bold tracking-tight">One Stop.</span>
        </div>
        <div className="pointer-events-auto flex items-center gap-8 text-sm font-medium">
          <Link href="/shop/men" className="hover:opacity-70 transition-opacity">Men</Link>
          <Link href="/shop/women" className="hover:opacity-70 transition-opacity">Women</Link>
          <Link href="/shop/kids" className="hover:opacity-70 transition-opacity">Kids</Link>
          <Link href="/account" className="hover:opacity-70 transition-opacity">Account</Link>
          <Link href="/cart" className="hover:opacity-70 transition-opacity">Cart (0)</Link>
        </div>
      </nav>

      {/* Mobile Logo Header */}
      <div className="md:hidden absolute top-0 left-0 right-0 z-40 p-4 flex justify-center pointer-events-none">
        <span className="text-xl font-bold text-white drop-shadow-md">One Stop.</span>
      </div>

      <HeroSection />

      <main className="container mx-auto max-w-7xl">
        <CategoryGrid />

        <div className="px-4 py-8">
          <div className="mb-10 flex flex-col md:flex-row items-end justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight text-[#1a1a1a] md:text-4xl"
            >
              Trending Now
            </motion.h2>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4">
            {PRODUCTS.slice(0, 8).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/shop/all" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide border-b border-black pb-1 hover:opacity-60 transition-opacity">
              View All Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-[#e5e3d9] py-16 text-center text-[#1a1a1a] mb-16 md:mb-0">
        <h3 className="text-2xl font-bold mb-6">One Stop.</h3>
        <p className="text-[#1a1a1a]/40 text-sm">&copy; {new Date().getFullYear()} One Stop.</p>
      </footer>

      <BottomNav />
    </div>
  );
}
