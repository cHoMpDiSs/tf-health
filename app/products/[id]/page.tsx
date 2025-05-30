'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Loader2, Check } from 'lucide-react';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem, hasItem } = useCart();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const productId = Number(params.id);
  const product = products.find(p => p.id === productId);

  const handleAddToCart = async () => {
    if (!product) return;
    
    setIsLoading(true);
    // Simulate a small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addItem(product);
    setIsLoading(false);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
        <p className="text-lg">Product not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button 
        variant="ghost" 
        onClick={() => router.back()}
        className="mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-muted-foreground mt-2">{product.description}</p>
          <p className="text-2xl font-bold mt-4">${product.price}</p>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Benefits</h2>
            <ul className="space-y-2">
              {product.details.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Ingredients</h3>
                <p className="text-muted-foreground">{product.details.ingredients}</p>
              </div>
              <div>
                <h3 className="font-medium">Recommended Dosage</h3>
                <p className="text-muted-foreground">{product.details.dosage}</p>
              </div>
              <div>
                <h3 className="font-medium">Size</h3>
                <p className="text-muted-foreground">{product.details.size}</p>
              </div>
            </div>
          </div>

          {hasItem(product.id) ? (
            <Button 
              size="lg" 
              className="w-full mt-8"
              variant="secondary"
              disabled
            >
              <Check className="mr-2 h-4 w-4" />
              Item in Cart
            </Button>
          ) : (
            <Button 
              size="lg" 
              className="w-full mt-8"
              onClick={handleAddToCart}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding to Cart...
                </>
              ) : (
                'Add to Cart'
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
} 