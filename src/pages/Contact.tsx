import React, { useState, useEffect } from 'react';
import { faqItems } from '../data';
import { ContactSubmission } from '../types';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, HelpCircle, ChevronDown, MessageSquare, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';

export default function Contact() {
  // Accordion active index
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  // App states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);

  // Load existing user submissions on component mount
  useEffect(() => {
    const cached = localStorage.getItem('fanfuel_tickets');
    if (cached) {
      try {
        setSubmissions(JSON.parse(cached));
      } catch (e) {
        console.error('Failed to parse submissions cached from localStorage');
      }
    }
  }, []);

  const handleToggleFaq = (id: string) => {
    setActiveFaqId(activeFaqId === id ? null : id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !subject || !message) return;

    setIsSubmitting(true);

    // Simulate safe API submission delay
    setTimeout(() => {
      const ticketId = `FF-${Math.floor(1000 + Math.random() * 9000)}`;
      const newSubmission: ContactSubmission = {
        id: ticketId,
        fullName,
        email,
        phone,
        subject,
        message,
        timestamp: new Date().toLocaleString('en-IN')
      };

      const updated = [newSubmission, ...submissions];
      setSubmissions(updated);
      localStorage.setItem('fanfuel_tickets', JSON.stringify(updated));

      // Reset fields
      setFullName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
      
      setIsSubmitting(false);
      setSuccessMsg(`Ticket ${ticketId} created successfully! Our athlete support team will reach out within 24 hours.`);

      setTimeout(() => {
        setSuccessMsg('');
      }, 5000);
    }, 1200);
  };

  const handleDeleteTicket = (ticketId: string) => {
    const filtered = submissions.filter(s => s.id !== ticketId);
    setSubmissions(filtered);
    localStorage.setItem('fanfuel_tickets', JSON.stringify(filtered));
  };

  return (
    <div className="space-y-20 pb-16">
      <Helmet>
        <title>Contact Us - FanFuel Sports</title>
        <meta name="description" content="Get in touch with FanFuel Sports for corporate orders, custom designs, and general sportswear support." />
        <link rel="canonical" href="https://fanfuel7.netlify.app/contact" />
      </Helmet>
      
      {/* HEADER HERO */}
      <section className="bg-brand-dark text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25" />
        <div className="absolute bottom-10 left-20 w-[400px] h-[400px] bg-brand-primary/10 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto text-center px-4 relative z-10 space-y-4">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest block font-mono">
            Direct Communications Network
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight">
            Contact FanFuel Support & Sales
          </h1>
          <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full my-4" />
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans font-medium">
            Have structural questions about clothing sizes, batch deliveries, customized prints, or event listings? Reach out to us below.
          </p>
        </div>
      </section>

      {/* CORE CONTACT DETAILS GRIDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Box 1: HQ Address */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 text-left shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <MapPin className="w-5.3 h-5.3" />
              </div>
              <h2 className="font-display font-black text-slate-900 text-lg uppercase tracking-tight">
                Corporate Headquarters
              </h2>
              <p className="text-sm text-slate-550 leading-relaxed font-sans mt-2">
                FanFuel Sports Pvt. Ltd.<br />
                Business Tower, Sector 44<br />
                Gurugram, Haryana 122002, India
              </p>
            </div>
            <div className="pt-4 border-t border-slate-50 mt-6">
              <span className="text-xs font-bold text-brand-primary uppercase tracking-wider block">Regd. Entity</span>
              <span className="text-xs text-slate-600">CIN: U74999HR2026PTC099125</span>
            </div>
          </div>

          {/* Box 2: Contact Methods */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 text-left shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <Phone className="w-5.3 h-5.3" />
              </div>
              <h2 className="font-display font-black text-slate-900 text-lg uppercase tracking-tight">
                Direct Channels
              </h2>
              <div className="space-y-3.5 text-sm font-sans text-slate-650 mt-2">
                <p className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800 shrink-0">Phone:</span>
                  <a href="tel:+919876512345" className="hover:text-brand-primary transition-colors">+91 98765 12345</a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800 shrink-0">General email:</span>
                  <a href="mailto:hello@fanfuel.com" className="hover:text-brand-primary transition-colors">hello@fanfuel.com</a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800 shrink-0">Support Desk:</span>
                  <a href="mailto:support@fanfuel.com" className="hover:text-brand-primary transition-colors font-semibold">support@fanfuel.com</a>
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-50 mt-6">
              <span className="text-xs font-bold text-emerald-600 block uppercase tracking-wider">Average response delay</span>
              <span className="text-xs text-slate-500">Under 4 hours during hours</span>
            </div>
          </div>

          {/* Box 3: Hours on deck */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 text-left shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <Clock className="w-5.3 h-5.3" />
              </div>
              <h2 className="font-display font-black text-slate-900 text-lg uppercase tracking-tight">
                Business Hours
              </h2>
              <div className="space-y-3 font-sans text-slate-650 text-sm mt-2">
                <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                  <span className="font-semibold text-slate-700">Monday – Friday</span>
                  <span className="text-slate-500 font-mono text-xs">9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                  <span className="font-semibold text-slate-700">Saturday</span>
                  <span className="text-slate-500 font-mono text-xs">10:00 AM – 4:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Sunday</span>
                  <span className="text-rose-500 font-bold block text-xs uppercase tracking-wider">Closed</span>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-50 mt-6">
              <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">National Holidays</span>
              <span className="text-xs text-slate-400">Notification via email ticker</span>
            </div>
          </div>

        </div>
      </section>

      {/* QUESTION FORM & FAQS ACCORDION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form Section */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-xs text-left">
              <h2 className="font-display font-black text-slate-900 text-xl sm:text-2xl uppercase tracking-tight mb-1 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-brand-primary" /> Get In Touch
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 font-sans">
                Fill out the secure athletic support dispatch slip below to request pricing, customization designs, templates, and general gear support.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rahul Mehta"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus-ring text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. rahul@mehta.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus-ring text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 12345"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus-ring text-slate-900 font-sans"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Subject *</label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Corporate jersey enquiry"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus-ring text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase block mb-1">Detailed Message *</label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your inquiry simply..."
                    rows={4}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus-ring text-slate-900"
                  />
                </div>

                <AnimatePresence mode="wait">
                  {successMsg && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 p-3 rounded-xl flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      {successMsg}
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 rounded-xl text-xs font-bold font-display uppercase tracking-widest text-white shadow-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isSubmitting
                      ? 'bg-slate-750 font-semibold'
                      : 'bg-brand-primary hover:bg-brand-primary-hover shadow-brand-primary/10'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                       Recording ticket...
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Submit Inquiry Ticket
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Offline Local Submitted tickets dashboard - SUPER COOL HANDCRAFTED EXPERIENCE */}
            {submissions.length > 0 && (
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-left space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Your Lodged Tickets ({submissions.length})
                  </h3>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest bg-white border px-2 py-0.5 rounded">
                    stored locally
                  </span>
                </div>

                <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1">
                  {submissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="bg-white p-3.5 rounded-xl border border-slate-150 relative group shadow-2xs"
                    >
                      <button
                        onClick={() => handleDeleteTicket(sub.id)}
                        className="absolute top-3.5 right-3.5 p-1 hover:bg-rose-50 rounded-lg text-slate-350 hover:text-rose-600 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="flex justify-between items-start pr-6 mb-1">
                        <span className="text-xs font-black font-display text-slate-900 truncate">
                          {sub.subject}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-slate-400 leading-none">
                          {sub.id}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mb-2 font-sans">
                        {sub.message}
                      </p>
                      <div className="flex items-center justify-between text-[10px] font-medium font-mono">
                        <span className="text-slate-400">{sub.timestamp}</span>
                        <span className="text-emerald-500 font-bold uppercase tracking-wide bg-emerald-50 px-1.5 py-0.5 rounded leading-none">
                          ● Under Review
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: FAQ Accordion section */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-left space-y-2">
              <span className="text-xs font-bold text-brand-primary uppercase tracking-widest font-mono">
                Clearing Any Ambiguity
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-950 uppercase tracking-tight">
                Frequently Asked Questions
              </h2>
              <div className="w-12 h-0.75 bg-brand-primary rounded-full mb-6" />
            </div>

            <div className="space-y-3">
              {faqItems.map((faq) => {
                const isSelected = activeFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-white rounded-xl border border-slate-100 overflow-hidden transition-all text-left"
                  >
                    <button
                      onClick={() => handleToggleFaq(faq.id)}
                      className="w-full px-6 py-4.5 flex items-center justify-between text-slate-800 hover:text-slate-950 font-display font-extrabold text-sm sm:text-base leading-snug cursor-pointer transition-colors"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4.5 h-4.5 text-slate-400 transition-transform duration-300 ${
                          isSelected ? 'rotate-180 text-brand-primary' : ''
                        }`}
                      />
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isSelected && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-6 pb-5 pt-1 text-xs sm:text-sm leading-relaxed text-slate-500 border-t border-slate-50 font-sans">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Micro-support box */}
            <div className="bg-brand-dark rounded-2xl p-6 text-white text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/10 rounded-full blur-3xl" />
              <div className="relative z-10 space-y-2">
                <HelpCircle className="w-8 h-8 text-brand-primary mb-2" />
                <h3 className="font-display font-black text-base uppercase tracking-tight">Need Express Corporate Consultation?</h3>
                <p className="text-xs text-slate-350 leading-relaxed font-sans">
                  Drop an offline message at <span className="font-bold text-white font-mono lowercase">hello@fanfuel.com</span> or give us a call. Our custom design directors are on standby to design digital prototypes of your soccer jerseys or corporate hoodie badges inside 48 hours for absolutely free!
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
