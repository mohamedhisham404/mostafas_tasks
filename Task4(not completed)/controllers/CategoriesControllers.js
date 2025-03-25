import Category from "../models/categorie.js";

const CreateCategory = async (req, res) => {
    const { name, parentCategoryId } = req.body;

    if (!name || name === "") {
        return res.status(400).json({ message: "All Fields are required" });
    }

    const category = await Category.create({ name, parentCategoryId });
    return res.json(category);
};

const GetAllCategories = async (req, res) => {
    const categories = await Category.findAll();
    return res.json(categories);
};

const GetCategoryById = async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if(!id){
        return res.status(400).json({ message: "Category ID is required" });
    }

    if (!category) {
        return res.status(404).json({ message: "Category not found" });
    }

    return res.json(category);
};

const DeleteCategory = async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if(!id){
        return res.status(400).json({ message: "Category ID is required" });
    }

    if (!category) {
        return res.status(404).json({ message: "Category not found" });
    }

    await category.destroy();
    return res.json({ message: "Category deleted successfully" });
};

const UpdateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, parentCategoryId } = req.body;

    if (!name || name === "") {
        return res.status(400).json({ message: "All Fields are required" });
    }

    const category = await Category.findByPk(id);

    if (!category) {
        return res.status(404).json({ message: "Category not found" });
    }

    category.name = name;
    category.parentCategoryId = parentCategoryId;

    await category.save();
    return res.json(category);
};

export { CreateCategory,GetAllCategories,GetCategoryById,DeleteCategory,UpdateCategory };