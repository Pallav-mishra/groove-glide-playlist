import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Song {
  id: string;
  title: string;
  artist: string;
  duration?: string;
}

interface PlaylistContextType {
  songs: Song[];
  currentSongIndex: number;
  isPlaying: boolean;
  addSong: (song: Omit<Song, 'id'>) => void;
  removeSong: (id: string) => void;
  setCurrentSong: (index: number) => void;
  nextSong: () => void;
  previousSong: () => void;
  togglePlay: () => void;
  reorderSongs: (startIndex: number, endIndex: number) => void;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error('usePlaylist must be used within a PlaylistProvider');
  }
  return context;
};

interface PlaylistProviderProps {
  children: ReactNode;
}

export const PlaylistProvider: React.FC<PlaylistProviderProps> = ({ children }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedPlaylist = localStorage.getItem('musicPlaylist');
    const savedCurrentIndex = localStorage.getItem('currentSongIndex');
    
    if (savedPlaylist) {
      const parsedPlaylist = JSON.parse(savedPlaylist);
      setSongs(parsedPlaylist);
    }
    
    if (savedCurrentIndex && !isNaN(Number(savedCurrentIndex))) {
      setCurrentSongIndex(Number(savedCurrentIndex));
    }
  }, []);

  // Save to localStorage whenever playlist or current index changes
  useEffect(() => {
    localStorage.setItem('musicPlaylist', JSON.stringify(songs));
  }, [songs]);

  useEffect(() => {
    localStorage.setItem('currentSongIndex', currentSongIndex.toString());
  }, [currentSongIndex]);

  const addSong = (song: Omit<Song, 'id'>) => {
    const newSong: Song = {
      ...song,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    setSongs(prev => [...prev, newSong]);
  };

  const removeSong = (id: string) => {
    setSongs(prev => {
      const newSongs = prev.filter(song => song.id !== id);
      const removedIndex = prev.findIndex(song => song.id === id);
      
      // Adjust current index if necessary
      if (removedIndex < currentSongIndex) {
        setCurrentSongIndex(prev => Math.max(0, prev - 1));
      } else if (removedIndex === currentSongIndex && newSongs.length > 0) {
        setCurrentSongIndex(prev => Math.min(prev, newSongs.length - 1));
      } else if (newSongs.length === 0) {
        setCurrentSongIndex(0);
        setIsPlaying(false);
      }
      
      return newSongs;
    });
  };

  const setCurrentSong = (index: number) => {
    if (index >= 0 && index < songs.length) {
      setCurrentSongIndex(index);
      setIsPlaying(true);
    }
  };

  const nextSong = () => {
    if (songs.length > 0) {
      setCurrentSongIndex(prev => (prev + 1) % songs.length);
    }
  };

  const previousSong = () => {
    if (songs.length > 0) {
      setCurrentSongIndex(prev => (prev - 1 + songs.length) % songs.length);
    }
  };

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const reorderSongs = (startIndex: number, endIndex: number) => {
    setSongs(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      
      // Adjust current index if the current song was moved
      if (startIndex === currentSongIndex) {
        setCurrentSongIndex(endIndex);
      } else if (startIndex < currentSongIndex && endIndex >= currentSongIndex) {
        setCurrentSongIndex(prev => prev - 1);
      } else if (startIndex > currentSongIndex && endIndex <= currentSongIndex) {
        setCurrentSongIndex(prev => prev + 1);
      }
      
      return result;
    });
  };

  const value: PlaylistContextType = {
    songs,
    currentSongIndex,
    isPlaying,
    addSong,
    removeSong,
    setCurrentSong,
    nextSong,
    previousSong,
    togglePlay,
    reorderSongs,
  };

  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  );
};