import express from "express";
import { getALLBooks,createBook,getBookById,updateBook,deleteBook } from "../controllers/BookController.js";

const router = express.Router();

router.get("/",getALLBooks );
router.post("/",createBook );
router.get("/:id",getBookById);
router.put("/:id",updateBook);
router.delete("/:id",deleteBook);

export default router;