import React from 'react';
import { motion } from 'framer-motion';
import { Music } from 'lucide-react';
import { PlaylistProvider, usePlaylist } from '@/contexts/PlaylistContext';
import { AddSongForm } from '@/components/AddSongForm';
import { CurrentSong } from '@/components/CurrentSong';
import { PlaylistDisplay } from '@/components/PlaylistDisplay';
import { ThemeToggle } from '@/components/ThemeToggle';

const PlaylistApp = () => {
  const { songs } = usePlaylist();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-music-gradient flex items-center justify-center shadow-glow-primary">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">MusicFlow</h1>
              <p className="text-sm text-muted-foreground">Your Personal Playlist</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Current Song Display */}
        {songs.length > 0 && (
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CurrentSong />
          </motion.section>
        )}

        {/* Add Song Form */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: songs.length > 0 ? 0.4 : 0.2 }}
        >
          <AddSongForm />
        </motion.section>

        {/* Playlist Display */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: songs.length > 0 ? 0.6 : 0.4 }}
        >
          <PlaylistDisplay />
        </motion.section>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="border-t border-border/50 bg-background/80 backdrop-blur-sm mt-16"
      >
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-muted-foreground text-sm">
            Enjoy your music with MusicFlow 🎵
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

const Index = () => {
  return (
    <PlaylistProvider>
      <PlaylistApp />
    </PlaylistProvider>
  );
};

export default Index;
