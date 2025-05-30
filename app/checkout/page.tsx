'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const CA_TAX_RATE = 0.0725; // 7.25% California state sales tax

interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 5.99;
  const tax = subtotal * CA_TAX_RATE;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isFormValid = () => {
    return Object.values(shippingDetails).every(value => value.trim() !== '');
  };

  const generateOrderId = () => {
    return 'TFH-' + Date.now().toString().slice(-6) + '-' + Math.random().toString(36).slice(-4).toUpperCase();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const orderId = generateOrderId();
      const orderDate = new Date().toISOString();
      const order = {
        id: orderId,
        date: orderDate,
        items,
        shippingDetails,
        subtotal,
        shipping,
        tax,
        total,
        status: 'ordered'
      };

      // Save order to localStorage
      if (typeof window !== 'undefined') {
        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        localStorage.setItem('orders', JSON.stringify([...existingOrders, order]));
      }

      // Show success toast
      toast({
        title: "Order placed successfully!",
        description: "You will be redirected to your receipt.",
      });

      // Set redirecting state before clearing cart
      setIsRedirecting(true);

      // Clear cart
      clearCart();

      // Use Next.js router for navigation
      router.push(`/checkout/${orderId}/receipt`);
    } catch (error) {
      toast({
        title: "Error processing order",
        description: "Please try again later.",
        variant: "destructive",
      });
      setIsProcessing(false);
      setIsRedirecting(false);
    }
  };

  // Don't render anything until mounted (client-side)
  if (!mounted) {
    return null;
  }

  if (isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <div className="text-lg">Redirecting to your receipt...</div>
        </div>
      </div>
    );
  }

  if (items.length === 0 && !isRedirecting) {
    router.push('/cart');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={shippingDetails.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={shippingDetails.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={shippingDetails.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2 mt-4">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={shippingDetails.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2 mt-4">
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  name="address"
                  value={shippingDetails.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={shippingDetails.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    name="state"
                    value={shippingDetails.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  value={shippingDetails.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg mt-4 pt-4 border-t">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            className="w-full"
            disabled={isProcessing || !isFormValid()}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Place Order'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
} 