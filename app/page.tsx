'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import FeaturedCarousel from '@/components/sections/FeaturedCarousel';
import FAQ from '@/components/sections/FAQ';

// Featured products (subset of our product data)
const featuredProducts = [
  {
    id: 1,
    name: 'Premium Multivitamin',
    description: 'Complete daily nutrition with essential vitamins and minerals.',
    price: 29.99,
  },
  {
    id: 2,
    name: 'Whey Protein Isolate',
    description: 'High-quality protein for muscle recovery and growth.',
    price: 49.99,
  },
  {
    id: 3,
    name: 'Magnesium Complex',
    description: 'Essential mineral for nerve and muscle function.',
    price: 19.99,
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">
              Your Journey to Better Health Starts Here
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
              Premium supplements backed by science, designed for your wellness
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/products">
                Shop Now
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Products Carousel */}
      <FeaturedCarousel />

      {/* Features Section */}
      <div className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Top Flight Health?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-muted-foreground">Only the highest quality ingredients, backed by scientific research</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
              <p className="text-muted-foreground">Quick and reliable delivery right to your doorstep</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-muted-foreground">Professional guidance and customer service</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
}
