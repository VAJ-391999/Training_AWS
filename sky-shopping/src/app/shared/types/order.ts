export interface CreateOrder {
  user: string;
  orderItems: OrderItemInfo[];
  orderPrice: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  district: string;
  state: string;
  country: string;
  postalCode: string;
  paymentMethod: PaymentMethod;
}

export enum PaymentMethod {
  CASH_ON_DELIVERY = 'Cash on Delivery',
}

export interface OrderItemInfo {
  product: string;
  quantity: number;
}

export interface OrderAddress {
  addressLine1: string;
  addressLine2: string;
  city: string;
  district: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface Order {
  _id: string;
  id: string;
  user: string;
  orderItems: OrderItemInfo[];
  orderPrice: number;
  address: OrderAddress;
  paymentMethod: PaymentMethod;
  createdAt: Date;
  updatedAt: Date;
}
