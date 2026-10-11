import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Star, Moon } from 'lucide-react';
import Flower from '../components/Flower';

export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMouse({
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      });
    };
    const el = heroRef.current;
    if (el) el.addEventListener('mousemove', onMove);
    return () => el && el.removeEventListener('mousemove', onMove);
  }, []);

  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    dur: Math.random() * 3 + 2,
    delay: Math.random() * 4,
  }));

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #142B4D 0%, #2d5a9e 35%, #78A9E8 65%, #DCEBFA 100%)'
      }}
    >
      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map(s => (
          <motion.div
            key={s.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDuration: `${s.dur}s`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Moon */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: '10%',
          right: '10%',
        }}
        animate={{
          x: mouse.x * -30,
          y: mouse.y * -30,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      >
        <div className="relative">
          <Moon className="w-28 h-28 md:w-40 md:h-40 text-ice fill-ice/80" strokeWidth={0.5} />
          <div className="absolute inset-0 rounded-full glow-blue" />
        </div>
      </motion.div>

      {/* Clouds */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-96 h-40 rounded-full bg-white/10 blur-3xl animate-drift"
          style={{ top: '15%', left: '5%' }}
        />
        <motion.div
          className="absolute w-80 h-32 rounded-full bg-white/8 blur-3xl animate-drift"
          style={{ top: '40%', right: '5%', animationDelay: '-8s' }}
        />
        <motion.div
          className="absolute w-64 h-28 rounded-full bg-plum-light/10 blur-3xl animate-drift"
          style={{ bottom: '20%', left: '20%', animationDelay: '-15s' }}
        />
      </div>

      {/* Floating flowers */}
      <motion.div
        className="absolute pointer-events-none animate-float"
        style={{ top: '20%', left: '8%' }}
      >
        <Flower size={70} petalColor="#FFFFFF" centerColor="#B99AB8" delay={0.3} />
      </motion.div>
      <motion.div
        className="absolute pointer-events-none animate-float-slow"
        style={{ bottom: '22%', left: '12%', animationDelay: '-3s' }}
      >
        <Flower size={50} petalColor="#B99AB8" centerColor="#FFFFFF" strokeColor="#704567" delay={0.6} />
      </motion.div>
      <motion.div
        className="absolute pointer-events-none animate-float"
        style={{ top: '30%', right: '18%', animationDelay: '-2s' }}
      >
        <Flower size={40} petalColor="#FFFFFF" centerColor="#78A9E8" delay={0.9} />
      </motion.div>
      <motion.div
        className="absolute pointer-events-none animate-float-slow"
        style={{ bottom: '30%', right: '8%', animationDelay: '-5s' }}
      >
        <Flower size={55} petalColor="#DCEBFA" centerColor="#704567" strokeColor="#78A9E8" delay={1.2} />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <Sparkles className="w-4 h-4 text-plum-light" />
          <span
            className="text-xs md:text-sm tracking-[0.4em] uppercase text-white/70"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            A little world is waiting
          </span>
          <Sparkles className="w-4 h-4 text-plum-light" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="mb-6"
        >
          <span
            className="block text-lg md:text-2xl text-white/80 italic font-light mb-2"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Welcome to
          </span>
          <span
            className="block text-6xl sm:text-7xl md:text-9xl font-light tracking-wider text-white glow-text"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            MIRCHI
          </span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="w-40 h-px bg-gradient-to-r from-transparent via-plum-light to-transparent mx-auto mb-8"
        />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="text-2xl md:text-4xl font-light text-white mb-4 leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          A Little World Made Just for You
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="text-base md:text-lg text-white/70 max-w-xl mx-auto mb-12 leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Some people make ordinary moments feel a little more magical.
          <br className="hidden md:block" />
          Welcome to a small corner of the internet, made in the colors you love.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <Link to="/about">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255,255,255,0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="group relative px-10 py-4 rounded-full glass text-white tracking-widest text-sm uppercase overflow-hidden"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className="relative z-10 flex items-center gap-3">
                Enter Your Little World
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Mini nav preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.3 }}
          className="mt-20 flex flex-wrap justify-center gap-3 text-white/60 text-xs tracking-wider"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {['Flowers', 'Stars', 'Notes', 'Memories', 'Music'].map((t, i) => (
            <span key={i} className="flex items-center gap-2">
              <Star className="w-3 h-3" /> {t}
              {i < 4 && <span className="text-white/30">·</span>}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-ice" />
    </section>
  );
}
