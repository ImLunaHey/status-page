'use client';
import { useEffect } from 'react';

export const useKeyPress = (targetKey: string, callback: () => void) => {
  useEffect(() => {
    window.addEventListener('keydown', (event) => {
      if (event.key === targetKey) {
        callback();
      }
    });

    return () => {
      window.removeEventListener('keydown', (event) => {
        if (event.key === targetKey) {
          callback();
        }
      });
    };
  }, [callback, targetKey]);
};
