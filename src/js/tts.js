// tts.js
export function speak(text, lang){
  if(!('speechSynthesis' in window)) throw new Error('TTS not supported');
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang; // 'en-US','es-ES','ja-JP'
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
  return utter;
}
