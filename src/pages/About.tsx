import { teamMembers } from '../data';
import { Mail, Shield, Award, Heart, Sparkles, Target, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';

export default function About() {
  const values = [
    {
      title: 'Passion',
      desc: 'We live and breathe sports. It is our engine, driving us to innovate constantly.',
      icon: <Heart className="w-5 h-5 text-brand-primary" />,
      color: 'bg-brand-primary/10'
    },
    {
      title: 'Quality',
      desc: 'Every product is built to perform. High-pressure stitching, elite microfibers, zero compromise.',
      icon: <Shield className="w-5 h-5 text-emerald-600" />,
      color: 'bg-emerald-100/60'
    },
    {
      title: 'Innovation',
      desc: 'We constantly improve our designs, technology, and materials for peak cooling.',
      icon: <Sparkles className="w-5 h-5 text-purple-600" />,
      color: 'bg-purple-100/60'
    },
    {
      title: 'Community',
      desc: 'We support athletes and fans worldwide. Grassroots sports are the soul of the game.',
      icon: <Award className="w-5 h-5 text-blue-600" />,
      color: 'bg-blue-100/60'
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      <Helmet>
        <title>About Us - FanFuel Sports</title>
        <meta name="description" content="Learn about FanFuel's mission to inspire athletes and fans through innovative, high-performance sports apparel." />
        <link rel="canonical" href="https://fanfuel7.netlify.app/about" />
      </Helmet>
      
      {/* HEADER SECTION */}
      <section className="bg-brand-dark text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px]" />

        <div className="max-w-4xl mx-auto text-center px-4 relative z-10 space-y-4">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest block">
            The Story Behind the Fuel
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight">
            About FanFuel - Our Story & Mission
          </h1>
          <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full my-4" />
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans font-medium">
            FanFuel is a modern sports lifestyle brand dedicated to athletes, fitness enthusiasts, and passionate fans. We provide high-quality sportswear, merchandise, and performance gear designed to help people perform at their best and look exceptional doing it.
          </p>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 sm:p-10 bg-white rounded-2xl border border-slate-100 shadow-xs flex items-start gap-5 text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
              <Target className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="space-y-2">
              <h2 className="font-display font-black text-xl text-slate-900 uppercase tracking-tight">
                Our Mission
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                To inspire athletes and sports fans through innovative, high-performance apparel and gear that seamlessly combine performance comfort, durability, and bold athletics style.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 sm:p-10 bg-white rounded-2xl border border-slate-100 shadow-xs flex items-start gap-5 text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-900/10 flex items-center justify-center text-slate-800 shrink-0">
              <Compass className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="space-y-2">
              <h2 className="font-display font-black text-xl text-slate-900 uppercase tracking-tight">
                Our Vision
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed font-sans">
                To become the most trusted sustainable sports brand for the next generation, establishing active communities in every state and fueling performance at every skill level.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* CORE VALUES */}
      <section className="bg-slate-50 border-y border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">
              Guided by Core Intent
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-950 uppercase tracking-tight">
              Our Values
            </h2>
            <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => (
              <div
                key={val.title}
                className="bg-white p-6 rounded-xl border border-slate-100 shadow-xs text-left"
              >
                <div className={`w-10 h-10 rounded-lg ${val.color} flex items-center justify-center mb-4`}>
                  {val.icon}
                </div>
                <h3 className="font-display font-bold text-slate-900 text-base mb-2">
                  {val.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">
            The Engines Behind The Scenes
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-950 uppercase tracking-tight">
            Our Team
          </h2>
          <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full animate-pulse" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full text-left"
            >
              <div className="aspect-square bg-slate-50 relative overflow-hidden group">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-brand-primary/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-display font-extrabold text-slate-900 text-base leading-snug">
                  {member.name}
                </h3>
                <span className="text-xs font-bold text-brand-primary tracking-widest uppercase block mb-3 font-mono">
                  {member.role}
                </span>
                <p className="text-xs text-slate-500 leading-relaxed font-sans flex-grow">
                  {member.bio}
                </p>
                
                <div className="pt-4 border-t border-slate-50 mt-4 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono font-medium lowercase">
                    {member.name.toLowerCase().replace(' ', '')}@fanfuel.com
                  </span>
                  <a href={`mailto:hello@fanfuel.com`} aria-label="Email Us" className="text-slate-500 hover:text-brand-primary transition-colors">
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
