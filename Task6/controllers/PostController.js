import Post from "../models/post.js";

const getPublicPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({ where: { isPublic: true } });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPost = async (req, res) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(403).json({ message: "You are not allowed to create a post." });
        }

        if (!req.body.title || !req.body.body) {
            return res.status(400).json({ message: "Title and body are required." });
        }

        if (req.body.isPublic === true) {
            return res.status(403).json({ message: "You are not allowed to create a public post." });
        }

        const { id, ...postData } = req.body;

        const newPost = await Post.create(postData);
        res.status(201).json(newPost);
        
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: error.message });
    }
};

const getAllPosts = async (req, res) => {
    try {
        if (req.user.role !== "Admin" && req.user.role !== "Reviewer") {
            return res
                .status(403)
                .json({ message: "You are not allowed to view all posts." });
        }

        const posts = await Post.findAll({order: [['id', 'ASC']]});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByPk(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        if (
            !post.isPublic &&
            req.user.role !== "Admin" &&
            req.user.role !== "Reviewer"
        ) {
            return res
                .status(403)
                .json({ message: "You are not allowed to view this post." });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByPk(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        if (req.user.role !== "Admin") {
            return res
                .status(403)
                .json({ message: "You are not allowed to update this post." });
        }

        if(!req.body.title || !req.body.body) {
            return res.status(400).json({ message: "Title and body are required." });
        }

        if(req.body.isPublic === true) {
            return res.status(403).json({ message: "You are not allowed to update a post to public." });
        }

        await post.update(req.body);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByPk(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        if (req.user.role !== "Admin") {
            return res
                .status(403)
                .json({ message: "You are not allowed to delete this post." });
        }

        await post.destroy();
        res.status(200).json({ message: "Post deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const setPostToPublic = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByPk(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        if (req.user.role !== "Reviewer") {
            return res
                .status(403)
                .json({ message: "You are not allowed to update this post." });
        }

        await post.update({ isPublic: true });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getPublicPosts,
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    setPostToPublic
};
