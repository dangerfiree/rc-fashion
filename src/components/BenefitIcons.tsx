import React from 'react';
import { Truck, ShieldCheck, Star, Headset } from 'lucide-react';

const benefits = [
  {
    icon: <Truck size={32} className="text-gold" />,
    title: 'Envio Nacional',
    description: 'Enviamos para todo o Brasil com segurança e agilidade.',
  },
  {
    icon: <Headset size={32} className="text-gold" />,
    title: 'Atendimento Rápido',
    description: 'Suporte humanizado e ágil diretamente pelo WhatsApp.',
  },
  {
    icon: <ShieldCheck size={32} className="text-gold" />,
    title: 'Compra Segura',
    description: 'Ambiente seguro para você realizar suas compras com tranquilidade.',
  },
];

export const BenefitIcons: React.FC = () => {
  return (
    <section className="py-24 bg-white border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center space-y-6 group cursor-default"
            >
              <div className="p-6 bg-gray-50 rounded-full transition-all duration-500 group-hover:bg-gold/10 group-hover:scale-110">
                {benefit.icon}
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-bold tracking-[0.2em] uppercase text-black">
                  {benefit.title}
                </h4>
                <p className="text-gray-400 text-sm font-light leading-relaxed max-w-[250px] mx-auto">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
