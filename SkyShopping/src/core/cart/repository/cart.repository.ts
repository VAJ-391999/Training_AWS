import mongoose from "mongoose";
import { Product } from "../../products/model/product";
import { CartInfo } from "../../type/cart/cart";

export class CartRepository {
  private cartModel: any;

  constructor(cartModel: any) {
    this.cartModel = cartModel;
  }

  addToCart = (cart: CartInfo) => {
    return this.cartModel.create(cart);
  };

  findCartByUserId = (userId: mongoose.Types.ObjectId) => {
    return this.cartModel
      .findOne({ user: userId })
      .lean()
      .populate({
        path: "items.product",
        model: Product,
      })
      .exec();
  };

  updateCart = (cart: CartInfo) => {
    return this.cartModel.findOneAndUpdate(
      { user: cart.user },
      {
        $set: {
          items: cart.items,
          totalPrice: cart.totalPrice,
        },
      },
      { new: true }
    );
  };
}
