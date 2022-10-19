import { Prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Types } from "mongoose";

export class User extends TimeStamps implements Base {
  _id: Types.ObjectId;
  id: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  middleName: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  password: string;
}
