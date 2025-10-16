// story.js
export async function getAllStories(){
  const res = await fetch('/src/data/sample-books.json');
  const data = await res.json();
  return data.books;
}

export async function getStoryById(id){
  const books = await getAllStories();
  return books.find(b => b.id===id);
}

export function saveDraft(book){
  const drafts = JSON.parse(localStorage.getItem('drafts')||'[]');
  drafts.push(book);
  localStorage.setItem('drafts', JSON.stringify(drafts));
}
