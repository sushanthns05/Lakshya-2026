import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface IntroProps {
  onComplete: () => void;
  onRegister: () => void;
}

export default function Intro({ onComplete, onRegister }: IntroProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950 overflow-hidden"
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src="/eventvideo.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-navy-950/40 backdrop-blur-[2px]"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tighter text-white mb-4"
        >
          LAKSHYA 2026
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-xl md:text-2xl text-gold-400 font-medium italic mb-12 drop-shadow-md"
        >
          Technology for a Brighter Tomorrow
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <button 
            onClick={onComplete}
            className="group flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md rounded-xl border border-white/20 transition-all duration-300 w-full sm:w-auto"
          >
            <Play className="w-5 h-5 text-white" />
            <span className="font-semibold text-lg">Enter Website</span>
          </button>

          <button 
            onClick={onRegister}
            className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-navy-900 border border-gold-500/50 hover:bg-gold-500 text-gold-400 hover:text-navy-900 rounded-xl transition-all duration-300 w-full sm:w-auto shadow-[0_0_20px_rgba(230,162,60,0.3)]"
          >
            <span className="font-bold text-lg">Register Now</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
