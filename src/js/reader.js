import { books } from "./data.js";

const params = new URLSearchParams(window.location.search);
const bookId = parseInt(params.get("book"));
const book = books.find(b => b.id === bookId);

const titleEl = document.getElementById("book-title");
const textEl = document.getElementById("book-text");
const btnTTS = document.getElementById("play-tts");

if(book) {
  titleEl.textContent = book.title;
  textEl.textContent = "Once upon a time, there was a golden fox who loved adventures...";
}

btnTTS.addEventListener("click", () => {
  const utter = new SpeechSynthesisUtterance(textEl.textContent);
  utter.lang = book.language === "English" ? "en-US" : (book.language === "Spanish" ? "es-ES" : "ja-JP");
  speechSynthesis.speak(utter);
});
