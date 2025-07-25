import { Router } from "express";
import { categoryController } from "../../controller/category.controller";
import { upload } from "../../middleware/upload.middleware";
import { authMiddleware } from "../../middleware/auth.middleware";
import { productController } from "../../controller/product.controller";

const router = Router();

// Create a new product
router.post("/", authMiddleware, upload.array("images", 10), productController.createProduct);

// Get all products
router.get("/", authMiddleware, productController.getAllProducts);

// // Get a category by ID
// router.get("/:id", authMiddleware, categoryController.getCategoryById);

// // Update a category by ID
// router.put("/:id", authMiddleware, upload.single("image"), categoryController.updateCategory);

// // Delete a category by ID
// router.delete("/:id", authMiddleware, categoryController.deleteCategory);

export default router;
