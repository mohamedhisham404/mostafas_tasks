import express from "express";
import {
    CreateOrder,
    GetAllOrders,
    GetOrderById,
    UpdateOrder,
    DeleteOrder,
} from "../controllers/OrdersControllers.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, CreateOrder);
router.get("/", GetAllOrders);
router.get("/:id", GetOrderById);
router.put("/:id", UpdateOrder);
router.delete("/:id", DeleteOrder);

export default router;
