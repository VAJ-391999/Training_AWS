import { User } from "../user/model/user";
import { getModelForClass } from "@typegoose/typegoose";

export const UserModel = getModelForClass(User);
