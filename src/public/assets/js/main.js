import { getBooks } from "./api.js";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// ---------- ELEMENTOS ----------
const booksContainer = document.getElementById("booksContainer");
const homeTitle = document.getElementById("homeTitle");
const homeSubtitle = document.getElementById("homeSubtitle");
const languageSelect = document.getElementById("languageSelect");

const catFactEl = document.getElementById("catFact");
const newCatFactBtn = document.getElementById("newCatFactBtn");

const dogImgEl = document.getElementById("dogImg");
const newDogBtn = document.getElementById("newDogBtn");

const adviceTextEl = document.getElementById("adviceText");
const newAdviceBtn = document.getElementById("newAdviceBtn");

// ---------- FUNCIONES LIBROS ----------
async function loadBooks() {
  const books = await getBooks();
  booksContainer.innerHTML = "";
  books.forEach(book => {
    const lang = i18next.language || "en";
    const title = book.title[lang] || book.title["English"];

    const card = document.createElement("div");
    card.classList.add("bookCard");
    card.innerHTML = `
      <img src="${book.image}" alt="${title}">
      <h3>${title}</h3>
      <a href="/reader.html?id=${book._id}">${i18next.t("readBtn")}</a>
    `;
    booksContainer.appendChild(card);
  });
}

// ---------- FUNCIONES TRADUCCIÓN ----------
function updateContent() {
  if (homeTitle) homeTitle.innerText = i18next.t("homeTitle");
  if (homeSubtitle) homeSubtitle.innerText = i18next.t("homeSubtitle");

  // Actualiza botones de libros si ya se cargaron
  const bookButtons = document.querySelectorAll(".bookCard a");
  bookButtons.forEach(btn => {
    btn.innerText = i18next.t("readBtn");
  });
}

i18next
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    resources: {
      en: { translation: { homeTitle: "Welcome to Paola's STEAM School!", homeSubtitle: "Choose a book to read or create your own!", readBtn: "Read" } },
      es: { translation: { homeTitle: "¡Bienvenido a la Escuela STEAM de Paola!", homeSubtitle: "¡Elige un libro para leer o crea el tuyo!", readBtn: "Leer" } },
      ja: { translation: { homeTitle: "パオラのSTEAMスクールへようこそ！", homeSubtitle: "本を選んで読むか、自分で作ってみましょう！", readBtn: "読む" } }
    }
  })
  .then(() => {
    updateContent();
    loadBooks();
  });

languageSelect.addEventListener("change", (e) => {
  i18next.changeLanguage(e.target.value).then(() => {
    updateContent();
    loadBooks();
  });
});

// ---------- FUNCIONES CAT FACTS ----------
async function fetchCatFact() {
  try {
    const res = await fetch("https://catfact.ninja/fact");
    const data = await res.json();
    catFactEl.innerText = data.fact;
    localStorage.setItem("lastCatFact", data.fact);
  } catch (e) {
    catFactEl.innerText = "Failed to load cat fact 🐱";
    console.error(e);
  }
}

newCatFactBtn.addEventListener("click", fetchCatFact);

// ---------- FUNCIONES DOG API ----------
async function fetchDog() {
  try {
    const res = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await res.json();
    dogImgEl.src = data.message;
    localStorage.setItem("lastDogImg", data.message);
  } catch (e) {
    dogImgEl.alt = "Failed to load dog 🐶";
    console.error(e);
  }
}

newDogBtn.addEventListener("click", fetchDog);

// ---------- FUNCIONES RANDOM ADVICE ----------
async function fetchAdvice() {
  try {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    adviceTextEl.innerText = data.slip.advice;
    localStorage.setItem("lastAdvice", data.slip.advice);
  } catch (e) {
    adviceTextEl.innerText = "Failed to load advice 💡";
    console.error(e);
  }
}

newAdviceBtn.addEventListener("click", fetchAdvice);

// ---------- INICIALIZAR CONTENIDO ----------
window.addEventListener("DOMContentLoaded", () => {
  // Cargar contenido guardado o por primera vez
  catFactEl.innerText = localStorage.getItem("lastCatFact") || "Loading...";
  dogImgEl.src = localStorage.getItem("lastDogImg") || "";
  adviceTextEl.innerText = localStorage.getItem("lastAdvice") || "Loading...";

  fetchCatFact();
  fetchDog();
  fetchAdvice();
  loadBooks();
});
