import Book from "../models/book.js";

const getALLBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.status(200).json(books);
    } catch (error) {
        console.error("Error fetching books:", error);
    }
};

const createBook = async (req, res) => {
    try {
        let { title, author, publishedDate } = req.body;

        if (!title || !author || !publishedDate) {
            return res.status(400).json({
                message: "Title, author and publishedDate are required",
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
            author,
            publishedDate,
        });
        res.status(201).json(book);
    } catch (error) {
        console.error("Error creating book:", error);
    }
};

const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByPk(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(book);
    } catch (error) {
        console.error("Error fetching book:", error);
    }
};

const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, publishedDate } = req.body;

        if (!title && !author && !publishedDate) {
            return res.status(400).json({ message: "No data provided" });
        }

        const book = await Book.findByPk(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        if (title) {
            book.title = title;
        }

        if (author) {
            book.author = author;
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

        await book.save();
        res.status(200).json(book);
    } catch (error) {
        console.error("Error updating book:", error);
    }
};

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByPk(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        await book.destroy();
        res.status(204).json({message:"Book deleted successfully"});
    } catch (error) {
        console.error("Error deleting book:", error);
    }
};

export { getALLBooks, createBook, getBookById, updateBook, deleteBook };
