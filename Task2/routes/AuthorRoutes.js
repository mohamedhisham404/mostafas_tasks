import express from "express";
import {
    getALLAuthors,
    createAuthor,
    getAuthorById,
    updateAuthor,
    deleteAuthor,
    getBooksByAuthorId,
    createBookByAuthorId,
    getSpecificBookForSpecificAuthor,
    updateSpecificBookByAuthorId,
    deleteSpecificBookByAuthorId
} from "../controllers/AuthorController.js";

const router = express.Router();

//author routes
router.get("/", getALLAuthors);
router.post("/", createAuthor);
router.get("/:id", getAuthorById);
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);

//book routes
router.get("/:authorId/books", getBooksByAuthorId);
router.post("/:authorId/books", createBookByAuthorId);
router.get("/:authorId/books/:bookId", getSpecificBookForSpecificAuthor);
router.put("/:authorId/books/:bookId", updateSpecificBookByAuthorId);
router.delete("/:authorId/books/:bookId", deleteSpecificBookByAuthorId);

export default router;
