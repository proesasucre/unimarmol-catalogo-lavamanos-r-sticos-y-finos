import React from 'react';
import { Cpu, ShieldCheck, Box, Hammer, MapPin, Sparkles, CheckCircle2, Phone } from 'lucide-react';
import { COMPANY_INFO, IMAGES } from '../data/catalogData';

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section id="tecnologia-cnc" className="py-16 sm:py-20 bg-stone-900 text-stone-100 overflow-hidden relative">
      {/* Background subtle texture */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C8102E_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-stone-300 uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Pioneros en Bolivia</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4 text-balance">
            El Arte de Esculpir la Piedra con Maquinaria CNC de Última Generación
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed text-balance">
            {COMPANY_INFO.usp}
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Pillar 1: CNC */}
          <div className="bg-stone-800/80 border border-stone-700 rounded-2xl p-6 sm:p-7 relative flex flex-col justify-between hover:border-red-900/50 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#C8102E]/20 text-[#DC143C] flex items-center justify-center mb-5">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Mecanizado CNC Multieje
              </h3>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-4">
                Diseñamos cada modelo en software tridimensional para modelar cuencos con pendiente hidrodinámica perfecta. Nuestras fresas diamantadas de 4 ejes tallan la piedra maciza con tolerancias de décimas de milímetro.
              </p>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-300 pt-4 border-t border-stone-700/60">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#DC143C] shrink-0" />
                <span>Geometrías paramétricas y acanalados 3D</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#DC143C] shrink-0" />
                <span>Cero retención o empozamiento de agua</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2: Mano de Obra Artesanal */}
          <div className="bg-stone-800/80 border border-stone-700 rounded-2xl p-6 sm:p-7 relative flex flex-col justify-between hover:border-red-900/50 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#C8102E]/20 text-[#DC143C] flex items-center justify-center mb-5">
                <Hammer className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Terminación Artesanal
              </h3>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-4">
                La máquina da la precisión, pero el maestro marmolero le da el alma. Cada lavamanos pasa por 7 etapas de pulido progresivo al diamante y aplicación de sellador mineral hidrorrepelente grado alimenticio.
              </p>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-300 pt-4 border-t border-stone-700/60">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#DC143C] shrink-0" />
                <span>Suavidad sedosa al tacto y fácil limpieza</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#DC143C] shrink-0" />
                <span>Conservación de la veta natural y fósiles</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3: Embalaje y Envíos */}
          <div id="envios-garantizados" className="bg-stone-800/80 border border-stone-700 rounded-2xl p-6 sm:p-7 relative flex flex-col justify-between hover:border-red-900/50 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#C8102E]/20 text-[#DC143C] flex items-center justify-center mb-5">
                <Box className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                Caja de Madera Reforzada
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-4">
                Sabemos lo valiosa que es cada pieza. Cada lavamanos es empaquetado en un cajón de madera estructural cerrado con amortiguación interna de polietileno de alta densidad para viajes por carretera en toda Bolivia.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-stone-400 pt-4 border-t border-stone-700/60">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#DC143C] shrink-0" />
                <span>Envíos a Santa Cruz, La Paz, Cbba, Tarija y más</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#DC143C] shrink-0" />
                <span>Embalaje estructural para transporte seguro</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Location & Workshop Banner in Sucre */}
        <div id="contacto" className="bg-gradient-to-r from-stone-800 to-stone-850 rounded-3xl p-6 sm:p-10 border border-stone-700 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="p-3.5 bg-white rounded-2xl shrink-0 shadow-md">
              <img
                src={IMAGES.logo}
                alt="UNI-MÁRMOL Logo"
                referrerPolicy="no-referrer"
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-[#DC143C] font-semibold uppercase tracking-wider mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Taller & Showroom Oficial en Sucre</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                UNI-MÁRMOL — Sucre, Bolivia
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm mt-1">
                📍 {COMPANY_INFO.address}
              </p>
              <p className="text-stone-400 text-xs mt-1">
                Atención a clientes particulares, constructores y despachos de arquitectura de todo el país.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappCleanNumber}?text=${encodeURIComponent('Hola UNI-MÁRMOL, quisiera agendar una visita o consultar el catálogo.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span>WhatsApp +591 72876260</span>
            </a>

            <a
              href={`tel:${COMPANY_INFO.phoneDirect}`}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-sm flex items-center justify-center gap-2 transition-all"
            >
              <Phone className="w-4 h-4 text-[#DC143C]" />
              <span>Llamar Cel. {COMPANY_INFO.phoneDirect}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
