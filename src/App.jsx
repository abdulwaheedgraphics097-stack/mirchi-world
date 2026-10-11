import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import About from './pages/About';
import FlowerGarden from './pages/FlowerGarden';
import LoveNotes from './pages/LoveNotes';
import Memories from './pages/Memories';
import StarrySky from './pages/StarrySky';
import MusicMood from './pages/MusicMood';
import FinalSurprise from './pages/FinalSurprise';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/garden" element={<Layout><FlowerGarden /></Layout>} />
        <Route path="/notes" element={<Layout><LoveNotes /></Layout>} />
        <Route path="/memories" element={<Layout><Memories /></Layout>} />
        <Route path="/stars" element={<Layout><StarrySky /></Layout>} />
        <Route path="/music" element={<Layout><MusicMood /></Layout>} />
        <Route path="/surprise" element={<FinalSurprise />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>
      {!loading && (
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      )}
    </>
  );
}
