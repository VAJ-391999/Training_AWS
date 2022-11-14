import { IsBoolean, IsObject } from "class-validator";
import { Cart } from "../model/cart";

export class GetCartResponseDTO {
  @IsObject()
  cart: Cart;

  @IsBoolean()
  cartItemUpdated: boolean;
}
