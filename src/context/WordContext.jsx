import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { subscribeToUserWords, subscribeToUserPhrases } from '../utils/firestore';

const WordContext = createContext();

export function useWords() {
  return useContext(WordContext);
}

export function WordProvider({ children }) {
  const { currentUser } = useAuth();
  const [words, setWords] = useState([]);
  const [phrases, setPhrases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setWords([]);
      setPhrases([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    let wordsLoaded = false;
    let phrasesLoaded = false;

    const checkLoading = () => {
      if (wordsLoaded && phrasesLoaded) setLoading(false);
    };

    const sortData = (data) => {
      return [...data].sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : Date.now();
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : Date.now();
        return timeB - timeA;
      });
    };

    const unsubWords = subscribeToUserWords(currentUser.uid, (data) => {
      setWords(sortData(data));
      wordsLoaded = true;
      checkLoading();
    });
    
    const unsubPhrases = subscribeToUserPhrases(currentUser.uid, (data) => {
      setPhrases(sortData(data));
      phrasesLoaded = true;
      checkLoading();
    });

    return () => {
      unsubWords();
      unsubPhrases();
    };
  }, [currentUser]);

  const value = {
    words,
    phrases,
    loading
  };

  return (
    <WordContext.Provider value={value}>
      {children}
    </WordContext.Provider>
  );
}
