import React, { useEffect, useState } from 'react';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { BenefitIcons } from '../components/BenefitIcons';
import { MOCK_PRODUCTS } from '../mockData';
import { Product } from '../types';
import { supabase } from '../lib/supabase';
import { motion } from 'motion/react';

export const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        if (data && data.length > 0) {
          setProducts(data);
        }
      } catch (error) {
        console.warn('Could not fetch products from Supabase, using mock data.', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="pt-20">
      <Hero />
      
      {/* Catalog Section */}
      <section id="catalogo" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-serif text-black mb-4"
            >
              Nossa Coleção
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              className="w-24 h-[1px] bg-gold mx-auto mb-6"
            ></motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-500 font-light max-w-xl mx-auto uppercase tracking-widest text-xs"
            >
              Peças selecionadas com rigor para garantir o melhor 
              em sofisticação e estilo para você.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] sm:aspect-square overflow-hidden rounded-2xl shadow-2xl"
            >
              <img 
                src="https://i.imgur.com/xlh9uXn.png" 
                alt="Sobre RC Fashion Concept" 
                className="w-full h-full object-cover object-top"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <span className="text-gold tracking-[0.3em] uppercase text-sm font-medium">Sobre a Marca</span>
              <h2 className="text-4xl sm:text-6xl font-serif leading-tight text-white">
                RC Fashion Concept
              </h2>
              <div className="space-y-6 text-gray-400 font-light leading-relaxed text-lg">
                <p>
                  Na RC Fashion Concept, acreditamos que a elegância está nos detalhes. Nossa missão é oferecer peças que unem sofisticação, conforto e qualidade premium para mulheres que desejam se vestir com estilo em qualquer ocasião.
                </p>
                <p>
                  Cada coleção é escolhida com cuidado para proporcionar caimento impecável, tecidos de alta qualidade e um visual moderno, valorizando a beleza e a confiança de cada cliente.
                </p>
              </div>
              <div className="pt-4">
                <a 
                  href="https://wa.me/5511967959847?text=Olá! Gostaria de saber mais sobre a marca RC Fashion Concept."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 border border-gold text-gold hover:bg-gold hover:text-white transition-all uppercase tracking-widest text-xs font-bold"
                >
                  Falar Conosco
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <BenefitIcons />
    </div>
  );
};
