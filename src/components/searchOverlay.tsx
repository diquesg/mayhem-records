"use client";

import { useSearchHistory } from "@/lib/contexts/searchHistoryContext";
import { Search, X, Clock, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [warning, setWarning] = useState(false);
  const { searchHistory, addToHistory, removeFromHistory, clearHistory } = useSearchHistory();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setWarning(true);
      return;
    }
    
    addToHistory(query.trim());
    router.push(`/busca?q=${encodeURIComponent(query.trim())}`);
    onClose();
  };

  const handleHistoryItemClick = (historyItem: string) => {
    setQuery(historyItem);
    addToHistory(historyItem);
    router.push(`/busca?q=${encodeURIComponent(historyItem)}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-16 lg:pt-36 animate-fadeIn">
      <div 
        ref={overlayRef}
        className="w-full max-w-2xl bg-[#131313] border border-neutral-700 rounded-lg shadow-lg overflow-hidden"
      >
        <div className="p-4 border-b border-neutral-700 flex justify-between items-center">
          <h2 className="text-xl font-medium">Buscar</h2>
          <button 
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSearch} className="p-4 flex gap-2">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setWarning(false);
            }}
            placeholder="O que você quer ouvir hoje?"
            className={`border bg-black rounded-full w-full p-3 text-neutral-300 border-neutral-700 ${warning ? "border-red-500" : ""}`}
          />
          <button 
            type="submit" 
            className="bg-blue-600 rounded-full h-fit p-3 active:bg-blue-400"
          >
            <Search size={20} />
          </button>
        </form>
        
        {searchHistory.length > 0 && (
          <div className="px-4 pb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg text-neutral-400 flex items-center gap-2 mt-2">
                <Clock size={24} /> Pesquisas recentes
              </h3>
              <button 
                onClick={clearHistory}
                className="text-sm text-neutral-500 hover:text-red-400 hover:scale-105 transition-all active:scale-90 flex items-center gap-1"
              >
                <Trash2 size={16} /> Limpar histórico
              </button>
            </div>
            
            <ul className="space-y-2 hover:bg-neutral-800 px-2 mt-3">
              {searchHistory.map((item, index) => (
                <li key={index} className="flex justify-between items-center group">
                  <button 
                    onClick={() => handleHistoryItemClick(item)}
                    className="text-neutral-300 hover:text-white flex items-center gap-2 w-full text-left py-2"
                  >
                    <Clock size={14} className="text-neutral-500" />
                    <span className="truncate">{item}</span>
                  </button>
                  <button 
                    onClick={() => removeFromHistory(item)}
                    className="text-neutral-500 hover:text-neutral-300 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}