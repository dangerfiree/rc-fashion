import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../mockData';
import { Product } from '../types';
import { supabase } from '../lib/supabase';
import { formatPrice } from '../lib/utils';
import { Phone, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const mockProduct = MOCK_PRODUCTS.find((p) => p.id === id);
        if (mockProduct) {
          setProduct(mockProduct);
          setSelectedSize(mockProduct.sizes[0]);
          setSelectedColor(mockProduct.colors[0]);
        } else {
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

          if (error) throw error;
          if (data) {
            setProduct(data);
            setSelectedSize(data.sizes[0]);
            setSelectedColor(data.colors[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-40 pb-20 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-gold" size={40} />
        <p className="text-gray-400 font-light uppercase tracking-widest text-xs">Carregando...</p>
      </div>
    );
  }

  if (!product || product.is_active === false) {
    return (
      <div className="pt-40 pb-20 text-center px-6">
        <h2 className="text-2xl font-serif mb-4 uppercase tracking-tight">Produto Indisponível</h2>
        <p className="text-gray-400 font-light mb-8 uppercase tracking-widest text-[10px]">Este produto foi pausado ou não está mais disponível no catálogo.</p>
        <button 
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gold transition-colors"
        >
          Voltar para a Loja
        </button>
      </div>
    );
  }

  const handleWhatsApp = () => {
    if (!product) return;
    const message = `Olá! Tenho interesse no ${product.name}.\n\nCor: ${selectedColor}\nTamanho: ${selectedSize}\n\nGostaria de fazer meu pedido.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5511967959847?text=${encodedMessage}`, '_blank');
  };

  const currentImages = product.colorImages && selectedColor && product.colorImages[selectedColor] 
    ? product.colorImages[selectedColor] 
    : (product.images && product.images.length > 0 ? product.images : [product.image_url]);

  return (
    <div className="pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Breadcrumb - Subtle and clean */}
        <nav className="flex items-center space-x-2 text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-6 py-4">
          <button onClick={() => navigate('/')} className="hover:text-black transition-colors">Início</button>
          <span className="text-gray-300">/</span>
          <span className="text-black font-bold">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-16">
          {/* Image Gallery - Mobile First focus */}
          <div className="space-y-3">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 rounded-sm">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${selectedColor}-${currentImageIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={currentImages[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              
              {currentImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5">
                  {currentImages.map((_, idx) => (
                    <div 
                      key={idx}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        currentImageIndex === idx ? 'bg-white w-4' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Thumbnail selector - Scrollable on mobile */}
            <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2">
              {currentImages.map((img, idx) => (
                <button
                  key={`${selectedColor}-${idx}`}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 w-20 aspect-[3/4] overflow-hidden border transition-all ${
                    currentImageIndex === idx ? 'border-black' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8 md:space-y-10 pt-4 md:pt-0">
            <div className="space-y-2">
              <span className="text-[10px] text-gold font-bold uppercase tracking-[0.3em]">{product.category}</span>
              <h1 className="text-3xl md:text-5xl font-serif text-black leading-tight">{product.name}</h1>
              <p className="text-xl md:text-2xl text-black font-light">{formatPrice(product.price)}</p>
            </div>

            <div className="space-y-6">
              {/* Size Selection */}
              <div className="space-y-3">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">Selecione o Tamanho</span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[48px] h-12 flex items-center justify-center text-xs font-bold border transition-all ${
                        selectedSize === size 
                          ? 'border-black bg-black text-white' 
                          : 'border-gray-100 hover:border-black text-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">Cor</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        setSelectedColor(color);
                        setCurrentImageIndex(0);
                      }}
                      className={`px-6 py-3 text-[10px] font-bold tracking-widest border transition-all uppercase ${
                        selectedColor === color 
                          ? 'border-black bg-black text-white shadow-lg' 
                          : 'border-gray-100 hover:border-black text-gray-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <button
                onClick={handleWhatsApp}
                className="w-full py-5 bg-black text-white font-bold tracking-[0.2em] uppercase text-xs hover:bg-gold transition-all duration-500 flex items-center justify-center space-x-3 shadow-xl shadow-black/10 active:scale-95"
              >
                <Phone size={18} />
                <span>Comprar pelo WhatsApp</span>
              </button>
              
              <div className="p-4 bg-gray-50/50 border border-gray-100 rounded-sm">
                <p className="text-[10px] text-gray-500 font-light leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 text-[8px] font-bold uppercase tracking-widest text-gray-400 pt-4">
              <div className="flex items-center space-x-2">
                <div className="w-1 h-1 bg-gold rounded-full"></div>
                <span>Envio para todo Brasil</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1 h-1 bg-gold rounded-full"></div>
                <span>Parcelamento no cartão</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
