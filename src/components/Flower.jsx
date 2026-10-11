import { motion } from 'framer-motion';

export default function Flower({
  size = 60,
  petalColor = '#FFFFFF',
  centerColor = '#B99AB8',
  strokeColor = '#78A9E8',
  className = '',
  delay = 0,
  style = {}
}) {
  const petals = [0, 60, 120, 180, 240, 300];
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={style}
      initial={{ scale: 0, rotate: -30 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 1.2, delay, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {petals.map((angle, i) => (
        <motion.ellipse
          key={i}
          cx="50" cy="50" rx="11" ry="26"
          fill={petalColor}
          stroke={strokeColor}
          strokeWidth="1"
          strokeOpacity="0.3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.15 + i * 0.08, duration: 0.5, ease: 'easeOut' }}
          transform={`rotate(${angle} 50 50) translate(0 -10)`}
        />
      ))}
      <motion.circle
        cx="50" cy="50" r="9"
        fill={centerColor}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.7, duration: 0.4, ease: 'easeOut' }}
      />
    </motion.svg>
  );
}
