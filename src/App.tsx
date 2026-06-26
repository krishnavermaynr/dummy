import { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Product, CartItem } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy-loaded Pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));

// Lazy-loaded Modals
const Cart = lazy(() => import('./components/Cart'));
const ProductDetailModal = lazy(() => import('./components/ProductDetailModal'));

export default function App() {
  const navigate = useNavigate();
  const [presetCategory, setPresetCategory] = useState<string>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const [cartLoaded, setCartLoaded] = useState(false);
  const [modalLoaded, setModalLoaded] = useState(false);

  useEffect(() => {
    if (isCartOpen) setCartLoaded(true);
  }, [isCartOpen]);

  useEffect(() => {
    if (quickViewProduct !== null) setModalLoaded(true);
  }, [quickViewProduct]);

  // Load cart state from localStorage on startup
  useEffect(() => {
    const cachedCart = localStorage.getItem('fanfuel_cart');
    if (cachedCart) {
      try {
        setCart(JSON.parse(cachedCart));
      } catch (e) {
        console.error('Failed to restore cart from localStorage');
      }
    }
  }, []);

  // Sync cart adjustments back to localStorage
  const syncCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('fanfuel_cart', JSON.stringify(newCart));
  };

  // Add items with matching size & customization checks
  const handleAddToCart = (
    product: Product,
    quantity: number,
    size?: string,
    customization?: { name: string; number: string }
  ) => {
    const newCart = [...cart];
    
    // Find item with identical size and design plates
    const existingIndex = newCart.findIndex((item) => {
      const isSameProduct = item.product.id === product.id;
      const isSameSize = item.selectedSize === size;
      const isSameName = item.customization?.name === customization?.name;
      const isSameNumber = item.customization?.number === customization?.number;
      return isSameProduct && isSameSize && isSameName && isSameNumber;
    });

    if (existingIndex > -1) {
      newCart[existingIndex].quantity += quantity;
    } else {
      newCart.push({
        product,
        quantity,
        selectedSize: size,
        customization,
      });
    }

    syncCart(newCart);
  };

  const handleUpdateQuantity = (productId: string, quantity: number, size?: string) => {
    const newCart = cart.map((item) => {
      if (item.product.id === productId && item.selectedSize === size) {
        return { ...item, quantity };
      }
      return item;
    });
    syncCart(newCart);
  };

  const handleRemoveItem = (productId: string, size?: string) => {
    const newCart = cart.filter((item) => {
      const matchId = item.product.id === productId;
      const matchSize = item.selectedSize === size;
      return !(matchId && matchSize);
    });
    syncCart(newCart);
  };

  const handleClearCart = () => {
    syncCart([]);
  };

  // Safe navigation links
  const handleNavigate = (path: string, categoryFilter?: string) => {
    if (categoryFilter) {
      setPresetCategory(categoryFilter);
    }
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans transition-all duration-300">
      
      {/* Dynamic Navigation Bar */}
      <Navbar
        cartCount={cartItemsCount}
        onCartOpen={() => setIsCartOpen(true)}
      />

      {/* Main Pages router and switches */}
      <main className="flex-grow">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div></div>}>
          <Routes>
            <Route path="/" element={
              <Home
                onNavigate={handleNavigate}
                onAddToCart={handleAddToCart}
                onQuickView={(prod) => setQuickViewProduct(prod)}
              />
            } />
            
            <Route path="/about" element={<About />} />
            
            <Route path="/products" element={
              <Products
                onAddToCart={handleAddToCart}
                onQuickView={(prod) => setQuickViewProduct(prod)}
                presetCategory={presetCategory}
              />
            } />
            
            <Route path="/services" element={<Services />} />
            
            <Route path="/contact" element={<Contact />} />
            
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </Suspense>
      </main>

      {/* Persistent global Footer */}
      <Footer onNavigate={(id) => handleNavigate(id)} />

      {/* Cart side-drawer overlay */}
      {cartLoaded && (
        <Suspense fallback={null}>
          <Cart
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
          />
        </Suspense>
      )}

      {/* Detailed quick view modal */}
      {modalLoaded && (
        <Suspense fallback={null}>
          <ProductDetailModal
            product={quickViewProduct}
            isOpen={quickViewProduct !== null}
            onClose={() => setQuickViewProduct(null)}
            onAddToCart={handleAddToCart}
          />
        </Suspense>
      )}

    </div>
  );
}
