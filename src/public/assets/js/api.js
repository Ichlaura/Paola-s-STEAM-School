export async function getBooks() {
  try {
    const res = await fetch("/api/books");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getBookById(id) {
  try {
    const res = await fetch(`/api/books/${id}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
