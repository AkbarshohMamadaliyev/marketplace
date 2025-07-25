import Joi from "joi";
import { CustomError } from "../helper/customError";

export class ProductValidation extends Error {
  static async createProduct(data: any) {
    return await Joi.object({
      name: Joi.string()
        .required()
        .error(new CustomError("Name is required and must be an object", 400)),
      description: Joi.string()
        .optional()
        .error(new CustomError("Description must be an object", 400)),
      price: Joi.number()
        .precision(2)
        .required()
        .error(new CustomError("Price is required and must be a number", 400)),
      stock: Joi.number()
        .integer()
        .min(0)
        .optional()
        .error(new CustomError("Stock must be a non-negative integer", 400)),
      minStock: Joi.number()
        .integer()
        .min(0)
        .optional()
        .error(new CustomError("minStock must be a non-negative integer", 400)),
      isActive: Joi.boolean()
        .optional()
        .error(new CustomError("isActive must be a boolean", 400)),
      sortOrder: Joi.number()
        .integer()
        .optional()
        .error(new CustomError("sortOrder must be an integer", 400)),
    }).validateAsync(data);
  }

  static async updateProduct(data: any) {
    return await Joi.object({
      name: Joi.string()
        .optional()
        .error(new CustomError("Name must be an object", 400)),
      description: Joi.string()
        .optional()
        .error(new CustomError("Description must be an object", 400)),
      price: Joi.number()
        .precision(2)
        .optional()
        .error(new CustomError("Price must be a number", 400)),
      stock: Joi.number()
        .integer()
        .min(0)
        .optional()
        .error(new CustomError("Stock must be a non-negative integer", 400)),
      minStock: Joi.number()
        .integer()
        .min(0)
        .optional()
        .error(new CustomError("minStock must be a non-negative integer", 400)),
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
