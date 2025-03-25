import express from "express";
import {
    getPublicPosts,
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    setPostToPublic
} from "../controllers/PostController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getPublicPosts);
router.get("/all", protectRoute, getAllPosts);
router.post("/", protectRoute, createPost);
router.get("/:id", protectRoute, getPostById);
router.put("/:id", protectRoute, updatePost);
router.delete("/:id", protectRoute, deletePost);
router.put("/:id/approve", protectRoute, setPostToPublic);

export default router;
