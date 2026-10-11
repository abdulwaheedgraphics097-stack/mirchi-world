import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import Flower from '../components/Flower';
import { appreciationCards } from '../data/content';

function Card({ card, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '1.2 0.6'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="group relative"
    >
      <motion.div
        whileHover={{ y: -8, rotateY: 3 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative h-full rounded-3xl p-8 md:p-10 overflow-hidden glass-light hover:shadow-2xl transition-shadow duration-500"
        style={{ boxShadow: '0 10px 40px rgba(20,43,77,0.08)' }}
      >
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-gradient-to-br from-primary/10 to-plum-light/20 -translate-y-10 translate-x-10 group-hover:scale-125 transition-transform duration-700" />

        <div className="relative">
          <div className="flex items-start justify-between mb-6">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: index % 2 === 0 ? 'linear-gradient(135deg,#78A9E8,#DCEBFA)' : 'linear-gradient(135deg,#B99AB8,#EEE6F2)' }}
            >
              <Heart className="w-5 h-5 text-white fill-white/50" strokeWidth={2} />
            </div>
            <span className="text-xs tracking-widest text-midnight/30">0{index + 1}</span>
          </div>

          <h3
            className="text-2xl md:text-3xl font-semibold text-midnight mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {card.title}
          </h3>

          <div className="w-12 h-px bg-gradient-to-r from-primary to-plum-light mb-5" />

          <p className="text-midnight/70 leading-relaxed text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
            {card.message}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="relative min-h-screen">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #F2F8FF 0%, #DCEBFA 50%, #F2F8FF 100%)'
        }}
      >
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex justify-center mb-8"
          >
            <Flower size={80} petalColor="#FFFFFF" centerColor="#B99AB8" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className="w-4 h-4 text-plum" />
            <span className="text-xs tracking-[0.4em] uppercase text-plum" style={{ fontFamily: "'Inter', sans-serif" }}>
              About Mirchi
            </span>
            <Sparkles className="w-4 h-4 text-plum" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light text-midnight leading-tight mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            There is something <br />
            <span className="italic text-gradient-blue font-normal">special</span> about you.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-midnight/60 text-lg leading-relaxed max-w-xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            A few small things worth saying — not because they are new,
            but because they are true, and sometimes the truth is nice to read.
          </motion.p>
        </motion.div>

        <div className="absolute top-20 left-10 opacity-40 animate-float">
          <Flower size={50} petalColor="#FFFFFF" centerColor="#78A9E8" />
        </div>
        <div className="absolute bottom-32 right-12 opacity-40 animate-float-slow">
          <Flower size={65} petalColor="#EEE6F2" centerColor="#704567" strokeColor="#B99AB8" />
        </div>
      </section>

      {/* Cards */}
      <section className="relative py-20 md:py-32 px-6 bg-ice">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {appreciationCards.map((card, i) => (
              <Card key={card.id} card={card} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="relative py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <Flower size={60} petalColor="#B99AB8" centerColor="#FFFFFF" strokeColor="#704567" />
          <p
            className="mt-8 text-xl md:text-2xl italic text-midnight/70 leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            "And above all — remember: you don't have to be anything other than exactly
            who you are to be deeply, quietly wonderful."
          </p>
          <p className="mt-4 text-sm tracking-widest text-plum uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
            — A little note for you
          </p>
        </div>
      </section>
    </div>
  );
}
