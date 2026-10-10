import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, MessageSquare } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, 'sponsorshipEnquiries'), {
        ...formData,
        status: 'New',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setIsSuccess(true);
      setFormData({ name: '', organization: '', email: '', message: '' });
      toast.success('Inquiry sent successfully!');
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error('Failed to send inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative pt-32 pb-24 overflow-hidden selection:bg-gold-500/30">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-navy-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-navy-900 via-navy-950 to-navy-950" />
        <div className="absolute top-0 right-0 w-125 h-125 bg-gold-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-125 h-125 bg-blue-500/10 rounded-full blur-[120px]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Contact <span className="text-gold-500">Us</span></h1>
          <p className="text-xl text-cloud/70">
            Get in touch for sponsorships or general inquiries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="glass-card p-8 rounded-2xl h-full">
              <h2 className="text-2xl font-bold text-white mb-8">Reach Out To Us</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-gold-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Address</h3>
                    <p className="text-cloud/70 text-sm leading-relaxed">
                      Department of Information Science and Engineering,<br/>
                      S J B Institute of Technology,<br/>
                      BGS Health & Education City,<br/>
                      Kengeri, Bengaluru, Karnataka 560060
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-gold-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Email</h3>
                    <p className="text-cloud/70 text-sm">TBA (To Be Announced)</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-gold-500" />
                  </div>
                  <div className="w-full">
                    <h3 className="text-white font-medium mb-1">Student Co-ordinators</h3>
                    <ul className="text-cloud/70 text-sm space-y-2 mt-2">
                      <li className="flex justify-between gap-4 border-b border-white/5 pb-1"><span>Keshav S:</span> <a href="tel:+917892586349" className="hover:text-gold-500 transition-colors">+91 78925 86349</a></li>
                      <li className="flex justify-between gap-4 border-b border-white/5 pb-1"><span>Deekshitha J A:</span> <a href="tel:+918050462087" className="hover:text-gold-500 transition-colors">+91 80504 62087</a></li>
                      <li className="flex justify-between gap-4"><span>Sushanth N S:</span> <a href="tel:+918310034078" className="hover:text-gold-500 transition-colors">+91 83100 34078</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Inquiry Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="glass-card p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-gold-500" />
                <h2 className="text-2xl font-bold text-white">Sponsorship Inquiry</h2>
              </div>
              
              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Inquiry Sent!</h3>
                  <p className="text-cloud/70 text-sm">Thank you for your interest. Our team will review your inquiry and get back to you shortly.</p>
                  <button onClick={() => setIsSuccess(false)} className="mt-6 text-gold-500 text-sm hover:underline">Send another inquiry</button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-cloud/70 mb-1">Name</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-navy-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cloud/70 mb-1">Organization</label>
                    <input required type="text" value={formData.organization} onChange={e => setFormData({...formData, organization: e.target.value})} className="w-full bg-navy-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all" placeholder="Company Ltd" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cloud/70 mb-1">Business Email</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-navy-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all" placeholder="john@company.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cloud/70 mb-1">Message</label>
                    <textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows={4} className="w-full bg-navy-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all" placeholder="How would you like to partner with us?"></textarea>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full btn-primary mt-4 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
