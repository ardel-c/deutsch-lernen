import { db } from '../firebase';
import { collection, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc, query, where, serverTimestamp, onSnapshot, orderBy, writeBatch, arrayUnion, arrayRemove, increment, limit } from 'firebase/firestore';

// A word is "Missing Info" (and kept out of review) when required details are missing.
// Plural is optional: many nouns have none (e.g. Weltraum, Atmung).
export function computeNeedsReview(wordData) {
  if (wordData.type === 'noun' && !wordData.article) return true;
  if (wordData.type === 'preposition' && !wordData.caseRequired) return true;
  return false;
}

export async function addWord(userId, wordData) {
  const wordsRef = collection(db, 'words');
  const needsReview = computeNeedsReview(wordData);

  const newWord = {
    ...wordData,
    userId,
    needsReview,
    createdAt: serverTimestamp(),
    // Anki fields
    nextReviewDate: new Date().toISOString(),
    interval: 0,
    easeFactor: 2.5,
    repetitions: 0
  };

  const batch = writeBatch(db);
  const newWordRef = doc(wordsRef);
  batch.set(newWordRef, newWord);

  if (wordData.relatedWords && wordData.relatedWords.length > 0) {
    wordData.relatedWords.forEach(relatedId => {
      const relRef = doc(db, 'words', relatedId);
      batch.update(relRef, {
        relatedWords: arrayUnion(newWordRef.id)
      });
    });
  }

  await batch.commit();
  return newWordRef;
}

export async function addPhrase(userId, phraseData) {
  const phrasesRef = collection(db, 'phrases');
  const newPhrase = {
    ...phraseData,
    userId,
    createdAt: serverTimestamp(),
    // Anki fields
    nextReviewDate: new Date().toISOString(),
    interval: 0,
    easeFactor: 2.5,
    repetitions: 0
  };

  return await addDoc(phrasesRef, newPhrase);
}

export async function getUserWords(userId) {
  const wordsRef = collection(db, 'words');
  const q = query(wordsRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getUserPhrases(userId) {
  const phrasesRef = collection(db, 'phrases');
  const q = query(phrasesRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export function subscribeToUserWords(userId, callback) {
  const wordsRef = collection(db, 'words');
  const q = query(wordsRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  });
}

export function subscribeToUserPhrases(userId, callback) {
  const phrasesRef = collection(db, 'phrases');
  const q = query(phrasesRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  });
}

export async function getItem(collectionName, id) {
  const itemRef = doc(db, collectionName, id);
  const snapshot = await getDoc(itemRef);
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

export async function updateItem(collectionName, id, updates) {
  const itemRef = doc(db, collectionName, id);
  return await updateDoc(itemRef, updates);
}

export async function updateWord(id, updates, oldRelatedWords = []) {
  const batch = writeBatch(db);
  const wordRef = doc(db, 'words', id);
  
  batch.update(wordRef, updates);

  if (updates.relatedWords) {
    const newRelatedWords = updates.relatedWords;
    const added = newRelatedWords.filter(rid => !oldRelatedWords.includes(rid));
    const removed = oldRelatedWords.filter(rid => !newRelatedWords.includes(rid));

    added.forEach(rid => {
      const relRef = doc(db, 'words', rid);
      batch.update(relRef, { relatedWords: arrayUnion(id) });
    });

    removed.forEach(rid => {
      const relRef = doc(db, 'words', rid);
      batch.update(relRef, { relatedWords: arrayRemove(id) });
    });
  }

  await batch.commit();
}

export async function deleteItem(collectionName, id) {
  if (collectionName === 'words') {
    const itemRef = doc(db, collectionName, id);
    const snapshot = await getDoc(itemRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      if (data.relatedWords && data.relatedWords.length > 0) {
        const batch = writeBatch(db);
        batch.delete(itemRef);
        data.relatedWords.forEach(rid => {
          const relRef = doc(db, 'words', rid);
          batch.update(relRef, { relatedWords: arrayRemove(id) });
        });
        await batch.commit();
        return;
      }
    }
  }
  const itemRef = doc(db, collectionName, id);
  return await deleteDoc(itemRef);
}

// SuperMemo-2 Algorithm implementation
export function calculateNextReview(quality, repetitions, previousInterval, previousEaseFactor) {
  let interval;
  let easeFactor = previousEaseFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;

  if (quality < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    repetitions += 1;
    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.round(previousInterval * easeFactor);
    }
  }

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + interval);

  return {
    repetitions,
    interval,
    easeFactor,
    nextReviewDate: nextDate.toISOString()
  };
}

export async function renameGlobalTag(userId, oldTag, newTag, words, phrases) {
  const batch = writeBatch(db);
  let hasUpdates = false;

  const updateItems = (items, collectionName) => {
    items.forEach(item => {
      if (item.tags && item.tags.includes(oldTag)) {
        const newTags = item.tags.map(t => t === oldTag ? newTag : t);
        const uniqueTags = Array.from(new Set(newTags));
        const itemRef = doc(db, collectionName, item.id);
        batch.update(itemRef, { tags: uniqueTags });
        hasUpdates = true;
      }
    });
  };

  updateItems(words, 'words');
  updateItems(phrases, 'phrases');

  if (hasUpdates) {
    await batch.commit();
  }
}

export async function deleteGlobalTag(userId, tagToDelete, words, phrases) {
  const batch = writeBatch(db);
  let hasUpdates = false;

  const updateItems = (items, collectionName) => {
    items.forEach(item => {
      if (item.tags && item.tags.includes(tagToDelete)) {
        const newTags = item.tags.filter(t => t !== tagToDelete);
        const itemRef = doc(db, collectionName, item.id);
        batch.update(itemRef, { tags: newTags });
        hasUpdates = true;
      }
    });
  };

  updateItems(words, 'words');
  updateItems(phrases, 'phrases');

  if (hasUpdates) {
    await batch.commit();
  }
}

// Practice results
// users/{uid}/practiceSessions/{id}: one document per finished round
// users/{uid}/practiceStats/{exercise}: lifetime correct/incorrect counts per question id
export async function savePracticeSession(userId, exercise, filter, results) {
  const batch = writeBatch(db);
  const correct = results.filter(r => r.correct).length;

  const sessionRef = doc(collection(db, 'users', userId, 'practiceSessions'));
  batch.set(sessionRef, {
    exercise,
    filter,
    correct,
    total: results.length,
    results,
    createdAt: serverTimestamp()
  });

  const now = new Date().toISOString();
  const questions = {};
  results.forEach(r => {
    questions[String(r.id)] = {
      correct: increment(r.correct ? 1 : 0),
      incorrect: increment(r.correct ? 0 : 1),
      lastCorrect: r.correct,
      lastAnswer: r.answer,
      lastSeen: now
    };
  });
  batch.set(doc(db, 'users', userId, 'practiceStats', exercise), { questions }, { merge: true });

  await batch.commit();
}

export function subscribeToPracticeStats(userId, exercise, callback) {
  return onSnapshot(doc(db, 'users', userId, 'practiceStats', exercise), (snapshot) => {
    callback(snapshot.exists() ? snapshot.data().questions || {} : {});
  });
}

export function subscribeToPracticeSessions(userId, callback, max = 500) {
  const q = query(collection(db, 'users', userId, 'practiceSessions'), orderBy('createdAt', 'desc'), limit(max));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
  });
}
