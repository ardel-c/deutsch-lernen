// Text-to-speech for German words, with workarounds for iOS Safari:
// - pick a German voice explicitly (lang alone can be silently ignored)
// - clear a stuck queue before speaking (iOS can get stuck in a paused state)
// - keep a reference to the utterance so Safari doesn't garbage-collect it mid-speech

let voices = [];
let currentUtterance = null;

const synth = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;

function loadVoices() {
  voices = synth.getVoices();
}

if (synth) {
  loadVoices();
  synth.addEventListener?.('voiceschanged', loadVoices);
}

function pickGermanVoice() {
  if (!voices.length) loadVoices();
  const german = voices.filter(v => v.lang?.toLowerCase().replace('_', '-').startsWith('de'));
  return german.find(v => v.lang === 'de-DE' && v.localService) || german.find(v => v.lang === 'de-DE') || german[0] || null;
}

export function isSpeechSupported() {
  return !!synth;
}

// Must be called directly from a tap/click handler (iOS only allows speech after a user gesture)
export function speakGerman(text) {
  if (!synth || !text) return false;

  if (synth.speaking || synth.pending) synth.cancel();
  if (synth.paused) synth.resume();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'de-DE';
  const voice = pickGermanVoice();
  if (voice) utterance.voice = voice;

  currentUtterance = utterance;
  utterance.onend = utterance.onerror = () => {
    if (currentUtterance === utterance) currentUtterance = null;
  };

  synth.speak(utterance);
  return true;
}
