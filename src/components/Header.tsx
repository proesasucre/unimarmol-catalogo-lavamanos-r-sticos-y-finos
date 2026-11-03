import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, ShoppingBag, Menu, X, ShieldCheck, Truck } from 'lucide-react';
import { COMPANY_INFO, IMAGES } from '../data/catalogData';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onSelectCategory: (id: string | null) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onSelectCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string, categoryId?: string) => {
    setMobileMenuOpen(false);
    if (categoryId) {
      onSelectCategory(categoryId);
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all shadow-xs">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#1C1C1E] text-stone-200 text-xs sm:text-sm py-2.5 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-1.5 gap-x-4">
          {/* Ubicación física */}
          <div className="flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors">
            <MapPin className="w-4 h-4 text-[#C8102E] shrink-0" />
            <span className="truncate font-medium">📍 Av. Ostria Gutiérrez #38, Sucre - Bolivia</span>
          </div>

          {/* Envíos a todo el país badge */}
          <div className="hidden md:flex items-center gap-2 text-stone-300">
            <span className="inline-flex items-center gap-1 font-semibold text-white">
              <span>🇧🇴</span> Envíos a todo el país
            </span>
            <span className="text-stone-500">|</span>
            <span className="text-stone-300 font-medium">Garantizados y Elegantes</span>
          </div>

          {/* Contacto directo Celular */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${COMPANY_INFO.phoneDirect}`}
              className="inline-flex items-center gap-1 text-white hover:text-red-400 font-bold transition-colors"
            >
              <Phone className="w-4 h-4 text-[#C8102E]" />
              <span>💬 Cel. {COMPANY_INFO.phoneDirect}</span>
            </a>
            <span className="text-stone-600 hidden sm:inline">|</span>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappCleanNumber}?text=${encodeURIComponent('Hola UNI-MÁRMOL, quisiera información sobre sus lavamanos tallados en piedra.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Directo</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER NAVIGATION BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-4">
        {/* Brand & Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group shrink-0"
        >
          <img
            src={IMAGES.logo}
            alt="UNI-MÁRMOL Logo"
            referrerPolicy="no-referrer"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-md border border-stone-200 shadow-2xs group-hover:scale-105 transition-transform"
          />
          <span className="font-extrabold text-lg sm:text-2xl tracking-tight text-[#1C1C1E] leading-tight">
            UNI-MÁRMOL
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-base font-semibold text-stone-700">
          <button
            onClick={() => handleNavClick('catalogo')}
            className="hover:text-[#C8102E] transition-colors py-1 cursor-pointer whitespace-nowrap font-bold text-[#1C1C1E]"
          >
            Catálogo General
          </button>
          <button
            onClick={() => handleNavClick('proyectos-instalados')}
            className="hover:text-[#C8102E] transition-colors py-1 cursor-pointer whitespace-nowrap font-bold text-stone-900 flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-[#C8102E]" />
            Proyectos Instalados
          </button>
          <button
            onClick={() => handleNavClick('tecnologia-cnc')}
            className="hover:text-[#C8102E] transition-colors py-1 cursor-pointer whitespace-nowrap"
          >
            Tecnología CNC
          </button>
          <button
            onClick={() => handleNavClick('contacto')}
            className="hover:text-[#C8102E] transition-colors py-1 cursor-pointer whitespace-nowrap"
          >
            Ubicación Sucre
          </button>
        </nav>

        {/* Action Buttons: Pedidos / WhatsApp CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Botón Mis Pedidos */}
          <button
            onClick={onOpenCart}
            aria-label="Ver mis pedidos de compra"
            className="relative flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-[#C8102E] hover:bg-[#a50d26] active:scale-95 text-white font-bold text-sm sm:text-base shadow-sm transition-all cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="hidden sm:inline">Mis Pedidos</span>
            <span className="bg-white text-[#C8102E] text-xs sm:text-sm font-extrabold px-2 py-0.5 rounded-full min-w-6 text-center shadow-2xs">
              {cartCount}
            </span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
            className="lg:hidden p-2 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-200 px-4 py-4 space-y-3 shadow-lg animate-fadeIn">
          <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-600 mb-2">
            <p className="font-semibold text-stone-800 flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-4 h-4 text-[#C8102E]" />
              Los primeros en Bolivia en esculpir piedra
            </p>
            <p className="flex items-center gap-1 text-stone-500">
              <Truck className="w-3.5 h-3.5 text-stone-500" />
              Envíos diarios desde Sucre a todo el país
            </p>
          </div>

          <button
            onClick={() => handleNavClick('catalogo')}
            className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-stone-100 font-bold text-stone-900 text-sm flex items-center justify-between"
          >
            <span>📋 Catálogo General (22 Modelos)</span>
            <span className="text-xs text-[#C8102E] font-extrabold">Ver Todo</span>
          </button>
          <button
            onClick={() => handleNavClick('proyectos-instalados')}
            className="w-full text-left py-2 px-3 rounded-md hover:bg-stone-100 font-bold text-[#C8102E] text-sm flex items-center justify-between"
          >
            <span>🏡 Proyectos Instalados (Casas Reales)</span>
            <span className="text-[10px] bg-red-100 px-1.5 py-0.5 rounded text-[#C8102E]">Fotos HD</span>
          </button>
          <button
            onClick={() => handleNavClick('tecnologia-cnc')}
            className="w-full text-left py-2 px-3 rounded-md hover:bg-stone-100 font-medium text-stone-800 text-sm"
          >
            ⚙️ Maquinaria CNC y Artesanía
          </button>
          <button
            onClick={() => handleNavClick('envios-garantizados')}
            className="w-full text-left py-2 px-3 rounded-md hover:bg-stone-100 font-medium text-stone-800 text-sm"
          >
            🇧🇴 Garantía de Envíos en Bolivia
          </button>
          <button
            onClick={() => handleNavClick('contacto')}
            className="w-full text-left py-2 px-3 rounded-md hover:bg-stone-100 font-medium text-stone-800 text-sm"
          >
            📍 Contacto & Dirección Sucre
          </button>

          <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappCleanNumber}?text=${encodeURIComponent('Hola UNI-MÁRMOL, deseo consultar precios de lavamanos.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Chat WhatsApp (+591 72876260)
            </a>
            <a
              href={`tel:${COMPANY_INFO.phoneDirect}`}
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-stone-300 text-stone-700 font-medium text-sm hover:bg-stone-50"
            >
              <Phone className="w-4 h-4 text-[#C8102E]" />
              Llamar Cel. {COMPANY_INFO.phoneDirect}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
