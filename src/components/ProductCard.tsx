import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingCart, Star, Eye, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number, size?: string) => void;
  onQuickView: (product: Product) => void;
  id?: string;
  key?: React.Key;
}

export default function ProductCard({ product, onAddToCart, onQuickView, id }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [added, setAdded] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Clothing size selection options
  const hasSizes = product.category === 'Sports Apparel';
  const sizes = ['S', 'M', 'L', 'XL'];
  const displayImages = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, 1, hasSizes ? selectedSize : undefined);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      id={id || `product-card-${product.id}`}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col h-full"
    >
      {/* Popular label tag */}
      {product.popular && (
        <span className="absolute top-4 left-4 z-10 bg-brand-primary text-white text-[11px] font-bold font-display uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
          Popular
        </span>
      )}

      {/* Product Image Container */}
      <div 
        className="relative aspect-4/3 bg-slate-50 overflow-hidden cursor-pointer" 
        onClick={() => onQuickView(product)}
        onMouseLeave={() => setActiveImgIndex(0)}
        onMouseMove={(e) => {
          if (displayImages.length > 1) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = x / rect.width;
            const index = Math.floor(percentage * displayImages.length);
            setActiveImgIndex(Math.max(0, Math.min(index, displayImages.length - 1)));
          }
        }}
      >
        <img
          src={displayImages[activeImgIndex]}
          alt={product.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Overlay Action Buttons on Hover */}
        <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-3 bg-white text-brand-dark rounded-full hover:bg-brand-primary hover:text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
            aria-label="Quick View Details"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={handleAdd}
            className="p-3 bg-white text-brand-dark rounded-full hover:bg-brand-primary hover:text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 shadow-lg"
            aria-label="Add to Cart"
          >
            {added ? <Check className="w-5 h-5 text-emerald-600" /> : <ShoppingCart className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* card info */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-slate-700">{product.rating}</span>
          </div>
        </div>

        <h3
          className="font-display font-bold text-slate-900 text-base mb-1.5 line-clamp-1 group-hover:text-brand-primary transition-colors cursor-pointer"
          onClick={() => onQuickView(product)}
        >
          {product.name}
        </h3>

        <p className="text-xs text-slate-500 line-clamp-2 mb-4 flex-grow">
          {product.desc}
        </p>

        {/* Dynamic Apparel Size Selection on Card */}
        {hasSizes && (
          <div className="mb-4">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Select Size</span>
            <div className="flex gap-1.5">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(size);
                  }}
                  className={`w-7 h-7 text-xs font-bold font-display rounded-md border flex items-center justify-center transition-all ${
                    selectedSize === size
                      ? 'bg-brand-primary border-brand-primary text-white shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:border-slate-400 bg-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer Area with Price + Button */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
          <span className="font-display font-extrabold text-slate-900 text-lg">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          
          <button
            onClick={handleAdd}
            className={`px-4 py-2 text-xs font-bold font-display uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 ${
              added
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-100'
                : 'bg-brand-dark hover:bg-brand-primary text-white hover:shadow-md hover:shadow-brand-primary/20'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
