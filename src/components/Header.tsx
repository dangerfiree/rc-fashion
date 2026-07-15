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
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo - Left aligned on mobile for better balance */}
          <Link to="/" className="flex flex-col group">
            <span className="text-xl md:text-2xl font-serif tracking-[0.2em] font-bold text-black group-hover:text-gold transition-colors uppercase">
              RC
            </span>
            <span className="text-[8px] md:text-[10px] tracking-[0.3em] text-gray-500 uppercase font-light -mt-1 group-hover:text-gold transition-colors">
              Fashion Concept
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-bold tracking-widest text-black hover:text-gold transition-colors uppercase"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions & Mobile Toggle */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <a 
              href="https://wa.me/5511967959847" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-black hover:text-gold transition-colors"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
            </a>
            
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 text-black hover:text-gold transition-colors"
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Minimalist Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998] md:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-xs bg-white z-[9999] md:hidden shadow-2xl flex flex-col"
            >
              <div className="flex justify-end p-6">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-black transition-colors"
                >
                  <X size={28} strokeWidth={1} />
                </button>
              </div>

              <nav className="flex-grow flex flex-col px-10 pt-10 space-y-8">
                {mobileLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <a
                      href={link.href}
                      target={link.isExternal ? "_blank" : undefined}
                      rel={link.isExternal ? "noopener noreferrer" : undefined}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-xl font-serif tracking-widest text-black hover:text-gold transition-all duration-300 uppercase block"
                    >
                      {link.name}
                    </a>
                  </motion.div>
                ))}
              </nav>
              
              <div className="p-10 border-t border-gray-50">
                <div className="flex flex-col space-y-4">
                  <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-light">
                    Siga-nos
                  </p>
                  <div className="flex space-x-4">
                    <a href="https://www.instagram.com/rc.fashionconcept/" target="_blank" rel="noreferrer" className="text-black hover:text-gold text-xs uppercase tracking-widest font-bold">
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
