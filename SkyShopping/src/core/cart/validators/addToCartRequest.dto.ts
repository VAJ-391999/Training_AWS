import { IsEnum, IsString } from "class-validator";
import { CartAction } from "../../type/cart/item";

export class AddToCartRequestDTO {
  @IsString()
  userId: string;

  @IsString()
  productId: string;

  @IsEnum(CartAction)
  action?: CartAction;
}
