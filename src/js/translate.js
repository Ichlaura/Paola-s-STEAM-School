// translate.js
export async function translateText(text, toLang){
  const qs = new URLSearchParams({ q:text, langpair:`|${toLang}` });
  const res = await fetch(`https://api.mymemory.translated.net/get?${qs}`);
  const json = await res.json();
  return { translatedText: json.responseData.translatedText, matches: json.matches||[] };
}
