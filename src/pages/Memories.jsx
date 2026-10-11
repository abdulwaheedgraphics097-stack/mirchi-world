import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Calendar, ImageIcon } from 'lucide-react';
import { memories } from '../data/content';

const gradients = [
  'linear-gradient(135deg, #78A9E8 0%, #DCEBFA 100%)',
  'linear-gradient(135deg, #704567 0%, #B99AB8 100%)',
  'linear-gradient(135deg, #142B4D 0%, #78A9E8 100%)',
  'linear-gradient(135deg, #DCEBFA 0%, #EEE6F2 100%)',
  'linear-gradient(135deg, #78A9E8 0%, #EEE6F2 100%)',
  'linear-gradient(135deg, #B99AB8 0%, #DCEBFA 100%)',
];

function Polaroid({ mem, index, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: (index % 2 === 0 ? -2 : 2) }}
      whileInView={{ opacity: 1, y: 0, rotate: (index % 2 === 0 ? -2 : 2) }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.1, type: 'spring', stiffness: 100 }}
      whileHover={{ y: -8, rotate: 0, scale: 1.02, zIndex: 10 }}
      onClick={() => onOpen(index)}
      className="cursor-pointer group"
    >
      <div
        className="relative p-3 pb-10 rounded-sm bg-white transition-all duration-300"
        style={{ boxShadow: '0 8px 30px rgba(20,43,77,0.15)' }}
      >
        {/* Photo area */}
        <div
          className="relative aspect-square rounded-sm overflow-hidden flex items-center justify-center"
          style={{ background: gradients[index % gradients.length] }}
        >
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-30">
            <svg width="100%" height="100%" viewBox="0 0 200 200" className="absolute inset-0">
              {[0, 60, 120, 180, 240, 300].map((a, i) => (
                <ellipse key={i} cx="100" cy="80" rx="14" ry="30" fill="white" opacity="0.5" transform={`rotate(${a} 100 80) translate(0 -15)`} />
              ))}
              <circle cx="100" cy="80" r="10" fill="#B99AB8" opacity="0.7" />
            </svg>
          </div>
          <div className="relative z-10 text-white">
            <div className="text-5xl mb-2 text-center">{mem.emoji}</div>
            <ImageIcon className="w-6 h-6 mx-auto opacity-50" />
          </div>

          {/* Tape */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-5 bg-white/40 rotate-1" />
        </div>

        {/* Caption */}
        <div className="absolute bottom-2 left-3 right-3 text-center">
          <p
            className="text-sm text-midnight/70 truncate"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            {mem.caption}
          </p>
          <p className="text-[10px] text-midnight/40 tracking-wider uppercase mt-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>
            {mem.date}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function MemoryModal({ mem, index, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-midnight/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-2xl w-full"
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition"
        >
          <X size={22} />
        </button>

        <div
          className="relative p-5 md:p-8 rounded-2xl"
          style={{ background: 'linear-gradient(135deg, #FFFFFF, #F2F8FF)', boxShadow: '0 30px 80px rgba(0,0,0,0.4)' }}
        >
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-silver/50">
            <Calendar className="w-5 h-5 text-plum" />
            <span className="text-sm text-midnight/60 tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
              {mem.date}
            </span>
          </div>

          <div
            className="aspect-video rounded-xl mb-6 flex items-center justify-center relative overflow-hidden"
            style={{ background: gradients[index % gradients.length] }}
          >
            <div className="text-8xl">{mem.emoji}</div>
            <div className="absolute bottom-4 left-4 right-4 text-white/90 text-xs tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
              Add your photo here
            </div>
          </div>

          <h3
            className="text-2xl md:text-3xl text-midnight mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {mem.caption}
          </h3>
          <p className="text-midnight/60 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
            This is a placeholder. Replace the caption and add your own photograph here
            to turn this card into a real memory. Every moment worth remembering
            deserves a little home.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function TimelineItem({ mem, index, onOpen }) {
  const isEven = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex items-center mb-8 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
    >
      <div className={`w-5/12 ${isEven ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
        <button
          onClick={() => onOpen(index)}
          className="inline-block group"
        >
          <p className="text-sm tracking-widest text-primary uppercase mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            {mem.date}
          </p>
          <h4
            className="text-xl md:text-2xl text-midnight group-hover:text-plum transition-colors"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {mem.caption}
          </h4>
        </button>
      </div>
      <div className="w-2/12 flex justify-center">
        <div className="relative">
          <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-ice z-10 relative" />
        </div>
      </div>
      <div className="w-5/12" />
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0" />
    </motion.div>
  );
}

export default function Memories() {
  const [openMem, setOpenMem] = useState(null);
  const [view, setView] = useState('gallery');

  return (
    <div className="relative min-h-screen bg-ice">
      {/* Header */}
      <section className="relative pt-32 pb-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-xs tracking-[0.4em] uppercase text-primary" style={{ fontFamily: "'Inter', sans-serif" }}>
            Memory Garden
          </span>
          <Sparkles className="w-4 h-4 text-primary" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-light text-midnight mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Little Moments, <span className="italic text-gradient-blue">Beautiful Feelings</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-midnight/60 max-w-xl mx-auto mb-8"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          A quiet gallery of moments — placeholders for now, ready to hold
          your favorite photographs and memories.
        </motion.p>

        <div className="inline-flex gap-2 p-1 rounded-full glass-light mb-4">
          <button
            onClick={() => setView('gallery')}
            className={`px-6 py-2 rounded-full text-sm tracking-wider transition-all ${
              view === 'gallery' ? 'bg-primary text-white shadow' : 'text-midnight/60'
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Gallery
          </button>
          <button
            onClick={() => setView('timeline')}
            className={`px-6 py-2 rounded-full text-sm tracking-wider transition-all ${
              view === 'timeline' ? 'bg-primary text-white shadow' : 'text-midnight/60'
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Timeline
          </button>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {view === 'gallery' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
              {memories.map((mem, i) => (
                <Polaroid key={mem.id} mem={mem} index={i} onOpen={setOpenMem} />
              ))}
            </div>
          ) : (
            <div className="max-w-3xl mx-auto pt-8">
              {memories.map((mem, i) => (
                <TimelineItem key={mem.id} mem={mem} index={i} onOpen={setOpenMem} />
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {openMem !== null && (
          <MemoryModal mem={memories[openMem]} index={openMem} onClose={() => setOpenMem(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
