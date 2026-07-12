import React from 'react';
import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer id="contato" className="bg-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex flex-col items-start group">
              <span className="text-2xl font-serif tracking-[0.2em] font-bold text-white group-hover:text-gold transition-colors uppercase">
                RC
              </span>
              <span className="text-[10px] tracking-[0.4em] text-gray-400 uppercase font-light -mt-1 group-hover:text-gold transition-colors">
                Fashion Concept
              </span>
            </Link>
            <p className="text-gray-400 font-light text-sm leading-relaxed max-w-xs">
              Elegância que veste você. Conjuntos femininos premium com design exclusivo e qualidade superior.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/rc.fashionconcept/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-gold transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://wa.me/5511967959847?text=Olá! Tenho interesse nas peças da RC Fashion Concept. Gostaria de mais informações." target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-gold transition-colors">
                <Phone size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase mb-8 border-b border-white/10 pb-2 inline-block">
              Navegação
            </h4>
            <ul className="space-y-4 text-sm font-light text-gray-400">
              <li><Link to="/" className="hover:text-gold transition-colors">Início</Link></li>
              <li><a href="#catalogo" className="hover:text-gold transition-colors">Catálogo</a></li>
              <li><a href="#sobre" className="hover:text-gold transition-colors">Sobre</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase mb-8 border-b border-white/10 pb-2 inline-block">
              Contato
            </h4>
            <ul className="space-y-4 text-sm font-light text-gray-400">
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-gold" />
                <a 
                  href="https://wa.me/5511967959847?text=Olá! Tenho interesse nas peças da RC Fashion Concept. Gostaria de mais informações." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-gold transition-colors"
                >
                  +55 11 96795-9847
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-gold" />
                <span>contato@rcfashion.com.br</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin size={16} className="text-gold" />
                <span>São Paulo, SP - Brasil</span>
              </li>
            </ul>
          </div>

          {/* Instagram CTA */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase mb-8 border-b border-white/10 pb-2 inline-block">
              Social
            </h4>
            <p className="text-sm text-gray-400 mb-6 font-light">
              Siga nosso Instagram para novidades e tendências diárias.
            </p>
            <a
              href="https://www.instagram.com/rc.fashionconcept/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gold text-white text-xs font-bold tracking-widest uppercase hover:bg-gold-dark transition-colors"
            >
              <Instagram size={16} />
              <span>Seguir no Instagram</span>
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} RC Fashion Concept. Todos os direitos reservados.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="hover:text-white">Privacidade</a>
            <a href="#" className="hover:text-white">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
