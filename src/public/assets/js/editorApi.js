export async function createBook(book) {
  try {
    const res = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book)
    });
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
