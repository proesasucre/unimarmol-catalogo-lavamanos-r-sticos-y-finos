import React from 'react';
import { ArrowDown, MessageCircle } from 'lucide-react';
import { COMPANY_INFO, IMAGES } from '../data/catalogData';

interface HeroProps {
  onExploreCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog }) => {
  return (
    <section className="relative w-full overflow-hidden bg-stone-900 text-white">
      {/* Background Hero Image with Measured Gradient Overlay for Perfect Contrast */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.hero}
          alt="Baño de lujo con lavamanos de piedra natural UNI-MÁRMOL"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 animate-subtleZoom opacity-80"
        />
        {/* Multilayer gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E] via-[#1C1C1E]/75 to-[#1C1C1E]/60" />
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-transparent via-[#1C1C1E]/40 to-[#1C1C1E]/80" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-16 sm:pb-24 text-center flex flex-col items-center">
        
        {/* LOGOTIPO OFICIAL "UNI-MÁRMOL" MUCHO MÁS GRANDE */}
        <div className="mb-8 flex flex-col items-center">
          <div className="p-3 sm:p-5 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 transform transition-transform hover:scale-105 duration-300">
            <img
              src={IMAGES.logo}
              alt="Logotipo Oficial UNI-MÁRMOL"
              referrerPolicy="no-referrer"
              className="w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 object-contain rounded-2xl"
            />
          </div>
          <span className="mt-3 text-sm sm:text-base font-bold tracking-widest uppercase text-stone-200">
            {COMPANY_INFO.slogan}
          </span>
        </div>

        {/* Texto titular con 2 puntos menos de tamaño */}
        <h1 className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-white max-w-3xl leading-snug mb-8 text-balance">
          Lavamanos exclusivos esculpidos en piedra natural con tecnología CNC de última generación.
        </h1>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
          {/* Botón CTA con texto exacto 'Ver Catálogo' */}
          <button
            onClick={onExploreCatalog}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#C8102E] hover:bg-[#a50d26] text-white font-extrabold text-base sm:text-lg shadow-xl hover:shadow-red-900/40 active:scale-98 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Ver Catálogo</span>
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>

          {/* Secondary WhatsApp Direct CTA */}
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsappCleanNumber}?text=${encodeURIComponent('Hola UNI-MÁRMOL, quisiera realizar un pedido de lavamanos de piedra para mi proyecto.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white font-bold text-base sm:text-lg transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5 text-emerald-400" />
            <span>Hacer Pedido por WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
