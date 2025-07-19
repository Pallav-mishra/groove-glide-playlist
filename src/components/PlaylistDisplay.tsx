import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trash2, Music, Play } from 'lucide-react';
import { usePlaylist } from '@/contexts/PlaylistContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const PlaylistDisplay: React.FC = () => {
  const { songs, currentSongIndex, removeSong, setCurrentSong } = usePlaylist();

  if (songs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-16"
      >
        <Card className="p-12 bg-card-gradient border-border/50 shadow-lg">
          <Music className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-foreground mb-2">
            No songs yet 🎶
          </h3>
          <p className="text-muted-foreground text-lg">
            Add your first one to get started!
          </p>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-card-gradient border-border/50 shadow-glow-secondary">
        <div className="flex items-center gap-2 mb-6">
          <Music className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">
            Your Playlist ({songs.length} songs)
          </h2>
        </div>
        
        <div className="space-y-3">
          <AnimatePresence>
            {songs.map((song, index) => (
              <SongItem
                key={song.id}
                song={song}
                index={index}
                isActive={index === currentSongIndex}
                onPlay={() => setCurrentSong(index)}
                onRemove={() => removeSong(song.id)}
              />
            ))}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  );
};

interface SongItemProps {
  song: any;
  index: number;
  isActive: boolean;
  onPlay: () => void;
  onRemove: () => void;
}

const SongItem: React.FC<SongItemProps> = ({ song, index, isActive, onPlay, onRemove }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
        isActive
          ? 'bg-primary/10 border-primary shadow-glow-primary'
          : 'bg-background/50 border-border/50 hover:bg-muted/30'
      }`}
      onClick={onPlay}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            {isActive ? (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Play className="w-5 h-5" />
              </motion.div>
            ) : (
              <span className="font-semibold">{index + 1}</span>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold truncate ${
              isActive ? 'text-primary' : 'text-foreground'
            }`}>
              {song.title}
            </h3>
            <p className="text-muted-foreground text-sm truncate">
              {song.artist}
            </p>
          </div>
          
          {song.duration && (
            <div className="text-sm text-muted-foreground hidden sm:block">
              {song.duration}
            </div>
          )}
        </div>
        
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};