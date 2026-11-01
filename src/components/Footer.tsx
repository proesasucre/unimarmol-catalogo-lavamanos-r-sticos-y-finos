import React from 'react';
import { MapPin, Phone, MessageCircle, ArrowUp, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO, IMAGES } from '../data/catalogData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C1C1E] text-stone-300 pt-14 pb-24 sm:pb-16 border-t border-stone-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 pb-12 border-b border-stone-800">
          
          {/* Col 1: Brand & USP */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={IMAGES.logo}
                alt="UNI-MÁRMOL"
                referrerPolicy="no-referrer"
                className="w-12 h-12 object-contain rounded-lg bg-white p-1"
              />
              <div>
                <span className="text-xl font-black text-white tracking-tight block">
                  UNI-MÁRMOL
                </span>
                <span className="text-xs text-[#DC143C] font-semibold tracking-wider uppercase block">
                  {COMPANY_INFO.slogan}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 max-w-md leading-relaxed">
              Los originales y primeros en Bolivia en el arte de esculpir piedra en lavamanos. Piezas exclusivas talladas con maquinaria CNC de última generación. Creamos la pieza central para tu hogar.
            </p>

            <div className="flex items-center gap-2 text-xs text-stone-300 bg-stone-800/80 p-2.5 rounded-lg border border-stone-700/60 max-w-md">
              <ShieldCheck className="w-4 h-4 text-[#DC143C] shrink-0" />
              <span>Garantía de calidad de fábrica · Envíos interdepartamentales asegurados</span>
            </div>
          </div>

          {/* Col 2: Líneas de Productos */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Líneas de Esculpido
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>• Lavamanos Rústicos en Roca Viva</li>
              <li>• Lavamanos Tallados CNC 4 Ejes</li>
              <li>• Lavamanos de Sobreponer para Mesadas</li>
              <li>• Monolitos y Pedestales Macizos</li>
              <li>• Sets de Accesorios en Mármol</li>
              <li>• Proyectos a Medida y Hotelería</li>
            </ul>
          </div>

          {/* Col 3: Ubicación y Contacto Directo */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Atención & Ventas
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#DC143C] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#DC143C] shrink-0" />
                <a href={`tel:${COMPANY_INFO.phoneDirect}`} className="hover:text-white transition-colors">
                  Cel. {COMPANY_INFO.phoneDirect}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappCleanNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: +591 72876260
                </a>
              </div>
              <p className="text-[11px] text-stone-500 pt-1">
                Lunes a Sábado: 08:00 - 18:30<br />
                Envíos a toda Bolivia
              </p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            <p>© {new Date().getFullYear()} UNI-MÁRMOL. Todos los derechos reservados. Sucre - Bolivia.</p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
