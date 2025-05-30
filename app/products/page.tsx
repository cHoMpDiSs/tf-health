'use client';

import { useState, useMemo } from 'react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilters } from '@/components/ProductFilters';

export default function ProductsPage() {
  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map(product => product.category));
    return Array.from(uniqueCategories);
  }, []);

  const priceRange = useMemo(() => {
    const prices = products.map(product => product.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices))
    };
  }, []);

  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [priceRange.min, priceRange.max] as [number, number],
    bestSellersOnly: false
  });

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }

      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // Best sellers filter
      if (filters.bestSellersOnly && !product.bestSeller) {
        return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <ProductFilters
            categories={categories}
            onFilterChange={setFilters}
            minPrice={priceRange.min}
            maxPrice={priceRange.max}
          />
        </div>
        
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No products found matching your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 