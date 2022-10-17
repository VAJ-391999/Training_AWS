import * as dotenv from "dotenv";
import { Config } from "../type/config/config";

dotenv.config();

export const config: Config = {
  mongoDBUrl: process.env.MONGO_DB_URL || "",
};
