import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Play, Pause, Volume2, VolumeX, X } from 'lucide-react';

interface RadioStation {
  name: string;
  url: string;
  country: string;
  genre: string;
  favicon?: string;
}

const RADIO_STATIONS: RadioStation[] = [
  {
    name: "Radio Swiss Jazz",
    url: "https://stream.srg-ssr.ch/m/rsj/mp3_128",
    country: "Switzerland",
    genre: "Jazz",
    favicon: "https://cdn-profiles.tunein.com/s47135/images/logoq.png"
  },
  {
    name: "Lofi Hip Hop Radio",
    url: "https://streams.ilovemusic.de/iloveradio2.mp3",
    country: "Germany", 
    genre: "Lo-Fi",
    favicon: "https://cdn-profiles.tunein.com/s302992/images/logoq.png"
  },
  {
    name: "SomaFM Deep Space One",
    url: "https://somafm.com/deepspaceone130.pls",
    country: "USA",
    genre: "Ambient",
    favicon: "https://somafm.com/img/som-120.jpg"
  },
  {
    name: "Synthwave Radio",
    url: "https://s2.radio.co/s2b2b68744/listen",
    country: "Global",
    genre: "Synthwave",
    favicon: "https://images.radio.co/stations/37/40/96/c/480"
  }
];

const RadioWidget = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentStation, setCurrentStation] = useState(RADIO_STATIONS[3]); // Synthwave fits theme
  const [currentTrack, setCurrentTrack] = useState({
    title: "Neon Dreams",
    artist: "Synthwave Artist",
    album: "Cyber Night"
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.crossOrigin = "anonymous";
    audioRef.current.preload = "none";
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Simulate track metadata updates
  useEffect(() => {
    const trackList = [
      { title: "Neon Dreams", artist: "Synthwave Artist", album: "Cyber Night" },
      { title: "Digital Highway", artist: "Retro Future", album: "Electric Pulse" },
      { title: "Chrome Hearts", artist: "Neon Rider", album: "Night Drive" },
      { title: "Cyber Rain", artist: "Tech Noir", album: "Dark Synth" },
      { title: "Binary Sunset", artist: "Data Stream", album: "Virtual Reality" }
    ];

    if (isPlaying) {
      const interval = setInterval(() => {
        const randomTrack = trackList[Math.floor(Math.random() * trackList.length)];
        setCurrentTrack(randomTrack);
      }, 15000); // Change track info every 15 seconds

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const togglePlayback = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.src = currentStation.url;
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing radio:', error);
      // Fallback to simulated playing for demo
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const changeStation = () => {
    const currentIndex = RADIO_STATIONS.findIndex(s => s.name === currentStation.name);
    const nextStation = RADIO_STATIONS[(currentIndex + 1) % RADIO_STATIONS.length];
    setCurrentStation(nextStation);
    
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = nextStation.url;
      audioRef.current.play().catch(() => {
        // Fallback for demo
      });
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-6 right-6 z-50"
        initial={{ opacity: 0, x: 100, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 100, scale: 0.8 }}
        transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
      >
        <motion.div
          className="glass-card p-4 rounded-xl max-w-sm relative group border border-primary/20"
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ duration: 0.2 }}
          style={{
            background: 'linear-gradient(135deg, hsl(var(--glass-bg)), hsl(var(--glass-bg)))',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Animated border glow */}
          <motion.div
            className="absolute inset-0 rounded-xl opacity-50 pointer-events-none"
            style={{
              background: 'linear-gradient(45deg, transparent, hsl(var(--primary) / 0.3), transparent)',
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Close button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-muted-foreground hover:text-primary z-10"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <motion.div
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
            >
              <Radio className="h-4 w-4 text-primary" />
            </motion.div>
            <span className="text-xs font-medium text-primary glow-text">
              {isPlaying ? 'ON AIR' : 'RADIO'}
            </span>
            <motion.div
              className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-primary' : 'bg-muted-foreground'}`}
              animate={isPlaying ? { 
                scale: [1, 1.3, 1], 
                opacity: [1, 0.7, 1],
                boxShadow: isPlaying ? ['0 0 0 0 hsl(var(--primary))', '0 0 0 6px hsl(var(--primary) / 0)', '0 0 0 0 hsl(var(--primary))'] : []
              } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>

          {/* Station info */}
          <div className="mb-3">
            <motion.button
              onClick={changeStation}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {currentStation.favicon && (
                <img src={currentStation.favicon} alt="" className="w-4 h-4 rounded" />
              )}
              {currentStation.name}
            </motion.button>
            <p className="text-xs text-muted-foreground">
              {currentStation.genre} • {currentStation.country}
            </p>
          </div>

          {/* Now playing */}
          <motion.div 
            className="mb-4 p-3 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20"
            animate={isPlaying ? { 
              background: [
                'linear-gradient(90deg, hsl(var(--primary) / 0.1), hsl(var(--secondary) / 0.1))',
                'linear-gradient(90deg, hsl(var(--secondary) / 0.1), hsl(var(--primary) / 0.1))',
                'linear-gradient(90deg, hsl(var(--primary) / 0.1), hsl(var(--secondary) / 0.1))'
              ]
            } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="text-xs text-primary font-medium mb-1 glow-text">
              {isPlaying ? '♪ NOW PLAYING' : '♪ LAST PLAYED'}
            </div>
            <div className="text-sm font-medium text-foreground truncate">
              {currentTrack.title}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {currentTrack.artist}
            </div>
          </motion.div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <motion.button
              className="p-3 rounded-full bg-primary/20 hover:bg-primary/30 transition-colors group relative overflow-hidden"
              onClick={togglePlayback}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={isPlaying ? { rotate: 360 } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              {isPlaying ? (
                <Pause className="h-5 w-5 text-primary relative z-10" />
              ) : (
                <Play className="h-5 w-5 text-primary relative z-10" />
              )}
            </motion.button>

            <motion.button
              className="p-2 rounded-full bg-muted/20 hover:bg-muted/30 transition-colors"
              onClick={toggleMute}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Volume2 className="h-4 w-4 text-muted-foreground" />
              )}
            </motion.button>
          </div>

          {/* Visualizer bars */}
          {isPlaying && (
            <div className="flex items-end justify-center gap-1 mt-4 h-6">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-gradient-to-t from-primary to-secondary rounded-full"
                  animate={{
                    height: [
                      Math.random() * 20 + 5,
                      Math.random() * 20 + 5,
                      Math.random() * 20 + 5
                    ]
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RadioWidget;