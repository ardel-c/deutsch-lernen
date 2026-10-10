import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { subscribeToPracticeStats } from '../utils/firestore';

// Live map of { [questionId]: { correct, incorrect, lastCorrect, lastAnswer, lastSeen } }
export function usePracticeStats(exercise) {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({});

  useEffect(() => {
    if (!currentUser) return;
    return subscribeToPracticeStats(currentUser.uid, exercise, setStats);
  }, [currentUser, exercise]);

  return stats;
}
