import { useState } from 'react';
import { CartItem } from '../types';
import { X, Plus, Minus, Trash2, ShoppingBag, CreditCard, Ship, CheckCircle2, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, size?: string) => void;
  onRemoveItem: (productId: string, size?: string) => void;
  onClearCart: () => void;
}

export default function Cart({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }: CartProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment' | 'success'>('cart');
  
  // Shipping form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [cardNo, setCardNo] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');

  // Shipping error states
  const [shippingError, setShippingError] = useState('');
  const [paymentError, setPaymentError] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shippingMultiplier = subtotal >= 1999 ? 0 : 150; // free shipping above 1999
  const total = subtotal + shippingMultiplier;

  const handleNextStep = () => {
    if (checkoutStep === 'shipping') {
      if (!name || !phone || !address || !pincode) {
        setShippingError('Please fill out all address fields.');
        return;
      }
      setShippingError('');
      setCheckoutStep('payment');
    } else if (checkoutStep === 'payment') {
      if (!cardNo || !cardExpiry || !cardCVV) {
        setPaymentError('Please fill out card details.');
        return;
      }
      setPaymentError('');
      // Simulate API submit
      setCheckoutStep('success');
      setTimeout(() => {
        onClearCart();
      }, 300);
    }
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setAddress('');
    setPincode('');
    setCardNo('');
    setCardExpiry('');
    setCardCVV('');
    setCheckoutStep('cart');
  };

  const handleClose = () => {
    onClose();
    if (checkoutStep === 'success') {
      resetForm();
    }
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
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Sliding Drawer Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-slate-150 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-primary" />
                <h2 className="font-display font-black text-slate-900 text-lg uppercase tracking-tight">
                  {checkoutStep === 'cart' && 'Your Shopping Cart'}
                  {checkoutStep === 'shipping' && 'Delivery Coordinates'}
                  {checkoutStep === 'payment' && 'Secure Checkout'}
                  {checkoutStep === 'success' && 'Order Placed!'}
                </h2>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close Cart"
                className="p-1.5 hover:bg-slate-200 text-slate-600 hover:text-slate-900 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step Indicators for active checkout flow */}
            {cartItems.length > 0 && checkoutStep !== 'success' && (
              <div className="bg-slate-100/70 p-3 px-5 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span className={checkoutStep === 'cart' ? 'text-brand-primary' : 'text-slate-900'}>Cart</span>
                <span className="w-8 h-px bg-slate-300"></span>
                <span className={checkoutStep === 'shipping' ? 'text-brand-primary' : checkoutStep === 'payment' ? 'text-slate-900' : ''}>Shipping</span>
                <span className="w-8 h-px bg-slate-300"></span>
                <span className={checkoutStep === 'payment' ? 'text-brand-primary' : ''}>Payment</span>
              </div>
            )}

            {/* Drawer Body Area */}
            <div className="flex-1 overflow-y-auto p-5">
              {/* STEP 1: CART LISTING */}
              {checkoutStep === 'cart' && (
                <>
                  {cartItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8">
                      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mb-4 animate-bounce">
                        <ShoppingCart className="w-8 h-8" />
                      </div>
                      <h3 className="font-display font-bold text-slate-800 text-lg mb-1">Your cart is empty</h3>
                      <p className="text-sm text-slate-500 max-w-xs mb-6">
                        Explore our latest sports jerseys, active apparel, running shoes, and dynamic gear grids!
                      </p>
                      <button
                        onClick={onClose}
                        className="py-2.5 px-6 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl text-sm font-bold font-display uppercase tracking-widest shadow-md shadow-brand-primary/20 transition-all cursor-pointer"
                      >
                        Start Shopping
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item, index) => (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          key={`${item.product.id}-${item.selectedSize || 'none'}-${item.customization?.name || 'none'}`}
                          className="flex items-start gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="w-16 h-16 rounded-lg object-cover bg-slate-200"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-display font-bold text-sm text-slate-900 line-clamp-1">
                              {item.product.name}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              {item.selectedSize && (
                                <span className="text-[10px] font-bold font-mono uppercase bg-brand-primary/10 text-brand-primary px-1.5 py-0.5 rounded">
                                  Size: {item.selectedSize}
                                </span>
                              )}
                              
                              {item.customization?.name && (
                                <span className="text-[10px] font-bold font-mono uppercase bg-slate-800 text-slate-100 px-1.5 py-0.5 rounded">
                                  Jersey ID: {item.customization.name} ({item.customization.number || '00'})
                                </span>
                              )}
                            </div>

                            <div className="flex items-center justify-between mt-2">
                              <span className="font-display font-black text-sm text-slate-900">
                                ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                              </span>

                              {/* Item Counter buttons */}
                              <div className="flex items-center gap-2 bg-white rounded-lg border border-slate-200 p-0.5">
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1), item.selectedSize)}
                                  aria-label="Decrease Quantity"
                                  className="w-5 h-5 flex items-center justify-center text-slate-500 hover:text-slate-900"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-bold w-5 text-center text-slate-800">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, item.selectedSize)}
                                  aria-label="Increase Quantity"
                                  className="w-5 h-5 flex items-center justify-center text-slate-500 hover:text-slate-900"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                            className="text-slate-400 hover:text-rose-600 p-1 rounded-md hover:bg-white transition-colors cursor-pointer self-start"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* STEP 2: SHIPPING FORM */}
              {checkoutStep === 'shipping' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl mb-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Order Summary</h3>
                    <p className="text-sm font-semibold text-slate-800">{cartItems.length} Products in cart</p>
                    <p className="text-lg font-black text-slate-900 font-display mt-0.5">Total Amount: ₹{total.toLocaleString('en-IN')}</p>
                  </div>

                  <h3 className="font-display font-bold text-slate-950 text-base mb-1">Enter Destination Point</h3>

                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Mehta"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus-ring bg-white font-sans text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 12345"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus-ring bg-white font-sans text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Shipping Address *</label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g., Suite 202, Sector 55, Gurugram"
                      rows={3}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus-ring bg-white font-sans text-slate-900"
                    ></textarea>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Postal Pincode *</label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="6 digit pincode"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus-ring bg-white font-sans text-slate-900"
                    />
                  </div>

                  {shippingError && (
                    <p className="text-xs font-bold text-rose-500 bg-rose-50 border border-rose-100 p-2.5 rounded-lg">
                      {shippingError}
                    </p>
                  )}
                </div>
              )}

              {/* STEP 3: SECURE PAYMENT */}
              {checkoutStep === 'payment' && (
                <div className="space-y-4">
                  <div className="bg-brand-dark text-white p-4 rounded-xl relative overflow-hidden mb-3">
                    <div className="absolute top-0 right-0 p-3 opacity-20">
                      <CreditCard className="w-16 h-16 stroke-[1]" />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 block uppercase">SECURE PAYMENT PROFILE</span>
                    <span className="text-xl font-display font-black tracking-tight">{name}</span>
                    <div className="mt-4 flex items-center justify-between font-mono text-sm tracking-widest text-slate-200">
                      <span>{cardNo ? cardNo.replace(/(.{4})/g, '$1 ') : '•••• •••• •••• ••••'}</span>
                      <span className="text-xs">{cardExpiry || 'MM/YY'}</span>
                    </div>
                  </div>

                  <h3 className="font-display font-medium text-slate-950 text-base mb-1 flex items-center gap-1">
                    <CreditCard className="w-4 h-4 text-brand-primary" /> Integrated Secure Payment (Simulated)
                  </h3>

                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Credit Card Number *</label>
                    <input
                      type="text"
                      value={cardNo}
                      onChange={(e) => setCardNo(e.target.value)}
                      maxLength={16}
                      placeholder="4111 2222 3333 4444"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus-ring bg-white font-sans text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Valid Expiry *</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus-ring bg-white font-sans"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-600 uppercase block mb-1">CVV Security Code *</label>
                      <input
                        type="password"
                        value={cardCVV}
                        onChange={(e) => setCardCVV(e.target.value)}
                        maxLength={3}
                        placeholder="•••"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus-ring bg-white font-sans"
                      />
                    </div>
                  </div>

                  {paymentError && (
                    <p className="text-xs font-bold text-rose-500 bg-rose-50 border border-rose-100 p-2.5 rounded-lg">
                      {paymentError}
                    </p>
                  )}
                </div>
              )}

              {/* STEP 4: SUCCESS */}
              {checkoutStep === 'success' && (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 px-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                    className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
                  </motion.div>
                  
                  <h3 className="font-display font-black text-slate-950 text-2xl mb-2">Order Confirmed!</h3>
                  <p className="text-xs text-slate-500 mb-6">
                    A secure receipt and delivery tracking dispatch link has been successfully dispatched to your email address.
                  </p>

                  <div className="w-full bg-slate-50 p-4 rounded-xl border border-slate-100 text-left text-xs mb-6 space-y-2">
                    <p className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Shipping Destination</p>
                    <p className="font-bold text-slate-800">{name}</p>
                    <p className="text-slate-600">{address}, {pincode}</p>
                    <p className="text-slate-600">Contact: {phone}</p>
                  </div>

                  <button
                    onClick={handleClose}
                    className="w-full py-3 px-6 bg-brand-dark hover:bg-brand-primary text-white font-display font-bold uppercase tracking-widest rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    Close & Keep Exploring
                  </button>
                </div>
              )}

            </div>

            {/* Drawer Footer Panel containing totals and CTA */}
            {cartItems.length > 0 && checkoutStep !== 'success' && (
              <div className="p-5 border-t border-slate-150 bg-slate-50">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Shipping Charges:</span>
                    {shippingMultiplier === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      <span className="font-semibold text-slate-900">₹{shippingMultiplier}</span>
                    )}
                  </div>
                  <div className="border-t border-slate-200 my-2 pt-2 flex justify-between text-base font-bold text-slate-950 font-display">
                    <span>Order Total:</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {checkoutStep === 'cart' && (
                  <button
                    onClick={() => setCheckoutStep('shipping')}
                    className="w-full py-3 bg-brand-primary hover:bg-brand-primary-hover text-white font-display font-extrabold uppercase tracking-widest rounded-xl shadow-lg shadow-brand-primary/20 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Ship className="w-4.5 h-4.5" />
                    Proceed To Details
                  </button>
                )}

                {checkoutStep === 'shipping' && (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setCheckoutStep('cart')}
                      className="py-3 bg-white border border-slate-200 hover:border-slate-400 text-slate-700 font-display font-extrabold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="py-3 bg-brand-primary hover:bg-brand-primary-hover text-white font-display font-extrabold uppercase tracking-wide rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <CreditCard className="w-4.5 h-4.5" />
                      Next Step
                    </button>
                  </div>
                )}

                {checkoutStep === 'payment' && (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setCheckoutStep('shipping')}
                      className="py-3 bg-white border border-slate-200 hover:border-slate-400 text-slate-700 font-display font-extrabold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="py-3 bg-brand-primary hover:bg-brand-primary-hover text-white font-display font-extrabold uppercase tracking-wide rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer animate-pulse"
                    >
                      <CheckCircle2 className="w-4.5 h-4.5" />
                      Complete ₹{total.toLocaleString('en-IN')}
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
