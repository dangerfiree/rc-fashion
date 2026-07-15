import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { formatPrice } from '../lib/utils';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Link to={`/produto/${product.id}`} className="block overflow-hidden relative aspect-[3/4] mb-3">
        <img
          src={product.image_url || (product.images && product.images[0])}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        {product.is_new_arrival && product.in_stock && (
          <div className="absolute top-2 left-2 z-10">
            <span className="bg-gold text-white text-[8px] font-bold tracking-[0.2em] uppercase py-1 px-2 shadow-lg">
              New
            </span>
          </div>
        )}
        {!product.in_stock && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-black border-y border-black py-1 px-4">
              Esgotado
            </span>
          </div>
        )}
      </Link>
      
      <div className="space-y-1">
        <h3 className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-black group-hover:text-gold transition-colors truncate">
          {product.name}
        </h3>
        <p className="text-gray-400 font-medium text-[11px] md:text-sm">
          {formatPrice(product.price)}
        </p>
      </div>
    </motion.div>
  );
};
