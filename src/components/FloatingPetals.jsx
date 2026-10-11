import { useMemo } from 'react';

export default function FloatingPetals({ count = 12, colors = ['#FFFFFF', '#B99AB8', '#DCEBFA', '#78A9E8'] }) {
  const petals = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 14 + 8,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 15,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.5 + 0.3,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {petals.map(p => (
        <div
          key={p.id}
          className="absolute animate-fall"
          style={{
            left: `${p.left}%`,
            top: '-5%',
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        >
          <svg viewBox="0 0 20 20" fill={p.color}>
            <ellipse cx="10" cy="6" rx="5" ry="8" opacity="0.85" />
          </svg>
        </div>
      ))}
    </div>
  );
}
