import { MongoDb } from "../../common/db";
import { HttpError } from "../../common/httpError";
import { UserRepository } from "../repository/user.repository";
import { CreateUserRequestDTO } from "../validator/createUserRequest.dto";
import * as bcrypt from "bcrypt";
import { config } from "../../config/config";

export class UserService {
  private readonly userRepository: UserRepository;
  constructor(db: MongoDb) {
    this.userRepository = new UserRepository(db.userModel);
  }

  createUser = async (user: CreateUserRequestDTO) => {
    console.log("Create user Service");
    const foundUser = await this.userRepository.getByEmail(user.email);
    console.log("FoundUser", foundUser);

    if (foundUser) {
      throw new HttpError({
        statusCode: 400,
        message: "User already exist with email",
        data: null,
      });
    }

    const hashPassword = await bcrypt.hash(user.password, config.saltRound);
    console.log(hashPassword);
    return this.userRepository.createUser({ ...user, password: hashPassword });
  };
}
