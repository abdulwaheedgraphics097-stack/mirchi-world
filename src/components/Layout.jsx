import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingPetals from './FloatingPetals';
import BackToTop from './BackToTop';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <FloatingPetals />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {children}
      </motion.main>
      <Footer />
      <BackToTop />
    </>
  );
}
