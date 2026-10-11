import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #142B4D 0%, #78A9E8 50%, #DCEBFA 100%)'
      }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative mb-8"
      >
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <motion.ellipse
              key={i}
              cx="50" cy="50" rx="12" ry="28"
              fill="white"
              opacity="0.9"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.9 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.6, ease: 'easeOut' }}
              transform={`rotate(${angle} 50 50) translate(0 -8)`}
            />
          ))}
          <motion.circle
            cx="50" cy="50" r="8"
            fill="#B99AB8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5, ease: 'easeOut' }}
          />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="text-center"
      >
        <h1
          className="text-4xl md:text-5xl font-semibold tracking-wide text-white glow-text"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          MIRCHI
        </h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '200px' }}
          transition={{ delay: 1.2, duration: 1, ease: 'easeInOut' }}
          className="h-0.5 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-3"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="mt-4 text-sm text-white/70 tracking-widest uppercase"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          A little world is being made for you...
        </motion.p>
      </motion.div>

      <motion.div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 2
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
