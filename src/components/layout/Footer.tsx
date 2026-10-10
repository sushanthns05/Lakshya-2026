import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-900 border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group mb-2">
              <img 
                src="/logo.jpg" 
                alt="Lakshya Logo" 
                className="w-10 h-10 rounded-full object-cover shadow-[0_0_10px_rgba(230,162,60,0.3)] group-hover:shadow-[0_0_15px_rgba(230,162,60,0.6)] group-hover:scale-105 transition-all duration-300" 
              />
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl leading-tight text-white group-hover:text-gold-500 transition-colors">LAKSHYA 2026</span>
                <span className="text-[10px] text-gold-500/80 font-medium tracking-widest uppercase">SJBIT Hackathon</span>
              </div>
            </Link>
            <p className="text-cloud/70 text-sm leading-relaxed max-w-xs">
              A 24-Hour National-Level Hackathon organized by the Department of Information Science and Engineering, SJBIT.
            </p>
            <div className="flex space-x-4 pt-2">
              {/* Social links will be added here once confirmed */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'About', path: '/about' },
                { name: 'Themes', path: '/themes' },
                { name: 'Schedule', path: '/schedule' },
                { name: 'Sponsors', path: '/sponsors' },
                { name: 'FAQ', path: '/faq' },
              ].map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-cloud/70 hover:text-gold-500 text-sm transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-gold-500 rounded-full opacity-0 -ml-3 transition-all"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Legal & Resources</h3>
            <ul className="space-y-2">
              {[
                { name: 'Rules & Eligibility', path: '/rules' },
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Terms & Conditions', path: '/terms' },
                { name: 'Contact Us', path: '/contact' },
              ].map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-cloud/70 hover:text-gold-500 text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold mb-4 text-lg">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                <p className="text-sm text-cloud/70">
                  CSE Seminar Hall, <br />
                  S J B Institute of Technology,<br />
                  BGS Health & Education City,<br />
                  Kengeri, Bengaluru, Karnataka 560060
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold-500 shrink-0" />
                <a href="mailto:contact@sjbit.edu.in" className="text-sm text-cloud/70 hover:text-gold-500 transition-colors">
                  TBA (To Be Announced)
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                <div className="text-sm text-cloud/70 flex flex-col gap-1">
                  <span>Keshav S: <a href="tel:+917892586349" className="hover:text-gold-500 transition-colors">+91 78925 86349</a></span>
                  <span>Deekshitha J A: <a href="tel:+918050462087" className="hover:text-gold-500 transition-colors">+91 80504 62087</a></span>
                  <span>Sushanth N S: <a href="tel:+918310034078" className="hover:text-gold-500 transition-colors">+91 83100 34078</a></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cloud/50 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Lakshya 2026. S J B Institute of Technology. All rights reserved.
          </p>
          <div className="text-cloud/50 text-sm">
            Designed & Developed for Lakshya 2026
          </div>
        </div>
      </div>
    </footer>
  );
}
