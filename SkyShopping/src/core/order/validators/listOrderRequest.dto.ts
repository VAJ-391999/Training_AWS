import { IsString } from "class-validator";

export class ListOrderRequestDTO {
  @IsString()
  userId: string;
}
