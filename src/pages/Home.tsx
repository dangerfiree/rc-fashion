import React, { useEffect, useState } from 'react';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { BenefitIcons } from '../components/BenefitIcons';
import { MOCK_PRODUCTS } from '../mockData';
import { Product } from '../types';
import { supabase } from '../lib/supabase';
import { motion } from 'motion/react';

export const Home: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', 'Conjuntos', 'Vestidos', 'Blusas', 'Calças', 'Saias', 'Acessórios'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        if (data && data.length > 0) {
          setAllProducts(data);
          setFilteredProducts(data);
        }
      } catch (error) {
        console.warn('Could not fetch products from Supabase, using mock data.', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const activeProducts = allProducts.filter(p => p.is_active !== false);
    
    if (selectedCategory === 'Todos') {
      setFilteredProducts(activeProducts);
    } else {
      setFilteredProducts(activeProducts.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, allProducts]);

  return (
    <div className="pt-16 bg-white">
      <Hero />
      
      {/* New Arrivals (Lançamentos) Section */}
      {allProducts.some(p => p.is_new_arrival) && (
        <section className="py-20 md:py-32 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <motion.span 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-gold font-bold tracking-[0.3em] uppercase text-[10px] mb-2 block"
                >
                  Exclusividade
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-3xl md:text-5xl font-serif text-black uppercase tracking-tight"
                >
                  Lançamentos
                </motion.h2>
              </div>
              <p className="text-gray-400 font-light text-xs md:text-sm max-w-xs md:text-right uppercase tracking-widest">
                Descubra as peças que acabaram de chegar em nossa coleção.
              </p>
            </div>

            <div className="flex overflow-x-auto no-scrollbar -mx-6 px-6 gap-4 md:grid md:grid-cols-4 md:gap-8">
              {allProducts.filter(p => p.is_new_arrival && p.is_active !== false).map((product) => (
                <div key={product.id} className="min-w-[280px] md:min-w-0">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Catalog Section */}
      <section id="catalogo" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-4xl font-serif text-black uppercase tracking-tight"
            >
              Catálogo <span className="text-gold">.</span>
            </motion.h2>

            {/* Category Filters */}
            <div className="flex overflow-x-auto no-scrollbar -mx-6 px-6 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500 border ${
                    selectedCategory === cat
                      ? 'bg-black text-white border-black shadow-xl shadow-black/10'
                      : 'bg-white text-gray-400 border-gray-100 hover:border-gold hover:text-gold'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-10 md:gap-y-20">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-32 bg-gray-50/30 rounded-2xl border border-dashed border-gray-100">
              <p className="text-gray-400 font-light text-xs uppercase tracking-widest">Nenhum produto disponível nesta categoria no momento.</p>
            </div>
          )}
        </div>
      </section>

      {/* Visual Quote Section */}
      <section className="py-32 bg-black text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <span className="text-gold/50 font-serif text-6xl block mb-4">"</span>
          <p className="text-white font-serif text-xl md:text-3xl max-w-2xl mx-auto leading-relaxed italic opacity-90">
            A moda passa, o estilo permanece.
          </p>
          <span className="text-gold font-bold tracking-[0.4em] uppercase text-[10px] mt-8 block">
            RC Fashion Concept
          </span>
        </motion.div>
      </section>

      <BenefitIcons />
    </div>
  );
};
