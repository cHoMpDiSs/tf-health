'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { dummyOrders } from '@/data/dummy-orders';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const ORDER_STATUSES = ['all', 'ordered', 'shipped', 'delivered'] as const;
type OrderStatus = (typeof ORDER_STATUSES)[number];
type OrderStatusNoAll = Exclude<OrderStatus, 'all'>;

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

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  shippingDetails: ShippingDetails;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatusNoAll;
}

export default function ProviderPortal() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus>('all');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const { toast } = useToast();

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('providerLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/provider/login');
    } else {
      // Load orders from localStorage, fallback to dummy orders
      const savedOrders = localStorage.getItem('orders');
      if (savedOrders) {
        const parsedOrders = JSON.parse(savedOrders);
        // Sort orders by date in descending order (newest first)
        const sortedOrders = [...parsedOrders].sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setOrders(sortedOrders);
      } else {
        // Sort dummy orders by date in descending order
        const sortedOrders = [...dummyOrders.orders].sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setOrders(sortedOrders as Order[]);
        localStorage.setItem('orders', JSON.stringify(sortedOrders));
      }
      setIsLoading(false);
    }
  }, [router]);

  // Configure Fuse.js for search
  const fuse = new Fuse(orders, {
    keys: [
      'id',
      'shippingDetails.firstName',
      'shippingDetails.lastName',
      'shippingDetails.email',
      'items.name'
    ],
    threshold: 0.3,
  });

  // Filter orders based on search term, status, and date range
  const filteredOrders = orders.filter(order => {
    // Apply search filter
    if (searchTerm) {
      const searchResults = fuse.search(searchTerm);
      if (!searchResults.some(result => result.item.id === order.id)) {
        return false;
      }
    }

    // Apply status filter
    if (statusFilter !== 'all' && order.status !== statusFilter) {
      return false;
    }

    // Apply date range filter
    if (dateRange?.from || dateRange?.to) {
      const orderDate = new Date(order.date);
      if (dateRange.from && orderDate < dateRange.from) {
        return false;
      }
      if (dateRange.to) {
        const endOfDay = new Date(dateRange.to);
        endOfDay.setHours(23, 59, 59, 999);
        if (orderDate > endOfDay) {
          return false;
        }
      }
    }

    return true;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const getStatusColor = (status: OrderStatusNoAll) => {
    switch (status) {
      case 'ordered':
        return 'bg-yellow-500';
      case 'shipped':
        return 'bg-blue-500';
      case 'delivered':
        return 'bg-green-500';
    }
  };

  const handleOrderClick = (orderId: string) => {
    router.push(`/provider/orders/${orderId}`);
  };

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, dateRange]);

  // Update the clear filters function to reset to 'all' instead of 'ordered'
  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setDateRange(undefined);
  };

  const handleClearAllOrders = () => {
    localStorage.removeItem('orders');
    setOrders([]);
    toast({
      title: "Orders cleared",
      description: "All orders have been deleted.",
    });
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Provider Portal</h1>
        <div className="flex gap-4 items-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                Clear All Orders
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all orders from the system.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearAllOrders}>
                  Delete All Orders
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <button
            onClick={() => {
              localStorage.removeItem('providerLoggedIn');
              router.push('/provider/login');
            }}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid gap-4 mb-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by order ID, customer name, or product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex gap-4">
          {/* Status Filter */}
          <Select
            value={statusFilter}
            onValueChange={(value: OrderStatus) => setStatusFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {ORDER_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {status === 'all' ? (
                    'All Orders'
                  ) : (
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className={getStatusColor(status)}>
                        {status}
                      </Badge>
                    </div>
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Date Range Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !dateRange?.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          {/* Clear Filters */}
          {(searchTerm || statusFilter !== 'all' || dateRange?.from || dateRange?.to) && (
            <Button
              variant="ghost"
              onClick={handleClearFilters}
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Orders Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              paginatedOrders.map((order) => (
                <TableRow 
                  key={order.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleOrderClick(order.id)}
                >
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {order.shippingDetails.firstName} {order.shippingDetails.lastName}
                    <div className="text-sm text-muted-foreground">
                      {order.shippingDetails.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {order.items.map((item, index) => (
                        <div key={item.id}>
                          {item.name} x {item.quantity}
                          {index < order.items.length - 1 && ', '}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
} 