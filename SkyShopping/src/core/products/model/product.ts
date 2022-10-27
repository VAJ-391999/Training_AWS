import { Prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Types } from "mongoose";

export class Product extends TimeStamps implements Base {
  _id: Types.ObjectId;
  id: string;
  @Prop()
  name: string;

  @Prop()
  unitPrice: number;

  @Prop()
  imageUrl: string;

  @Prop()
  description: string;
}
