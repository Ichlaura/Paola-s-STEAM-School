import { createBook } from "./editorApi.js";

const bookForm = document.getElementById("bookForm");
const pagesContainer = document.getElementById("pagesContainer");
const addPageBtn = document.getElementById("addPage");
const bookPreview = document.getElementById("bookPreview");

// Añadir nueva página
addPageBtn.addEventListener("click", () => {
  const page = document.createElement("div");
  page.classList.add("page");
  page.innerHTML = `
    <textarea placeholder="English Text" name="pageEnglish[]"></textarea>
    <textarea placeholder="Spanish Text" name="pageSpanish[]"></textarea>
    <textarea placeholder="Japanese Text" name="pageJapanese[]"></textarea>
    <input type="file" name="images[]" accept="image/*">
  `;
  pagesContainer.appendChild(page);
});

// Guardar libro
bookForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(bookForm);
  const title = {
    English: formData.get("titleEnglish"),
    Spanish: formData.get("titleSpanish"),
    Japanese: formData.get("titleJapanese")
  };

  const price = formData.get("price");

  const content = { English: [], Spanish: [], Japanese: [] };
  const images = [];

  const pages = pagesContainer.querySelectorAll(".page");
  pages.forEach(page => {
    content.English.push(page.querySelector('textarea[name="pageEnglish[]"]').value);
    content.Spanish.push(page.querySelector('textarea[name="pageSpanish[]"]').value);
    content.Japanese.push(page.querySelector('textarea[name="pageJapanese[]"]').value);
    const img = page.querySelector('input[name="images[]"]').files[0];
    if (img) images.push(img.name); // Para simplificar, solo el nombre
  });

  const newBook = { title, content, price, images, pdf: "#" };
  const savedBook = await createBook(newBook);

  alert("Book saved successfully!");
  previewBook(savedBook);
});

// Previsualizar libro
function previewBook(book) {
  bookPreview.innerHTML = "";
  book.content.English.forEach((_, i) => {
    const pageDiv = document.createElement("div");
    pageDiv.classList.add("pagePreview");
    pageDiv.innerHTML = `
      <p><strong>EN:</strong> ${book.content.English[i]}</p>
      <p><strong>ES:</strong> ${book.content.Spanish[i]}</p>
      <p><strong>JP:</strong> ${book.content.Japanese[i]}</p>
    `;
    bookPreview.appendChild(pageDiv);
  });
}
