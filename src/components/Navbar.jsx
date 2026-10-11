import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Flower2 } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Mirchi' },
  { to: '/garden', label: 'Flower Garden' },
  { to: '/notes', label: 'Love Notes' },
  { to: '/memories', label: 'Memories' },
  { to: '/stars', label: 'Starry Sky' },
  { to: '/music', label: 'Music & Mood' },
  { to: '/surprise', label: 'Final Surprise' }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-dark py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 45, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Flower2 className="w-6 h-6 text-primary" strokeWidth={1.5} />
            </motion.div>
            <span
              className="text-lg md:text-xl text-white tracking-wide"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              For <span className="font-semibold text-primary">Mirchi</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm tracking-wide transition-colors duration-300 rounded-full ${
                    isActive
                      ? 'text-primary'
                      : 'text-white/80 hover:text-white'
                  }`
                }
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-full bg-white/10 -z-10"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-white p-2 rounded-full glass-dark"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 lg:hidden glass-dark flex flex-col items-center justify-center gap-3"
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `block px-6 py-3 text-xl tracking-wider transition-colors ${
                      isActive ? 'text-primary' : 'text-white/90'
                    }`
                  }
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {item.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
