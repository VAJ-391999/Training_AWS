import { IsString } from "class-validator";

export class CreateProductRequestDTO {
  @IsString()
  name: string;

  @IsString()
  unitPrice: number;

  @IsString()
  imageUrl: string;

  @IsString()
  description: string;
}
