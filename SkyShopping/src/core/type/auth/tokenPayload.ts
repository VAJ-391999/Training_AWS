import { Role } from "../../common/role";

export interface TokenPayload {
  id: string;
  email: string;
  role: Role;
}
