import React, { useEffect } from 'react';
import useHomeVals from '../hooks/useHomeVals';
import Hero from './home/Hero';
import Ecosystem from './home/Ecosystem';
import Fragmented from './home/Fragmented';
import Capabilities from './home/Capabilities';
import Architecture from './home/Architecture';
import PlatformScroll from './home/PlatformScroll';
import OrbitReveal from './home/OrbitReveal';
import Product from './home/Product';
import Solutions from './home/Solutions';
import Intelligence from './home/Intelligence';
import Demo from './home/Demo';
import VelocityMarquee from '../components/VelocityMarquee';
import DepthCarousel from '../components/DepthCarousel';
import { MODS } from '../data/content';

export default function Home() {
  const v = useHomeVals();

  useEffect(() => {
    document.title = 'SeSova — Connecting Portfolios. Commanding Certainty.';
  }, []);

  return (
    <div>
      <Hero v={v} />
      <Ecosystem v={v} />
      <Fragmented v={v} />
      <Capabilities v={v} />
      <VelocityMarquee items={v.marquee} />
      <Architecture v={v} />
      <PlatformScroll />
      <Product v={v} />
      <DepthCarousel groups={MODS} />
      <Solutions v={v} />
      <Intelligence v={v} />
      <OrbitReveal />
      <Demo v={v} />
    </div>
  );
}
