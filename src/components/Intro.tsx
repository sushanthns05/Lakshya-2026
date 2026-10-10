import { motion } from 'framer-motion';
import { FastForward, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    // Autoplay muted to bypass mobile browser restrictions
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(error => {
        console.log("Autoplay prevented by browser:", error);
      });
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
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
        muted
        defaultMuted
        playsInline
        onEnded={onComplete}
        className="absolute inset-0 w-full h-full object-contain"
      >
        <source src="/eventvideo1.mp4" type="video/mp4" media="(max-width: 768px)" />
        <source src="/eventvideo.mp4" type="video/mp4" />
      </video>

      {/* Audio Toggle Button */}
      <div className="absolute bottom-8 left-8 z-30">
        <button 
          onClick={toggleMute}
          className="group flex items-center justify-center w-12 h-12 bg-black/50 hover:bg-black/70 text-white backdrop-blur-md rounded-full border border-white/20 transition-all duration-300 shadow-lg"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-white/80 group-hover:text-white" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

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
