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
  status: string;
}

interface DummyOrders {
  orders: Order[];
}

// Import the JSON file
import ordersData from './dummy-orders.json';

// Export the typed data
export const dummyOrders: DummyOrders = ordersData; 