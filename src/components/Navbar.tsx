import { useState } from 'react';
import { Menu, X, ShoppingCart, Activity, ShieldCheck, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NavLink, Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  cartCount: number;
  onCartOpen: () => void;
}

export default function Navbar({ cartCount, onCartOpen }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { id: '1', path: '/', label: 'Home' },
    { id: '2', path: '/about', label: 'About Us' },
    { id: '3', path: '/products', label: 'Products' },
    { id: '4', path: '/services', label: 'Services' },
    { id: '5', path: '/blog', label: 'Blog' },
    { id: '6', path: '/contact', label: 'Contact Us' }
  ];

  const handleTabClick = () => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Promo banner at the very top */}
      <div className="bg-brand-dark text-white text-[11px] font-sans font-medium tracking-wide py-1.5 px-4 text-center select-none flex items-center justify-center gap-2 border-b border-white/5">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping"></span>
        <span>FREE DELIVERY ON ORDERS OVER ₹1,999 • DISPATCHING WITHIN 24-48 HOURS • SECURE BILLING</span>
      </div>

      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link 
              to="/"
              className="flex items-center gap-2 cursor-pointer select-none group"
              onClick={handleTabClick}
            >
              <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-white font-display font-black tracking-tighter text-xl shadow-lg shadow-brand-primary/25 group-hover:scale-105 group-hover:rotate-3 transition-transform">
                <Activity className="w-6 h-6 stroke-[3]" />
              </div>
              <div>
                <span className="font-display font-black text-2xl tracking-tight text-slate-950">
                  FAN<span className="text-brand-primary">FUEL</span>
                </span>
                <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-slate-600 block -mt-1">
                  Performance Gear
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    onClick={handleTabClick}
                    className={`relative px-4 py-2 text-sm font-display font-semibold transition-colors rounded-xl ${
                      isActive ? 'text-brand-primary' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabUnderline"
                        className="absolute bottom-1 left-4 right-4 h-[3px] bg-brand-primary rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* Actions: Cart + Mobile Menu Button */}
            <div className="flex items-center gap-3">
              {/* Shopping Cart Trigger */}
              <button
                onClick={onCartOpen}
                className="relative p-2.5 bg-slate-50 hover:bg-brand-primary hover:text-white text-slate-800 rounded-xl transition-all duration-200 group focus-ring border border-slate-100"
                aria-label="Open Shopping Cart"
              >
                <ShoppingCart className="w-5.3 h-5.3 transition-transform group-hover:scale-110" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1.5 -right-1.5 bg-brand-primary text-white font-display font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile Menu Icon */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 text-slate-700 bg-slate-50 border border-slate-100 hover:bg-slate-100 rounded-xl transition-colors focus-ring"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5.3 h-5.3" /> : <Menu className="w-5.3 h-5.3" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Panels */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-slate-100 bg-white shadow-xl overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <NavLink
                      key={item.id}
                      to={item.path}
                      onClick={handleTabClick}
                      className={`w-full text-left px-4 py-3 font-display font-bold text-base rounded-xl transition-all flex items-center justify-between ${
                        isActive
                          ? 'bg-brand-primary/10 text-brand-primary'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
