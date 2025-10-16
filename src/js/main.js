import { books } from "./data.js";

const container = document.getElementById("books-container");

books.forEach(book => {
  const card = document.createElement("div");
  card.className = "book-card";
  card.innerHTML = `
    <img src="${book.cover}" alt="${book.title}">
    <h3>${book.title}</h3>
    <p>${book.language}</p>
    <a href="reader.html?book=${book.id}" class="btn">Read</a>
    <a href="${book.pdf}" class="btn" download>Download PDF</a>
  `;
  container.appendChild(card);
});
