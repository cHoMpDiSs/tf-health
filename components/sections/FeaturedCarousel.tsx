'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Featured products data
const featuredProducts = [
  {
    id: 1,
    name: 'Premium Multivitamin',
    description: 'Complete daily nutrition with essential vitamins and minerals.',
    price: 29.99,
    image: '/products/multivitamin.jpg'
  },
  {
    id: 2,
    name: 'Whey Protein Isolate',
    description: 'High-quality protein for muscle recovery and growth.',
    price: 49.99,
    image: '/products/protein.jpg'
  },
  {
    id: 3,
    name: 'Magnesium Complex',
    description: 'Essential mineral for nerve and muscle function.',
    price: 19.99,
    image: '/products/magnesium.jpg'
  },
  {
    id: 4,
    name: 'Echinacea Extract',
    description: 'Natural immune system support.',
    price: 24.99,
    image: '/products/echinacea.jpg'
  }
];

export default function FeaturedCarousel() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {featuredProducts.map((product) => (
              <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="h-full">
                  <Card className="h-full">
                    <CardHeader>
                      <div className="aspect-square relative bg-muted rounded-md overflow-hidden">
                        <div className="h-full w-full flex items-center justify-center bg-muted text-muted-foreground">
                          [Product Image]
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardTitle className="mb-2">{product.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <span className="text-lg font-bold">${product.price}</span>
                      <Button asChild variant="default">
                        <Link href={`/products/${product.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
} 