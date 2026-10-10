import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Themes', path: '/themes' },
    { name: 'Prizes', path: '/prizes' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'Sponsors', path: '/sponsors' },
  ];

  return (
    <nav className="fixed w-full z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="shrink-0">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src="/logo.jpg" 
                alt="Lakshya Logo" 
                className="w-12 h-12 rounded-full object-cover shadow-[0_0_15px_rgba(230,162,60,0.3)] group-hover:shadow-[0_0_20px_rgba(230,162,60,0.6)] group-hover:scale-105 transition-all duration-300" 
              />
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl leading-tight text-white group-hover:text-gold-500 transition-colors">LAKSHYA 2026</span>
                <span className="text-[10px] text-gold-500/80 font-medium tracking-widest uppercase">SJBIT Hackathon</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1 lg:space-x-4">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-gold-500",
                    location.pathname === link.path ? "text-gold-500 bg-white/5" : "text-cloud/80"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <a href="https://forms.gle/PLACEHOLDER" target="_blank" rel="noopener noreferrer" className="ml-4 btn-primary text-sm py-2 px-4">
                Register Now
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-cloud hover:text-gold-500 focus:outline-none p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-nav border-t border-white/10 absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium w-full text-center",
                  location.pathname === link.path ? "text-gold-500 bg-white/5" : "text-cloud/80 hover:text-gold-500 hover:bg-white/5"
                )}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://forms.gle/PLACEHOLDER"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="mt-4 btn-primary w-full max-w-50 text-center"
            >
              Register Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
