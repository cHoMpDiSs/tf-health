'use client';

import { useEffect, useState } from 'react';
import { Product, products } from '@/data/products';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const { addItem, hasItem } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(params.id));
    setProduct(foundProduct || null);
  }, [params.id]);

  if (!product) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  const isInCart = hasItem(product.id);

  const handleAddToCart = () => {
    if (isInCart) {
      toast({
        title: "Item already in cart",
        description: "This item is already in your cart.",
        variant: "destructive",
      });
      return;
    }

    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      action: (
        <Button variant="outline" size="sm" onClick={() => router.push('/cart')}>
          View Cart
        </Button>
      ),
    });
  };

  return (
    <div className="container mx-auto p-8">
      <Button
        variant="outline"
        className="mb-6 flex items-center gap-2"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              {product.bestSeller && (
                <Badge variant="secondary">Best Seller</Badge>
              )}
            </div>
            <p className="text-2xl font-semibold text-primary">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <p className="text-muted-foreground text-lg">
            {product.description}
          </p>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Benefits</h2>
                <ul className="list-disc pl-6 space-y-1">
                  {product.details.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Product Details</h2>
                <div className="space-y-2">
                  <p><strong>Ingredients:</strong> {product.details.ingredients}</p>
                  <p><strong>Recommended Dosage:</strong> {product.details.dosage}</p>
                  <p><strong>Size:</strong> {product.details.size}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            size="lg"
            className="w-full md:w-auto"
            onClick={handleAddToCart}
            disabled={isInCart}
          >
            {isInCart ? 'Added to Cart' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  );
} 