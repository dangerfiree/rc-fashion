import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  interface NavLink {
    name: string;
    href: string;
    isExternal?: boolean;
  }

  const navLinks: NavLink[] = [
    { name: 'Início', href: '/' },
    { name: 'Catálogo', href: '#catalogo' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Contato', href: '#contato' },
  ];

  const mobileLinks: NavLink[] = [
    ...navLinks,
    { name: 'Instagram', href: 'https://www.instagram.com/rc.fashionconcept/', isExternal: true },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-black hover:text-gold transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <Link to="/" className="flex flex-col items-center group">
            <span className="text-2xl font-serif tracking-[0.2em] font-bold text-black group-hover:text-gold transition-colors uppercase">
              RC
            </span>
            <span className="text-[10px] tracking-[0.4em] text-gray-500 uppercase font-light -mt-1 group-hover:text-gold transition-colors">
              Fashion Concept
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium tracking-widest text-black hover:text-gold transition-colors uppercase"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <a 
              href="https://wa.me/5511967959847?text=Olá! Tenho interesse nas peças da RC Fashion Concept. Gostaria de mais informações." 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-black hover:text-gold transition-colors"
            >
              <ShoppingBag size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[9999] md:hidden flex flex-col"
          >
            {/* Mobile Menu Header */}
            <div className="flex justify-between items-center h-20 px-6 border-b border-gold/20 bg-white">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-black hover:text-gold transition-colors"
              >
                <X size={32} />
              </button>

              <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center group">
                <span className="text-2xl font-serif tracking-[0.2em] font-bold text-black group-hover:text-gold transition-colors uppercase">
                  RC
                </span>
                <span className="text-[10px] tracking-[0.4em] text-gold uppercase font-medium -mt-1">
                  Fashion Concept
                </span>
              </Link>

              <div className="w-10"></div>
            </div>

            {/* Mobile Menu Links */}
            <nav className="flex-grow flex flex-col items-center justify-center space-y-10 px-6 bg-white">
              {mobileLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="relative group"
                >
                  <a
                    href={link.href}
                    target={link.isExternal ? "_blank" : undefined}
                    rel={link.isExternal ? "noopener noreferrer" : undefined}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-3xl font-semibold tracking-[0.15em] text-black hover:text-gold transition-all duration-300 uppercase font-sans flex flex-col items-center"
                  >
                    <span>{link.name}</span>
                    <span className="w-0 h-[2px] bg-gold transition-all duration-300 group-hover:w-full mt-2"></span>
                  </a>
                </motion.div>
              ))}
            </nav>
            
            {/* Mobile Menu Footer */}
            <div className="p-10 border-t border-gray-50 text-center">
              <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase font-light">
                Elegância que veste você
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
