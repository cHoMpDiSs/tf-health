'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Printer } from 'lucide-react';

interface OrderDetails {
  id: string;
  date: string;
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>;
  shippingDetails: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  };
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: string;
}

export default function ReceiptPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    // Load order from localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const currentOrder = orders.find((o: OrderDetails) => o.id === params.orderId);
    
    if (!currentOrder) {
      router.push('/');
      return;
    }
    
    setOrder(currentOrder);
  }, [params.orderId, router]);

  if (!order) {
    return null;
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8 print:hidden">
        <Button 
          variant="ghost" 
          onClick={() => router.push('/products')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Continue Shopping
        </Button>
        <Button onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Print Receipt
        </Button>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">Order Confirmation</h1>
            <p className="text-muted-foreground">Thank you for your purchase!</p>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-6">
            <div>
              <h2 className="font-semibold mb-2">Order Details</h2>
              <p className="text-sm">Order ID: {order.id}</p>
              <p className="text-sm">Date: {new Date(order.date).toLocaleDateString()}</p>
              <p className="text-sm">Status: {order.status}</p>
            </div>
            <div>
              <h2 className="font-semibold mb-2">Shipping Address</h2>
              <p className="text-sm">{order.shippingDetails.firstName} {order.shippingDetails.lastName}</p>
              <p className="text-sm">{order.shippingDetails.address}</p>
              <p className="text-sm">{order.shippingDetails.city}, {order.shippingDetails.state} {order.shippingDetails.zipCode}</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">CA Sales Tax (7.25%)</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <style jsx global>{`
        @media print {
          @page {
            margin: 20mm;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
} 