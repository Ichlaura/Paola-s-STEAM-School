import { getBooks } from "./api.js";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const booksContainer = document.getElementById("booksContainer");

// Función para cargar libros dinámicamente
async function loadBooks() {
  const books = await getBooks();
  booksContainer.innerHTML = "";
  books.forEach(book => {
    // Obtener título según el idioma actual
    const lang = i18next.language || 'en';
    const title = book.title[lang] || book.title['English'];

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

// Inicializa i18next
i18next
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          homeTitle: "Welcome to Paola's STEAM School!",
          homeSubtitle: "Choose a book to read or create your own!",
          readBtn: "Read"
        }
      },
      es: {
        translation: {
          homeTitle: "¡Bienvenido a la Escuela STEAM de Paola!",
          homeSubtitle: "¡Elige un libro para leer o crea el tuyo!",
          readBtn: "Leer"
        }
      },
      ja: {
        translation: {
          homeTitle: "パオラのSTEAMスクールへようこそ！",
          homeSubtitle: "本を選んで読むか、自分で作ってみましょう！",
          readBtn: "読む"
        }
      }
    }
  })
  .then(() => {
    // Inicializa textos
    updateContent();
    // Carga los libros ya con el idioma detectado
    loadBooks();
  });

// Función para actualizar textos estáticos
function updateContent() {
  const homeTitle = document.getElementById("homeTitle");
  const homeSubtitle = document.getElementById("homeSubtitle");

  if (homeTitle) homeTitle.innerText = i18next.t("homeTitle");
  if (homeSubtitle) homeSubtitle.innerText = i18next.t("homeSubtitle");

  // Actualiza botones de libros si ya se cargaron
  const bookButtons = document.querySelectorAll(".bookCard a");
  bookButtons.forEach(btn => {
    btn.innerText = i18next.t("readBtn");
  });
}

// Detecta cambio de idioma en el select
document.getElementById("languageSelect").addEventListener("change", (e) => {
  i18next.changeLanguage(e.target.value).then(() => {
    updateContent();
    loadBooks(); // recarga libros para actualizar títulos en nuevo idioma
  });
});


// Función para cargar un nuevo dato de gato
async function loadCatFact() {
  try {
    const res = await fetch("https://catfact.ninja/fact");
    const data = await res.json();
    document.getElementById("catFact").innerText = data.fact;
  } catch (error) {
    document.getElementById("catFact").innerText = "Could not load cat fact 😿";
    console.error(error);
  }
}

// Inicializar un dato al cargar la página
loadCatFact();

// Botón para nuevo dato
document.getElementById("newCatFactBtn").addEventListener("click", loadCatFact);
