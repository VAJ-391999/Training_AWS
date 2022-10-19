import * as dotenv from "dotenv";
import { Config } from "../type/config/config";

dotenv.config();

export const config: Config = {
  mongoDBUrl: process.env.MONGO_DB_URL || "",
  saltRound: parseInt(process.env.SALT_ROUND || "10"),
  tokenSecret: process.env.TOKEN_SECRET || "",
};
