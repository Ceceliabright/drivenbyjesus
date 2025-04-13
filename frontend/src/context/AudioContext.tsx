import React, { createContext, useState, useRef } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  togglePlay: () => void;
}

export const AudioContext = createContext<AudioContextType>({
  isPlaying: false,
  togglePlay: () => {},
});

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio('/handpan.mp3')); // Change this to your music file path

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <AudioContext.Provider value={{ isPlaying, togglePlay }}>
      {children}
    </AudioContext.Provider>
  );
};


