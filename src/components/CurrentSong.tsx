import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { usePlaylist } from '@/contexts/PlaylistContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const CurrentSong: React.FC = () => {
  const { songs, currentSongIndex, isPlaying, nextSong, previousSong, togglePlay } = usePlaylist();
  
  const currentSong = songs[currentSongIndex];

  if (!currentSong) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentSong.id}
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Card className="p-8 bg-music-gradient shadow-glow-primary border-none text-center">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
              {currentSong.title}
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-2">
              {currentSong.artist}
            </p>
            {currentSong.duration && (
              <p className="text-sm text-primary-foreground/60 mb-6">
                {currentSong.duration}
              </p>
            )}
          </motion.div>
          
          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                onClick={previousSong}
                variant="secondary"
                size="lg"
                className="rounded-full w-14 h-14 bg-white/20 hover:bg-white/30 border-white/30 text-white"
              >
                <SkipBack className="w-6 h-6" />
              </Button>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }}
              animate={isPlaying ? { scale: [1, 1.05, 1] } : {}}
              transition={isPlaying ? { repeat: Infinity, duration: 1.5 } : {}}
            >
              <Button
                onClick={togglePlay}
                size="lg"
                className="rounded-full w-16 h-16 bg-white hover:bg-white/90 text-primary shadow-lg"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8 ml-1" />
                )}
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                onClick={nextSong}
                variant="secondary"
                size="lg"
                className="rounded-full w-14 h-14 bg-white/20 hover:bg-white/30 border-white/30 text-white"
              >
                <SkipForward className="w-6 h-6" />
              </Button>
            </motion.div>
          </motion.div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};