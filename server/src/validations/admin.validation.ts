import Joi from "joi";
import { CustomError } from "../helper/customError";

export class AdminValidation extends Error {
  static async loginAdmin(data: any) {
    return await Joi.object({
      email: Joi.string()
        .required()
        .email()
        .error(new CustomError("Email is invalid", 400)),
      password: Joi.string()
        .required()
        .min(5)
        .alphanum()
        .error(new CustomError("Password is invalid", 400)),
    }).validateAsync(data);
  }
}
