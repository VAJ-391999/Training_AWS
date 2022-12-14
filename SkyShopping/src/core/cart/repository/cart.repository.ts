import mongoose from "mongoose";
import { Product } from "../../products/model/product";
import { CartInfo } from "../../type/cart/cart";

export class CartRepository {
  private cartModel: any;

  constructor(cartModel: any) {
    this.cartModel = cartModel;
  }

  addToCart = (cart: CartInfo) => {
    console.log("new cart", cart);
    return this.cartModel.create({
      user: cart.user,
      items: cart.items,
      totalPrice: cart.totalPrice,
    });
  };

  findCartByUserId = (userId: mongoose.Types.ObjectId) => {
    return this.cartModel
      .findOne({ user: userId })
      .populate({
        path: "items.product",
        model: Product,
        options: {
          retainNullValue: true,
        },
      })
      .exec();
  };

  updateCart = (cart: CartInfo) => {
    return this.cartModel
      .findOneAndUpdate(
        { user: cart.user },
        {
          $set: {
            items: cart.items,
            totalPrice: cart.totalPrice,
          },
        },
        { new: true }
      )
      .populate({
        path: "items.product",
        model: Product,
        options: {
          retainNullValue: true,
        },
      });
  };
}
