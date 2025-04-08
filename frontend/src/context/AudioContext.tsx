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





// import React, { createContext, useState, useRef, useEffect } from "react";

// interface AudioContextType {
//   isPlaying: boolean;
//   togglePlayPause: () => void;
// }

// export const AudioContext = createContext<AudioContextType | undefined>(undefined);

// export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const audioRef = useRef(new Audio("/your-music-file.mp3")); // Replace with your file path
//   const [isPlaying, setIsPlaying] = useState(false);

//   useEffect(() => {
//     const audio = audioRef.current;
//     audio.loop = true; // Keeps playing indefinitely

//     return () => {
//       audio.pause();
//     };
//   }, []);

//   const togglePlayPause = () => {
//     const audio = audioRef.current;
//     if (isPlaying) {
//       audio.pause();
//     } else {
//       audio.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   return (
//     <AudioContext.Provider value={{ isPlaying, togglePlayPause }}>
//       {children}
//     </AudioContext.Provider>
//   );
// };
