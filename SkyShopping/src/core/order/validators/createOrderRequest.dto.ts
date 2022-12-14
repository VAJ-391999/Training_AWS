import {
  IsDefined,
  IsEnum,
  IsNumber,
  IsObject,
  IsString,
} from "class-validator";
import { PaymentMethod } from "../../type/order/payment";

export class CreateOrderRequestDTO {
  @IsString()
  user: string;

  @IsDefined()
  orderItems: OrderItemInfo[];

  @IsNumber()
  orderPrice: number;

  @IsString()
  addressLine1: string;

  @IsString()
  addressLine2: string;

  @IsString()
  city: string;

  @IsString()
  district: string;

  @IsString()
  state: string;

  @IsString()
  country: string;

  @IsString()
  postalCode: string;

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @IsString()
  fullName: string;

  @IsObject()
  stripeToken?: Record<string, any>;
}

export interface OrderItemInfo {
  product: string;
  quantity: number;
}
