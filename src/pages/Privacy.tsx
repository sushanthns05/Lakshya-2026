import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Shield } from 'lucide-react';

export default function Privacy() {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'settings', 'privacy');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists() && docSnap.data().content) {
          setContent(docSnap.data().content);
        } else {
          setContent('Privacy Policy content will be updated soon.\n\nAt LAKSHYA 2026, we take your privacy seriously. Any personal information collected during registration will only be used for the purpose of the hackathon and will not be shared with third parties without your explicit consent.');
        }
      } catch (error) {
        console.error("Error fetching privacy policy:", error);
        setContent('Error loading content.');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

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
          className="text-center mb-12"
        >
          <div className="w-16 h-16 mx-auto rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mb-6">
            <Shield className="w-8 h-8 text-gold-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Privacy <span className="text-gold-500">Policy</span></h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 md:p-12 rounded-3xl"
        >
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold-500"></div>
            </div>
          ) : (
            <div 
              className="prose prose-invert prose-gold max-w-none text-cloud/80 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}
