import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, Users, Trophy, Bell, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, query, getDocs, orderBy, where, limit } from 'firebase/firestore';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-11-05T09:00:00');
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-3 sm:gap-6 justify-center mt-10 mb-8 z-20 relative">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          key={unit} 
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 glass-card rounded-2xl flex items-center justify-center border-gold-500/30 bg-navy-900/60 backdrop-blur-md mb-3 relative overflow-hidden group shadow-[0_0_15px_rgba(230,162,60,0.15)] hover:shadow-[0_0_25px_rgba(230,162,60,0.3)] transition-all duration-300">
            <div className="absolute inset-0 bg-linear-to-b from-gold-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white relative z-10 tracking-tight">
              {value.toString().padStart(2, '0')}
            </span>
          </div>
          <span className="text-[10px] sm:text-xs text-cloud/70 uppercase tracking-[0.2em] font-medium">{unit}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default function Home() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity1 = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const annQuery = query(
          collection(db, 'announcements'), 
          where('status', '==', 'published'),
          orderBy('createdAt', 'desc'),
          limit(3)
        );
        const annSnapshot = await getDocs(annQuery);
        const anns: any[] = [];
        annSnapshot.forEach(doc => anns.push({ id: doc.id, ...doc.data() }));
        
        const priorityOrder: Record<string, number> = { 'High': 3, 'Medium': 2, 'Normal': 1 };
        anns.sort((a, b) => (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0));
        setAnnouncements(anns);
      } catch (error) {
        console.error("Error fetching homepage content:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen selection:bg-gold-500/30">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Advanced Abstract Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-navy-950" />
          
          <motion.div 
            style={{ y: y1 }}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-navy-800/40 via-navy-950 to-navy-950" 
          />
          

          
          {/* Grid/Circuit Pattern Overlay with Parallax */}
          <motion.div 
            style={{ y: y1 }}
            className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVMMzkuNSAwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-40" 
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center space-y-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-400 font-semibold text-sm tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(230,162,60,0.2)] backdrop-blur-md"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-gold-500"></span>
              </span>
              5–6 November 2026 • 24 Hours
            </motion.div>
            
            <div className="relative inline-block">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tighter text-white mb-2 leading-none">
                LAKSHYA <br className="md:hidden" />
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-gold-400 via-yellow-200 to-gold-600 animate-gradient-x">
                    2026
                  </span>
                </span>
              </h1>
            </div>
            
            <p className="text-2xl md:text-3xl text-cloud/90 font-light tracking-wide max-w-3xl mx-auto">
              A 24-Hour National-Level Hackathon
            </p>
            <p className="text-xl md:text-2xl text-gold-400 font-medium italic mt-2 drop-shadow-[0_0_10px_rgba(230,162,60,0.3)]">
              "Technology for a Brighter Tomorrow"
            </p>

            <CountdownTimer />

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="max-w-3xl mx-auto mt-12 mb-12"
            >
              <p className="text-cloud/60 text-sm uppercase tracking-widest mb-3 font-semibold">Organized by</p>
              <div className="p-px mx-auto max-w-2xl rounded-2xl bg-linear-to-r from-transparent via-gold-500/50 to-transparent">
                <div className="bg-navy-950/80 backdrop-blur-xl rounded-2xl py-4 px-6 shadow-2xl">
                  <p className="font-bold text-xl md:text-2xl text-transparent bg-clip-text bg-linear-to-r from-white via-cloud to-white/70">
                    Department of Information Science and Engineering
                  </p>
                  <p className="text-gold-500/90 font-medium text-lg mt-1 tracking-wide mb-4">
                    S J B Institute of Technology, Bengaluru
                  </p>
                  <div className="border-t border-white/10 pt-4 mt-4 flex flex-col items-center">
                    <p className="text-cloud/60 text-xs uppercase tracking-widest mb-3 font-semibold">In Association With</p>
                    <img src="/dlithe-logo.jpg" alt="DLithe - Be Agile... Be in Demand" className="h-20 md:h-24 object-contain bg-white px-4 py-2 rounded-lg shadow-lg" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12"
            >
              <Link to="/register" className="group relative w-full sm:w-auto block">
                <div className="absolute -inset-1 bg-linear-to-r from-gold-600 to-yellow-400 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative w-full sm:w-auto bg-navy-900 border border-gold-500/50 text-gold-400 font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-3 text-lg hover:bg-gold-500 hover:text-navy-900 transition-all duration-300">
                  Register Your Team
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <Link to="/about" className="btn-secondary w-full sm:w-auto justify-center text-lg px-8 py-4 rounded-xl backdrop-blur-md bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20">
                Explore the Event
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating geometric elements */}
        <motion.div 
          animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-[5%] w-32 h-32 rounded-3xl bg-linear-to-br from-gold-500/10 to-transparent border border-gold-500/20 backdrop-blur-xl rotate-12 hidden lg:block"
        />
        <motion.div 
          animate={{ y: [0, 40, 0], rotate: [0, -15, 0] }} 
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-[5%] w-40 h-40 rounded-full bg-linear-to-bl from-blue-500/10 to-transparent border border-blue-500/20 backdrop-blur-xl hidden lg:block"
        />
        <motion.div 
          animate={{ x: [0, 20, 0], y: [0, 15, 0] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/3 right-[15%] w-16 h-16 rounded-xl bg-linear-to-tr from-purple-500/10 to-transparent border border-purple-500/20 backdrop-blur-xl hidden xl:block"
        />

        <motion.div 
          style={{ opacity: opacity1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-cloud/40 text-sm tracking-widest uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-gold-500/70" />
          </motion.div>
        </motion.div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-16 bg-navy-950/80 backdrop-blur-xl border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {[
              { icon: Calendar, label: 'Duration', value: '24 Hours' },
              { icon: MapPin, label: 'Venue', value: 'CSE Seminar Hall' },
              { icon: Users, label: 'Team Size', value: 'Up to 4' },
              { icon: Trophy, label: 'Prize Pool', value: '₹45,000', sub: '+ Internships for Winners' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group flex flex-col items-center text-center p-6 lg:p-8 rounded-2xl glass-card border-white/5 hover:border-gold-500/30 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-16 h-16 rounded-2xl bg-navy-900 border border-gold-500/20 group-hover:border-gold-500/50 flex items-center justify-center text-gold-500 mb-6 shadow-lg group-hover:shadow-gold-500/20 transition-all duration-300 relative z-10">
                  <stat.icon className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-3xl font-extrabold text-white font-display mb-1 relative z-10">{stat.value}</h3>
                <p className="text-cloud/60 text-sm font-semibold uppercase tracking-widest relative z-10">{stat.label}</p>
                {stat.sub && <p className="text-gold-500/70 text-xs mt-2 font-medium relative z-10">{stat.sub}</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Content Section: Announcements */}
      <section className="py-24 relative z-10 bg-navy-900 overflow-hidden">
        {/* Background elements for section */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gold-500/5 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            
            {/* Announcements */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex flex-col items-center justify-center gap-4 mb-12 text-center">
                <div className="p-3 rounded-2xl bg-gold-500/10 border border-gold-500/20 text-gold-500">
                  <Bell className="w-8 h-8" />
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">Latest Announcements</h2>
                <div className="h-1 w-24 bg-linear-to-r from-transparent via-gold-500 to-transparent rounded-full mt-2" />
              </div>
              
              {announcements.length > 0 ? (
                <div className="space-y-6">
                  {announcements.map((ann, i) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15, duration: 0.5 }}
                      key={ann.id} 
                      className="group glass-card p-6 md:p-8 rounded-2xl border-l-4 border-l-gold-500 hover:bg-white/5 transition-all duration-300 hover:shadow-2xl hover:shadow-gold-500/10 hover:-translate-y-1 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-bl-full translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500" />
                      
                      <div className="flex flex-wrap items-center gap-3 mb-4 relative z-10">
                        {ann.priority === 'High' && (
                          <span className="px-3 py-1 text-[10px] font-bold rounded-full bg-red-500/20 text-red-400 border border-red-500/20 flex items-center gap-1.5 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            URGENT
                          </span>
                        )}
                        <span className="text-xs font-semibold text-cloud/80 bg-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
                          {ann.category}
                        </span>
                        <span className="text-xs text-cloud/40 ml-auto font-medium">
                          {ann.publishedAt?.toDate().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) || 'Recently'}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-3 relative z-10 group-hover:text-gold-400 transition-colors">{ann.title}</h3>
                      <p className="text-cloud/70 text-base leading-relaxed relative z-10">{ann.summary}</p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="glass-card p-12 rounded-3xl text-center border-dashed border-white/10 flex flex-col items-center justify-center min-h-75 bg-navy-900/40"
                >
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                    <Bell className="w-10 h-10 text-cloud/20" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">All Caught Up!</h3>
                  <p className="text-cloud/50 text-lg max-w-md">Stay tuned for important updates, schedule announcements, and more.</p>
                </motion.div>
              )}
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
