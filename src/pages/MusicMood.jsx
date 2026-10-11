import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Music } from 'lucide-react';
import { playlist } from '../data/content';

function Waveform({ playing }) {
  const bars = 20;
  return (
    <div className="flex items-end gap-0.5 h-12">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full"
          style={{
            background: `linear-gradient(to top, #78A9E8, #B99AB8)`,
            height: '20%',
          }}
          animate={playing ? {
            height: ['20%', `${Math.random() * 80 + 20}%`, '20%'],
          } : { height: '20%' }}
          transition={{
            duration: 0.5 + Math.random() * 0.5,
            repeat: playing ? Infinity : 0,
            delay: i * 0.05,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

function Vinyl({ playing }) {
  return (
    <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto">
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ rotate: playing ? 360 : 0 }}
        transition={{ duration: 8, repeat: playing ? Infinity : 0, ease: 'linear' }}
        style={{
          background: 'radial-gradient(circle at center, #2a2a2a 0%, #1a1a1a 40%, #111 80%)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 0 30px rgba(0,0,0,0.5)',
        }}
      >
        {/* Grooves */}
        {[40, 50, 60, 70, 80].map((r, i) => (
          <div key={i} className="absolute rounded-full border border-white/5"
            style={{ inset: `${100 - r}%`, borderWidth: '1px' }}
          />
        ))}
        {/* Label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-1/3 h-1/3 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #78A9E8, #704567)' }}
          >
            <Music className="w-6 h-6 text-white" strokeWidth={1.5} />
          </div>
        </div>
        {/* Center hole */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-black" />
      </motion.div>
    </div>
  );
}

export default function MusicMood() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const iv = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + 0.3));
    }, 100);
    return () => clearInterval(iv);
  }, [playing]);

  const track = playlist[current];

  const next = () => {
    setCurrent(c => (c + 1) % playlist.length);
    setProgress(0);
  };
  const prev = () => {
    setCurrent(c => (c - 1 + playlist.length) % playlist.length);
    setProgress(0);
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #142B4D 0%, #2d4a7a 40%, #78A9E8 100%)' }}
    >
      {/* Floating notes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-white/10 pointer-events-none animate-float-slow"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 40 + 20}px`,
            animationDelay: `${-Math.random() * 8}s`,
          }}
        >
          ♪
        </motion.div>
      ))}

      {/* Header */}
      <div className="relative pt-32 pb-8 px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-xs tracking-[0.4em] uppercase text-primary" style={{ fontFamily: "'Inter', sans-serif" }}>
            Music & Mood
          </span>
          <Sparkles className="w-4 h-4 text-primary" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-light text-white glow-text mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          A Soundtrack for <span className="italic text-plum-light">Your Little World</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/60 max-w-xl mx-auto"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          A playlist waiting for your favorite songs. Add music that reminds you of soft evenings and kind moments.
        </motion.p>
      </div>

      {/* Player */}
      <div className="relative px-6 pb-16 z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="rounded-3xl glass-dark p-8 md:p-12 mb-10"
            style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.3)' }}
          >
            <Vinyl playing={playing} />

            <div className="mt-10 text-center">
              <h3 className="text-2xl md:text-3xl text-white mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {track.title}
              </h3>
              <p className="text-white/60 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                {track.artist}
              </p>

              <div className="flex justify-center mb-6">
                <Waveform playing={playing && !muted} />
              </div>

              {/* Progress */}
              <div className="mb-6">
                <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, #78A9E8, #B99AB8)',
                      width: `${progress}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-white/40" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <span>{Math.floor(progress * 0.03)}:{String(Math.floor((progress * 0.03 % 1) * 60)).padStart(2, '0')}</span>
                  <span>{track.duration}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6">
                <button onClick={prev} className="text-white/70 hover:text-white transition" aria-label="Previous">
                  <SkipBack size={22} />
                </button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPlaying(!playing)}
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white"
                  style={{
                    background: 'linear-gradient(135deg, #78A9E8, #704567)',
                    boxShadow: '0 10px 30px rgba(120,169,232,0.4)',
                  }}
                  aria-label={playing ? 'Pause' : 'Play'}
                >
                  {playing ? <Pause size={22} fill="white" /> : <Play size={22} fill="white" className="ml-1" />}
                </motion.button>
                <button onClick={next} className="text-white/70 hover:text-white transition" aria-label="Next">
                  <SkipForward size={22} />
                </button>
                <button onClick={() => setMuted(!muted)} className="text-white/70 hover:text-white transition ml-4" aria-label="Mute">
                  {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Playlist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="rounded-3xl glass-dark overflow-hidden"
          >
            <div className="p-6 border-b border-white/10">
              <h3 className="text-xl text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Your Playlist
              </h3>
              <p className="text-sm text-white/50 mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                Add your own songs when you're ready.
              </p>
            </div>
            <div>
              {playlist.map((t, i) => (
                <motion.button
                  key={t.id}
                  onClick={() => { setCurrent(i); setProgress(0); }}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                  className={`w-full flex items-center gap-4 p-4 md:p-5 text-left transition-colors ${
                    i === current ? 'bg-white/5' : ''
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    i === current ? 'bg-gradient-to-br from-primary to-plum' : 'bg-white/10'
                  }`}>
                    {i === current && playing ? (
                      <div className="flex items-end gap-0.5 h-3">
                        {[0, 1, 2].map(b => (
                          <motion.div key={b} className="w-0.5 bg-white rounded"
                            animate={{ height: ['30%', '100%', '30%'] }}
                            transition={{ duration: 0.4, repeat: Infinity, delay: b * 0.1 }}
                          />
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm text-white/60" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`truncate ${i === current ? 'text-primary' : 'text-white'}`} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem' }}>
                      {t.title}
                    </p>
                    <p className="text-sm text-white/50 truncate" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {t.artist}
                    </p>
                  </div>
                  <span className="text-xs text-white/40" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {t.duration}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <p className="text-center text-white/40 text-sm mt-6" style={{ fontFamily: "'Inter', sans-serif" }}>
            Note: This is a visual player preview. Upload or link your audio files to make it play real music.
          </p>
        </div>
      </div>
    </div>
  );
}
