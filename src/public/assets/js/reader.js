import { getBookById } from "./api.js";

// Tomamos el id de la URL
const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get("id");

const bookTitle = document.getElementById("bookTitle");
const bookPages = document.getElementById("bookPages");

const ttsEnglish = document.getElementById("ttsEnglish");
const ttsSpanish = document.getElementById("ttsSpanish");
const ttsJapanese = document.getElementById("ttsJapanese");

const downloadPdf = document.getElementById("downloadPdf");
const paypalBuy = document.getElementById("paypalBuy");

let bookData;

// Función para mostrar el libro
async function loadBook() {
  bookData = await getBookById(bookId);
  bookTitle.textContent = bookData.title.English;

  bookPages.innerHTML = "";

  const maxPages = Math.max(
    bookData.content.English.length,
    bookData.content.Spanish.length,
    bookData.content.Japanese.length
  );

  for (let i = 0; i < maxPages; i++) {
    const page = document.createElement("div");
    page.classList.add("page");
    page.innerHTML = `
      <p><strong>EN:</strong> ${bookData.content.English[i] || ""}</p>
      <p><strong>ES:</strong> ${bookData.content.Spanish[i] || ""}</p>
      <p><strong>JP:</strong> ${bookData.content.Japanese[i] || ""}</p>
    `;
    bookPages.appendChild(page);
  }

  downloadPdf.href = bookData.pdf;
}

loadBook();

// 🎧 TTS usando API
async function speak(language) {
  try {
    const text = bookData.content[language][0] || bookData.title[language];
    const res = await fetch(`/api/translate/tts?lang=${language}&text=${encodeURIComponent(text)}`);
    const audioData = await res.blob();
    const audioUrl = URL.createObjectURL(audioData);
    const audio = new Audio(audioUrl);
    audio.play();
  } catch (err) {
    console.error(err);
  }
}

ttsEnglish.addEventListener("click", () => speak("English"));
ttsSpanish.addEventListener("click", () => speak("Spanish"));
ttsJapanese.addEventListener("click", () => speak("Japanese"));

// Comprar con PayPal
paypalBuy.addEventListener("click", async () => {
  try {
    const res = await fetch(`/api/payments/paypal/${bookId}`, { method: "POST" });
    const data = await res.json();
    if (data.approvalUrl) window.location.href = data.approvalUrl;
  } catch (err) {
    console.error(err);
  }
});
