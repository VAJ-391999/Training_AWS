import { CartAction } from '../common/cart-action';
import { Product } from './product';

export interface Cart {
  id: string;
  user: string;
  items: CartItem[];
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AddToCart {
  userId: string;
  productId: string;
  action?: CartAction;
}
