import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

export default function Themes() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden pt-32 pb-24 selection:bg-gold-500/30">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-navy-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-navy-900 via-navy-950 to-navy-950" />
        <div className="absolute top-0 right-0 w-125 h-125 bg-gold-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-125 h-125 bg-blue-500/10 rounded-full blur-[120px]" />
      </div>
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-gold-500/5 rounded-full blur-[100px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center glass-card max-w-3xl mx-auto p-12 rounded-2xl border-dashed border-white/20"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mb-6">
            <Lightbulb className="w-10 h-10 text-gold-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Themes & <span className="text-gold-500">Problem Statements</span></h1>
          <p className="text-xl text-cloud/70 mb-8">
            The official hackathon themes and detailed problem statements are currently being finalized.
          </p>
          <div className="inline-flex items-center gap-3 text-gold-500 font-medium px-6 py-3 bg-white/5 rounded-full border border-white/10">
            <span className="w-3 h-3 rounded-full bg-gold-500 animate-pulse" />
            Coming Soon
          </div>
        </motion.div>
      </div>
    </div>
  );
}
