import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Sparkles, Heart } from 'lucide-react';
import Flower from '../components/Flower';
import { finalMessage } from '../data/content';

function Stage1({ onOpen }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6"
      style={{ background: 'linear-gradient(135deg, #0a1a33 0%, #142B4D 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Stars */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        className="mb-10"
      >
        <div className="relative">
          <Flower size={120} petalColor="#FFFFFF" centerColor="#B99AB8" />
          <div className="absolute inset-0 animate-pulse-soft" style={{ filter: 'blur(20px)', transform: 'scale(1.5)' }}>
            <Flower size={120} petalColor="#78A9E8" centerColor="#78A9E8" />
          </div>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="text-center mb-3"
      >
        <span
          className="text-lg md:text-2xl text-white/70 italic"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          Mirchi,
        </span>
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="text-3xl md:text-5xl font-light text-white text-center mb-10 max-w-2xl leading-tight"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        before you leave...
      </motion.h1>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.1 }}
        whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(185,154,184,0.4)' }}
        whileTap={{ scale: 0.95 }}
        onClick={onOpen}
        className="px-10 py-4 rounded-full text-white tracking-widest text-sm uppercase overflow-hidden relative"
        style={{
          background: 'linear-gradient(135deg, #704567, #B99AB8)',
          boxShadow: '0 10px 40px rgba(112,69,103,0.3)',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <span className="relative z-10">Open Your Surprise</span>
      </motion.button>
    </motion.div>
  );
}

function Stage2() {
  const [showHeart, setShowHeart] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowHeart(true), 1200);
    const t2 = setTimeout(() => setShowMessage(true), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-auto"
      style={{
        background: 'linear-gradient(180deg, #DCEBFA 0%, #78A9E8 50%, #142B4D 100%)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Particles and petals */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`petal-${i}`}
          className="absolute pointer-events-none"
          initial={{
            left: `${Math.random() * 100}%`,
            top: '-10%',
            opacity: 0,
          }}
          animate={{
            top: '110%',
            x: [0, 30, -20, 0],
            rotate: [0, 180, 360],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 8,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg width={Math.random() * 12 + 10} height={Math.random() * 12 + 10} viewBox="0 0 20 20">
            <ellipse cx="10" cy="10" rx="5" ry="8" fill={['#FFFFFF', '#B99AB8'][i % 2]} opacity="0.8" />
          </svg>
        </motion.div>
      ))}

      {/* Glowing stars */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: '0 0 6px white',
          }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}

      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        {/* Flowers */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
          className="mb-10"
        >
          <div className="flex items-center gap-4">
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}>
              <Flower size={60} petalColor="#FFFFFF" centerColor="#B99AB8" />
            </motion.div>
            <Flower size={100} petalColor="#FFFFFF" centerColor="#78A9E8" />
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }}>
              <Flower size={60} petalColor="#B99AB8" centerColor="#FFFFFF" strokeColor="#704567" />
            </motion.div>
          </div>
        </motion.div>

        {/* Heart constellation */}
        <AnimatePresence>
          {showHeart && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2 }}
              className="relative mb-10"
            >
              <svg width="120" height="110" viewBox="0 0 100 90" className="drop-shadow-lg">
                <defs>
                  <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#B99AB8" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M50 80 L15 45 Q5 30 20 20 Q35 10 50 30 Q65 10 80 20 Q95 30 85 45 Z"
                  fill="url(#heartGrad)"
                  initial={{ pathLength: 0, fillOpacity: 0 }}
                  animate={{ pathLength: 1, fillOpacity: 0.9 }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                  style={{ filter: 'drop-shadow(0 0 20px rgba(185,154,184,0.6))' }}
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="max-w-2xl glass rounded-3xl p-8 md:p-12 text-center"
              style={{ boxShadow: '0 30px 80px rgba(20,43,77,0.3)' }}
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-plum-light" />
                <span
                  className="text-xs tracking-[0.4em] uppercase text-white/90"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  For Mirchi
                </span>
                <Sparkles className="w-4 h-4 text-plum-light" />
              </div>

              {finalMessage.split('\n\n').map((para, i) => (
                <p
                  key={i}
                  className="text-white/90 text-lg md:text-xl leading-relaxed mb-5"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {para}
                </p>
              ))}

              <div className="w-24 h-px bg-gradient-to-r from-transparent via-plum-light to-transparent mx-auto my-8" />

              <p
                className="text-2xl md:text-3xl text-white italic"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                Made with care, just for Mirchi.
              </p>

              <div className="flex items-center justify-center gap-2 mt-4">
                <Heart className="w-4 h-4 text-plum-light fill-plum-light" />
                <Heart className="w-5 h-5 text-white fill-white" />
                <Heart className="w-4 h-4 text-primary fill-primary" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-10"
            >
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full glass text-white text-sm tracking-widest uppercase"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <Home size={16} /> Return to Home
                </motion.button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FinalSurprise() {
  const [opened, setOpened] = useState(false);
  return (
    <AnimatePresence mode="wait">
      {!opened ? (
        <Stage1 key="s1" onOpen={() => setOpened(true)} />
      ) : (
        <Stage2 key="s2" />
      )}
    </AnimatePresence>
  );
}
