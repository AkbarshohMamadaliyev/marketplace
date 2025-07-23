import Joi from "joi";
import { CustomError } from "../helper/customError";

export class CategoryValidation extends Error {
  static async createCategory(data: any) {
    return await Joi.object({
      name: Joi.string()
        .required()
        .error(new CustomError("Name is required and must be an object", 400)),
      description: Joi.string()
        .optional()
        .error(new CustomError("Description must be an object", 400)),
      image: Joi.string()
        .optional()
        .error(new CustomError("Image must be a string", 400)),
      isActive: Joi.boolean()
        .optional()
        .error(new CustomError("isActive must be a boolean", 400)),
      sortOrder: Joi.number()
        .integer()
        .optional()
        .error(new CustomError("sortOrder must be an integer", 400)),
    }).validateAsync(data);
  }

  static async updateCategory(data: any) {
    return await Joi.object({
      name: Joi.string()
        .optional()
        .error(new CustomError("Name must be an object", 400)),
      description: Joi.string()
        .optional()
        .error(new CustomError("Description must be an object", 400)),
      image: Joi.string()
        .optional()
        .error(new CustomError("Image must be a string", 400)),
      isActive: Joi.boolean()
        .optional()
        .error(new CustomError("isActive must be a boolean", 400)),
      sortOrder: Joi.number()
        .integer()
        .optional()
        .error(new CustomError("sortOrder must be an integer", 400)),
    }).validateAsync(data);
  }
}
