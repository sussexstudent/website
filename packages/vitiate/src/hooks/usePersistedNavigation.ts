import {useCallback, useEffect, useMemo, useState} from 'react';
import storage from '../lib/storage';

export const usePersistedNavigation = () => {
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await storage.get('navState');
        const state = JSON.parse(savedStateString);

        setInitialState(state);
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  const handleStateChange = useCallback(state => {
    storage.set('navState', JSON.stringify(state));
  }, []);

  return {isReady, initialState, handleStateChange};
};
