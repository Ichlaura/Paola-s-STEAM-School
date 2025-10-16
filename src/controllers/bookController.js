// src/controllers/bookController.js

import Book from "../models/Book.js";

// Obtener todos los libros
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching books" });
  }
};

// Obtener libro por ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching book" });
  }
};

// Crear libro
export const createBook = async (req, res) => {
  try {
    const { title, content, pdf, price, images } = req.body;

    // title: { English, Spanish, Japanese }
    // content: { English: [...], Spanish: [...], Japanese: [...] }
    // pdf: URL o nombre del archivo
    // price: número
    // images: array de nombres de archivos de imágenes

    const newBook = new Book({ title, content, pdf, price, images });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating book" });
  }
};

// Actualizar libro (opcional)
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating book" });
  }
};

// Eliminar libro (opcional)
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting book" });
  }
};
