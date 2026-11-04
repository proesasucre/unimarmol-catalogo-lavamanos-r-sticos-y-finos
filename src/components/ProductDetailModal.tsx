import React, { useEffect } from 'react';
import { X, Check, ShoppingCart, MessageCircle, Shield, Ruler, Sparkles, Truck, Droplets } from 'lucide-react';
import { Product } from '../types/catalog';
import { COMPANY_INFO } from '../data/catalogData';

interface ProductDetailModalProps {
  product: Product | null;
  isInCart: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isInCart,
  onClose,
  onAddToCart,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const directWhatsappText = encodeURIComponent(
    `¡Hola UNI-MÁRMOL! Deseo realizar el pedido de compra del modelo: *[${product.code}] ${product.name}* (Precio: ${
      product.isQuoteOnly ? 'Fabricación a medida' : `Bs. ${product.priceBs}`
    }). Por favor indíquenme los pasos para coordinar el pago y envío.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto border border-stone-200">
        
        {/* Close Button Header */}
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-stone-900 shadow-md backdrop-blur-sm transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto flex-1 p-5 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
            
            {/* Image & Guarantee Col */}
            <div className="flex flex-col gap-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#1C1C1E]/95 backdrop-blur-md text-white text-xs font-black px-3 py-1.5 rounded-lg border border-white/20 uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-[#C8102E]"></span>
                  <span>{product.code || product.badge}</span>
                </div>
              </div>

              {/* Boxed trust points */}
              <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200 text-xs text-stone-600 space-y-2">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#C8102E] shrink-0" />
                  <span className="font-semibold text-stone-800">
                    Garantía UNI-MÁRMOL:
                  </span>
                  <span>Esculpido en piedra maciza 100% natural sin resinas baratas.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#C8102E] shrink-0" />
                  <span className="font-semibold text-stone-800">
                    Envío Nacional:
                  </span>
                  <span>Embalado en caja de madera reforzada hacia cualquier departamento.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-[#C8102E] shrink-0" />
                  <span className="font-semibold text-stone-800">
                    Mantenimiento:
                  </span>
                  <span>Limpieza simple con jabón neutro. Cuenco con sellador hidrofugante.</span>
                </div>
              </div>
            </div>

            {/* Information & Specifications Col */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-bold text-[#C8102E] uppercase tracking-wider">
                  {product.categoryName}
                </span>
                <span className="text-xs font-black text-stone-900 bg-stone-100 border border-stone-300 px-2.5 py-0.5 rounded-md tracking-wider">
                  {product.code}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1C1C1E] leading-tight mb-2">
                {product.name}
              </h2>

              {/* Price display */}
              <div className="mb-4 pb-4 border-b border-stone-200 flex items-baseline gap-2">
                {product.isQuoteOnly ? (
                  <span className="text-lg font-bold text-stone-900">
                    Pedido y fabricación a medida según especificaciones del proyecto
                  </span>
                ) : (
                  <>
                    <span className="text-2xl sm:text-3xl font-black text-[#C8102E] tabular-nums">
                      Bs. {product.priceBs.toLocaleString()}
                    </span>
                    <span className="text-xs text-stone-500">
                      (Precio directo de fábrica en Sucre)
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-stone-700 leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Technical Sheet Table */}
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5 text-[#C8102E]" />
                Especificaciones Técnicas
              </h4>
              
              <div className="bg-stone-50 rounded-xl border border-stone-200 divide-y divide-stone-200 text-xs mb-5">
                <div className="grid grid-cols-3 p-2.5">
                  <span className="text-stone-500 font-medium">Tipo de Piedra</span>
                  <span className="col-span-2 text-stone-900 font-semibold">{product.stoneType}</span>
                </div>
                <div className="grid grid-cols-3 p-2.5">
                  <span className="text-stone-500 font-medium">Acabado</span>
                  <span className="col-span-2 text-stone-900 font-semibold">{product.finish}</span>
                </div>
                <div className="grid grid-cols-3 p-2.5">
                  <span className="text-stone-500 font-medium">Dimensiones</span>
                  <span className="col-span-2 text-stone-900 font-semibold">{product.dimensions}</span>
                </div>
                <div className="grid grid-cols-3 p-2.5">
                  <span className="text-stone-500 font-medium">Peso Aprox.</span>
                  <span className="col-span-2 text-stone-900 font-semibold">{product.weightApprox}</span>
                </div>
                <div className="grid grid-cols-3 p-2.5">
                  <span className="text-stone-500 font-medium">Tecnología</span>
                  <span className="col-span-2 text-stone-900 font-semibold">{product.cuttingTech}</span>
                </div>
              </div>

              {/* Features List */}
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Características Destacadas
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-700 mb-6">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#C8102E] font-bold">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="mt-auto pt-4 border-t border-stone-200 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onAddToCart(product)}
                  className={`flex-1 py-3 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95 ${
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
                      <ShoppingCart className="w-4 h-4" />
                      <span>Añadir a mis pedidos</span>
                    </>
                  )}
                </button>

                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappCleanNumber}?text=${directWhatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Pedir directo por WhatsApp</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
