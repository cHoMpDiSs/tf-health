import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Check, Star } from 'lucide-react';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, hasItem } = useCart();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
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

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="aspect-square relative bg-muted rounded-md overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.bestSeller && (
            <div className="absolute top-2 right-2 bg-yellow-400 text-black text-sm font-medium px-2 py-1 rounded-full flex items-center">
              <Star className="h-4 w-4 mr-1 fill-current" />
              Best Seller
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
        <p className="text-lg font-bold">${product.price}</p>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button 
          variant="outline" 
          className="flex-1"
          asChild
        >
          <Link href={`/products/${product.id}`}>
            View Details
          </Link>
        </Button>
        {hasItem(product.id) ? (
          <Button 
            className="flex-1"
            variant="secondary"
            disabled
          >
            <Check className="mr-2 h-4 w-4" />
            In Cart
          </Button>
        ) : (
          <Button 
            className="flex-1"
            onClick={handleAddToCart}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              'Add to Cart'
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
} 