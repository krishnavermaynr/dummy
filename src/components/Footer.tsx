import { Mail, Phone, MapPin, Clock, ArrowUp, Instagram, Facebook, Twitter, Shield, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-dark text-slate-400 border-t border-slate-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand details */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 cursor-pointer group" onClick={scrollToTop}>
              <div className="w-9 h-9 rounded-lg bg-brand-primary flex items-center justify-center text-white font-display font-black text-lg group-hover:scale-105 transition-transform">
                F
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-slate-100 transition-colors">
                FAN<span className="text-brand-primary">FUEL</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Premium sports apparel, fan merchandise, training gear, and performance accessories designed for athletes and passionate fans who live the game.
            </p>
            
            {/* Social Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#instagram" aria-label="Instagram" className="w-9 h-9 rounded-lg bg-slate-800/50 hover:bg-brand-primary text-slate-350 hover:text-white flex items-center justify-center transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#facebook" aria-label="Facebook" className="w-9 h-9 rounded-lg bg-slate-800/50 hover:bg-brand-primary text-slate-350 hover:text-white flex items-center justify-center transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#twitter" aria-label="Twitter" className="w-9 h-9 rounded-lg bg-slate-800/50 hover:bg-brand-primary text-slate-350 hover:text-white flex items-center justify-center transition-all">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Shortcuts */}
          <div className="space-y-4">
            <h4 className="text-sm font-display font-bold uppercase tracking-wider text-slate-100">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm flex flex-col">
              <li>
                <Link to="/" className="hover:text-brand-primary transition-colors text-left font-sans font-medium hover:underline inline-block" onClick={scrollToTop}>
                  Home / Landing
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-primary transition-colors text-left font-sans font-medium hover:underline inline-block" onClick={scrollToTop}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-brand-primary transition-colors text-left font-sans font-medium hover:underline inline-block" onClick={scrollToTop}>
                  Products Store
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brand-primary transition-colors text-left font-sans font-medium hover:underline inline-block" onClick={scrollToTop}>
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-brand-primary transition-colors text-left font-sans font-medium hover:underline inline-block" onClick={scrollToTop}>
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-primary transition-colors text-left font-sans font-medium hover:underline inline-block" onClick={scrollToTop}>
                  Contact & FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact details */}
          <div className="space-y-4">
            <h4 className="text-sm font-display font-bold uppercase tracking-wider text-slate-100">
              Our Headquarters
            </h4>
            <div className="space-y-3.5 text-sm leading-relaxed">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                <span>
                  FanFuel Sports Pvt. Ltd.<br />
                  Business Tower, Sector 44<br />
                  Gurugram, Haryana 122002, India
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4.5 h-4.5 text-brand-primary shrink-0" />
                <a href="tel:+919876512345" className="hover:text-white transition-colors">+91 98765 12345</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4.5 h-4.5 text-brand-primary shrink-0" />
                <a href="mailto:hello@fanfuel.com" className="hover:text-white transition-colors">hello@fanfuel.com</a>
              </div>
            </div>
          </div>

          {/* Column 4: Hours & Back up */}
          <div className="space-y-4">
            <h4 className="text-sm font-display font-bold uppercase tracking-wider text-slate-100">
              Business Hours
            </h4>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-3">
                <Clock className="w-4.5 h-4.5 text-brand-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-200">Monday – Friday</p>
                  <p className="text-xs text-slate-400">9:00 AM – 6:00 PM</p>
                  <p className="font-semibold text-slate-200 mt-2">Saturday</p>
                  <p className="text-xs text-slate-400">10:00 AM – 4:00 PM</p>
                  <p className="font-semibold text-slate-200 mt-2">Sunday</p>
                  <p className="text-rose-500 text-xs font-medium">Closed</p>
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={scrollToTop}
                  className="w-full py-2.5 px-4 bg-slate-800 hover:bg-brand-primary text-slate-200 hover:text-white rounded-xl text-xs font-bold font-display uppercase tracking-wider flex items-center justify-center gap-2 transition-all border border-slate-700/50 cursor-pointer"
                >
                  <ArrowUp className="w-4 h-4" />
                  Back to Top
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Footer bottom details */}
        <div className="border-t border-slate-800/85 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500">
            &copy; {new Date().getFullYear()} FanFuel Sports Private Limited. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 text-slate-500">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" />
              Secure 256-Bit SSL Checkout
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-brand-primary fill-brand-primary" />
              Fueling Athletes Nationally
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
