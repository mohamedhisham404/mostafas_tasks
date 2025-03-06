import { Author, Book } from "../models/associations.js";

//auther controllers
const getALLAuthors = async (req, res) => {
    try {
        const authors = await Author.findAll();
        res.status(200).json(authors);
    } catch (error) {
        console.error("Error fetching Authors:", error);
    }
};

const createAuthor = async (req, res) => {
    let { name, birthdate } = req.body;
    try {
        if (!name || !birthdate) {
            return res.status(400).json({
                message: "Name and birthdate are required",
            });
        }

        birthdate = new Date(birthdate);
        if (isNaN(birthdate.getTime())) {
            return res.status(400).json({ message: "Invalid published date" });
        }

        if (birthdate > new Date()) {
            return res
                .status(400)
                .json({ message: "Published date cannot be in the future" });
        }

        const author = await Author.create({
            name,
            birthdate,
        });
        res.status(201).json(author);
    } catch (error) {
        console.error("Error creating author:", error);
    }
};

const getAuthorById = async (req, res) => {
    try {
        const { id } = req.params;
        const author = await Author.findByPk(id);

        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }

        res.status(200).json(author);
    } catch (error) {
        console.error("Error fetching author:", error);
    }
};

const updateAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const author = await Author.findByPk(id);

        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }

        let { name, birthdate } = req.body;

        if (!name && !birthdate) {
            return res.status(400).json({
                message: "No data provided",
            });
        }

        if (birthdate) {
            birthdate = new Date(birthdate);
            if (isNaN(birthdate.getTime())) {
                return res
                    .status(400)
                    .json({ message: "Invalid published date" });
            }
            if (birthdate > new Date()) {
                return res
                    .status(400)
                    .json({
                        message: "Published date cannot be in the future",
                    });
            }
            author.birthdate = birthdate;
        }

        if (name) {
            author.name = name;
        }

        await author.save();
        res.status(200).json(author);
    } catch (error) {
        console.error("Error updating author:", error);
    }
};

const deleteAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const author = await Author.findByPk(id);

        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }

        await author.destroy();
        res.status(204).json({message:"Author deleted successfully"});
    } catch (error) {
        console.error("Error deleting author:", error);
    }
};

//books controllers
const getBooksByAuthorId = async (req, res) => {
    try {
        const { authorId } = req.params;
        const author = await Author.findByPk(authorId);

        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }

        const books = await Book.findAll({
            where: {
                authorId,
            },
        });
        res.status(200).json(books);
    } catch (error) {
        console.error("Error fetching books:", error);
    }
};

const createBookByAuthorId = async (req, res) => {
    try {
        const { authorId } = req.params;
        const author = await Author.findByPk(authorId);

        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }

        let { title, publishedDate } = req.body;

        if (!title || !publishedDate) {
            return res.status(400).json({
                message: "Title and published date are required",
            });
        }

        publishedDate = new Date(publishedDate);
        if (isNaN(publishedDate.getTime())) {
            return res.status(400).json({ message: "Invalid published date" });
        }

        if (publishedDate > new Date()) {
            return res
                .status(400)
                .json({ message: "Published date cannot be in the future" });
        }

        const book = await Book.create({
            title,
            publishedDate,
            authorId,
        });
        res.status(201).json(book);
    } catch (error) {
        console.error("Error creating book:", error);
    }
};

const getSpecificBookForSpecificAuthor = async (req, res) => {
    try {
        const { authorId, bookId } = req.params;
        const author = await Author.findByPk(authorId);

        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }

        const book = await Book.findOne({
            where: {
                id: bookId,
                authorId,
            },
        });

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(book);
    } catch (error) {
        console.error("Error fetching book:", error);
    }
};

const updateSpecificBookByAuthorId = async (req, res) => {
    try {
        const { authorId, bookId } = req.params;
        const author = await Author.findByPk(authorId);

        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }

        const book = await Book.findOne({
            where: {
                id: bookId,
                authorId,
            },
        });

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        let { title, publishedDate } = req.body;

        if (!title && !publishedDate) {
            return res.status(400).json({
                message: "No data provided",
            });
        }

        if (publishedDate) {
            publishedDate = new Date(publishedDate);
            if (isNaN(publishedDate.getTime())) {
                return res
                    .status(400)
                    .json({ message: "Invalid published date" });
            }
            if (publishedDate > new Date()) {
                return res
                    .status(400)
                    .json({
                        message: "Published date cannot be in the future",
                    });
            }
            book.publishedDate = publishedDate;
        }

        if (title) {
            book.title = title;
        }

        await book.save();
        res.status(200).json(book);
    } catch (error) {
        console.error("Error updating book:", error);
    }
};

const deleteSpecificBookByAuthorId = async (req, res) => {
    try {
        const { authorId, bookId } = req.params;
        const author = await Author.findByPk(authorId);

        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }

        const book = await Book.findOne({
            where: {
                id: bookId,
                authorId,
            },
        });

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        await book.destroy();
        res.status(204).json({message:"Book deleted successfully"});
    } catch (error) {
        console.error("Error deleting book:", error);
    }
};

export {
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
};
