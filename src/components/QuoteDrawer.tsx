import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, Send, Copy, Check, ShoppingBag, Sparkles, MapPin, Building2, User, Phone } from 'lucide-react';
import { CartItem, QuoteForm } from '../types/catalog';
import { BOLIVIAN_CITIES, COMPANY_INFO } from '../data/catalogData';

interface QuoteDrawerProps {
  isOpen: boolean;
  cartItems: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onOpenCatalog: () => void;
}

export const QuoteDrawer: React.FC<QuoteDrawerProps> = ({
  isOpen,
  cartItems,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenCatalog,
}) => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState<QuoteForm>({
    fullName: '',
    phone: '',
    city: 'Sucre (Retiro en tienda o entrega local)',
    projectType: 'Hogar Particular',
    customNotes: '',
  });

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  const estimatedTotalBs = cartItems.reduce((acc, item) => {
    return acc + (item.product.isQuoteOnly ? 0 : item.product.priceBs * item.quantity);
  }, 0);

  const hasQuoteOnlyItems = cartItems.some((item) => item.product.isQuoteOnly);

  // Construct structured WhatsApp message for Purchase Order
  const buildWhatsAppMessage = () => {
    let msg = `*PEDIDO DE COMPRA DE LAVAMANOS — UNI-MÁRMOL*\n`;
    msg += `--------------------------------------\n`;
    msg += `👤 *Cliente:* ${formData.fullName.trim() || 'No especificado'}\n`;
    if (formData.phone) msg += `📱 *Teléfono:* ${formData.phone.trim()}\n`;
    msg += `📍 *Ciudad de Entrega / Envío:* ${formData.city}\n`;
    msg += `🏗️ *Tipo de Proyecto:* ${formData.projectType}\n`;
    msg += `\n📦 *PRODUCTOS DEL PEDIDO:*\n`;

    cartItems.forEach((item, index) => {
      const p = item.product;
      const priceText = p.isQuoteOnly ? 'Fabricación a medida' : `Bs. ${(p.priceBs * item.quantity).toLocaleString()} (Bs. ${p.priceBs.toLocaleString()} c/u)`;
      msg += `\n${index + 1}. *[${p.code}] ${p.name}*\n`;
      msg += `   • Código: ${p.code}\n`;
      msg += `   • Cantidad: ${item.quantity} unid.\n`;
      msg += `   • Piedra: ${p.stoneType}\n`;
      msg += `   • Dimensiones: ${p.dimensions}\n`;
      msg += `   • Subtotal: ${priceText}\n`;
    });

    msg += `\n--------------------------------------\n`;
    msg += `💰 *Total del Pedido:* Bs. ${estimatedTotalBs.toLocaleString()}${hasQuoteOnlyItems ? ' (+ piezas a medida)' : ''}\n`;

    if (formData.customNotes.trim()) {
      msg += `\n📝 *Instrucciones / Medidas Especiales:*\n"${formData.customNotes.trim()}"\n`;
    }

    msg += `\n✨ _Hola UNI-MÁRMOL, deseo confirmar y realizar la compra de estos productos. Por favor facilítenme los métodos de pago (transferencia bancaria/QR) y la fecha de despacho a mi ciudad. ¡Muchas gracias!_`;

    return msg;
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    const message = buildWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappCleanNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyMessage = () => {
    const message = buildWhatsAppMessage();
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden border-l border-stone-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#1C1C1E] text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#C8102E] text-white rounded-lg">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                Mis Pedidos de Compra
              </h2>
              <span className="text-xs text-stone-300">
                {totalItemsCount} {totalItemsCount === 1 ? 'producto' : 'productos'} en tu orden de compra
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar mis pedidos"
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Empty State */}
          {cartItems.length === 0 ? (
            <div className="py-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-stone-800">
                Aún no has agregado productos a tus pedidos
              </h3>
              <p className="text-sm text-stone-500 max-w-xs mt-1 mb-6">
                Explora el catálogo de lavamanos tallados en piedra natural y añade los modelos que deseas comprar.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenCatalog();
                }}
                className="px-6 py-2.5 rounded-xl bg-[#C8102E] text-white font-semibold text-sm hover:bg-[#a50d26] transition-all shadow-sm cursor-pointer"
              >
                Explorar Catálogo
              </button>
            </div>
          ) : (
            <>
              {/* List of Cart Items */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500 pb-1 border-b border-stone-200">
                  <span className="font-semibold uppercase tracking-wider">Productos en tu Pedido</span>
                  <button
                    onClick={onClearCart}
                    className="text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    Vaciar pedidos
                  </button>
                </div>

                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-3.5"
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-lg object-cover bg-stone-200 shrink-0 border border-stone-200"
                    />

                    {/* Information */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] font-bold text-[#C8102E] uppercase truncate">
                          {item.product.categoryName}
                        </span>
                        <span className="text-[10px] font-black text-stone-900 bg-stone-200/80 px-1.5 py-0.5 rounded border border-stone-300 shrink-0">
                          {item.product.code}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-stone-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-stone-500 truncate">
                        {item.product.stoneType} · {item.product.dimensions}
                      </p>

                      <div className="mt-1 flex items-baseline gap-2">
                        {item.product.isQuoteOnly ? (
                          <span className="text-xs font-semibold text-stone-700">A medida</span>
                        ) : (
                          <span className="text-xs sm:text-sm font-extrabold text-stone-900 tabular-nums">
                            Bs. {(item.product.priceBs * item.quantity).toLocaleString()}
                          </span>
                        )}
                        {item.quantity > 1 && !item.product.isQuoteOnly && (
                          <span className="text-[10px] text-stone-400">
                            (Bs. {item.product.priceBs} c/u)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Stepper & Delete */}
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        aria-label="Eliminar producto"
                        className="text-stone-400 hover:text-red-600 p-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center bg-white border border-stone-200 rounded-lg shadow-2xs">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          aria-label="Disminuir cantidad"
                          className="p-1 hover:bg-stone-100 rounded-l-lg text-stone-600 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-stone-800 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          aria-label="Aumentar cantidad"
                          className="p-1 hover:bg-stone-100 rounded-r-lg text-stone-600 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Form for WhatsApp Purchase Order */}
              <form onSubmit={handleSendWhatsApp} className="pt-2 border-t border-stone-200 space-y-4">
                <div className="bg-stone-100/70 p-3.5 rounded-xl border border-stone-200">
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C8102E]" />
                    Datos para Facturación, Envío y Confirmación de Pedido
                  </h4>
                  <p className="text-[11px] text-stone-500 mb-3">
                    Ingresa tus datos para procesar tu pedido de compra directamente por nuestro WhatsApp oficial (+591 72876260).
                  </p>

                  <div className="space-y-3.5">
                    {/* Nombre */}
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-stone-800 mb-1 flex items-center gap-1.5">
                        <User className="w-4 h-4 text-stone-400" />
                        Tu Nombre o Empresa:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej: Ing. Carlos Méndez / Arq. Laura Rocha"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full text-sm p-3 rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E]"
                      />
                    </div>

                    {/* Teléfono */}
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-stone-800 mb-1 flex items-center gap-1.5">
                        <Phone className="w-4 h-4 text-stone-400" />
                        Teléfono / Celular de Contacto:
                      </label>
                      <input
                        type="tel"
                        placeholder="Ej: 72800000 / 63700000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full text-sm p-3 rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E]"
                      />
                    </div>

                    {/* Ciudad de Envío en Bolivia */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        Ciudad de Envío (Bolivia):
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white focus:outline-none focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E]"
                      >
                        {BOLIVIAN_CITIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Tipo de Proyecto */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-stone-400" />
                        Tipo de Proyecto:
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            projectType: e.target.value as QuoteForm['projectType'],
                          })
                        }
                        className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white focus:outline-none focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E]"
                      >
                        <option value="Hogar Particular">Hogar Particular / Remodelación de Baño</option>
                        <option value="Obra / Construcción">Obra en Construcción / Edificio</option>
                        <option value="Arquitectura / Diseño Interior">Estudio de Arquitectura / Diseño Interior</option>
                        <option value="Comercio / Hotel">Hotel / Restaurante / Comercio</option>
                      </select>
                    </div>

                    {/* Notas adicionales */}
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Medidas personalizadas, grifería o comentarios:
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Ej: Requiero perforación para grifería monomando alta y envío a obra antes del viernes..."
                        value={formData.customNotes}
                        onChange={(e) => setFormData({ ...formData, customNotes: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white focus:outline-none focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E]"
                      />
                    </div>
                  </div>
                </div>

                {/* Subtotal summary */}
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <div className="flex items-center justify-between text-xs text-stone-600 mb-1">
                    <span>Productos seleccionados:</span>
                    <span className="font-semibold text-stone-900">{totalItemsCount} unid.</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-stone-600 mb-2">
                    <span>Embalaje en caja de madera reforzada:</span>
                    <span className="font-semibold text-emerald-700">Incluido de fábrica</span>
                  </div>
                  <div className="pt-2 border-t border-stone-200 flex items-baseline justify-between">
                    <div>
                      <span className="text-xs font-bold text-stone-900 block">Total del Pedido (Fábrica Sucre):</span>
                      <span className="text-[10px] text-stone-500">
                        {formData.city.includes('Sucre') ? 'Entrega en Sucre' : 'Despacho y flete coordinados por WhatsApp'}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xl sm:text-2xl font-black text-[#C8102E] tabular-nums">
                        Bs. {estimatedTotalBs.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Realizar Pedido de Compra por WhatsApp (+591 72876260)</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyMessage}
                      className="flex-1 py-2 px-3 rounded-lg border border-stone-300 hover:bg-stone-50 text-stone-700 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">¡Mensaje Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-stone-500" />
                          <span>Copiar Texto del Pedido</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={onClose}
                      className="py-2 px-4 rounded-lg text-stone-500 hover:text-stone-800 text-xs font-medium hover:bg-stone-100 transition-colors"
                    >
                      Seguir explorando
                    </button>
                  </div>
                </div>

              </form>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
