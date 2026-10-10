import { motion } from 'framer-motion';
import { FastForward, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isBlocked, setIsBlocked] = useState(false);

  // Attempt to play on mount to handle browser autoplay policies
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay prevented by browser:", error);
        setIsBlocked(true);
      });
    }
  }, []);

  const handleManualPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsBlocked(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Full Background Video */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        onEnded={onComplete}
        className="absolute inset-0 w-full h-full object-contain"
      >
        <source src="/eventvideo1.mp4" type="video/mp4" media="(max-width: 768px)" />
        <source src="/eventvideo.mp4" type="video/mp4" />
      </video>

      {/* Manual Play Fallback Overlay */}
      {isBlocked && (
        <div className="absolute inset-0 bg-black/60 z-20 flex flex-col items-center justify-center">
          <button
            onClick={handleManualPlay}
            className="group flex flex-col items-center justify-center gap-4 text-white hover:scale-105 transition-transform"
          >
            <div className="w-20 h-20 bg-gold-500/90 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(230,162,60,0.5)]">
              <Play className="w-8 h-8 ml-1 text-navy-950" />
            </div>
            <span className="font-semibold text-lg tracking-wide">Tap to Play Video</span>
          </button>
        </div>
      )}

      {/* Skip Intro Button */}
      <div className="absolute bottom-8 right-8 z-30">
        <button 
          onClick={onComplete}
          className="group flex items-center justify-center gap-2 px-6 py-3 bg-black/50 hover:bg-black/70 text-white backdrop-blur-md rounded-full border border-white/20 transition-all duration-300 shadow-lg"
        >
          <span className="font-medium">Skip Intro</span>
          <FastForward className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
