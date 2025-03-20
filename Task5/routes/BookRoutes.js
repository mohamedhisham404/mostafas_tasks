import express from "express";
import { getALLBooks,createBook,getBookById,updateBook,deleteBook } from "../controllers/BookController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/",protectRoute,getALLBooks );
router.post("/",protectRoute,createBook );
router.get("/:id",protectRoute,getBookById);
router.put("/:id",protectRoute,updateBook);
router.delete("/:id",protectRoute,deleteBook);

export default router;