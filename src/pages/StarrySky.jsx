import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star as StarIcon, Moon, CloudFog } from 'lucide-react';
import { starMessages } from '../data/content';

function Star({ x, y, size, delay, dur, message, onClick }) {
  const [clicked, setClicked] = useState(false);

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ left: `${x}%`, top: `${y}%` }}
      onMouseEnter={() => {}}
      onClick={(e) => {
        e.stopPropagation();
        setClicked(true);
        onClick(message);
        setTimeout(() => setClicked(false), 200);
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: dur,
          delay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{ scale: 2 }}
        className="relative"
      >
        <StarIcon
          className={`${clicked ? 'text-plum fill-plum' : 'text-white fill-white/40'}`}
          style={{ width: size * 5, height: size * 5 }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: `0 0 ${size * 8}px rgba(255,255,255,0.4)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

function ShootingStar({ onComplete }) {
  const startX = Math.random() * 30 + 10;
  const startY = Math.random() * 20 + 10;
  useEffect(() => {
    const t = setTimeout(onComplete, 2000);
    return () => clearTimeout(t);
  }, [onComplete]);
  return (
    <div
      className="absolute z-30 pointer-events-none animate-shooting"
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
        width: '120px',
        height: '2px',
        background: 'linear-gradient(90deg, #FFFFFF, transparent)',
        borderRadius: '2px',
        boxShadow: '0 0 10px #fff',
      }}
    />
  );
}

function HeartConstellation() {
  // Points forming a heart shape
  const points = [
    { x: 50, y: 30 },
    { x: 40, y: 22 },
    { x: 30, y: 28 },
    { x: 30, y: 42 },
    { x: 50, y: 60 },
    { x: 70, y: 42 },
    { x: 70, y: 28 },
    { x: 60, y: 22 },
  ];
  const lines = [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [4, 5], [5, 6], [6, 7], [7, 0],
  ];

  return (
    <svg viewBox="0 0 100 80" className="w-full h-full absolute inset-0">
      {lines.map(([a, b], i) => {
        const pa = points[a], pb = points[b];
        return (
          <motion.line
            key={i}
            x1={pa.x} y1={pa.y}
            x2={pb.x} y2={pb.y}
            stroke="#B99AB8"
            strokeWidth="0.2"
            strokeDasharray="100"
            strokeDashoffset="100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6, strokeDashoffset: 0 }}
            transition={{ duration: 1.5, delay: 0.5 + i * 0.2 }}
          />
        );
      })}
      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x} cy={p.y} r="1"
          fill="#FFFFFF"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 + i * 0.15 }}
        >
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
        </motion.circle>
      ))}
    </svg>
  );
}

export default function StarrySky() {
  const [message, setMessage] = useState(null);
  const [shooting, setShooting] = useState(false);
  const [wishMsg, setWishMsg] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const starsRef = useRef(null);

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(null), 4000);
    return () => clearTimeout(t);
  }, [message]);

  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.8,
    delay: Math.random() * 5,
    dur: Math.random() * 3 + 2,
    message: starMessages[Math.floor(Math.random() * starMessages.length)],
  }));

  const makeWish = () => {
    setShooting(true);
    setShowHeart(true);
    setTimeout(() => {
      setWishMsg(true);
    }, 1500);
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #2d4a7a 0%, #142B4D 50%, #0a1a33 100%)',
      }}
    >
      {/* Clouds */}
      <CloudFog className="absolute top-10 left-10 w-40 h-40 text-white/5" />
      <CloudFog className="absolute bottom-20 right-10 w-60 h-60 text-white/5" />

      {/* Moon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute top-16 right-10 md:right-24"
      >
        <Moon className="w-20 h-20 md:w-28 md:h-28 text-ice fill-ice/70" strokeWidth={0.5} />
        <div className="absolute inset-0 rounded-full" style={{ boxShadow: '0 0 80px rgba(242,248,255,0.3)' }} />
      </motion.div>

      {/* Header */}
      <div className="relative pt-32 pb-8 px-6 text-center z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <Sparkles className="w-4 h-4 text-plum-light" />
          <span className="text-xs tracking-[0.4em] uppercase text-plum-light" style={{ fontFamily: "'Inter', sans-serif" }}>
            A Sky Full of Stars
          </span>
          <Sparkles className="w-4 h-4 text-plum-light" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-light text-white glow-text mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Written in the <span className="italic text-primary">night sky</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/60 max-w-xl mx-auto mb-8"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Click any star to read a hidden message. When you're ready, make a wish.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={makeWish}
          className="px-8 py-3 rounded-full glass text-white text-sm tracking-widest uppercase"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          ✨ Make a Wish
        </motion.button>
      </div>

      {/* Star field */}
      <div ref={starsRef} className="relative w-full h-[60vh] min-h-[400px] mx-auto max-w-6xl px-6">
        {/* Heart constellation */}
        <AnimatePresence>
          {showHeart && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 max-w-md mx-auto left-0 right-0"
              style={{ width: '300px', height: '240px', top: '10%' }}
            >
              <HeartConstellation />
            </motion.div>
          )}
        </AnimatePresence>

        {stars.map(s => (
          <Star key={s.id} {...s} onClick={(msg) => setMessage(msg)} />
        ))}

        {/* Floating petals */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`p-${i}`}
            className="absolute w-2 h-2 rounded-full pointer-events-none animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-5%',
              background: ['#FFFFFF', '#B99AB8'][i % 2],
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 8}s`,
              opacity: 0.4,
            }}
          />
        ))}

        {shooting && <ShootingStar onComplete={() => setShooting(false)} />}
      </div>

      {/* Message popup from star */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40 max-w-md px-8 py-4 rounded-2xl glass-dark text-white text-center"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem' }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wish message */}
      <AnimatePresence>
        {wishMsg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-midnight/60 backdrop-blur-sm"
            onClick={() => setWishMsg(false)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="max-w-md w-full p-10 rounded-3xl glass-dark text-center"
            >
              <div className="text-5xl mb-4">💫</div>
              <h3 className="text-3xl text-white mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Your wish has been sent
              </h3>
              <p className="text-white/70 leading-relaxed mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                Some wishes come true quietly, in ways you don't always notice.
                May yours find its way to you.
              </p>
              <p className="text-plum-light italic text-lg" style={{ fontFamily: "'Dancing Script', cursive" }}>
                Goodnight, Mirchi. 💙
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
