"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface SearchHistoryContextType {
  searchHistory: string[];
  addToHistory: (query: string) => void;
  clearHistory: () => void;
  removeFromHistory: (query: string) => void;
}

const SearchHistoryContext = createContext<SearchHistoryContextType>({
  searchHistory: [],
  addToHistory: () => {},
  clearHistory: () => {},
  removeFromHistory: () => {},
});

export function SearchHistoryProvider({ children }: { children: ReactNode }) {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      try {
        const parsedHistory = JSON.parse(storedHistory);
        if (Array.isArray(parsedHistory)) {
          setSearchHistory(parsedHistory);
        }
      } catch (error) {
        console.error('Failed to parse search history', error);
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
  }, [searchHistory, isMounted]);

  const addToHistory = (query: string) => {
    if (!query.trim()) return;
    
    setSearchHistory(prev => {
      const filteredHistory = prev.filter(item => item !== query);
      return [query, ...filteredHistory].slice(0, 10);
    });
  };

  const removeFromHistory = (query: string) => {
    setSearchHistory(prev => prev.filter(item => item !== query));
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  return (
    <SearchHistoryContext.Provider
      value={{
        searchHistory,
        addToHistory,
        clearHistory,
        removeFromHistory
      }}
    >
      {children}
    </SearchHistoryContext.Provider>
  );
}

export function useSearchHistory(): SearchHistoryContextType {
  const context = useContext(SearchHistoryContext);
  if (context === undefined) {
    throw new Error('useSearchHistory must be used within a SearchHistoryProvider');
  }
  return context;
}