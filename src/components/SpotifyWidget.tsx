import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Pause, X } from 'lucide-react';

const SpotifyWidget = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [currentTrack, setCurrentTrack] = useState({
    name: "Midnight City",
    artist: "M83",
    album: "Hurry Up, We're Dreaming",
    image: "https://i.scdn.co/image/ab67616d0000b273c8b444df094279e70d0ed856"
  });

  // Simulate track updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPlaying(prev => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-6 right-6 z-50"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="glass-card p-4 rounded-lg max-w-xs relative group"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {/* Close button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <Music className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">
              {isPlaying ? 'Now Playing' : 'Last Played'}
            </span>
            <motion.div
              className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-primary' : 'bg-muted-foreground'}`}
              animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>

          {/* Track info */}
          <div className="flex gap-3">
            <motion.img
              src={currentTrack.image}
              alt={currentTrack.album}
              className="w-12 h-12 rounded-md"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm text-foreground truncate">
                {currentTrack.name}
              </h4>
              <p className="text-xs text-muted-foreground truncate">
                {currentTrack.artist}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {currentTrack.album}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center mt-3">
            <motion.button
              className="p-2 rounded-full bg-primary/20 hover:bg-primary/30 transition-colors"
              onClick={() => setIsPlaying(!isPlaying)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 text-primary" />
              ) : (
                <Play className="h-4 w-4 text-primary" />
              )}
            </motion.button>
          </div>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="w-full bg-muted rounded-full h-1">
              <motion.div
                className="bg-primary h-1 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: isPlaying ? "60%" : "35%" }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SpotifyWidget;