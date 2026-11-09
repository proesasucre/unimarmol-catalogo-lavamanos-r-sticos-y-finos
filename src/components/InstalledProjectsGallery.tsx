import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, MapPin, ZoomIn, Eye, Sparkles, CheckCircle2, ShoppingCart } from 'lucide-react';
import { Product } from '../types/catalog';
import { PRODUCTS } from '../data/catalogData';

export interface InstalledProject {
  id: string;
  title: string;
  location: string;
  city: string;
  clientType: string;
  image: string;
  installedProductModel: string;
  matchedProductId: string;
  testimonial: string;
  architectDesigner?: string;
  stoneHighlight: string;
}

const INSTALLED_PROJECTS: InstalledProject[] = [
  {
    id: 'proj-01',
    title: 'Baño Principal en Residencia Calacoto',
    location: 'Zona Sur, Calacoto',
    city: 'La Paz',
    clientType: 'Residencia Privada Unifamiliar',
    image: '/8.jpg',
    installedProductModel: 'Lavamanos Rústico Piedra Natural Andina',
    matchedProductId: 'rust-1007',
    testimonial: '«El lavamanos de piedra es definitivamente la pieza protagonista de toda la casa. El contraste entre la roca exterior y el interior pulido es impresionante. Llegó a La Paz en su cajón de madera en perfecto estado.»',
    architectDesigner: 'Arq. Mateo Silva & Asociados',
    stoneHighlight: 'Piedra de Río Natural con corteza bruta y cuenco diamantado',
  },
  {
    id: 'proj-02',
    title: 'Penthouse Contemporáneo Equipetrol',
    location: 'Barrio Equipetrol Norte',
    city: 'Santa Cruz de la Sierra',
    clientType: 'Penthouse de Lujo',
    image: '/7.jpg',
    installedProductModel: 'Lavamanos Facetado Poligonal CNC',
    matchedProductId: 'fino-03',
    testimonial: '«Buscábamos una pieza con cortes arquitectónicos limpios que combinara con mesada de cuarzo blanco. El tallado CNC de UNI-MÁRMOL tiene una precisión milimétrica excepcional.»',
    architectDesigner: 'Estudio Rocha Interiorismo',
    stoneHighlight: 'Granito Negro Grafito Andino maquinado en 4 ejes',
  },
  {
    id: 'proj-03',
    title: 'Suite Campestre en Colcapirhua',
    location: 'Colcapirhua, Valle Central',
    city: 'Cochabamba',
    clientType: 'Casa Quinta Familiar',
    image: '/6.jpg',
    installedProductModel: 'Lavamanos Imperial Carrara / Travertino Sobreponer',
    matchedProductId: 'fino-01',
    testimonial: '«La textura del mármol travertino y la suavidad de los bordes superaron nuestras expectativas. El agua drena de forma silenciosa e impecable. Un lujo 100% hecho en Bolivia.»',
    architectDesigner: 'Familia Morales Valdivia',
    stoneHighlight: 'Mármol Travertino Nuez pulido apomazado sedoso',
  },
  {
    id: 'proj-04',
    title: 'Baño de Visitas en Casona Sucre',
    location: 'Centro Histórico Patrimonio',
    city: 'Sucre',
    clientType: 'Casona Colonial Restaurada',
    image: '/5.jpg',
    installedProductModel: 'Lavamanos Monolito Totora Pedestal',
    matchedProductId: 'proy-01',
    testimonial: '«Visité personalmente el taller de UNI-MÁRMOL en la Av. Ostria Gutiérrez para elegir el bloque de mármol. El lavamanos de pie monolítico parece una escultura de museo en nuestro baño de visitas.»',
    architectDesigner: 'Dra. Elena Arancibia',
    stoneHighlight: 'Mármol Gris Chataquila esculpido en bloque sólido de 135 kg',
  },
];

interface InstalledProjectsGalleryProps {
  onSelectProductToView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const InstalledProjectsGallery: React.FC<InstalledProjectsGalleryProps> = ({
  onSelectProductToView,
  onAddToCart,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeProject = INSTALLED_PROJECTS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? INSTALLED_PROJECTS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === INSTALLED_PROJECTS.length - 1 ? 0 : prev + 1));
  };

  // High-resolution mouse zoom handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
    });
  };

  const matchedProduct = PRODUCTS.find((p) => p.id === activeProject.matchedProductId);

  return (
    <section id="proyectos-instalados" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-stone-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C8102E] bg-red-50 border border-red-100 px-3 py-1 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Casas Reales & Clientes Satisfechos</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1C1C1E] tracking-tight">
              Galería de Proyectos Instalados
            </h2>
            <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-2xl">
              Descubre cómo transforman los lavamanos de <span className="font-semibold text-stone-900">UNI-MÁRMOL</span> los baños de residencias en La Paz, Santa Cruz, Cochabamba y Sucre. <span className="text-[#C8102E] font-medium">Pasa el ratón sobre la imagen para hacer zoom de alta resolución.</span>
            </p>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-bold text-stone-500 tabular-nums">
              0{currentIndex + 1} / 0{INSTALLED_PROJECTS.length}
            </span>
            <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl border border-stone-200">
              <button
                onClick={handlePrev}
                aria-label="Proyecto anterior"
                className="p-2.5 rounded-lg bg-white text-stone-800 hover:text-[#C8102E] hover:bg-stone-50 shadow-2xs transition-all active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Siguiente proyecto"
                className="p-2.5 rounded-lg bg-white text-stone-800 hover:text-[#C8102E] hover:bg-stone-50 shadow-2xs transition-all active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Showcase Split Card */}
        <div className="bg-[#F8F9FA] border border-stone-200 rounded-3xl overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* LEFT: Interactive High-Resolution Image Container with Mouse Zoom */}
          <div className="lg:col-span-7 relative bg-stone-900 overflow-hidden min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] select-none">
            <div
              ref={containerRef}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
              onClick={() => setIsLightboxOpen(true)}
              className="relative w-full h-full overflow-hidden cursor-crosshair group"
            >
              {/* Image with dynamic cursor-following zoom transform */}
              <img
                src={activeProject.image}
                alt={activeProject.title}
                referrerPolicy="no-referrer"
                style={{
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transform: isZooming ? 'scale(1.85)' : 'scale(1.01)',
                  transition: isZooming ? 'transform 0.1s ease-out' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="w-full h-full object-cover select-none pointer-events-none"
              />

              {/* Zoom Instruction Tag Overlay */}
              <div className={`absolute top-4 left-4 z-10 transition-opacity duration-300 pointer-events-none ${
                isZooming ? 'opacity-0' : 'opacity-100'
              }`}>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-semibold shadow-md border border-white/10">
                  <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pasa el ratón para Zoom HD (185%)</span>
                </div>
              </div>

              {/* Expand Lightbox Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLightboxOpen(true);
                }}
                aria-label="Ver imagen completa en pantalla grande"
                className="absolute bottom-4 right-4 z-10 p-2.5 rounded-xl bg-black/60 hover:bg-black/80 text-white backdrop-blur-md shadow-md transition-all hover:scale-105 cursor-pointer"
              >
                <Eye className="w-4 h-4" />
              </button>

              {/* Magnifier lens indicator ring when hovering */}
              {isZooming && (
                <div
                  style={{
                    left: `${zoomPos.x}%`,
                    top: `${zoomPos.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  className="absolute pointer-events-none w-28 h-28 rounded-full border-2 border-white/80 shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-white/5 backdrop-contrast-125 hidden sm:block"
                />
              )}
            </div>
          </div>

          {/* RIGHT: Project Information & Real Customer Story */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white border-t lg:border-t-0 lg:border-l border-stone-200">
            <div>
              {/* Location & Client Type Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#C8102E] bg-red-50 border border-red-100 px-2.5 py-1 rounded-md">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{activeProject.city} · {activeProject.location}</span>
                </span>
                <span className="text-xs text-stone-500 font-medium">
                  {activeProject.clientType}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-black text-[#1C1C1E] leading-tight mb-4">
                {activeProject.title}
              </h3>

              {/* Testimonial Quote */}
              <blockquote className="bg-stone-50 p-5 rounded-2xl border border-stone-200 text-stone-700 text-sm sm:text-base italic leading-relaxed mb-6 relative">
                {activeProject.testimonial}
                <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-xs sm:text-sm not-italic font-bold text-stone-600">
                  <span>{activeProject.architectDesigner}</span>
                  <span className="text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Cliente Verificado
                  </span>
                </div>
              </blockquote>

              {/* Installed Model Specs Box */}
              <div className="bg-stone-100/70 p-4 sm:p-5 rounded-2xl border border-stone-200 space-y-2.5 mb-6 text-xs sm:text-sm">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-stone-500 font-bold shrink-0">Modelo Instalado:</span>
                  <span className="text-stone-900 font-black text-right truncate">
                    {activeProject.installedProductModel}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-stone-500 font-bold shrink-0">Piedra & Acabado:</span>
                  <span className="text-stone-800 font-semibold text-right">
                    {activeProject.stoneHighlight}
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons linking to catalog */}
            <div className="space-y-2.5 pt-4 border-t border-stone-100">
              {matchedProduct && (
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => onSelectProductToView(matchedProduct)}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#1C1C1E] hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Ver Ficha Técnica del Modelo</span>
                  </button>

                  <button
                    onClick={() => onAddToCart(matchedProduct)}
                    className="py-3 px-4 rounded-xl bg-[#C8102E] hover:bg-[#a50d26] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Añadir a mis pedidos</span>
                  </button>
                </div>
              )}

              {/* Department delivery reminder */}
              <p className="text-[11px] text-stone-500 text-center">
                🇧🇴 Envíos embalados en cajas de madera hacia {activeProject.city} y toda Bolivia.
              </p>
            </div>

          </div>

        </div>

        {/* Carousel Thumbnail Strip */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {INSTALLED_PROJECTS.map((proj, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={proj.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Ver proyecto ${proj.title}`}
                className={`relative rounded-2xl overflow-hidden text-left p-2 transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-white border-[#C8102E] ring-2 ring-[#C8102E]/20 shadow-sm'
                    : 'bg-stone-50 border-stone-200 hover:border-stone-400 hover:bg-white'
                }`}
              >
                <div className="aspect-[16/9] rounded-xl overflow-hidden mb-2 bg-stone-200">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-1">
                  <span className="text-[10px] font-bold text-[#C8102E] uppercase block truncate">
                    {proj.city}
                  </span>
                  <p className="text-xs font-bold text-[#1C1C1E] truncate">
                    {proj.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="absolute inset-0" onClick={() => setIsLightboxOpen(false)} />
          <div className="relative max-w-5xl w-full z-10 flex flex-col items-center">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-red-400 text-sm font-semibold flex items-center gap-1 cursor-pointer"
            >
              Cerrar [ESC] ✕
            </button>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-stone-700 bg-stone-900 w-full max-h-[80vh] flex items-center justify-center">
              <img
                src={activeProject.image}
                alt={activeProject.title}
                referrerPolicy="no-referrer"
                className="max-h-[80vh] w-auto object-contain"
              />
            </div>
            <div className="mt-4 text-center text-white">
              <h4 className="text-base font-bold">{activeProject.title}</h4>
              <p className="text-xs text-stone-300">
                {activeProject.location}, {activeProject.city} — {activeProject.installedProductModel}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
