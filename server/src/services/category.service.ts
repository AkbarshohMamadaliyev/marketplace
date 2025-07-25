import { Category } from "../models/category.model";

export const CategoryService = {
  async createCategory(data: any) {
    try {
      return await Category.create(data);
    } catch (error) {
      console.error(error);
    }
  },
  async getAllCategories() {
    try {
      return await Category.findAll();
    } catch (error) {
      console.error(error);
    }
  },
  async getCategoryById(id: string) {
    try {
      return await Category.findByPk(id);
    } catch (error) {
      console.error(error);
    }
  },
  async updateCategory(id: string, data: any) {
    try {
      return await Category.update(data, { where: { id } });
    } catch (error) {
      console.error(error);
    }
  },
  async deleteCategory(id: string) {
    try {
      return await Category.destroy({ where: { id } });
    } catch (error) {
      console.error(error);
    }
  },
};
