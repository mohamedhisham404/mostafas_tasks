import express from "express";
import {
    CreateProduct,
    GetAllProducts,
    GetProductById,
    UpdateProduct,
    DeleteProduct,
} from "../controllers/ProductsControllers.js";

const router = express.Router();

router.post("/",  CreateProduct);
router.get("/",  GetAllProducts);
router.get("/:id", GetProductById);
router.put("/:id",  UpdateProduct);
router.delete("/:id",  DeleteProduct);

export default router;
