import React, { useState, useEffect } from 'react';
import { products } from '../data';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, Shirt, Palette, Check, RefreshCw, ShoppingCart, HelpCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';

interface ProductsProps {
  onAddToCart: (product: Product, quantity: number, size?: string, customization?: { name: string; number: string }) => void;
  onQuickView: (product: Product) => void;
  presetCategory?: string;
}

export default function Products({ onAddToCart, onQuickView, presetCategory }: ProductsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [isJerseyStudioOpen, setIsJerseyStudioOpen] = useState(false);

  // Custom Jersey State Variables
  const [customName, setCustomName] = useState('FANFUEL');
  const [customNumber, setCustomNumber] = useState('10');
  const [jerseyColor, setJerseyColor] = useState('#ff4a1c'); // primary brand
  const [jerseySize, setJerseySize] = useState('M');
  const [jerseyAdded, setJerseyAdded] = useState(false);

  // Synchronize category if passed from Home Page links
  useEffect(() => {
    if (presetCategory) {
      setSelectedCategory(presetCategory);
    }
  }, [presetCategory]);

  const categories = ['All', 'Sports Apparel', 'Equipment', 'Outdoor Games', 'Footwear', 'Accessories'];

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('popular');
  };

  // Filter & Search product arrays
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort calculations
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.popular === a.popular ? 0 : b.popular ? 1 : -1;
  });

  // Custom Jersey template product schema
  const customJerseyProduct: Product = {
    id: 'p1-customized',
    name: 'Custom Team Jersey (Design Studio)',
    price: 1999,
    category: 'Sports Apparel',
    image: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=800&q=80&fm=webp',
    rating: 5.0,
    desc: 'Custom-sublimated soccer/running team jersey with customized name plates and numbering.',
  };

  const handleAddCustomJersey = () => {
    onAddToCart(
      customJerseyProduct,
      1,
      jerseySize,
      { name: customName.trim().toUpperCase(), number: customNumber.trim() || '00' }
    );
    setJerseyAdded(true);
    setTimeout(() => {
      setJerseyAdded(false);
      setIsJerseyStudioOpen(false);
    }, 1200);
  };

  const colors = [
    { name: 'Red Orange', hex: '#ff4a1c' },
    { name: 'Squad Blue', hex: '#1d4ed8' },
    { name: 'Midnight Charcoal', hex: '#1e293b' },
    { name: 'Electric Lime', hex: '#84cc16' },
    { name: 'Cyber Purple', hex: '#7c3aed' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-12">
      <Helmet>
        <title>Products - FanFuel Sports</title>
        <meta name="description" content="Explore FanFuel's catalog of elite sports gear, merchandise, and customize your own team jersey." />
        <link rel="canonical" href="https://fanfuel7.netlify.app/products" />
      </Helmet>
      
      {/* 1. SECTION TITLE & DYNAMIC STUDIO TRIGGER BANNER */}
      <div className="text-center space-y-3 mt-10">
        <span className="text-xs font-bold text-brand-primary uppercase tracking-widest block">
          Elite Gear Catalog
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-slate-950 uppercase tracking-tight">
          FanFuel Sports Gear & Merchandise
        </h1>
        <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full" />
      </div>

      {/* Promotes customized jersey builder tool */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-brand-dark rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="text-left space-y-2 relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-brand-primary/20 text-brand-primary font-display font-semibold text-xs px-3 py-1 rounded-full border border-brand-primary/30 uppercase tracking-wider">
            <Shirt className="w-3.5 h-3.5" /> Sublimation printing studio
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight">
            Design Personalized Team Jerseys
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Have a school club, local league, corporate athletic run, or professional crew? Configure custom team names, individual numbers, and select active squad colors live inside our Interactive Studio!
          </p>
        </div>
        <button
          onClick={() => setIsJerseyStudioOpen(true)}
          className="px-6 py-3.5 bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold font-display uppercase tracking-widest rounded-xl shadow-lg shadow-brand-primary/20 hover:scale-102 transition-all shrink-0 cursor-pointer relative z-10"
        >
          Open Custom Studio
        </button>
      </motion.div>

      {/* 2. DYNAMIC FILTERS TOOLBAR */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex flex-col lg:flex-row gap-5 items-center justify-between">
        {/* Search */}
        <div className="relative w-full lg:max-w-xs shrink-0 bg-white">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-600" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus-ring bg-white text-slate-900"
          />
        </div>

        {/* Categories togglers */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 w-full">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-display uppercase tracking-wider transition-all border shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-brand-dark border-brand-dark text-white shadow-xs'
                    : 'bg-slate-50 border-slate-100 text-slate-600 hover:text-slate-900 hover:border-slate-350 bg-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Sort option drop selectors */}
        <div className="flex items-center gap-2 w-full lg:max-w-xs justify-end bg-white">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-slate-200 text-slate-700 rounded-xl px-3 py-2 text-xs font-display font-semibold focus-ring bg-white"
          >
            <option value="popular">Sort: Popular & Starred</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Sort: Higest Rated</option>
          </select>
        </div>
      </div>

      {/* 3. PRODUCTS GRID LIST */}
      <div className="min-h-[400px]">
        <h2 className="sr-only">Product List</h2>
        {sortedProducts.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 border border-slate-100 rounded-2xl p-8">
            <SlidersHorizontal className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h2 className="font-display font-bold text-slate-800 text-lg mb-1">No products match filters</h2>
            <p className="text-sm text-slate-400 max-w-sm mx-auto mb-6">
              We couldn't locate any active items matching "{searchQuery}" or chosen category constraints.
            </p>
            <button
              onClick={handleClearFilters}
              className="py-2.5 px-6 bg-brand-dark hover:bg-brand-primary text-white rounded-xl text-xs font-bold font-display uppercase tracking-widest transition-all cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={(prod, qty, size) => onAddToCart(prod, qty, size)}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}
      </div>

      {/* IMMERSIVE JERSEY CUSTOMIZER STUDIO MODAL */}
      <AnimatePresence>
        {isJerseyStudioOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsJerseyStudioOpen(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 cursor-pointer"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="fixed z-50 bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl mt-4 cursor-default"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-100 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shirt className="w-5.3 h-5.3 text-brand-primary" />
                  <div>
                    <h3 className="font-display font-black text-base uppercase tracking-tight">Interactive Sublimation Jersey Studio</h3>
                    <p className="text-[10px] text-slate-400">Design your personalized squad armor in real time</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsJerseyStudioOpen(false)}
                  aria-label="Close Studio"
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Grid content split */}
              <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-8 bg-slate-50">
                
                {/* Visualizer output on the left */}
                <div className="md:col-span-6 flex flex-col items-center justify-center">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 mb-4 block uppercase bg-white py-1 px-3 rounded-full border border-slate-150">
                    SQUAD WEAR LIVE RENDER
                  </span>
                  
                  {/* Custom Styled Responsive Vector SVG Jersey Graphic */}
                  <div className="w-64 h-80 relative select-none drop-shadow-2xl">
                    <svg
                      viewBox="0 0 200 240"
                      className="w-full h-full transition-all duration-300"
                    >
                      {/* Base Jersey path outline container */}
                      <path
                        d="M 25,48 L 50,22 L 72,32 L 80,24 L 100,32 L 120,24 L 128,32 L 150,22 L 175,48 L 160,78 L 148,70 L 148,220 L 52,220 L 52,70 L 40,78 Z"
                        fill={jerseyColor}
                        stroke="#0a0a0c"
                        strokeWidth="3.5"
                        strokeLinejoin="round"
                      />
                      {/* Shoulder and sleeve accent bands */}
                      <path d="M 50,22 L 40,78 M 150,22 L 160,78" stroke="#ffffff" strokeWidth="2.5" opacity="0.3" />
                      <path d="M 25,48 L 40,78" stroke="#000000" strokeWidth="3" opacity="0.2" />
                      
                      {/* Collar Neck Ribbing cut design */}
                      <path d="M 80,24 Q 100,50 120,24" fill="#121316" stroke="#000000" strokeWidth="2" />

                      {/* Sports Emblem / Brand logo on chest */}
                      <circle cx="70" cy="70" r="10" fill="#ffffff" opacity="0.15" />
                      <polygon points="68,66 74,70 68,74" fill="#ffffff" />
                      {/* Mini official badge */}
                      <rect x="120" y="65" width="12" height="10" rx="2" fill="#ffeb3b" opacity="0.8" />
                      
                      {/* Live CUSTOM NUMBERS plate */}
                      <text
                        x="100"
                        y="155"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontFamily="'Outfit', system-ui, sans-serif"
                        fontSize="68"
                        fontWeight="900"
                        letterSpacing="-1"
                        stroke="#121316"
                        strokeWidth="2.5"
                      >
                        {customNumber || '00'}
                      </text>

                      {/* Live CUSTOM SQUAD NAME plate on lower chest */}
                      <text
                        x="100"
                        y="200"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontFamily="'Inter', sans-serif"
                        fontSize="14"
                        fontWeight="850"
                        letterSpacing="2.5"
                        className="uppercase"
                        stroke="#121316"
                        strokeWidth="1"
                      >
                        {customName || 'SQUAD'}
                      </text>
                    </svg>

                    {/* Miniature Back-of-Jersey tag view preview */}
                    <div className="absolute top-2 right-2 p-1.5 bg-white rounded-lg shadow-sm text-center border text-[8px] font-mono leading-none font-bold">
                      <span className="block text-slate-400 font-bold mb-0.5">BACK ID</span>
                      <span className="font-extrabold text-slate-800 block truncate w-14">{customName || '_'}</span>
                      <span className="text-brand-primary text-[10px] font-black">{customNumber || '00'}</span>
                    </div>
                  </div>
                </div>

                {/* Configuration controls on the right */}
                <div className="md:col-span-6 bg-white rounded-xl border border-slate-150 p-5 space-y-5 text-left flex flex-col justify-between">
                  
                  {/* Custom parameters formulation */}
                  <div className="space-y-4">
                    <h3 className="font-display font-black text-slate-900 uppercase tracking-tight text-base pb-3 border-b border-slate-100 flex items-center justify-between">
                      📋 Jersey Parameters
                      <span className="text-emerald-500 text-xs font-bold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full lowercase">sublimation pricing: ₹1,999</span>
                    </h3>

                    <div>
                      <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Squad Name / Plate *</label>
                      <input
                        type="text"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value.slice(0, 12))}
                        maxLength={12}
                        placeholder="e.g. MEHTA"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus-ring text-slate-900"
                      />
                      <span className="text-[10px] text-slate-400 block mt-1">Capitalizes automatically. Maximum 12 characters.</span>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Squad Number *</label>
                      <input
                        type="number"
                        value={customNumber}
                        onChange={(e) => setCustomNumber(e.target.value.slice(0, 2))}
                        max={99}
                        placeholder="e.g. 7"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus-ring text-slate-900"
                      />
                      <span className="text-[10px] text-slate-400 block mt-1">Accepts double digit squad values (00-99).</span>
                    </div>

                    {/* Color Swatches */}
                    <div>
                      <label className="text-xs font-bold text-slate-600 uppercase block mb-1.5 flex items-center gap-1">
                        <Palette className="w-4 h-4 text-slate-400" /> Choose Squad Color *
                      </label>
                      <div className="flex gap-2.5">
                        {colors.map((color) => (
                          <button
                            key={color.hex}
                            onClick={() => setJerseyColor(color.hex)}
                            className="w-8 h-8 rounded-full border border-slate-350 flex items-center justify-center cursor-pointer transition-transform relative"
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          >
                            {jerseyColor === color.hex && (
                              <Check className="w-4.5 h-4.5 text-white drop-shadow-[0_1px_3px_black]" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sizes selection */}
                    <div>
                      <label className="text-xs font-bold text-slate-600 uppercase block mb-1.5">Select Jersey Size *</label>
                      <div className="flex gap-2">
                        {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                          <button
                            key={size}
                            onClick={() => setJerseySize(size)}
                            className={`px-5 py-2.5 text-xs font-bold font-display rounded-xl border flex items-center justify-center transition-all ${
                              jerseySize === size
                                ? 'bg-brand-primary border-brand-primary text-white shadow-md'
                                : 'border-slate-200 text-slate-700 hover:border-slate-400 bg-white'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Add action */}
                  <div className="pt-4 border-t border-slate-100">
                    <button
                      onClick={handleAddCustomJersey}
                      disabled={jerseyAdded}
                      className={`w-full py-4 rounded-xl font-display font-black uppercase tracking-widest text-white shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        jerseyAdded
                          ? 'bg-emerald-500 shadow-emerald-100'
                          : 'bg-slate-950 hover:bg-brand-primary shadow-slate-900/10'
                      }`}
                    >
                      {jerseyAdded ? (
                        <>
                          <Check className="w-5 h-5" /> Added Custom Order!
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5 animate-pulse" /> Add Customized Jersey to Cart (₹1,999)
                        </>
                      )}
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
