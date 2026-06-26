import React, { useState } from 'react';
import { services } from '../data';
import { Shirt, Printer, Package, Trophy, Award, CheckCircle2, Truck, ShieldCheck, Tag, HelpCircle, ArrowRight, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';

export default function Services() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'sponsorship'>('calculator');
  
  // Bulk Calculator states
  const [productType, setProductType] = useState('jersey');
  const [amount, setAmount] = useState(50);
  
  // Sponsorship Form states
  const [athleteName, setAthleteName] = useState('');
  const [athleteSport, setAthleteSport] = useState('');
  const [athleteInsta, setAthleteInsta] = useState('');
  const [athleteStory, setAthleteStory] = useState('');
  const [sponsorshipSubmitted, setSponsorshipSubmitted] = useState(false);

  // Mapping string labels of standard service icons to React components
  const iconMap: Record<string, React.ReactNode> = {
    Shirt: <Shirt className="w-6 h-6 text-brand-primary" />,
    Printer: <Printer className="w-6 h-6 text-brand-primary" />,
    Package: <Package className="w-6 h-6 text-brand-primary" />,
    Trophy: <Trophy className="w-6 h-6 text-brand-primary" />,
    Award: <Award className="w-6 h-6 text-brand-primary" />
  };

  const benefits = [
    { title: 'Fast Delivery', desc: 'Secure direct-line dispatch channels delivering bulk products in 7–10 working days.', icon: <Truck className="w-5 h-5 text-brand-primary" /> },
    { title: 'Premium Materials', desc: 'Sourced from the finest breathable microfibers, comfortable sweat-wick knit meshes.', icon: <ShieldCheck className="w-5 h-5 text-emerald-600" /> },
    { title: 'Competitive Pricing', desc: 'Tiered wholesale quotes saving up to 40% on corporate sizes.', icon: <Tag className="w-5 h-5 text-blue-600" /> },
    { title: 'Professional Support', desc: 'Enjoy personalized mockups and 24/7 communications on WhatsApp and email.', icon: <UserCheck className="w-5 h-5 text-indigo-600" /> },
    { title: 'Nationwide Service', desc: 'Delivering safely to over 19,000 pincodes across India.', icon: <CheckCircle2 className="w-5 h-5 text-amber-600" /> }
  ];

  // Price points
  const basePrices: Record<string, number> = {
    jersey: 1999,
    hoodie: 2499,
    backpack: 1499,
    gloves: 899
  };

  const labels: Record<string, string> = {
    jersey: 'Elite Team Jersey',
    hoodie: 'Performance Hoodie',
    backpack: 'Sports Backpack',
    gloves: 'Weightlifting Gloves'
  };

  // Tiered discount scale
  const getDiscountPercent = (qty: number) => {
    if (qty >= 250) return 40;
    if (qty >= 100) return 30;
    if (qty >= 50) return 20;
    if (qty >= 20) return 10;
    return 0;
  };

  const discountVal = getDiscountPercent(amount);
  const basePricePerItem = basePrices[productType];
  const originalTotal = basePricePerItem * amount;
  const finalPricePerItem = basePricePerItem * (1 - discountVal / 100);
  const discountedTotal = finalPricePerItem * amount;

  const handleSponsorshipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!athleteName || !athleteSport || !athleteStory) return;
    setSponsorshipSubmitted(true);
    setTimeout(() => {
      setAthleteName('');
      setAthleteSport('');
      setAthleteInsta('');
      setAthleteStory('');
      setSponsorshipSubmitted(false);
    }, 4000);
  };

  return (
    <div className="space-y-20 pb-16">
      <Helmet>
        <title>Services - FanFuel Sports</title>
        <meta name="description" content="Discover FanFuel's direct services, including bulk orders, custom team prints, and athlete sponsorships." />
        <link rel="canonical" href="https://fanfuel7.netlify.app/services" />
      </Helmet>
      
      {/* HEADER HERO */}
      <section className="bg-brand-dark text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25" />
        <div className="absolute top-10 right-20 w-[400px] h-[400px] bg-brand-primary/10 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto text-center px-4 relative z-10 space-y-4">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest block">
            Expert Partnerships & Production
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight">
            FanFuel Services - Bulk Orders & Sponsorships
          </h1>
          <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full my-4" />
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans font-medium">
            We deliver end-to-end bespoke customization, corporate supplies, high-volume shipping corridors, and athlete collaborations engineered for ultimate comfort and brand representation.
          </p>
        </div>
      </section>

      {/* CORE SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="sr-only">Our Core Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, index) => (
            <div
              key={srv.title}
              className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 hover:shadow-lg transition-all flex flex-col justify-between text-left h-full"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-6 shrink-0">
                  {iconMap[srv.iconName] || <Shirt className="w-6 h-6 text-brand-primary" />}
                </div>
                
                <h3 className="font-display font-black text-slate-900 text-lg uppercase tracking-tight leading-none mb-2">
                  {srv.title}
                </h3>
                
                <p className="text-sm text-slate-600 leading-relaxed font-sans">
                  {srv.description}
                </p>
              </div>

              {srv.benefits && (
                <div className="mt-6 pt-5 border-t border-slate-50 space-y-2">
                  <h4 className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-2">Service Perks</h4>
                  {srv.benefits.map((b, bi) => (
                    <div key={bi} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CORE BENEFITS */}
      <section className="bg-slate-50 border-y border-slate-100 py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">
              High Standard Performance
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-950 uppercase tracking-tight">
              Benefits of Choosing FanFuel
            </h2>
            <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="bg-white p-6 rounded-xl border border-slate-100 shadow-xs text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center mb-4 border border-slate-100">
                  {b.icon}
                </div>
                <h3 className="font-display font-bold text-slate-900 text-sm sm:text-base mb-1.5 leading-snug">
                  {b.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE HUB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hub switches */}
        <div className="flex border-b border-slate-100 max-w-md mx-auto mb-10 text-sm font-bold font-display uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`w-1/2 py-4 border-b-2 text-center transition-colors cursor-pointer ${
              activeTab === 'calculator'
                ? 'border-brand-primary text-brand-primary'
                : 'border-transparent text-slate-400 hover:text-slate-800'
            }`}
          >
            📊 Bulk Estimator
          </button>
          <button
            onClick={() => setActiveTab('sponsorship')}
            className={`w-1/2 py-4 border-b-2 text-center transition-colors cursor-pointer ${
              activeTab === 'sponsorship'
                ? 'border-brand-primary text-brand-primary'
                : 'border-transparent text-slate-400 hover:text-slate-800'
            }`}
          >
            ⚡ Athlete Sponsor Form
          </button>
        </div>

        {/* Dynamic Display area */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-100 p-6 sm:p-10 shadow-sm">
          
          {/* TAB 1: BULK ESTIMATOR */}
          {activeTab === 'calculator' && (
            <div className="space-y-6 text-left">
              <h3 className="font-display font-black text-slate-900 uppercase tracking-tight text-xl mb-1 text-center sm:text-left">
                📦 Corporate & Bulk Orders Pricing Slider
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed text-center sm:text-left">
                Compute high-volume setups and check real wholesale percentage deductions. Slider triggers volume-based pricing discounts automatically up to 40%!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                
                {/* Product Selection drop */}
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase block mb-2">Item Type *</label>
                  <div className="space-y-2">
                    {Object.keys(basePrices).map((key) => (
                      <button
                        key={key}
                        onClick={() => setProductType(key)}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-xs font-bold font-display uppercase tracking-wide flex items-center justify-between transition-all ${
                          productType === key
                            ? 'bg-slate-900 border-slate-900 text-white'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-350'
                        }`}
                      >
                        <span>{labels[key]}</span>
                        <span className="opacity-75">₹{basePrices[key]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount Slider controls */}
                <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold text-slate-600 uppercase">Volume Needed *</span>
                      <span className="text-xl font-display font-black text-brand-primary bg-white px-3.5 py-1 rounded-xl border border-slate-200 shadow-xs">
                        {amount} items
                      </span>
                    </div>
                    
                    <input
                      type="range"
                      min="10"
                      max="500"
                      step="5"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full accent-brand-primary cursor-pointer mb-2"
                    />

                    <div className="flex justify-between text-[10px] font-bold text-slate-400 font-mono">
                      <span>Min: 10</span>
                      <span>Mid: 250</span>
                      <span>Max: 500+</span>
                    </div>
                  </div>

                  <div className="space-y-2 mt-5 pt-4 border-t border-slate-200/60 text-xs">
                    <div className="flex justify-between text-slate-600 font-bold">
                      <span>Price Per unit:</span>
                      <span className="line-through">₹{basePricePerItem}</span>
                    </div>
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Discount Earned:</span>
                      <span>-{discountVal}% OFF</span>
                    </div>
                    <div className="flex justify-between text-slate-900 font-bold text-sm">
                      <span>Rate After Discount:</span>
                      <span>₹{Math.floor(finalPricePerItem)}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Outputs Summary box */}
              <div className="bg-slate-900 text-white p-5 rounded-xl mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-display">
                <div className="text-center sm:text-left">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block">estimated bulk invoice total</span>
                  <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                    <span className="text-3xl font-black text-white">₹{Math.floor(discountedTotal).toLocaleString('en-IN')}</span>
                    <span className="text-xs text-slate-400 line-through">₹{originalTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold block mt-0.5">You save ₹{(originalTotal - discountedTotal).toLocaleString('en-IN')} immediately!</span>
                </div>
                
                <a
                  href={`mailto:hello@fanfuel.com?subject=Bulk Quote Order Inquiry for ${amount}x ${labels[productType]}`}
                  className="px-6 py-3.5 bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                >
                  Request Official Quote <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </div>
          )}

          {/* TAB 2: ATHLETE SPONSORSHIP APPLICATION */}
          {activeTab === 'sponsorship' && (
            <div className="space-y-6 text-left">
              <h3 className="font-display font-black text-slate-900 uppercase tracking-tight text-xl mb-1 text-center sm:text-left">
                ⚡ Emerging Athlete Sponsorship Form
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed text-center sm:text-left">
                Are you an emerging state/national athlete or young energetic esports competitor? Fill out your sports credentials below. Our sponsorship committee checks every dossier.
              </p>

              <AnimatePresence mode="wait">
                {sponsorshipSubmitted ? (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Award className="w-9 h-9 stroke-[2.3]" />
                    </div>
                    <h4 className="font-display font-black text-slate-900 text-lg uppercase tracking-tight">Application Transmitted!</h4>
                    <p className="text-xs text-slate-500 max-w-sm">
                      Your athletic story has been locked in. Neha Gupta and our marketing partnerships team will audit your dossier and Instagram tag profiles within 48 to 72 hours.
                    </p>
                    <span className="text-[10px] font-bold text-brand-primary tracking-widest uppercase animate-pulse">LOCK STATUS: AUDITING ACTIVE</span>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSponsorshipSubmit} className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Athlete/Team Name *</label>
                        <input
                          type="text"
                          required
                          value={athleteName}
                          onChange={(e) => setAthleteName(e.target.value)}
                          placeholder="e.g. Rahul Mehta"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus-ring text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Sport / Event category *</label>
                        <input
                          type="text"
                          required
                          value={athleteSport}
                          onChange={(e) => setAthleteSport(e.target.value)}
                          placeholder="e.g. Athletics / 100m Run"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus-ring text-slate-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Social Handle / Instagram Profile</label>
                      <input
                        type="text"
                        value={athleteInsta}
                        onChange={(e) => setAthleteInsta(e.target.value)}
                        placeholder="e.g. @rahul_mehta_sprints"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus-ring text-slate-900 font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Your Athletic Story & Career Achievements *</label>
                      <textarea
                        required
                        value={athleteStory}
                        onChange={(e) => setAthleteStory(e.target.value)}
                        placeholder="Tell us about your training regimen, dynamic milestones, state records and what FanFuel sponsorships means to you..."
                        rows={4}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus-ring text-slate-900"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl text-xs font-bold font-display uppercase tracking-widest shadow-lg shadow-brand-primary/10 hover:shadow-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Award className="w-4.5 h-4.5" /> Submit Dossier Application
                    </button>
                  </form>
                )}
              </AnimatePresence>

            </div>
          )}

        </div>

      </section>

    </div>
  );
}
