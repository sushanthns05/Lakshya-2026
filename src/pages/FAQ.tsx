import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

const FAQS = [
  { question: "What is LAKSHYA 2026?", answer: "LAKSHYA 2026 is a 24-hour national-level hackathon organized by the Department of Information Science and Engineering at SJBIT." },
  { question: "When and where will it take place?", answer: "It will be held from 5–6 November 2026 at the CSE Seminar Hall, SJBIT, Bengaluru." },
  { question: "Who can participate?", answer: "This information will be announced by the organizers soon (TBA)." },
  { question: "What is the maximum team size?", answer: "Teams can have a maximum of 4 members, including the team leader." },
  { question: "What is the registration fee?", answer: "To Be Announced (TBA)." },
  { question: "What are the problem statement themes?", answer: "Suggested themes include AI/ML, Cybersecurity, Healthcare Tech, EdTech, Sustainability, Smart Cities, and FinTech. Official statements will be released closer to the event." },
  { question: "What is the prize pool?", answer: "There is a tentative total prize pool of ₹45,000. Final amounts will be confirmed later." },
  { question: "Is accommodation available?", answer: "This information will be announced by the organizers." },
  { question: "Can participants use AI tools?", answer: "This information will be announced by the organizers." },
  { question: "How can a company become a sponsor?", answer: "Interested companies can reach out via the Contact/Sponsorship Inquiry section." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Frequently Asked <span className="text-gold-500">Questions</span></h1>
        </motion.div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass-card rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-medium text-white">{faq.question}</span>
                <ChevronDown className={cn("w-5 h-5 text-gold-500 transition-transform", openIndex === index && "rotate-180")} />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-4 text-cloud/70 text-sm leading-relaxed border-t border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
