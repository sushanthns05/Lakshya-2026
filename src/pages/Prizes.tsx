import { motion } from 'framer-motion';
import { Trophy, Award, Star, Medal } from 'lucide-react';

export default function Prizes() {
  return (
    <div className="min-h-screen relative pt-32 pb-24 overflow-hidden selection:bg-gold-500/30">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-navy-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-navy-900 via-navy-950 to-navy-950" />
        <div className="absolute top-0 right-0 w-125 h-125 bg-gold-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-125 h-125 bg-blue-500/10 rounded-full blur-[120px]" />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Prizes & <span className="text-gold-500">Rewards</span></h1>
          <p className="text-xl text-cloud/70 max-w-2xl mx-auto">
            Compete for exciting rewards, a massive prize pool, and exclusive internship opportunities for winners.
          </p>
        </motion.div>

        {/* Total Prize Pool */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-3xl mx-auto mb-16 relative"
        >
          <div className="absolute inset-0 bg-linear-to-r from-gold-500/20 via-yellow-200/20 to-gold-500/20 rounded-3xl blur-xl" />
          <div className="glass-card rounded-3xl p-12 text-center relative z-10 border-gold-500/30">
            <Trophy className="w-16 h-16 text-gold-500 mx-auto mb-6" />
            <h2 className="text-2xl font-medium text-cloud/80 mb-2 uppercase tracking-wider">Total Prize Pool</h2>
            <div className="text-6xl md:text-8xl font-display font-bold text-transparent bg-clip-text bg-linear-to-r from-gold-500 to-yellow-200">
              ₹45,000
            </div>
            <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-gold-500/10 border border-gold-500/30 rounded-full text-gold-400 font-medium">
              <Star className="w-4 h-4" />
              Internship Opportunities for Winners
            </div>
          </div>
        </motion.div>

        {/* Award Categories Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { title: "Winner", icon: Trophy, color: "text-yellow-400" },
            { title: "Runner Up", icon: Medal, color: "text-gray-300" },
            { title: "Second Runner Up", icon: Award, color: "text-amber-600" },
          ].map((award, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 rounded-2xl text-center relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-500">
                <award.icon className={`w-32 h-32 ${award.color}`} />
              </div>
              <award.icon className={`w-12 h-12 ${award.color} mx-auto mb-4 relative z-10`} />
              <h3 className="text-xl font-bold text-white mb-2 relative z-10">{award.title}</h3>
              <p className="text-gold-500 font-semibold relative z-10">TBA</p>
            </motion.div>
          ))}
        </div>

        {/* Other Benefits */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-white mb-8">Additional Perks</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['Internship Opportunities', 'Certificates of Participation', 'Networking', 'Swag & Goodies'].map((perk, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-cloud/80 text-sm">
                <Star className="w-4 h-4 text-gold-500" />
                {perk}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
