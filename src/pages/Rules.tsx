import { motion } from 'framer-motion';

export default function Rules() {
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
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Rules & <span className="text-gold-500">Eligibility</span></h1>
          <p className="text-xl text-cloud/70">
            Please read these guidelines carefully before registering.
          </p>
        </motion.div>

        <div className="space-y-8">
          {[
            { title: "Team Size", content: "Teams must consist of up to 4 members, including the team leader." },
            { title: "Eligibility", content: "To Be Announced." },
            { title: "Registration Requirements", content: "All teams must complete the online registration form. Registration confirmation does not guarantee final selection." },
            { title: "Originality and Intellectual Property", content: "All work must be original and developed during the hackathon. Any pre-existing code or plagiarized work will lead to immediate disqualification." },
            { title: "Use of Open-Source Tools and AI", content: "To Be Announced." },
            { title: "Submission Requirements", content: "To Be Announced." },
            { title: "Judging Criteria", content: "To Be Announced." },
            { title: "Code of Conduct", content: "All participants must maintain a professional and respectful environment. Harassment, discrimination, or cheating will not be tolerated." },
          ].map((rule, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass-card p-6 rounded-xl"
            >
              <h2 className="text-xl font-bold text-white mb-2">{rule.title}</h2>
              <p className="text-cloud/80 leading-relaxed">{rule.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
