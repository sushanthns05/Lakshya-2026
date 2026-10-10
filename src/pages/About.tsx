import { motion } from 'framer-motion';

export default function About() {
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
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">About <span className="text-gold-500">LAKSHYA 2026</span></h1>
          <p className="text-xl text-cloud/70">A 24-Hour National-Level Hackathon</p>
        </motion.div>

        <div className="space-y-12">
          {/* Vision and Mission */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl"
          >
            <h2 className="text-2xl font-bold text-gold-500 mb-4">Event Overview</h2>
            <p className="text-cloud/90 leading-relaxed mb-6">
              LAKSHYA 2026 is a premier 24-hour national-level hackathon designed to foster innovation, collaboration, and real-world problem-solving among students from across the country. It serves as a dynamic platform where bright minds converge to build solutions for a better tomorrow.
            </p>
            <h3 className="text-xl font-bold text-white mb-2">Vision & Mission</h3>
            <p className="text-cloud/90 leading-relaxed">
              Our vision is to cultivate a culture of technological excellence and entrepreneurial spirit. The mission of LAKSHYA is to bridge the gap between academic knowledge and industry requirements by challenging participants to develop functional prototypes for pressing societal and industrial problems.
            </p>
          </motion.div>

          {/* Department Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl"
          >
            <h2 className="text-2xl font-bold text-gold-500 mb-4">Organizing Department</h2>
            <p className="text-cloud/90 leading-relaxed mb-4">
              Organized by the <strong className="text-white">Department of Information Science and Engineering</strong> at 
              <strong className="text-white"> S J B Institute of Technology (SJBIT)</strong>.
            </p>
            <p className="text-cloud/90 leading-relaxed">
              The department is committed to imparting quality education and encouraging students to engage in research and innovation. Through initiatives like LAKSHYA, we aim to provide our students and participants with exposure to cutting-edge technologies and industry practices.
            </p>
          </motion.div>

          {/* Committees */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl"
          >
            <h2 className="text-2xl font-bold text-gold-500 mb-6">Organizing Committee</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold text-white mb-3 border-b border-white/10 pb-2">Leadership</h3>
                <ul className="space-y-4 text-cloud/90 text-sm">
                  <li>
                    <span className="block text-gold-400 font-medium">Organising Chair</span>
                    Dr. K V Mahendra Prashanth<br/><span className="text-cloud/60 text-xs">Principal, SJB Institute of Technology</span>
                  </li>
                  <li>
                    <span className="block text-gold-400 font-medium">Chief Convener</span>
                    Dr. Babu N V<br/><span className="text-cloud/60 text-xs">Dean-Academics, SJB Institute of Technology</span>
                  </li>
                  <li>
                    <span className="block text-gold-400 font-medium">Convener</span>
                    Dr. Gopalakrishna M T<br/><span className="text-cloud/60 text-xs">Professor & HOD - ISE, SJB Institute of Technology</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white mb-3 border-b border-white/10 pb-2">Faculty Coordinators</h3>
                <ul className="space-y-2 text-cloud/90 text-sm">
                  <li>Dr. Pavitra Bai S</li>
                  <li>Prof. Prarthana J V</li>
                  <li>Prof. Gayathri S</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-3 border-b border-white/10 pb-2">Committee Members</h3>
                <ul className="space-y-2 text-cloud/90 text-sm">
                  <li>Prof. Veeresh K M</li>
                  <li>Prof. Abhinand B V</li>
                  <li>Prof. Rajasekhar V</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Why Participate */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl"
          >
            <h2 className="text-2xl font-bold text-gold-500 mb-6">Why Participate?</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Solve Real-World Problems",
                "Learn from Expert Mentors",
                "Networking Opportunities",
                "Win Exciting Prizes (₹45,000 Pool) + Internships",
                "Enhance Your Resume",
                "Experience a 24-Hour Coding Marathon"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-cloud/90">
                  <div className="w-2 h-2 rounded-full bg-gold-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
