import { Role } from "../../common/role";
import { CreateUserRequestDTO } from "../validator/createUserRequest.dto";

export class UserRepository {
  private userModel: any;

  constructor(userModel: any) {
    this.userModel = userModel;
  }

  createUser = (user: CreateUserRequestDTO) => {
    console.log("Create user Repo");
    return this.userModel.create({ ...user, role: Role.USER });
  };

  getByEmail = (email: string) => {
    console.log("Get user by email Repo");
    return this.userModel.findOne({ email });
  };
}
