import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface FloatingCartBarProps {
  totalCount: number;
  totalBs: number;
  onOpenCart: () => void;
}

export const FloatingCartBar: React.FC<FloatingCartBarProps> = ({
  totalCount,
  totalBs,
  onOpenCart,
}) => {
  if (totalCount === 0) return null;

  return (
    <div className="fixed bottom-3 sm:bottom-5 inset-x-3 sm:inset-x-0 z-40 flex justify-center pointer-events-none animate-bounceIn">
      <button
        onClick={onOpenCart}
        aria-label="Ver cotización de lavamanos y consultar por WhatsApp"
        className="pointer-events-auto w-full max-w-lg bg-[#C8102E] hover:bg-[#a50d26] active:scale-98 text-white px-4 sm:px-6 py-3.5 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-red-950/40 transition-all flex items-center justify-between gap-3 border border-red-500/30 cursor-pointer"
      >
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 bg-white text-[#C8102E] rounded-xl font-black text-sm flex items-center justify-center shadow-xs">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div className="text-left">
            <span className="block font-black text-sm sm:text-base leading-tight tracking-tight">
              Ver Mi Selección ({totalCount} {totalCount === 1 ? 'modelo' : 'modelos'})
            </span>
            <span className="block text-xs text-red-100 font-semibold leading-none mt-1">
              Consultar por WhatsApp Directo
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {totalBs > 0 && (
            <span className="hidden xs:inline-block font-black text-base bg-black/25 px-3 py-1.5 rounded-xl tabular-nums">
              Bs. {totalBs.toLocaleString()}
            </span>
          )}
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
        </div>
      </button>
    </div>
  );
};
