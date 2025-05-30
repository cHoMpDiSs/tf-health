'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/products/categories/vitamins" className="text-gray-300 hover:text-white">
              Vitamins
            </Link>
            <Link href="/products/categories/proteins" className="text-gray-300 hover:text-white">
              Proteins
            </Link>
            <Link href="/products/categories/minerals" className="text-gray-300 hover:text-white">
              Minerals
            </Link>
            <Link href="/products/categories/herbs" className="text-gray-300 hover:text-white">
              Herbs
            </Link>
          </div>

          {/* Shopping cart icon */}
          <div className="flex items-center">
            <button className="text-gray-300 hover:text-white">
              <span className="sr-only">Shopping cart</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/products/categories/vitamins" className="block text-gray-300 hover:text-white px-3 py-2">
              Vitamins
            </Link>
            <Link href="/products/categories/proteins" className="block text-gray-300 hover:text-white px-3 py-2">
              Proteins
            </Link>
            <Link href="/products/categories/minerals" className="block text-gray-300 hover:text-white px-3 py-2">
              Minerals
            </Link>
            <Link href="/products/categories/herbs" className="block text-gray-300 hover:text-white px-3 py-2">
              Herbs
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 