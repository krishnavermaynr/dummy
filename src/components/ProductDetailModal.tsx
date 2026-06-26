import { useState, useEffect } from 'react';
import { Product } from '../types';
import { X, Star, ShoppingCart, ShieldCheck, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, size?: string) => void;
}

export default function ProductDetailModal({ product, isOpen, onClose, onAddToCart }: ProductDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset states when a new product is loaded
  useEffect(() => {
    if (product) {
      setSelectedSize('M');
      setQuantity(1);
      setAdded(false);
      setActiveImageIndex(0);
    }
  }, [product]);

  if (!product) return null;

  const hasSizes = product.category === 'Sports Apparel';
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const displayImages = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleAdd = () => {
    onAddToCart(product, quantity, hasSizes ? selectedSize : undefined);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop mask */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 cursor-pointer"
          />

          {/* Dialog Panel */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            className="fixed z-50 bg-white rounded-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl cursor-default"
          >
            {/* Header / Dismiss */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-2 bg-white/80 hover:bg-slate-200 text-slate-700 rounded-full transition-colors cursor-pointer shadow-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content split grid */}
            <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2">
              
              {/* Product Image */}
              <div className="bg-slate-100 flex flex-col items-center p-4 gap-4 h-full">
                <div className="w-full aspect-square relative overflow-hidden rounded-xl bg-white shadow-sm flex-shrink-0">
                  <img
                    src={displayImages[activeImageIndex]}
                    alt={product.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                </div>
                {/* Thumbnails */}
                {displayImages.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2 w-full snap-x">
                    {displayImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 snap-center transition-all ${
                          idx === activeImageIndex ? 'border-brand-primary opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt={`${product.name} view ${idx + 1}`} loading="lazy" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info Description */}
              <div className="p-6 sm:p-8 flex flex-col justify-between text-left">
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-full">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full text-amber-700">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold font-mono">{product.rating}</span>
                    </div>
                  </div>

                  <h2 className="font-display font-black text-xl sm:text-2xl text-slate-950 uppercase tracking-tight leading-none">
                    {product.name}
                  </h2>

                  <p className="font-display font-black text-2xl text-slate-900">
                    ₹{product.price.toLocaleString('en-IN')}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    {product.desc}
                  </p>

                  {/* Highlights Bullet features */}
                  {product.features && product.features.length > 0 && (
                    <div className="pt-2 space-y-2">
                      <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Key highlights</h3>
                      <div className="grid grid-cols-1 gap-1.5">
                        {product.features.map((feat) => (
                          <div key={feat} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                            <ShieldCheck className="w-4 h-4 text-brand-primary" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Apparel Sizes selection */}
                  {hasSizes && (
                    <div className="pt-3 space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-400 uppercase tracking-wider">Select Size</span>
                        <span className="text-[11px] font-bold text-brand-primary font-mono lowercase">Fit: Athletic Comfort</span>
                      </div>
                      <div className="flex gap-2">
                        {sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`w-9 h-9 text-xs font-bold font-display rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                              selectedSize === size
                                ? 'bg-brand-primary border-brand-primary text-white shadow-md'
                                : 'border-slate-200 text-slate-700 hover:border-slate-400 bg-white'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

                {/* Adding checkout actions row */}
                <div className="pt-6 border-t border-slate-100 mt-6 space-y-4">
                  
                  {/* Quantity selector & Add CTA */}
                  <div className="flex gap-4">
                    
                    <div className="flex items-center justify-between border border-slate-250 rounded-xl p-1 bg-slate-50">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        aria-label="Decrease Quantity"
                        className="w-8 h-8 flex items-center justify-center font-bold text-slate-500 hover:text-slate-900"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-slate-800 font-mono">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        aria-label="Increase Quantity"
                        className="w-8 h-8 flex items-center justify-center font-bold text-slate-500 hover:text-slate-900"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={handleAdd}
                      disabled={added}
                      className={`flex-1 py-3.5 rounded-xl text-xs font-bold font-display uppercase tracking-widest text-white shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        added
                          ? 'bg-emerald-500 shadow-emerald-100'
                          : 'bg-slate-950 hover:bg-brand-primary shadow-slate-950/20'
                      }`}
                    >
                      {added ? (
                        <>
                          <Check className="w-4.5 h-4.5" /> Added to Cart!
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4.5 h-4.5" /> Add to Cart — ₹{(product.price * quantity).toLocaleString('en-IN')}
                        </>
                      )}
                    </button>

                  </div>

                </div>

              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
