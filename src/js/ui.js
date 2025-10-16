// ui.js
import { getAllStories } from './story.js';

const featuredEl = document.getElementById('featured');

export async function renderHome(){
  const books = await getAllStories();
  featuredEl.innerHTML = '';
  books.forEach(book => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img class="book-cover" src="${book.image}" alt="Cover of ${book.title.en}">
      <h3>${book.title.en} / ${book.title.es} / ${book.title.jp}</h3>
      <p class="muted">${book.author} • ${book.ageRange}</p>
      <p class="summary">${book.summary.en}<br>${book.summary.es}<br>${book.summary.jp}</p>
      <a href="/reader.html?book=${book.id}" aria-label="Read ${book.title.en}">Read</a>
    `;
    featuredEl.appendChild(card);
  });
}
