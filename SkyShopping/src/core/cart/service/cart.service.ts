import mongoose from "mongoose";
import { MongoDb } from "../../common/db";
import { HttpError } from "../../common/httpError";
import { ProductService } from "../../products/service/product.service";
import { Cart } from "../model/cart";
import { CartAction } from "../../type/cart/item";
import { CartRepository } from "../repository/cart.repository";
import { CartInfo } from "../../type/cart/cart";

export class CartService {
  cartRepository: CartRepository;
  productService: ProductService;

  constructor(db: MongoDb) {
    this.cartRepository = new CartRepository(db.cartModel);
    this.productService = new ProductService(db);
  }

  addToCart = async (
    userId: mongoose.Types.ObjectId,
    productId: mongoose.Types.ObjectId,
    action?: CartAction
  ): Promise<Cart | undefined> => {
    try {
      const foundProduct = await this.productService.getProductDetail(
        productId
      );
      const foundCart: Cart = await this.cartRepository.findCartByUserId(
        userId
      );

      if (!foundCart) {
        console.log("Create new cart");
        const newCart: CartInfo = {
          user: userId,
          items: [
            {
              product: productId,
              quantity: 1,
            },
          ],
          totalPrice: foundProduct.unitPrice,
        };

        const createdCart = await this.cartRepository.addToCart(newCart);

        return createdCart;
      } else {
        console.log("Need to update existing cart");
        let updatedCart!: Pick<CartInfo, "items" | "totalPrice">;
        let updatedItems = foundCart.items;

        const cartProductIndex: number = foundCart.items.findIndex(
          (item) => item.product?._id.toString() === productId.toString()
        );

        if (cartProductIndex === -1) {
          updatedCart = {
            items: [...foundCart.items, { product: productId, quantity: 1 }],
            totalPrice: foundCart.totalPrice + foundProduct.unitPrice,
          };
        } else {
          if (action === undefined) {
            action = CartAction.INCREASE;
          }
        }

        switch (action) {
          case CartAction.INCREASE:
            console.log(CartAction.INCREASE);
            updatedItems[cartProductIndex].quantity =
              foundCart.items[cartProductIndex].quantity + 1;
            updatedCart = {
              items: updatedItems,
              totalPrice: foundCart.totalPrice + foundProduct.unitPrice,
            };
            break;
          case CartAction.DECREASE:
            console.log(CartAction.DECREASE);
            updatedItems[cartProductIndex].quantity =
              updatedItems[cartProductIndex].quantity - 1;
            updatedCart = {
              items: updatedItems,
              totalPrice: foundCart.totalPrice - foundProduct.unitPrice,
            };
            break;
          case CartAction.REMOVE:
            console.log(CartAction.REMOVE);
            const removedItem = updatedItems.splice(cartProductIndex, 1);
            updatedCart = {
              items: updatedItems,
              totalPrice:
                foundCart.totalPrice -
                foundProduct.unitPrice * removedItem[0].quantity,
            };
            break;
        }
        console.log("Updated items", updatedItems);
        const changedCart = await this.cartRepository.updateCart({
          user: userId,
          ...updatedCart,
        });
        console.log("changedCart", changedCart);
        return changedCart;
      }
    } catch (error) {
      throw error;
    }
  };

  getCartDetail = async (userId: mongoose.Types.ObjectId) => {
    const foundCart = await this.cartRepository.findCartByUserId(userId);
    console.log("cart", foundCart);

    if (!foundCart) {
      throw new HttpError({
        statusCode: 404,
        message: "Cart not found",
        data: null,
      });
    }

    return foundCart;
  };
}
