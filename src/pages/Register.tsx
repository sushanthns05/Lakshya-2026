import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';

export default function Register() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [registrationId, setRegistrationId] = useState('');

  // 1 = Config Loading, 2 = Registration Open, 3 = Not Announced/Closed
  const [registrationStatus] = useState<'open' | 'closed' | 'tba'>('open');

  const [formData, setFormData] = useState({
    teamName: '',
    college: '',
    city: '',
    state: '',
    country: 'India',
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    leaderCourse: '',
    leaderBranch: '',
    leaderYear: '',
    members: [
      { name: '', email: '', phone: '', college: '', course: '' }
    ]
  });

  const addMember = () => {
    if (formData.members.length < 3) {
      setFormData({
        ...formData,
        members: [...formData.members, { name: '', email: '', phone: '', college: '', course: '' }]
      });
    }
  };

  const removeMember = (index: number) => {
    setFormData({
      ...formData,
      members: formData.members.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    if (isSubmitting || isSuccess) return;

    setIsSubmitting(true);
    try {
      // Clean up empty members if any
      const cleanedMembers = formData.members.filter(m => m.name.trim() !== '' && m.email.trim() !== '');
      
      const docRef = await addDoc(collection(db, 'registrations'), {
        ...formData,
        members: cleanedMembers,
        status: 'Qualified',
        createdAt: serverTimestamp(),
      });
      
      setRegistrationId(docRef.id);
      setIsSuccess(true);
      toast.success('Registration submitted successfully!');
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error('Failed to submit registration. Please try again or check backend setup.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (registrationStatus === 'tba' || registrationStatus === 'closed') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-navy-900 p-4">
        <div className="glass-card p-12 text-center rounded-3xl max-w-2xl w-full border-dashed border-white/20">
          <h2 className="text-3xl font-display font-bold text-white mb-4">Registration {registrationStatus === 'tba' ? 'Not Announced' : 'Closed'}</h2>
          <p className="text-cloud/70 text-lg">
            {registrationStatus === 'tba' 
              ? 'Registration for LAKSHYA 2026 has not opened yet. Please check back later.' 
              : 'Registration for LAKSHYA 2026 is currently closed.'}
          </p>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-navy-900 pt-20 pb-24 px-4">
        <div className="max-w-2xl mx-auto text-center glass-card p-12 rounded-3xl">
          <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Registration Successful!</h2>
          <p className="text-cloud/80 mb-6">
            Thank you for registering for LAKSHYA 2026. Your team <strong className="text-gold-500">{formData.teamName}</strong> has been successfully submitted.
          </p>
          <div className="bg-navy-900/50 p-6 rounded-xl border border-white/10 mb-8 inline-block">
            <p className="text-sm text-cloud/50 mb-1">Your Registration ID</p>
            <p className="font-mono text-xl text-white font-bold tracking-wider">{registrationId}</p>
          </div>
          <p className="text-sm text-cloud/60">
            Note: All registered teams are qualified on a first-come, first-serve basis. However, if any false records are found during verification, your team will be disqualified.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative pt-32 pb-24 overflow-hidden selection:bg-gold-500/30">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-navy-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-navy-900 via-navy-950 to-navy-950" />
        <div className="absolute top-0 right-0 w-125 h-125 bg-gold-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-125 h-125 bg-blue-500/10 rounded-full blur-[120px]" />
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white text-center mb-2">Team <span className="text-gold-500">Registration</span></h1>
          <p className="text-center text-cloud/80 text-lg mb-4">
            Registration Fee: <strong className="text-gold-400">₹1,000 per Team</strong>
          </p>
          
          {/* Progress Bar */}
          <div className="flex justify-between items-center max-w-md mx-auto relative mt-8">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 z-0"></div>
            <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gold-500 z-0 transition-all duration-300`} style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
            
            {[1, 2, 3].map((num) => (
              <div key={num} className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-all duration-500 font-bold ${step >= num ? 'bg-gold-500 text-navy-900 shadow-[0_0_15px_rgba(230,162,60,0.5)] scale-110' : 'bg-navy-800 text-cloud border border-white/20'}`}>
                {num}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] border-white/10 backdrop-blur-xl bg-navy-900/60">
          {/* Subtle top glow */}
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-linear-to-r from-transparent via-gold-500/50 to-transparent" />
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Team Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-cloud/70 mb-1">Team Name *</label>
                    <input required type="text" value={formData.teamName} onChange={e => setFormData({...formData, teamName: e.target.value})} className="w-full bg-navy-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-cloud/70 mb-1">College / Institution *</label>
                    <input required type="text" value={formData.college} onChange={e => setFormData({...formData, college: e.target.value})} className="w-full bg-navy-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cloud/70 mb-1">City *</label>
                    <input required type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full bg-navy-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cloud/70 mb-1">State *</label>
                    <input required type="text" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} className="w-full bg-navy-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white" />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Team Leader Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-cloud/70 mb-1">Full Name *</label>
                    <input required type="text" value={formData.leaderName} onChange={e => setFormData({...formData, leaderName: e.target.value})} className="w-full bg-navy-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cloud/70 mb-1">Email Address *</label>
                    <input required type="email" value={formData.leaderEmail} onChange={e => setFormData({...formData, leaderEmail: e.target.value})} className="w-full bg-navy-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cloud/70 mb-1">Phone Number *</label>
                    <input required type="tel" value={formData.leaderPhone} onChange={e => setFormData({...formData, leaderPhone: e.target.value})} className="w-full bg-navy-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cloud/70 mb-1">Current Year of Study</label>
                    <input type="text" value={formData.leaderYear} onChange={e => setFormData({...formData, leaderYear: e.target.value})} className="w-full bg-navy-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cloud/70 mb-1">Course / Degree</label>
                    <input type="text" value={formData.leaderCourse} onChange={e => setFormData({...formData, leaderCourse: e.target.value})} className="w-full bg-navy-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cloud/70 mb-1">Branch / Department</label>
                    <input type="text" value={formData.leaderBranch} onChange={e => setFormData({...formData, leaderBranch: e.target.value})} className="w-full bg-navy-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white" />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
                  <h2 className="text-xl font-bold text-white">Team Members (Optional)</h2>
                  {formData.members.length < 3 && (
                    <button type="button" onClick={addMember} className="text-gold-500 text-sm hover:underline font-medium">+ Add Member</button>
                  )}
                </div>
                
                {formData.members.map((member, index) => (
                  <div key={index} className="bg-navy-900/30 p-6 rounded-xl border border-white/5 relative">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-white font-medium">Member {index + 1}</h3>
                      <button type="button" onClick={() => removeMember(index)} className="text-red-400 text-xs hover:underline">Remove</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-cloud/70 mb-1">Full Name</label>
                        <input type="text" value={member.name} onChange={e => {
                          const newMembers = [...formData.members];
                          newMembers[index].name = e.target.value;
                          setFormData({...formData, members: newMembers});
                        }} className="w-full bg-navy-900/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-cloud/70 mb-1">Email</label>
                        <input type="email" value={member.email} onChange={e => {
                          const newMembers = [...formData.members];
                          newMembers[index].email = e.target.value;
                          setFormData({...formData, members: newMembers});
                        }} className="w-full bg-navy-900/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" />
                      </div>
                    </div>
                  </div>
                ))}

                {formData.members.length === 0 && (
                  <p className="text-cloud/50 text-sm italic text-center py-4">No additional members added. Max team size is 4.</p>
                )}
                
                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg mt-6">
                  <label className="flex items-start gap-3">
                    <input required type="checkbox" className="mt-1" />
                    <span className="text-sm text-cloud/80 leading-relaxed">
                      I agree to the LAKSHYA 2026 rules and regulations. I understand that our team is qualified upon registration, but organizers reserve the right to disqualify the team if any false records are found during verification.
                    </span>
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 flex justify-between items-center pt-6 border-t border-white/10">
            {step > 1 ? (
              <button type="button" onClick={() => setStep(step - 1)} className="btn-secondary">
                Back
              </button>
            ) : <div></div>}
            
            <button type="submit" disabled={isSubmitting} className="btn-primary">
              {isSubmitting ? 'Processing...' : (step === 3 ? 'Submit Registration' : 'Continue')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
