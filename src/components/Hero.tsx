import React from 'react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-[90dvh] md:h-screen flex items-end md:items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://i.imgur.com/xlh9uXn.png"
          alt="RC Fashion Concept - Nova Coleção"
          className="w-full h-full object-cover object-[70%] md:object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent md:bg-black/20"></div>
      </div>

      <div className="relative z-10 text-center px-6 pb-20 md:pb-0 max-w-4xl">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="block text-gold font-bold tracking-[0.4em] uppercase mb-4 text-[10px] md:text-sm"
        >
          Premium Selection
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-tight tracking-tight"
        >
          Elegância em <br className="hidden md:block" /> cada detalhe.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <a
            href="#catalogo"
            className="w-full md:w-auto inline-block px-12 py-4 bg-white text-black font-bold tracking-widest uppercase text-[10px] md:text-xs hover:bg-gold hover:text-white transition-all duration-500"
          >
            Ver Catálogo
          </a>
        </motion.div>
      </div>
      
      {/* Scroll indicator - Hidden on very small screens for cleanliness */}
      <motion.div 
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0 mx-auto"></div>
      </motion.div>
    </section>
  );
};
