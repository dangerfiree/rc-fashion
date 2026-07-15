import React from 'react';
import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer id="contato" className="bg-white text-black pt-24 pb-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex flex-col items-start group mb-6">
              <span className="text-xl font-serif tracking-[0.2em] font-bold text-black uppercase">
                RC
              </span>
              <span className="text-[8px] tracking-[0.3em] text-gray-400 uppercase font-light -mt-1">
                Fashion Concept
              </span>
            </Link>
            <p className="text-gray-400 font-light text-xs leading-relaxed uppercase tracking-widest">
              Sofisticação e elegância em cada detalhe.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase mb-6 text-black">Explorar</h4>
            <ul className="space-y-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <li><Link to="/" className="hover:text-gold transition-colors">Início</Link></li>
              <li><a href="#catalogo" className="hover:text-gold transition-colors">Catálogo</a></li>
              <li><Link to="/admin/login" className="hover:text-gold transition-colors">Admin</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase mb-6 text-black">Social</h4>
            <ul className="space-y-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <li><a href="https://www.instagram.com/rc.fashionconcept/" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors">Instagram</a></li>
              <li><a href="https://wa.me/5511967959847" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors">WhatsApp</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase mb-6 text-black">Contato</h4>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
              São Paulo, SP<br />
              Brasil
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100 gap-4">
          <p className="text-[8px] text-gray-300 uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} RC Fashion Concept.
          </p>
          <div className="flex space-x-6 text-[8px] text-gray-300 uppercase tracking-[0.3em]">
            <a href="#" className="hover:text-black">Privacidade</a>
            <a href="#" className="hover:text-black">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
