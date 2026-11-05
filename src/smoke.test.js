// React 18 wants this flag set for act() outside a test framework integration.
global.IS_REACT_ACT_ENVIRONMENT = true;

// gsap's package entry is ESM too, and jest resolves it there (webpack is fine
// with it). Animation is not what these tests are checking -- the render output
// and the preloader's state machine are -- so the animation layer is stubbed.
jest.mock('gsap', () => {
  const tween = { timeScale() { return tween; }, kill() {}, scrollTrigger: { kill() {} } };
  const g = {
    registerPlugin() {}, to: () => tween, fromTo: () => tween, set() {},
    ticker: { add() {}, remove() {}, lagSmoothing() {} },
    matchMedia: () => ({ add() {}, revert() {} })
  };
  return { __esModule: true, default: g, gsap: g };
});
jest.mock('gsap/ScrollTrigger', () => ({ __esModule: true, ScrollTrigger: { update() {}, create: () => ({ kill() {} }), kill() {}, refresh() {} } }));

// lenis ships ESM-only and CRA's jest does not transform node_modules, so the
// real module is never loaded here. A factory mock keeps this config-free.
jest.mock('lenis', () => ({ __esModule: true, default: class LenisStub { on() {} off() {} stop() {} start() {} raf() {} destroy() {} resize() {} } }));

import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import VelocityMarquee from './components/VelocityMarquee';
import Preloader from './components/Preloader';

// Temporary smoke test: these components can only be checked in a browser
// otherwise, so render them in jsdom and assert the guards hold.
const mq = (matches) => (q) => ({
  matches, media: q, onchange: null,
  addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {},
  dispatchEvent() { return false; }
});

let host;
let root;
beforeEach(() => {
  window.matchMedia = mq(false);
  sessionStorage.clear();
  host = document.createElement('div');
  document.body.appendChild(host);
  root = createRoot(host);
});
afterEach(() => {
  act(() => root.unmount());
  host.remove();
});

const render = (el) => { act(() => root.render(el)); };

const ITEMS = [
  { label: 'Credit appraisal', c: '#14707A' },
  { label: 'Bill of materials', c: '#0A3742' },
  // doubled, exactly as useHomeVals hands it over
  { label: 'Credit appraisal', c: '#14707A' },
  { label: 'Bill of materials', c: '#0A3742' }
];

describe('VelocityMarquee', () => {
  test('renders every label and hides the duplicated half from assistive tech', () => {
    render(<VelocityMarquee items={ITEMS} />);
    const all = host.querySelectorAll('.mq-item');
    expect(all.length).toBe(4);
    const hidden = host.querySelectorAll('.mq-item[aria-hidden="true"]');
    expect(hidden.length).toBe(2);
    // The hidden ones must be the second pass, not the first.
    expect(all[0].getAttribute('aria-hidden')).toBe(null);
    expect(all[2].getAttribute('aria-hidden')).toBe('true');
    expect(host.textContent).toContain('Credit appraisal');
  });

  test('renders nothing when there is no data', () => {
    render(<VelocityMarquee items={[]} />);
    expect(host.querySelector('section.mq')).toBe(null);
  });
});

describe('Preloader', () => {
  test('shows the curtain on a fresh tab', () => {
    render(<Preloader />);
    expect(host.querySelector('.pl')).not.toBe(null);
    expect(host.textContent).toContain('ONE CONNECTED ECOSYSTEM');
    expect(document.documentElement.classList.contains('preloading')).toBe(true);
  });

  test('stays away when reduced motion is requested', () => {
    window.matchMedia = mq(true);
    render(<Preloader />);
    expect(host.querySelector('.pl')).toBe(null);
    expect(document.documentElement.classList.contains('preloading')).toBe(false);
  });

  test('stays away on a second visit in the same tab', () => {
    sessionStorage.setItem('sesova:preloaded', '1');
    render(<Preloader />);
    expect(host.querySelector('.pl')).toBe(null);
  });

  test('lifts itself and restores scrolling once loading completes', async () => {
    render(<Preloader />);
    expect(document.body.style.overflow).toBe('hidden');
    // jsdom reports readyState 'complete', so the curtain should finish on its own.
    await act(async () => { await new Promise((r) => setTimeout(r, 2200)); });
    expect(host.querySelector('.pl')).toBe(null);
    expect(document.body.style.overflow).not.toBe('hidden');
    expect(document.documentElement.classList.contains('preloading')).toBe(false);
  }, 10000);
});

describe('DepthCarousel', () => {
  const GROUPS = [
    { label: 'Dashboard', shots: [{ label: 'Dashboard', file: 'dashboard.webp' }] },
    { label: 'Sales', shots: [
      { label: 'Leads', file: 'leads.webp' },
      { label: 'Clients', file: 'client.webp' },
      { label: 'Invoices', file: 'invoices.webp' }
    ] }
  ];
  const DepthCarousel = require('./components/DepthCarousel').default;

  test('renders the first group with the first card in front', () => {
    render(<DepthCarousel groups={GROUPS} />);
    expect(host.querySelectorAll('.dc-card').length).toBe(1);
    const front = host.querySelector('.dc-card[data-front="true"]');
    expect(front).not.toBe(null);
    expect(host.querySelector('.dc-count').textContent).toBe('01 / 01');
  });

  test('switching group resets to its first screen and shows all its cards', () => {
    render(<DepthCarousel groups={GROUPS} />);
    const chips = host.querySelectorAll('.dc-chip');
    act(() => { chips[1].dispatchEvent(new MouseEvent('click', { bubbles: true })); });
    expect(host.querySelectorAll('.dc-card').length).toBe(3);
    expect(host.querySelector('.dc-count').textContent).toBe('01 / 03');
    expect(host.querySelectorAll('.dc-chip')[1].getAttribute('aria-pressed')).toBe('true');
  });

  test('the next arrow advances the front card and depth is applied', () => {
    render(<DepthCarousel groups={GROUPS} />);
    act(() => { host.querySelectorAll('.dc-chip')[1].dispatchEvent(new MouseEvent('click', { bubbles: true })); });
    const next = host.querySelector('.dc-arrow[aria-label="Next screen"]');
    act(() => { next.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
    expect(host.querySelector('.dc-count').textContent).toBe('02 / 03');
    const cards = host.querySelectorAll('.dc-card');
    // The card now behind must be pushed back in Z and blurred.
    expect(cards[0].style.transform).toContain('translateZ(-190px)');
    expect(cards[0].style.filter).toContain('blur(1.4px)');
    // The front card sits flat at the origin.
    expect(cards[1].style.transform).toContain('translateZ(0px)');
    expect(cards[1].getAttribute('data-front')).toBe('true');
  });

  test('does not run past the last screen', () => {
    render(<DepthCarousel groups={GROUPS} />);
    const next = host.querySelector('.dc-arrow[aria-label="Next screen"]');
    act(() => { next.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
    // Group 0 has a single screen, so the counter must stay put.
    expect(host.querySelector('.dc-count').textContent).toBe('01 / 01');
  });

  test('renders nothing without data', () => {
    render(<DepthCarousel groups={[]} />);
    expect(host.querySelector('section.dc')).toBe(null);
  });
});

describe('PlatformScroll (side-scroller)', () => {
  const PlatformScroll = require('./pages/home/PlatformScroll').default;
  const { PF_LAYERS } = require('./data/content');

  test('renders the intro panel plus one card per layer', () => {
    render(<PlatformScroll />);
    expect(host.querySelector('.ps-intro')).not.toBe(null);
    expect(host.querySelectorAll('.ps-card').length).toBe(PF_LAYERS.length);
    expect(host.querySelector('#platform')).not.toBe(null);
  });

  test('each card carries its body copy and everything that layer holds', () => {
    render(<PlatformScroll />);
    const first = host.querySelectorAll('.ps-card')[0];
    expect(first.textContent).toContain(PF_LAYERS[0].label);
    expect(first.querySelector('.ps-body').textContent).toBe(PF_LAYERS[0].body);
    expect(first.querySelectorAll('.ps-holds li').length).toBe(PF_LAYERS[0].holds.length);
  });

  test('feeds resolve to the layers they point at, not raw indices', () => {
    render(<PlatformScroll />);
    const first = host.querySelectorAll('.ps-card')[0];
    const chips = [...first.querySelectorAll('.ps-feeds span')].slice(1).map((n) => n.textContent.trim());
    const expected = PF_LAYERS[0].feeds.map((i) => PF_LAYERS[i].n + ' ' + PF_LAYERS[i].label);
    expect(chips).toEqual(expected);
    // Guards the off-by-one that index-based references invite.
    expect(chips[0]).toBe('L2 Finance');
  });
});

describe('OrbitReveal (scroll scatter)', () => {
  const OrbitReveal = require('./pages/home/OrbitReveal').default;
  const num = (el, prop) => parseFloat(el.style.getPropertyValue(prop));

  test('renders the rings, the core statement and every tile', () => {
    render(<OrbitReveal />);
    expect(host.querySelectorAll('.or-tile').length).toBe(10);
    expect(host.querySelector('.or-core')).not.toBe(null);
    expect(host.querySelector('.or-rings')).not.toBe(null);
    expect(host.querySelector('#or-title').textContent).toContain('One record');
  });

  test('the first tile sits at twelve o_clock and the ring runs clockwise', () => {
    render(<OrbitReveal />);
    const tiles = host.querySelectorAll('.or-tile');
    // cos(-90) = 0, sin(-90) = -1 -> straight up once multiplied by the radius.
    expect(Math.abs(num(tiles[0], '--cx'))).toBeLessThan(1e-9);
    expect(num(tiles[0], '--cy')).toBeCloseTo(-1, 5);
    // Next one must be up and to the RIGHT, or the ring runs backwards.
    expect(num(tiles[1], '--cx')).toBeGreaterThan(0);
    expect(num(tiles[1], '--cy')).toBeLessThan(0);
  });

  test('every tile stays on the ring and never collapses to the centre', () => {
    render(<OrbitReveal />);
    host.querySelectorAll('.or-tile').forEach((t) => {
      const r = Math.hypot(num(t, '--cx'), num(t, '--cy'));
      // Radius multipliers run 0.86..1.06, so nothing should fall outside this.
      expect(r).toBeGreaterThan(0.8);
      expect(r).toBeLessThan(1.1);
    });
  });

  test('the stagger constant matches its delay, so no tile divides by zero', () => {
    render(<OrbitReveal />);
    host.querySelectorAll('.or-tile').forEach((t) => {
      const d = num(t, '--d');
      const k = num(t, '--k');
      expect(d).toBeGreaterThanOrEqual(0);
      expect(d).toBeLessThan(1);
      // --pi is (p - d) * k, so k must be exactly 1/(1-d) for it to reach 1.
      expect(k).toBeCloseTo(1 / (1 - d), 6);
    });
  });
});
