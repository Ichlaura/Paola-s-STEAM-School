const saveBtn = document.getElementById("save-story");
const titleInput = document.getElementById("story-title");
const contentInput = document.getElementById("story-content");
const storiesList = document.getElementById("stories-list");

// Cargar historias guardadas
let stories = JSON.parse(localStorage.getItem("stories")) || [];
updateStoriesList();

saveBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  if(!title || !content) return alert("Please fill both fields");
  const story = { title, content };
  stories.push(story);
  localStorage.setItem("stories", JSON.stringify(stories));
  titleInput.value = "";
  contentInput.value = "";
  updateStoriesList();
});

function updateStoriesList() {
  storiesList.innerHTML = "";
  stories.forEach((s, i) => {
    const li = document.createElement("li");
    li.textContent = `${s.title}`;
    storiesList.appendChild(li);
  });
}
