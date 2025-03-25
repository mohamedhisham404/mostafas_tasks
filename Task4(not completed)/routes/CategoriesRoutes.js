import express from "express";
import {
    CreateCategory,
    GetAllCategories,
    GetCategoryById,
    UpdateCategory,
    DeleteCategory,
} from "../controllers/CategoriesControllers.js";

const router = express.Router();

router.post("/", CreateCategory);
router.get("/", GetAllCategories);
router.get("/:id", GetCategoryById);
router.put("/:id", UpdateCategory);
router.delete("/:id", DeleteCategory);

export default router;
