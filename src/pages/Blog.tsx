import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';

export default function Blog() {
  return (
    <>
      <Helmet>
        <title>Blog - FanFuel Sports</title>
        <meta name="description" content="Read our latest blog posts about athletic gear, workouts, and team updates." />
        <link rel="canonical" href="https://fanfuel7.netlify.app/blog" />
      </Helmet>
      
      <div className="bg-slate-50 min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-display font-black text-slate-950 tracking-tight mb-6 mt-8">
              FanFuel Sports <span className="text-brand-primary">Blog</span> & News
            </h1>
            <p className="text-lg text-slate-600 font-medium">
              Insights, performance tips, and the latest news from around the sports world.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((post) => (
              <motion.div
                key={post}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video bg-slate-100 rounded-xl mb-4 overflow-hidden">
                  <img src={`https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=600&q=80&fm=webp&sig=${post}`} alt="Blog Article" loading="lazy" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"/>
                </div>
                <div className="text-brand-primary text-xs font-bold uppercase tracking-widest mb-2">Training Performance</div>
                <h2 className="text-xl font-bold font-display text-slate-900 mb-3 line-clamp-2">Maximizing Output on the Field with the Right Gear</h2>
                <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                  Discover how the right combination of athletic gear and recovery workflows can boost your overall output dramatically...
                </p>
                <button className="text-brand-primary font-bold text-sm hover:underline">Read Article →</button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
