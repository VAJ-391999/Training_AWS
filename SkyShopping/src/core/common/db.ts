import { getModelForClass } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { config } from "../config/config";
import { Product } from "../products/model/product.";
import { User } from "../user/model/user";
import { MONGOOSE_CONNECTION_STATE } from "./dbConnectionState";

export class MongoDb {
  private connection: any;
  userModel: any;
  productModel: any;

  constructor() {}

  public getDatabaseConnection() {
    return this.connection;
  }

  public isConnected() {
    const connectionState = this.connection?.connection?.readyState;
    if (connectionState !== MONGOOSE_CONNECTION_STATE.CONNECTED) {
      console.log(`MongoDB connection state is ${connectionState}`);
      return false;
    }
    console.log("Verified that MongoDB is connected");
    return true;
  }

  public getConnection = async () => {
    this.populate();

    if (this.connection) {
      return this;
    } else {
      this.connection = await mongoose.connect(config.mongoDBUrl);
      return this;
    }
  };

  private populate = () => {
    this.userModel = getModelForClass(User);
    this.productModel = getModelForClass(Product);
  };
}
