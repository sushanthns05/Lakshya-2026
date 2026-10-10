import { motion } from 'framer-motion';
import { FastForward } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Attempt to play on mount to handle browser autoplay policies
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay prevented by browser:", error);
        // If unmuted autoplay fails, we could mute it, but the user explicitly requested audio.
        // It will require a user interaction to start if blocked.
      });
    }
  }, []);

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
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/eventvideo.mp4" type="video/mp4" />
      </video>

      {/* Skip Intro Button */}
      <div className="absolute bottom-8 right-8 z-10">
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
