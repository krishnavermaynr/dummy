import React from 'react';
import { Helmet } from 'react-helmet-async';
import { products, reviews, statistics, whyChooseBenefits } from '../data';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Trophy, Star, ShieldCheck, Zap, Truck, Tag, Users } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeProps {
  onNavigate: (tabId: string, categoryFilter?: string) => void;
  onAddToCart: (product: Product, quantity: number, size?: string) => void;
  onQuickView: (product: Product) => void;
}

export default function Home({ onNavigate, onAddToCart, onQuickView }: HomeProps) {
  // Extract the popular products requested on home page
  const featuredProductNames = ['FanFuel Elite Jersey', 'Velocity Running Shoes', 'Pro Training Kit', 'Sports Backpack'];
  const featuredProductsList = products.filter(p => featuredProductNames.includes(p.name));

  const categories = [
    { name: 'Sports Jerseys', filterName: 'Sports Apparel', icon: <Trophy className="w-6 h-6" />, count: '140+ Items', bg: 'bg-brand-primary/10 text-brand-primary border-brand-primary/20' },
    { name: 'Training Apparel', filterName: 'Sports Apparel', icon: <Zap className="w-6 h-6" />, count: '210+ Items', bg: 'bg-amber-100/60 text-amber-700 border-amber-200/55' },
    { name: 'Running G', filterName: 'Footwear', icon: <Zap className="w-6 h-6" />, count: '80+ Items', bg: 'bg-cyan-100/60 text-cyan-700 border-cyan-200/55' },
    { name: 'Fan Merchandise', filterName: 'Sports Apparel', icon: <Trophy className="w-6 h-6" />, count: '90+ Items', bg: 'bg-indigo-100/60 text-indigo-700 border-indigo-200/55' },
    { name: 'Sports Accessories', filterName: 'Accessories', icon: <ShieldCheck className="w-6 h-6" />, count: '120+ Items', bg: 'bg-emerald-100/60 text-emerald-700 border-emerald-200/55' },
    { name: 'Home Gym Equipment', filterName: 'Equipment', icon: <Zap className="w-6 h-6" />, count: '30+ Items', bg: 'bg-rose-100/60 text-rose-700 border-rose-200/55' }
  ];

  // Helper mapping whyChoose icon names to actual React icons
  const iconMap: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-brand-primary" />,
    Zap: <Zap className="w-6 h-6 text-brand-primary" />,
    Truck: <Truck className="w-6 h-6 text-brand-primary" />,
    Tag: <Tag className="w-6 h-6 text-brand-primary" />,
    Users: <Users className="w-6 h-6 text-brand-primary" />
  };

  return (
    <div className="space-y-20 pb-16">
      <Helmet>
        <title>FanFuel | Premium Sports Apparel & Performance Gear</title>
        <meta name="description" content="FanFuel — your ultimate sports brand for high-performance gear, fan apparel & accessories. Fuel your passion. Shop now and power every game day." />
        <link rel="canonical" href="https://fanfuel7.netlify.app/" />
      </Helmet>
      
      {/* 1. HERO SECTION */}
      <section itemScope itemType="https://schema.org/SportsStore" className="relative bg-brand-dark overflow-hidden min-h-[500px] sm:min-h-[620px] flex items-center">
        {/* Background Grid Lines & Blur circles */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />
        <div className="absolute top-20 right-10 w-80 h-80 bg-brand-primary/20 rounded-full blur-[100px] z-0" />
        <div className="absolute bottom-10 left-10 w-60 h-60 bg-brand-primary/10 rounded-full blur-[100px] z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-brand-primary/10 border border-brand-primary/30 rounded-full px-3 py-1"
            >
              <Trophy className="w-4 h-4 text-brand-primary" />
              <span className="text-white text-xs font-bold font-display uppercase tracking-widest">
                Official Sportswear Hub
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase leading-[0.95] sm:leading-[0.95]"
              itemProp="headline"
            >
              FanFuel | Premium Sports Apparel<br />
              <span className="text-brand-primary">& Performance Gear</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-brand-primary text-xl sm:text-2xl font-display font-bold uppercase tracking-widest mt-2"
            >
              Your Ultimate Sports Brand
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl"
            >
              Premium sports apparel, fan merchandise, training gear, and performance accessories designed for those who live the game. Shop our performance gear today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                onClick={() => onNavigate('products')}
                className="px-8 py-4 bg-brand-primary hover:bg-brand-primary-hover text-white font-display font-black uppercase tracking-widest rounded-xl shadow-lg shadow-brand-primary/30 hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-2"
              >
                Shop Now
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
              <button
                onClick={() => onNavigate('products')}
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-display font-black uppercase tracking-widest rounded-xl transition-all border border-slate-700 cursor-pointer"
              >
                Explore Products
              </button>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative hidden lg:block">
            {/* Dynamic visual badge using beautiful styling inside the hero */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-2xl border border-slate-800 bg-slate-900/45 p-6 backdrop-blur-md shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80&fm=webp"
                alt="Velocity Running Sneaker Hero preview"
                fetchPriority="high"
                className="rounded-xl object-contain drop-shadow-[0_20px_40px_rgba(255,74,28,0.35)] w-full h-80 -rotate-12 hover:rotate-0 transition-transform duration-500"
              />
              <div className="absolute bottom-4 right-4 bg-slate-950/80 p-3.5 rounded-xl border border-white/10 text-right">
                <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase block">LAUNCH PRICING</span>
                <span className="font-display font-black text-lg text-white">Velocity Sneakers</span>
                <span className="font-display text-brand-primary px-2 font-extrabold block">₹4,499</span>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 2. FEATURED CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">
            Gear Up by Theme
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-950 uppercase tracking-tight">
            Featured Categories
          </h2>
          <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -4, scale: 1.02 }}
              onClick={() => onNavigate('products', cat.filterName)}
              className={`p-6 rounded-2xl border flex flex-col items-center text-center justify-center cursor-pointer transition-all ${cat.bg}`}
            >
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-xs text-slate-800 mb-4 font-bold border border-slate-100">
                {cat.icon}
              </div>
              <h3 className="font-display font-extrabold text-slate-900 text-sm sm:text-base leading-tight mb-1">
                {cat.name}
              </h3>
              <span className="text-xs font-bold text-slate-500">
                {cat.count}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. WHY CHOOSE FANFUEL? */}
      <section className="bg-slate-50 border-y border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">
              Engineered For Excellence
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-950 uppercase tracking-tight">
              Why Choose FanFuel?
            </h2>
            <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {whyChooseBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex flex-col text-left"
              >
                <div className="w-11 h-11 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4 shrink-0">
                  {iconMap[benefit.iconName] || <ShieldCheck className="w-5 h-5 text-brand-primary" />}
                </div>
                <h3 className="font-display font-bold text-slate-900 text-sm sm:text-base mb-1.5 leading-snug">
                  {benefit.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          <div className="text-left space-y-2">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">
              Fan Favorites
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-950 uppercase tracking-tight">
              Featured Products
            </h2>
          </div>
          <button
            onClick={() => onNavigate('products')}
            className="px-6 py-3 bg-slate-900 hover:bg-brand-primary text-white text-xs font-bold font-display uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center gap-2"
          >
            Check All Products
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProductsList.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </section>

      {/* 5. CUSTOMER REVIEWS */}
      <section className="bg-brand-dark text-white rounded-3xl py-16 px-6 sm:px-12 mx-4 max-w-7xl lg:mx-auto relative overflow-hidden">
        {/* Background light visual pattern */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="text-center space-y-3 mb-12 relative z-10">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">
            Athlete Testimonials
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
            Customer Reviews
          </h2>
          <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-between"
            >
              <div>
                {/* 5-star indicator */}
                <div className="flex gap-1 mb-4 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed mb-6">
                  "{rev.content}"
                </p>
              </div>
              <div className="pt-4 border-t border-slate-800">
                <h3 className="font-display font-extrabold text-sm text-white">{rev.author}</h3>
                <p className="text-[11px] font-mono text-slate-500 font-semibold">{rev.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. STATISTICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 sm:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, i) => (
              <div key={i} className="text-center space-y-1 border-r border-slate-100 last:border-0 grow">
                <span className="font-display font-black text-3xl sm:text-5xl text-brand-primary block tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
