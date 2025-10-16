import { getBooks } from "./api.js";

const booksContainer = document.getElementById("booksContainer");

async function loadBooks() {
  const books = await getBooks();
  booksContainer.innerHTML = "";
  books.forEach(book => {
    const card = document.createElement("div");
    card.classList.add("bookCard");
    card.innerHTML = `
      <img src="${book.image}" alt="${book.title.English}">
      <h3>${book.title.English}</h3>
      <a href="/reader.html?id=${book._id}">Read</a>
    `;
    booksContainer.appendChild(card);
  });
}

loadBooks();
