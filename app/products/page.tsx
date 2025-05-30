'use client';

import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilters } from '@/components/ProductFilters';
import { ProductSearch } from '@/components/ProductSearch';
import { ProductSort, type SortOption } from '@/components/ProductSort';

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

  // Initialize Fuse instance for fuzzy search
  const fuse = useMemo(() => new Fuse(products, {
    keys: ['name', 'description', 'category'],
    threshold: 0.4, // Lower threshold = more strict matching
    ignoreLocation: true, // Ignore where in the string the pattern appears
    shouldSort: true, // Sort by match score
    minMatchCharLength: 2, // Minimum length of pattern to start matching
    findAllMatches: true,
  }), []);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [priceRange.min, priceRange.max] as [number, number],
    bestSellersOnly: false
  });

  const filteredProducts = useMemo(() => {
    // First, get the search results if there's a search term
    let productsToFilter = products;
    if (searchTerm.trim()) {
      const searchResults = fuse.search(searchTerm);
      productsToFilter = searchResults.map(result => result.item);
    }

    // Then apply the other filters
    let filtered = productsToFilter.filter(product => {
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

    // Apply sorting
    switch (sortOption) {
      case 'price-high-to-low':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'price-low-to-high':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'name-a-z':
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-z-a':
        filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'best-sellers':
        filtered = [...filtered].sort((a, b) => {
          if (a.bestSeller === b.bestSeller) return 0;
          return a.bestSeller ? -1 : 1;
        });
        break;
      default: // 'featured' - keep original order
        break;
    }

    return filtered;
  }, [filters, searchTerm, fuse, sortOption]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <ProductSearch 
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
          />
          <ProductFilters
            categories={categories}
            onFilterChange={setFilters}
            minPrice={priceRange.min}
            maxPrice={priceRange.max}
          />
        </div>
        
        <div className="lg:col-span-3">
          <ProductSort
            currentSort={sortOption}
            onSort={setSortOption}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No products found matching your criteria.
              </p>
              {searchTerm && (
                <p className="text-sm text-muted-foreground mt-2">
                  Try using different keywords or check your spelling
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 