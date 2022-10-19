import { IsString } from "class-validator";

export class CreateUserRequestDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  middleName: string;

  @IsString()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  password: string;
}
