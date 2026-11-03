import React, { useState, useMemo } from 'react';
import { Search, Filter, RotateCcw, Sparkles, Layers, SlidersHorizontal, ArrowDown, ChevronRight, Check } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { InstalledProjectsGallery } from './components/InstalledProjectsGallery';
import { TrustStrip } from './components/TrustStrip';
import { QuoteDrawer } from './components/QuoteDrawer';
import { FloatingCartBar } from './components/FloatingCartBar';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { Footer } from './components/Footer';
import { CATEGORIES, PRODUCTS } from './data/catalogData';
import { CategoryId, Product, CartItem } from './types/catalog';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('rusticos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStoneType, setSelectedStoneType] = useState<string>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cart handlers
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        showToast(`Se aumentó la cantidad de "${product.name}" en tus pedidos`);
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      showToast(`¡"${product.name}" añadido a tus pedidos!`);
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Producto eliminado de tus pedidos');
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast('Lista de pedidos vaciada');
  };


  const scrollToCatalog = () => {
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (activeCategory && product.categoryId !== activeCategory) {
        return false;
      }

      // Stone type filter
      if (selectedStoneType !== 'all') {
        const stoneLower = product.stoneType.toLowerCase();
        if (selectedStoneType === 'travertino' && !stoneLower.includes('travertino')) return false;
        if (selectedStoneType === 'rio' && !stoneLower.includes('río') && !stoneLower.includes('rodado')) return false;
        if (selectedStoneType === 'granito' && !stoneLower.includes('granito')) return false;
        if (selectedStoneType === 'marmol' && !stoneLower.includes('mármol')) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCategory = product.categoryName.toLowerCase().includes(q);
        const matchesStone = product.stoneType.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesTech = product.cuttingTech.toLowerCase().includes(q);
        return matchesName || matchesCategory || matchesStone || matchesDesc || matchesTech;
      }

      return true;
    });
  }, [activeCategory, selectedStoneType, searchQuery]);

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalBs = cartItems.reduce(
    (acc, item) => acc + (item.product.isQuoteOnly ? 0 : item.product.priceBs * item.quantity),
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#1C1C1E]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-4 sm:right-6 z-50 bg-[#1C1C1E] text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl border border-stone-700 flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Encabezado Informativo y de Contacto */}
      <Header
        cartCount={totalItemsCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={(catId) => {
          if (catId) setActiveCategory(catId as CategoryId);
        }}
      />

      {/* 2. Banner Hero Principal con Logotipo Centrado */}
      <Hero onExploreCatalog={scrollToCatalog} />

      {/* 3. Catálogo General Directo (Ingreso directo sin menú previo) */}
      <section id="catalogo" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        
        {/* Title and Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#C8102E] mb-1.5">
              <Layers className="w-4 h-4" />
              <span>Catálogo línea de Lavamanos</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#1C1C1E] tracking-tight">
              Lavamanos Rústicos y Finos
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-1.5">
              Mostrando <span className="font-bold text-[#1C1C1E]">{filteredProducts.length}</span> de {PRODUCTS.length} piezas talladas con maquinaria CNC disponibles en Sucre
            </p>
          </div>

          {/* Search Input & Material Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[280px]">
              <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar modelo, piedra, acabado..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm pl-11 pr-4 py-3 rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E] shadow-2xs transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-sm font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Material Filter */}
            <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 rounded-xl overflow-x-auto text-xs sm:text-sm font-medium">
              <button
                onClick={() => setSelectedStoneType('all')}
                className={`px-3.5 py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  selectedStoneType === 'all'
                    ? 'bg-white text-stone-900 shadow-2xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Todas las Piedras
              </button>
              <button
                onClick={() => setSelectedStoneType('travertino')}
                className={`px-3.5 py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  selectedStoneType === 'travertino'
                    ? 'bg-white text-stone-900 shadow-2xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Travertino
              </button>
              <button
                onClick={() => setSelectedStoneType('rio')}
                className={`px-3.5 py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  selectedStoneType === 'rio'
                    ? 'bg-white text-stone-900 shadow-2xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Piedra de Río
              </button>
              <button
                onClick={() => setSelectedStoneType('marmol')}
                className={`px-3.5 py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  selectedStoneType === 'marmol'
                    ? 'bg-white text-stone-900 shadow-2xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Mármol
              </button>
              <button
                onClick={() => setSelectedStoneType('granito')}
                className={`px-3.5 py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  selectedStoneType === 'granito'
                    ? 'bg-white text-stone-900 shadow-2xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Granito
              </button>
            </div>
          </div>
        </div>

        {/* 4 Pestañas Principales Solicitadas */}
        <div className="mt-5 flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none text-xs sm:text-sm">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl transition-all whitespace-nowrap shrink-0 border cursor-pointer flex items-center gap-2 font-bold ${
                  isSelected
                    ? 'bg-[#C8102E] text-white border-[#C8102E] shadow-sm ring-2 ring-[#C8102E]/25'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400 hover:bg-stone-50'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-extrabold ${
                  isSelected ? 'bg-white/25 text-white' : 'bg-stone-100 text-stone-600'
                }`}>
                  {cat.itemCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Filters Summary if filtered */}
        {(activeCategory || selectedStoneType !== 'all' || searchQuery) && (
          <div className="mt-4 flex items-center justify-between bg-stone-100 p-2.5 rounded-xl text-xs text-stone-600">
            <div className="flex items-center gap-2 truncate">
              <span className="font-semibold text-stone-800">Filtros activos:</span>
              {activeCategory && (
                <span className="bg-white px-2 py-0.5 rounded border border-stone-200">
                  {CATEGORIES.find((c) => c.id === activeCategory)?.name}
                </span>
              )}
              {selectedStoneType !== 'all' && (
                <span className="bg-white px-2 py-0.5 rounded border border-stone-200 capitalize">
                  Piedra: {selectedStoneType}
                </span>
              )}
              {searchQuery && (
                <span className="bg-white px-2 py-0.5 rounded border border-stone-200">
                  "{searchQuery}"
                </span>
              )}
            </div>

            <button
              onClick={() => {
                setActiveCategory('rusticos');
                setSelectedStoneType('all');
                setSearchQuery('');
              }}
              className="flex items-center gap-1 text-[#C8102E] hover:underline font-semibold shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpiar filtros</span>
            </button>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-stone-200 flex items-center justify-center text-stone-400 mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-stone-800">
              No se encontraron modelos con los filtros seleccionados
            </h3>
            <p className="text-sm text-stone-500 max-w-sm mt-1 mb-6">
              Prueba cambiando el tipo de piedra o limpiando el texto de búsqueda.
            </p>
            <button
              onClick={() => {
                setActiveCategory('rusticos');
                setSelectedStoneType('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-xl bg-[#C8102E] text-white font-semibold text-sm hover:bg-[#a50d26]"
            >
              Ver Lavamanos Rústicos
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const isInCart = cartItems.some((item) => item.product.id === product.id);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  isInCart={isInCart}
                  onAddToCart={handleAddToCart}
                  onViewDetails={(p) => setSelectedProductForDetail(p)}
                />
              );
            })}
          </div>
        )}

      </section>

      {/* 5. Galería de Proyectos Instalados en Casas Reales con Zoom Interactivo (Carrusel) */}
      <InstalledProjectsGallery
        onSelectProductToView={(product) => setSelectedProductForDetail(product)}
        onAddToCart={handleAddToCart}
      />

      {/* 6. Tira de Confianza (Ubicada después del carrusel de productos / proyectos) */}
      <TrustStrip />

      {/* 7. Sección de Tecnología CNC, Artesanía y Envíos Nacionales */}
      <CraftsmanshipSection />

      {/* 6. Footer con Contacto, Dirección Sucre y WhatsApp */}
      <Footer />

      {/* 7. Modal de Ficha Técnica Detallada */}
      <ProductDetailModal
        product={selectedProductForDetail}
        isInCart={
          selectedProductForDetail
            ? cartItems.some((i) => i.product.id === selectedProductForDetail.id)
            : false
        }
        onClose={() => setSelectedProductForDetail(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 8. Drawer de Mis Pedidos de Compra y Generador WhatsApp */}
      <QuoteDrawer
        isOpen={isCartOpen}
        cartItems={cartItems}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenCatalog={() => {
          const el = document.getElementById('catalogo');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 9. Barra Flotante Inferior en Rojo Rubí (#C8102E) */}
      <FloatingCartBar
        totalCount={totalItemsCount}
        totalBs={totalBs}
        onOpenCart={() => setIsCartOpen(true)}
      />

    </div>
  );
}
