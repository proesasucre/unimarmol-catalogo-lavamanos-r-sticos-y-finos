import React from 'react';
import { Plus, Check, Eye, Ruler, Layers, Cpu } from 'lucide-react';
import { Product } from '../types/catalog';

interface ProductCardProps {
  product: Product;
  isInCart: boolean;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isInCart,
  onAddToCart,
  onViewDetails,
}) => {
  return (
    <div className="group bg-white rounded-3xl border border-stone-200 overflow-hidden hover:shadow-xl hover:border-stone-300 transition-all flex flex-col h-full">
      {/* Product Image Area */}
      <div 
        className="relative aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer" 
        onClick={() => onViewDetails(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge de Inventario / Código de Producto */}
        <div className="absolute top-3.5 left-3.5 bg-[#1C1C1E]/95 backdrop-blur-md text-white text-xs font-black px-3 py-1.5 rounded-lg tracking-wider uppercase shadow-md border border-white/20 flex items-center gap-1.5 z-10">
          <span className="w-2 h-2 rounded-full bg-[#C8102E]"></span>
          <span>{product.code || product.badge}</span>
        </div>

        {/* Enunciado 'Ver Ficha Técnica' en la parte inferior de la foto de referencia */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent pt-6 pb-2.5 px-3.5 flex items-center justify-between text-white transition-all group-hover:from-black/95 z-10">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold tracking-wide drop-shadow-xs">
            <Eye className="w-4 h-4 text-[#C8102E] shrink-0" />
            <span className="text-white">Ver Ficha Técnica</span>
          </div>
          <span className="text-[11px] font-black uppercase tracking-wider bg-white/25 group-hover:bg-[#C8102E] text-white px-2 py-0.5 rounded backdrop-blur-xs transition-colors">
            Detalles &rarr;
          </span>
        </div>
      </div>

      {/* Content Area with increased font sizes */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Category kicker & Inventory Code */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-stone-500 mb-2">
            <span className="font-bold uppercase tracking-wider text-[#C8102E]">
              {product.categoryName}
            </span>
            <span className="text-[#1C1C1E] bg-stone-100 px-2 py-0.5 rounded text-xs font-black border border-stone-200 tracking-wide">
              {product.code}
            </span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onViewDetails(product)}
            className="text-lg sm:text-xl font-extrabold text-[#1C1C1E] group-hover:text-[#C8102E] transition-colors leading-snug cursor-pointer line-clamp-2"
          >
            {product.name}
          </h3>

          {/* Quick Technical Specs Grid */}
          <div className="mt-3.5 pt-3.5 border-t border-stone-100 space-y-2 text-xs sm:text-sm text-stone-600">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-stone-400 shrink-0" />
              <span className="font-bold text-stone-900 shrink-0">Piedra:</span>
              <span className="truncate">{product.stoneType}</span>
            </div>

            <div className="flex items-center gap-2">
              <Ruler className="w-4 h-4 text-stone-400 shrink-0" />
              <span className="font-bold text-stone-900 shrink-0">Dimensiones:</span>
              <span className="truncate">{product.dimensions}</span>
            </div>

            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-stone-400 shrink-0" />
              <span className="font-bold text-stone-900 shrink-0">Tecnología:</span>
              <span className="truncate">{product.cuttingTech}</span>
            </div>
          </div>
        </div>

        {/* Price & Action Button Footer */}
        <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
          <div>
            <span className="text-xs text-stone-500 block uppercase font-semibold">Precio</span>
            {product.isQuoteOnly ? (
              <span className="text-sm sm:text-base font-bold text-stone-900">
                Fabricación a Medida
              </span>
            ) : (
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black text-[#1C1C1E] tabular-nums">
                  Bs. {product.priceBs.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          {/* Botón rojo "Añadir a mis pedidos" */}
          <button
            onClick={() => onAddToCart(product)}
            aria-label="Añadir a mis pedidos"
            className={`px-4 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95 shrink-0 ${
              isInCart
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-[#C8102E] hover:bg-[#a50d26] text-white'
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>En mis pedidos</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Añadir a mis pedidos</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
