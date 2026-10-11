import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Shuffle, Heart, X } from 'lucide-react';
import { loveNotes } from '../data/content';

function Envelope({ note, index, onOpen }) {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, rotate: hover ? 0 : -1 }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      onClick={() => onOpen(note, index)}
      className="relative cursor-pointer group"
    >
      <div className="relative w-full aspect-[4/3] max-w-xs mx-auto">
        {/* Envelope body */}
        <div
          className="absolute inset-0 rounded-lg overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #DCEBFA 100%)',
            boxShadow: hover ? '0 20px 50px rgba(20,43,77,0.2)' : '0 10px 30px rgba(20,43,77,0.1)',
            transition: 'all 0.4s ease',
          }}
        >
          {/* Envelope flap */}
          <div
            className="absolute top-0 left-0 right-0 origin-top"
            style={{
              height: '50%',
              background: 'linear-gradient(180deg, #EEE6F2 0%, #DCEBFA 100%)',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              transform: hover ? 'rotateX(-180deg)' : 'rotateX(0deg)',
              transformOrigin: 'top',
              transition: 'transform 0.6s ease',
              backfaceVisibility: 'hidden',
            }}
          />
          {/* Letter peeking out */}
          <div
            className="absolute left-2 right-2 bottom-2 rounded bg-white"
            style={{
              height: hover ? '70%' : '30%',
              transition: 'height 0.5s ease',
              boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
            }}
          >
            <div className="p-3 text-xs text-midnight/40" style={{ fontFamily: "'Dancing Script', cursive" }}>
              For Mirchi...
            </div>
          </div>

          {/* Seal */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 z-10">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-500"
              style={{
                background: 'linear-gradient(135deg, #704567, #B99AB8)',
                boxShadow: '0 4px 10px rgba(112,69,103,0.3)',
                transform: hover ? 'scale(0)' : 'scale(1)',
              }}
            >
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-midnight/60" style={{ fontFamily: "'Inter', sans-serif" }}>
          Note #{index + 1}
        </p>
      </div>
    </motion.div>
  );
}

function NoteModal({ note, index, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-midnight/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.7, rotate: -5, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0.7, rotate: 5, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-md w-full"
      >
        <div
          className="relative rounded-2xl p-10 md:p-12 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F2F8FF 100%)',
            boxShadow: '0 30px 80px rgba(20,43,77,0.3)',
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-midnight/40 hover:text-midnight hover:bg-silver/30 transition"
          >
            <X size={18} />
          </button>

          {/* Decorative flower */}
          <div className="absolute -top-5 -right-5 opacity-30">
            <svg width="80" height="80" viewBox="0 0 100 100">
              {[0, 60, 120, 180, 240, 300].map((a, i) => (
                <ellipse key={i} cx="50" cy="50" rx="10" ry="24" fill="#B99AB8" transform={`rotate(${a} 50 50) translate(0 -10)`} />
              ))}
              <circle cx="50" cy="50" r="7" fill="#704567" />
            </svg>
          </div>

          <div className="text-center mb-6">
            <p className="text-xs tracking-[0.4em] uppercase text-plum-light mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
              A little note
            </p>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-plum to-transparent mx-auto" />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-midnight leading-relaxed text-center italic"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            "{note}"
          </motion.p>

          <div className="mt-8 flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 text-plum fill-plum" />
            <span className="text-xs tracking-widest text-midnight/40 uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
              For Mirchi
            </span>
            <Heart className="w-4 h-4 text-plum fill-plum" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function LoveNotes() {
  const [openNote, setOpenNote] = useState(null);

  const surpriseMe = () => {
    const random = loveNotes[Math.floor(Math.random() * loveNotes.length)];
    setOpenNote({ note: random, index: loveNotes.indexOf(random) });
  };

  return (
    <div
      className="relative min-h-screen"
      style={{ background: 'linear-gradient(180deg, #F2F8FF 0%, #DCEBFA 50%, #EEE6F2 100%)' }}
    >
      {/* Header */}
      <section className="relative pt-32 pb-12 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <Sparkles className="w-4 h-4 text-plum" />
          <span className="text-xs tracking-[0.4em] uppercase text-plum" style={{ fontFamily: "'Inter', sans-serif" }}>
            Little Love Notes
          </span>
          <Sparkles className="w-4 h-4 text-plum" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-light text-midnight mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          A Few Words <span className="italic text-gradient-plum">for You</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-midnight/60 max-w-xl mx-auto mb-8"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Small notes, folded and sealed. Click any envelope to open it,
          or let serendipity choose one for you.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={surpriseMe}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-white text-sm tracking-widest uppercase"
          style={{
            background: 'linear-gradient(135deg, #704567, #B99AB8)',
            boxShadow: '0 10px 30px rgba(112,69,103,0.3)',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <Shuffle size={16} /> Surprise Me
        </motion.button>
      </section>

      {/* Envelopes */}
      <section className="relative py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
          {loveNotes.map((note, i) => (
            <Envelope key={i} note={note} index={i} onOpen={(n, idx) => setOpenNote({ note: n, index: idx })} />
          ))}
        </div>
      </section>

      <AnimatePresence>
        {openNote && (
          <NoteModal note={openNote.note} index={openNote.index} onClose={() => setOpenNote(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
