import Book from "../models/Book.js";

// ✅ Obtener todos los libros
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ message: "Error fetching books" });
  }
};

// ✅ Obtener libro por ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    console.error("Error fetching book:", err);
    res.status(500).json({ message: "Error fetching book" });
  }
};

// ✅ Crear libro nuevo
export const createBook = async (req, res) => {
  try {
    const { title, content, pdf, price } = req.body;
    const newBook = new Book({ title, content, pdf, price });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    console.error("Error creating book:", err);
    res.status(500).json({ message: "Error creating book" });
  }
};
