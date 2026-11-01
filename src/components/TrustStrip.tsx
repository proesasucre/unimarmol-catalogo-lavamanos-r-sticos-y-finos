import React from 'react';
import { Award, ShieldCheck, Truck, Sparkles, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../data/catalogData';

export const TrustStrip: React.FC = () => {
  return (
    <section className="py-10 sm:py-14 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#C8102E] block mb-1">
            Garantía y Confianza UNI-MÁRMOL
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#1C1C1E]">
            Estándares de Calidad y Compromiso Nacional
          </h3>
        </div>

        {/* 4 Columns Trust Strip with enhanced typography */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="bg-[#F8F9FA] border border-stone-200 rounded-2xl p-5 flex items-start gap-3.5 hover:border-red-200 hover:shadow-xs transition-all">
            <div className="p-3 rounded-xl bg-[#C8102E]/10 text-[#C8102E] shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-[#1C1C1E] mb-0.5">Maquinaria CNC</h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-snug">
                Corte computarizado 3D milimétrico y cavidades hidrodinámicas sin estancamiento.
              </p>
            </div>
          </div>

          <div className="bg-[#F8F9FA] border border-stone-200 rounded-2xl p-5 flex items-start gap-3.5 hover:border-red-200 hover:shadow-xs transition-all">
            <div className="p-3 rounded-xl bg-[#C8102E]/10 text-[#C8102E] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-[#1C1C1E] mb-0.5">Piedra 100% Genuina</h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-snug">
                Mármoles, travertinos y rocas andinas seleccionadas en bloque macizo sin resinas.
              </p>
            </div>
          </div>

          <div className="bg-[#F8F9FA] border border-stone-200 rounded-2xl p-5 flex items-start gap-3.5 hover:border-red-200 hover:shadow-xs transition-all">
            <div className="p-3 rounded-xl bg-[#C8102E]/10 text-[#C8102E] shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-[#1C1C1E] mb-0.5">Envíos a Toda Bolivia</h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-snug">
                Embalaje en caja de madera reforzada estructural con seguro de transporte.
              </p>
            </div>
          </div>

          <div className="bg-[#F8F9FA] border border-stone-200 rounded-2xl p-5 flex items-start gap-3.5 hover:border-red-200 hover:shadow-xs transition-all">
            <div className="p-3 rounded-xl bg-[#C8102E]/10 text-[#C8102E] shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-[#1C1C1E] mb-0.5">Hecho en Sucre</h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-snug">
                📍 {COMPANY_INFO.address}. Atención directa de maestros marmoleros.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
