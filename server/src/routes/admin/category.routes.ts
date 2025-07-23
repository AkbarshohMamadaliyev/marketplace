import { Router } from "express";
import { categoryController } from "../../controller/category.controller";
import { upload } from "../../middleware/upload.middleware";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

// Create a new category
router.post("/", authMiddleware, upload.single("image"), categoryController.createCategory);

// Get all categories
router.get("/", authMiddleware, categoryController.getAllCategories);

// Get a category by ID
router.get("/:id", authMiddleware, categoryController.getCategoryById);

// Update a category by ID
router.put("/:id", authMiddleware, upload.single("image"), categoryController.updateCategory);

// Delete a category by ID
router.delete("/:id", authMiddleware, categoryController.deleteCategory);

export default router;
