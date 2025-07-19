import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Music } from 'lucide-react';
import { usePlaylist } from '@/contexts/PlaylistContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

export const AddSongForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [duration, setDuration] = useState('');
  const { addSong } = usePlaylist();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && artist.trim()) {
      addSong({
        title: title.trim(),
        artist: artist.trim(),
        duration: duration.trim() || undefined,
      });
      setTitle('');
      setArtist('');
      setDuration('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-card-gradient border-border/50 shadow-glow-secondary">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Music className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Add New Song</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-foreground">
                Song Title
              </Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter song title"
                className="bg-background/50 border-border/50 focus:border-primary"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="artist" className="text-sm font-medium text-foreground">
                Artist
              </Label>
              <Input
                id="artist"
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Enter artist name"
                className="bg-background/50 border-border/50 focus:border-primary"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-sm font-medium text-foreground">
                Duration (optional)
              </Label>
              <Input
                id="duration"
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g., 3:45"
                className="bg-background/50 border-border/50 focus:border-primary"
              />
            </div>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              className="w-full bg-music-gradient hover:shadow-glow-primary transition-all duration-300 text-primary-foreground font-medium"
              disabled={!title.trim() || !artist.trim()}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add to Playlist
            </Button>
          </motion.div>
        </form>
      </Card>
    </motion.div>
  );
};