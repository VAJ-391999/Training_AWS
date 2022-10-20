import * as bcrypt from "bcrypt";
import { MongoDb } from "../common/db";
import { HttpError } from "../common/httpError";
import { TokenPayload } from "../type/auth/tokenPayload";
import { UserRepository } from "../user/repository/user.repository";
import { LoginRequestDTO } from "./validator/loginRequest.dto";
import * as JWT from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "../user/model/user";

export class AuthService {
  private readonly userRepository: UserRepository;
  constructor(db: MongoDb) {
    this.userRepository = new UserRepository(db.userModel);
  }

  loginUser = async (user: LoginRequestDTO) => {
    console.log("Login User Service");
    const foundUser: User = await this.userRepository.getByEmail(user.email);

    if (!foundUser) {
      throw new HttpError({
        statusCode: 404,
        message: "User not found with email",
        data: null,
      });
    }
    console.log("FoundUSer", foundUser);
    const isPasswordMatch = await bcrypt.compare(
      user.password,
      foundUser.password
    );
    console.log(isPasswordMatch);
    if (!isPasswordMatch) {
      throw new HttpError({
        statusCode: 401,
        message: "Password not matched",
        data: null,
      });
    }
    const token: string = this.generateToken({
      id: foundUser._id.toString(),
      email: foundUser.email,
      role: foundUser.role,
    });
    console.log("token", token);
    return token;
  };

  generateToken = (payload: TokenPayload): string => {
    return JWT.sign(payload, config.tokenSecret);
  };

  verifyToken = (token: string): any => {
    let decodedData: any;
    JWT.verify(token, config.tokenSecret, (err, decoded) => {
      console.log("decoded", decoded);
      decodedData = decoded;
    });
    return decodedData;
  };
}
