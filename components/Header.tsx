import React, { useState } from 'react';
import { Menu, X, ArrowRight, Heart, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  isDark: boolean;
  toggleTheme: () => void;
}

export const Header: React.FC<Props> = React.memo(({ isDark, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Helper to check active state for styling
  const isActive = (path: string) => location.pathname === path;

  // Helper for consistent link styling
  const getLinkClass = (path: string) => `px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
    isActive(path)
      ? (isDark ? 'text-white bg-white/10' : 'text-[#00629B] bg-white/50')
      : (isDark ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-[#00629B] hover:bg-white/50')
  }`;

  return (
    <>
    <header className="fixed top-4 left-0 right-0 z-50 transition-all duration-300 px-4">
      {/* Liquid Frosted Glass Container */}
      <div className={`max-w-7xl mx-auto backdrop-blur-2xl border rounded-full px-6 sm:px-8 py-3 flex justify-between items-center relative transition-all duration-500 ${
        isDark 
          ? 'bg-slate-900/60 border-white/10 shadow-2xl shadow-black/20 ring-1 ring-white/5 supports-[backdrop-filter]:bg-slate-900/50' 
          : 'bg-white/70 border-white/40 shadow-xl shadow-blue-900/5 ring-1 ring-white/60 supports-[backdrop-filter]:bg-white/60'
      }`}>
          
          <div className="flex items-center gap-4">
             {/* Logo links to external main site */}
             <a 
                href="https://ieee.lk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity flex items-center gap-3 group"
             >
                <img src="/logo.png" alt="IEEE Sri Lanka Section" className="h-10 w-auto object-contain" />
             </a>
          </div>
          
          <nav className="hidden lg:flex gap-1 items-center">
            {/* Home Link Added */}
            <Link to="/" className={getLinkClass('/')}>
                Home
            </Link>

            {/* Navigation Links mapped to new routes */}
            <Link to="/2025-cyclone-ditwah" className={getLinkClass('/2025-cyclone-ditwah')}>
                Campaign
            </Link>

            <Link to="/ledger" className={getLinkClass('/ledger')}>
                Live Ledger
            </Link>

            <Link to="/operational-framework" className={getLinkClass('/operational-framework')}>
                Framework
            </Link>

            <Link to="/volunteers" className={getLinkClass('/volunteers')}>
                Volunteers
            </Link>
          </nav>

          <div className="flex items-center gap-3">
               <button 
                  onClick={toggleTheme} 
                  className={`p-2 rounded-full transition-all duration-300 ${isDark ? 'bg-white/10 text-yellow-400 hover:bg-white/20' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  aria-label="Toggle Theme"
               >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
               </button>

               <Link to="/donate" className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-all shadow-lg shadow-red-500/20 hover:shadow-red-500/40 animate-heartbeat">
                  <span>Donate Now</span>
                  <Heart className="w-4 h-4 fill-current" />
               </Link>

               <button 
                  className="lg:hidden p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10 transition-colors"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
               >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
               </button>
            </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
           <div className="absolute top-full left-0 right-0 mt-2 px-4 lg:hidden animate-in fade-in slide-in-from-top-4 duration-200">
              <div className={`p-4 rounded-3xl backdrop-blur-xl border shadow-2xl ${isDark ? 'bg-slate-900/90 border-white/10' : 'bg-white/90 border-gray-100'}`}>
                 <div className="flex flex-col gap-2">
                    <Link to="/" onClick={() => setIsMenuOpen(false)} className={`px-4 py-3 rounded-xl font-medium ${isActive('/') ? 'bg-[#00629B]/10 text-[#00629B] dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}>Home</Link>
                    <Link to="/2025-cyclone-ditwah" onClick={() => setIsMenuOpen(false)} className={`px-4 py-3 rounded-xl font-medium ${isActive('/2025-cyclone-ditwah') ? 'bg-[#00629B]/10 text-[#00629B] dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}>Campaign</Link>
                    <Link to="/ledger" onClick={() => setIsMenuOpen(false)} className={`px-4 py-3 rounded-xl font-medium ${isActive('/ledger') ? 'bg-[#00629B]/10 text-[#00629B] dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}>Live Ledger</Link>
                    <Link to="/operational-framework" onClick={() => setIsMenuOpen(false)} className={`px-4 py-3 rounded-xl font-medium ${isActive('/operational-framework') ? 'bg-[#00629B]/10 text-[#00629B] dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}>Framework</Link>
                    <Link to="/volunteers" onClick={() => setIsMenuOpen(false)} className={`px-4 py-3 rounded-xl font-medium ${isActive('/volunteers') ? 'bg-[#00629B]/10 text-[#00629B] dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}>Volunteers</Link>
                    <Link to="/donate" onClick={() => setIsMenuOpen(false)} className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-colors shadow-lg shadow-red-500/20 animate-heartbeat">Donate Now <Heart className="w-4 h-4 fill-current" /></Link>
                 </div>
              </div>
           </div>
        )}
    </header>
    </>
  );
});

export const Hero: React.FC = React.memo(() => {
    return (
        <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-[#00629B] dark:text-blue-300 text-xs font-bold tracking-wider uppercase mb-8 animate-fade-in-up">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00629B]"></span>
                    </span>
                    Live Transparency Report
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 font-heading leading-tight animate-fade-in-up delay-100">
                    Rebuilding with <span className="text-[#00629B]">Integrity</span>
                </h1>

                <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-medium animate-fade-in-up delay-200">
                    In response to Cyclone Ditwah, IEEE Sri Lanka Section is dedicated to full financial transparency. Every donation is tracked, every expense is verified, and every outcome is reported here.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-300">
                    <Link 
                        to="/donate" 
                        className="group relative px-8 py-4 bg-[#00629B] text-white rounded-full font-bold text-lg shadow-xl shadow-blue-600/20 hover:shadow-blue-600/40 hover:scale-105 transition-all duration-300 overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                           Make a Donation <Heart className="w-5 h-5 fill-current" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-[#00629B] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                    
                    <Link 
                        to="/ledger" 
                        className="px-8 py-4 bg-white dark:bg-slate-800 text-gray-700 dark:text-white border border-gray-200 dark:border-slate-700 rounded-full font-bold text-lg hover:bg-gray-50 dark:hover:bg-slate-700 hover:border-gray-300 dark:hover:border-slate-600 transition-all duration-300 flex items-center gap-2"
                    >
                        View Financial Ledger <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
});