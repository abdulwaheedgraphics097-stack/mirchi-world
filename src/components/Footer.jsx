import { Flower2, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative mt-20 py-12 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(20,43,77,0.05) 100%)' }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Flower2 className="w-5 h-5 text-primary" strokeWidth={1.5} />
          <span
            className="text-2xl text-midnight tracking-wider"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            A little world for <span className="font-semibold text-gradient-blue">Mirchi</span>
          </span>
          <Flower2 className="w-5 h-5 text-plum-light" strokeWidth={1.5} />
        </div>
        <p className="text-sm text-midnight/50 tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>
          Made with <Heart className="w-3 h-3 inline text-plum fill-plum" /> and blue skies, just for you.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          {['#78A9E8', '#FFFFFF', '#B99AB8', '#DCEBFA', '#704567'].map((c, i) => (
            <div key={i} className="w-2 h-2 rounded-full" style={{ background: c, border: c === '#FFFFFF' ? '1px solid #DCE3EE' : 'none' }} />
          ))}
        </div>
      </div>
    </footer>
  );
}
