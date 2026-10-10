import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Sponsors() {
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
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Our <span className="text-gold-500">Sponsors & Partners</span></h1>
          <p className="text-xl text-cloud/70 max-w-2xl mx-auto">
            Sponsors and partners to be announced soon. 
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass-card p-12 rounded-3xl text-center max-w-4xl mx-auto border-dashed border-white/20"
        >
          <Building2 className="w-16 h-16 text-cloud/30 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Become a Sponsor</h2>
          <p className="text-cloud/70 mb-8 max-w-2xl mx-auto">
            Join us in fostering innovation and empowering the next generation of technologists. Connect with top talent and showcase your brand at a premier national-level event.
          </p>
          <Link to="/contact" className="btn-primary inline-flex">
            Sponsorship Inquiry
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
