import React from 'react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background Image/Placeholder */}
      <div className="absolute inset-0 z-0 bg-black">
        <img
          src="https://i.imgur.com/xlh9uXn.png"
          alt="RC Fashion Concept - Nova Coleção"
          className="w-full h-full object-cover object-top md:object-center opacity-50"
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="block text-gold font-medium tracking-[0.3em] uppercase mb-4 text-sm sm:text-base"
        >
          NOVA COLEÇÃO
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-serif text-white mb-8 leading-tight"
        >
          Vista-se com elegância. <br /> Sinta-se única.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/90 text-lg sm:text-xl font-light mb-10 max-w-2xl mx-auto"
        >
          Conjuntos premium que unem conforto, sofisticação e estilo para todos os momentos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href="#catalogo"
            className="inline-block px-10 py-4 bg-white text-black font-medium tracking-widest uppercase text-sm hover:bg-gold hover:text-white transition-all duration-300 border border-white hover:border-gold"
          >
            EXPLORAR CATÁLOGO
          </a>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-[1px] h-12 bg-white/30 mx-auto"></div>
      </motion.div>
    </section>
  );
};
