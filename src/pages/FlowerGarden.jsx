import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { flowerMessages } from '../data/content';

function GardenFlower({ x, y, size, petalColor, centerColor, strokeColor, rotation, message, delay }) {
  const [bloomed, setBloomed] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setBloomed(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const petals = [0, 60, 120, 180, 240, 300];
  return (
    <motion.div
      ref={ref}
      className="absolute cursor-pointer group"
      style={{ left: `${x}%`, top: `${y}%`, transform: `rotate(${rotation}deg)` }}
      onClick={() => setShowMsg(!showMsg)}
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <svg width={size} height={size} viewBox="0 0 100 120" className="drop-shadow-lg">
        {/* Stem */}
        <motion.path
          d="M50 55 Q48 80 52 110"
          stroke="#7BA988"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: bloomed ? 1 : 0 }}
          transition={{ duration: 1, delay: delay / 1000, ease: 'easeOut' }}
        />
        {/* Leaf */}
        <motion.ellipse
          cx="42" cy="85" rx="8" ry="4"
          fill="#8BBE96"
          transform="rotate(-30 42 85)"
          initial={{ scale: 0 }}
          animate={{ scale: bloomed ? 1 : 0 }}
          transition={{ duration: 0.5, delay: delay / 1000 + 0.6 }}
        />
        {/* Petals */}
        {bloomed && petals.map((angle, i) => (
          <motion.ellipse
            key={i}
            cx="50" cy="35"
            rx="10" ry="22"
            fill={petalColor}
            stroke={strokeColor}
            strokeWidth="0.8"
            strokeOpacity="0.3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay / 1000 + 0.3 + i * 0.1, duration: 0.6, type: 'spring', stiffness: 200 }}
            transform={`rotate(${angle} 50 35)`}
            className="origin-center"
          />
        ))}
        {/* Center */}
        {bloomed && (
          <motion.circle
            cx="50" cy="35" r="8"
            fill={centerColor}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay / 1000 + 0.9, duration: 0.4 }}
          />
        )}
      </svg>

      {/* Message bubble */}
      <AnimatePresence>
        {showMsg && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 -translate-y-full z-20 w-48 p-3 rounded-2xl glass-light text-midnight text-sm text-center leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif", boxShadow: '0 10px 30px rgba(20,43,77,0.15)' }}
          >
            {message}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white/70" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FlowerGarden() {
  const [newBlooms, setNewBlooms] = useState([]);

  const flowers = [
    { id: 'f1', x: 10, y: 30, size: 100, petalColor: '#FFFFFF', centerColor: '#B99AB8', strokeColor: '#78A9E8', rotation: -5, message: flowerMessages[0], delay: 300 },
    { id: 'f2', x: 25, y: 55, size: 85, petalColor: '#B99AB8', centerColor: '#FFFFFF', strokeColor: '#704567', rotation: 8, message: flowerMessages[1], delay: 500 },
    { id: 'f3', x: 45, y: 40, size: 140, petalColor: '#FFFFFF', centerColor: '#B99AB8', strokeColor: '#78A9E8', rotation: 0, message: flowerMessages[2], delay: 700 },
    { id: 'f4', x: 62, y: 50, size: 95, petalColor: '#DCEBFA', centerColor: '#704567', strokeColor: '#78A9E8', rotation: -10, message: flowerMessages[3], delay: 900 },
    { id: 'f5', x: 78, y: 35, size: 90, petalColor: '#EEE6F2', centerColor: '#78A9E8', strokeColor: '#B99AB8', rotation: 12, message: flowerMessages[4], delay: 1100 },
    { id: 'f6', x: 88, y: 60, size: 80, petalColor: '#FFFFFF', centerColor: '#78A9E8', strokeColor: '#B99AB8', rotation: -7, message: flowerMessages[5], delay: 1300 },
    { id: 'f7', x: 18, y: 70, size: 75, petalColor: '#B99AB8', centerColor: '#FFFFFF', strokeColor: '#704567', rotation: 3, message: flowerMessages[6], delay: 1500 },
    { id: 'f8', x: 38, y: 68, size: 88, petalColor: '#FFFFFF', centerColor: '#704567', strokeColor: '#78A9E8', rotation: -8, message: flowerMessages[7], delay: 1700 },
    { id: 'f9', x: 70, y: 72, size: 82, petalColor: '#DCEBFA', centerColor: '#B99AB8', strokeColor: '#78A9E8', rotation: 6, message: flowerMessages[8], delay: 1900 },
  ];

  const bloomNew = () => {
    const id = `new-${Date.now()}`;
    const colors = [
      { p: '#FFFFFF', c: '#B99AB8', s: '#78A9E8' },
      { p: '#B99AB8', c: '#FFFFFF', s: '#704567' },
      { p: '#DCEBFA', c: '#704567', s: '#78A9E8' },
      { p: '#EEE6F2', c: '#78A9E8', s: '#B99AB8' },
    ];
    const col = colors[Math.floor(Math.random() * colors.length)];
    const newFlower = {
      id,
      x: Math.random() * 70 + 15,
      y: Math.random() * 30 + 55,
      size: Math.random() * 40 + 70,
      petalColor: col.p,
      centerColor: col.c,
      strokeColor: col.s,
      rotation: Math.random() * 30 - 15,
      message: flowerMessages[Math.floor(Math.random() * flowerMessages.length)],
      delay: 0,
    };
    setNewBlooms(prev => [...prev, newFlower]);
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #DCEBFA 0%, #B8D4F0 30%, #9EC2E8 60%, #78A9E8 100%)'
      }}
    >
      {/* Moon glow */}
      <div className="absolute top-10 right-10 md:right-20 w-48 h-48 rounded-full bg-ice/40 blur-3xl" />

      {/* Header */}
      <div className="relative pt-32 pb-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-xs tracking-[0.4em] uppercase text-white/90" style={{ fontFamily: "'Inter', sans-serif" }}>
            Flower Garden
          </span>
          <Sparkles className="w-4 h-4 text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-light text-white glow-text mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Flowers for Mirchi
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/80 max-w-xl mx-auto mb-8"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          A quiet garden, grown in your favorite colors. Click any flower to read a little note.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={bloomNew}
          className="px-8 py-3 rounded-full glass text-white text-sm tracking-widest uppercase"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          🌸 Make a Flower Bloom
        </motion.button>
      </div>

      {/* Garden area */}
      <div className="relative w-full h-[70vh] min-h-[500px]">
        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-24"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(123,169,136,0.3))' }}
        />
        {flowers.map(f => <GardenFlower key={f.id} {...f} />)}
        <AnimatePresence>
          {newBlooms.map(f => <GardenFlower key={f.id} {...f} />)}
        </AnimatePresence>

        {/* Floating petals */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full animate-fall pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-5%',
              background: ['#FFFFFF', '#B99AB8', '#DCEBFA'][i % 3],
              animationDuration: `${Math.random() * 8 + 8}s`,
              animationDelay: `${Math.random() * 10}s`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* Ground texture */}
      <div className="h-20" style={{ background: 'linear-gradient(180deg, rgba(123,169,136,0.3), rgba(120,169,232,0.2))' }} />
    </div>
  );
}
