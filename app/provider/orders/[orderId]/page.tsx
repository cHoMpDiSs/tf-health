'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

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

const ORDER_STATUSES = ['ordered', 'shipped', 'delivered'] as const;
type OrderStatus = typeof ORDER_STATUSES[number];

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  shippingDetails: ShippingDetails;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
}

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('providerLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/provider/login');
      return;
    }

    // Load order from localStorage
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      const orders: Order[] = JSON.parse(savedOrders);
      const foundOrder = orders.find(o => o.id === params.orderId);
      if (foundOrder) {
        setOrder(foundOrder);
      }
    }
    setIsLoading(false);
  }, [router, params.orderId]);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'ordered':
        return 'bg-yellow-500';
      case 'shipped':
        return 'bg-blue-500';
      case 'delivered':
        return 'bg-green-500';
    }
  };

  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (!order) return;
    
    setIsUpdating(true);
    try {
      // Get all orders
      const savedOrders = localStorage.getItem('orders');
      if (savedOrders) {
        const orders: Order[] = JSON.parse(savedOrders);
        
        // Update the specific order
        const updatedOrders = orders.map(o => 
          o.id === order.id ? { ...o, status: newStatus } : o
        );
        
        // Save back to localStorage
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        
        // Update local state
        setOrder({ ...order, status: newStatus });
        
        // Show success toast
        toast({
          title: "Status updated",
          description: `Order status has been updated to ${newStatus}.`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update order status.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="ghost" 
          onClick={() => router.push('/provider')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Button>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
          <p className="text-muted-foreground">The order you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button 
        variant="ghost" 
        onClick={() => router.push('/provider')}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Orders
      </Button>

      <div className="grid gap-6">
        {/* Order Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">Order {order.id}</h1>
            <p className="text-muted-foreground">
              Placed on {new Date(order.date).toLocaleDateString()} at{' '}
              {new Date(order.date).toLocaleTimeString()}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select
              value={order.status}
              onValueChange={(value: OrderStatus) => handleStatusChange(value)}
              disabled={isUpdating}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Change status" />
              </SelectTrigger>
              <SelectContent>
                {ORDER_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className={getStatusColor(status)}>
                        {status}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Badge variant="secondary" className={getStatusColor(order.status)}>
              Current: {order.status}
            </Badge>
          </div>
        </div>

        {/* Customer Information */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Contact Details</h3>
                <p>{order.shippingDetails.firstName} {order.shippingDetails.lastName}</p>
                <p className="text-muted-foreground">{order.shippingDetails.email}</p>
                <p className="text-muted-foreground">{order.shippingDetails.phone}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Shipping Address</h3>
                <p>{order.shippingDetails.address}</p>
                <p>
                  {order.shippingDetails.city}, {order.shippingDetails.state}{' '}
                  {order.shippingDetails.zipCode}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
            <div className="divide-y">
              {order.items.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border-t mt-6 pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-2">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 