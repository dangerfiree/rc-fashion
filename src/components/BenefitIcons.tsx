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
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="flex flex-col items-start space-y-4 group cursor-default"
            >
              <div className="text-gold transition-transform duration-500 group-hover:scale-110">
                {benefit.icon}
              </div>
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-black">
                  {benefit.title}
                </h4>
                <p className="text-gray-400 text-xs font-light leading-relaxed max-w-[200px]">
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
