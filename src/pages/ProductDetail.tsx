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

  if (!product) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h2 className="text-2xl font-serif">Produto não encontrado.</h2>
        <button onClick={() => navigate('/')} className="mt-4 text-gold hover:underline">Voltar ao início</button>
      </div>
    );
  }

  const handleWhatsApp = () => {
    if (!product) return;
    const message = `Olá! Tenho interesse no ${product.name}.\n\nCor: ${selectedColor}\nTamanho: ${selectedSize}\n\nGostaria de fazer meu pedido.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5511967959847?text=${encodedMessage}`, '_blank');
  };

  const currentImages = product.colorImages && selectedColor ? product.colorImages[selectedColor] : product.images;

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-gray-400 mb-10">
          <button onClick={() => navigate('/')} className="hover:text-black transition-colors">Início</button>
          <ChevronRight size={12} />
          <span className="text-black">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 border border-gray-100">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${selectedColor}-${currentImageIndex}`}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  src={currentImages[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              
              {currentImages.length > 1 && (
                <>
                  <button 
                    onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors z-10"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={() => setCurrentImageIndex((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors z-10"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {currentImages.map((img, idx) => (
                <button
                  key={`${selectedColor}-${idx}`}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`aspect-[3/4] overflow-hidden border-2 transition-all ${
                    currentImageIndex === idx ? 'border-gold opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-10">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-serif text-black">{product.name}</h1>
              <p className="text-2xl text-gold font-light">{formatPrice(product.price)}</p>
            </div>

            <p className="text-gray-500 font-light leading-relaxed text-lg whitespace-pre-line">
              {product.description}
            </p>

            <div className="space-y-8">
              {/* Size Selection */}
              <div className="space-y-4">
                <span className="block text-xs font-bold uppercase tracking-widest text-black">Tamanho</span>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 flex items-center justify-center text-sm font-medium border transition-all ${
                        selectedSize === size 
                          ? 'border-black bg-black text-white' 
                          : 'border-gray-200 hover:border-black text-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="space-y-4">
                <span className="block text-xs font-bold uppercase tracking-widest text-black">Cor: {selectedColor}</span>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        setSelectedColor(color);
                        setCurrentImageIndex(0);
                      }}
                      className={`px-4 py-2 text-xs font-medium tracking-widest border transition-all uppercase ${
                        selectedColor === color 
                          ? 'border-black bg-black text-white' 
                          : 'border-gray-200 hover:border-black text-gray-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleWhatsApp}
              className="w-full py-5 bg-black text-white font-bold tracking-[0.2em] uppercase text-sm hover:bg-gold transition-colors flex items-center justify-center space-x-3 group"
            >
              <Phone size={20} className="group-hover:animate-pulse" />
              <span>Chamar no WhatsApp</span>
            </button>

            {/* Extra Info */}
            <div className="pt-10 border-t border-gray-100 grid grid-cols-2 gap-8 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <div className="space-y-2">
                <p className="text-black">Envio Imediato</p>
                <p>Pronta Entrega</p>
              </div>
              <div className="space-y-2">
                <p className="text-black">Compra 100% Segura</p>
                <p>Troca Fácil</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
