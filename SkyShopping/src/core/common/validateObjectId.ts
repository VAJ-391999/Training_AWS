import mongoose from "mongoose";
import { HttpError } from "./httpError";

export const validateObjectId = (id: string) => {
  try {
    const objectId = new mongoose.Types.ObjectId(id);
    return objectId;
  } catch (error) {
    throw new HttpError({
      statusCode: 400,
      message: "Not valid id",
      data: null,
    });
  }
};
