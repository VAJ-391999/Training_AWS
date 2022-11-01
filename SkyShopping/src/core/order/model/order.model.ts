import { Prop, Ref } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Types } from "mongoose";
import { Product } from "../../products/model/product";
import { PaymentMethod } from "../../type/order/payment";
import { User } from "../../user/model/user";

export class OrderItem {
  @Prop({ ref: () => Product })
  product: Ref<Product>;

  @Prop()
  quantity: number;
}

export class OrderAddress {
  @Prop()
  addressLine1: string;

  @Prop()
  addressLine2: string;

  @Prop()
  city: string;

  @Prop()
  district: string;

  @Prop()
  state: string;

  @Prop()
  country: string;

  @Prop()
  postalCode: string;
}

export class Order extends TimeStamps implements Base {
  _id: Types.ObjectId;
  id: string;

  @Prop({ ref: () => User })
  user: Ref<User>;

  @Prop()
  orderItems: OrderItem[];

  @Prop()
  orderPrice: number;

  @Prop()
  address: OrderAddress;

  @Prop()
  paymentMethod: PaymentMethod;

  @Prop()
  fullName: string;

  @Prop()
  stripeToken: Record<string, any>;
}
