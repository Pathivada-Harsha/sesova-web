import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollTo } from '../lib/smoothScroll';

// Scrolls to the hash target (20px above it) or to the top on navigation.
// Same-page anchors glide through Lenis; switching pages jumps instantly.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const prevPath = useRef(pathname);

  useEffect(() => {
    const samePage = prevPath.current === pathname;
    prevPath.current = pathname;
    const el = hash ? document.getElementById(hash.slice(1)) : null;
    if (samePage && el) {
      scrollTo(el, { offset: -20 });
      return;
    }
    scrollTo(el || 0, { offset: el ? -20 : 0, immediate: true });
  }, [pathname, hash]);

  return null;
}
