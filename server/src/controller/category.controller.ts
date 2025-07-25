import { Request, Response, NextFunction } from "express";
import { CustomError } from "../helper/customError";
import { CategoryValidation } from "../validations/category.validation";
import { removeFile } from "../helper/removeFile";
import { CategoryService } from "../services/category.service";

export const categoryController = {
  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, isActive, sortOrder } =
        await CategoryValidation.createCategory(req.body);

      const category = await CategoryService.createCategory({
        name: JSON.parse(name),
        description: JSON.parse(description),
        image: req.file?.filename,
        isActive,
        sortOrder,
      });
      res.status(201).json({
        ok: true,
        message: "Category created successfully",
        category,
      });
    } catch (error) {
      next(error);
    }
  },

  async getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryService.getAllCategories();
      res.status(200).json({
        ok: true,
        categories,
      });
    } catch (error) {
      next(error);
    }
  },

  async getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryId = req?.params?.id;
      const category = await CategoryService.getCategoryById(categoryId);
      if (!category) {
        throw new CustomError("Category not found", 404);
      }
      res.status(200).json({
        ok: true,
        category,
      });
    } catch (error) {
      next(error);
    }
  },

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryId = req?.params?.id;
      const { name, description, isActive, sortOrder } =
        await CategoryValidation.updateCategory(req.body);

      const category = await CategoryService.getCategoryById(categoryId);

      if (!category) {
        throw new CustomError("Category not found", 404);
      }

      await removeFile(category?.dataValues?.image);

      await CategoryService.updateCategory(categoryId, {
        name: JSON.parse(name),
        description: JSON.parse(description),
        image: req.file?.filename,
        isActive,
        sortOrder,
      });

      res.status(200).json({
        ok: true,
        message: "Category updated successfully",
        category,
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryId = req?.params?.id;
      const category = await CategoryService.getCategoryById(categoryId);
      if (!category) {
        throw new CustomError("Category not found", 404);
      }
      await removeFile(category?.dataValues?.image);

      await CategoryService.deleteCategory(categoryId);
      
      res.status(200).json({
        ok: true,
        message: "Category deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};
