import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ToTopButton from './components/ToTopButton';
import ScrollToTop from './components/ScrollToTop';
import Preloader from './components/Preloader';
import { DemoModalProvider } from './components/DemoModal';
import useLayoutVals from './hooks/useLayoutVals';
import useReveal from './hooks/useReveal';
import { initSmoothScroll } from './lib/smoothScroll';
import Home from './pages/Home';

// Every element with a scroll-in animation; each gets `.inview` while on screen,
// so the animation replays whenever its section is scrolled back into view.
const ANIMATED = '[data-rise],[data-blur],[data-wipe],[data-in],[data-bar],[data-draw],.hx-dia';

function Layout() {
  const v = useLayoutVals();
  useReveal(ANIMATED, 0, 'inview');
  // Returns its own teardown, so it doubles as the effect cleanup.
  useEffect(() => initSmoothScroll(), []);
  return (
    <div style={{ minHeight: '100vh', background: '#FCFBF8' }}>
      <Preloader />
      <Header v={v} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <ToTopButton v={v} />
      <Footer v={v} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <DemoModalProvider>
        <Layout />
      </DemoModalProvider>
    </BrowserRouter>
  );
}
