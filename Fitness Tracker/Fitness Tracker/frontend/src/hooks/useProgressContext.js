import { ProgressContext } from '../context/ProgressContext';
import { useContext } from 'react';

export const useProgressContext = () => {
  const context = useContext(ProgressContext);

  if (!context) {
    throw Error('useProgressContext must be used inside a ProgressContextProvider');
  }

  return context;
};