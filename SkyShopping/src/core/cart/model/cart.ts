import { modelOptions, Prop, Ref } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Types } from "mongoose";
import { Product } from "../../products/model/product";
import { User } from "../../user/model/user";

export class CartItemInfo {
  @Prop({ ref: () => Product })
  product: Ref<Product>;

  @Prop()
  quantity: number;
}

@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
export class Cart extends TimeStamps implements Base {
  _id: Types.ObjectId;
  id: string;

  @Prop({ unique: true, ref: () => User })
  user: Ref<User>;

  @Prop()
  items: CartItemInfo[];

  @Prop()
  totalPrice: number;
}
