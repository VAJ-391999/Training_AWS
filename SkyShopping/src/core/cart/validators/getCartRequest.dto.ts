import { IsString } from "class-validator";

export class GetCartRequestDTO {
  @IsString()
  userId: string;
}
