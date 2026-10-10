import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Register() {
  useEffect(() => {
    // Redirect to the Google Form after 3 seconds
    const timer = setTimeout(() => {
      window.location.replace('https://forms.gle/PLACEHOLDER');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-navy-950">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-navy-900 via-navy-950 to-navy-950" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/20 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-12 md:p-16 rounded-3xl flex flex-col items-center text-center border-white/10 shadow-[0_0_40px_rgba(230,162,60,0.15)]"
        >
          {/* Animated Spinner/Loader */}
          <div className="relative w-24 h-24 mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-t-2 border-r-2 border-gold-500 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 border-b-2 border-l-2 border-cloud rounded-full opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="w-3 h-3 bg-gold-400 rounded-full animate-ping" />
            </div>
          </div>

          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl font-display font-bold text-white mb-3"
          >
            Almost there...
          </motion.h2>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-cloud/80 text-lg"
          >
            We are taking you to the registration page.
          </motion.p>

          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 3, ease: "linear" }}
            className="w-full h-1 bg-gold-500/50 mt-8 rounded-full origin-left"
          />
        </motion.div>
      </div>
    </div>
  );
}
