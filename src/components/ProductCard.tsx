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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Link to={`/produto/${product.id}`} className="block overflow-hidden relative aspect-[3/4] mb-4">
        <img
          src={product.image_url || (product.images && product.images[0])}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
        
        {/* Quick view overlay */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/90 backdrop-blur-sm text-center">
          <span className="text-xs font-medium tracking-widest uppercase text-black">Ver Produto</span>
        </div>
      </Link>
      
      <div className="text-center space-y-1">
        <h3 className="text-sm font-medium tracking-widest uppercase text-gray-900 group-hover:text-gold transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-500 font-light text-sm">
          {formatPrice(product.price)}
        </p>
      </div>
    </motion.div>
  );
};
