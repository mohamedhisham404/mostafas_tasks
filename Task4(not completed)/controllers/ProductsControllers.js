import Product from "../models/product.js";
import Category from "../models/categorie.js";

const CreateProduct = async (req, res) => {
    try {
        const { name, price, categories } = req.body;

        if (!name || !price) {
            return res
                .status(400)
                .json({ message: "Please provide name and price" });
        }

        if (!categories || categories.length === 0) {
            return res.status(201).json(product);
        }

        const product = await Product.create({ name, price });

        for (const categoryId of categories) {
            const category = await Category.findByPk(categoryId);
            if (!category) {
                return res
                    .status(400)
                    .json({
                        message: `Category with id ${categoryId} not found`,
                    });
            }
        }

        const categoryInstances = await Category.findAll({
            where: { id: categories },
        });

        await product(categoryInstances);

        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const GetAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: {
                model: Category,
                as: "Categories",
                through: { attributes: [] },
            },
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const GetProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id, {
            include: {
                model: Category,
                as: "Categories",
                through: { attributes: [] },
            },
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const UpdateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, categories } = req.body;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (name) {
            product.name = name;
        }

        if (price) {
            product.price = price;
        }

        if (categories) {
            const categoryInstances = await Category.findAll({
                where: { id: categories },
            });

            await product.setCategories(categoryInstances);
        }

        await product.save();

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const DeleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await product.destroy();

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    CreateProduct,
    GetAllProducts,
    GetProductById,
    UpdateProduct,
    DeleteProduct,
};
