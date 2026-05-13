"""
CONCEPT A — EDITORIAL HEIRLOOM
================================
Premium magazine-meets-fine-art gallery direction. Closest to EKP's current
DNA but elevated significantly. Black + cream + gold heavy. Italiana display.
Symmetrical, classical, breathing room.

Builds all 8 pages by running this script:
    python3 _build.py
"""

from pathlib import Path
from textwrap import dedent

HERE = Path(__file__).parent

# -- IMAGES (Unsplash CDN, free-license portrait imagery) ---------------------
# All sized via Unsplash URL params for performance.

IMG = {
    "hero_senior_a": "https://images.unsplash.com/photo-1502323777036-f29e3972d82f?w=2000&q=80&auto=format",
    "hero_senior_b": "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=2000&q=80&auto=format",
    "hero_family": "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=2000&q=80&auto=format",
    "senior_g_1": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80&auto=format",
    "senior_g_2": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=80&auto=format",
    "senior_g_3": "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=1200&q=80&auto=format",
    "senior_g_4": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1200&q=80&auto=format",
    "senior_b_1": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200&q=80&auto=format",
    "senior_b_2": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=1200&q=80&auto=format",
    "senior_b_3": "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=1200&q=80&auto=format",
    "family_1": "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1200&q=80&auto=format",
    "family_2": "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&q=80&auto=format",
    "family_3": "https://images.unsplash.com/photo-1581952976147-5a2d15560349?w=1200&q=80&auto=format",
    "family_4": "https://images.unsplash.com/photo-1581952976147-5a2d15560349?w=1200&q=80&auto=format",
    "lake_1": "https://images.unsplash.com/photo-1517824806704-9040b037703b?w=1200&q=80&auto=format",
    "emily_portrait": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=900&q=80&auto=format",
    "detail_florals": "https://images.unsplash.com/photo-1591084728795-1149f32d9866?w=900&q=80&auto=format",
    "detail_album": "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=900&q=80&auto=format",
    "detail_dress": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=900&q=80&auto=format",
    "journal_1": "https://images.unsplash.com/photo-1492447166138-50c3889fccb1?w=1400&q=80&auto=format",
    "journal_2": "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=1400&q=80&auto=format",
    "journal_3": "https://images.unsplash.com/photo-1532635241-17e820acc59f?w=1400&q=80&auto=format",
}

# -- CSS ---------------------------------------------------------------------

CSS = """
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Italiana&family=Inter:wght@300;400;500;600;700&display=swap');

:root {
    --ink: #1A1A1A;
    --paper: #FAF7F2;
    --paper-warm: #F4EFE6;
    --black: #000000;
    --gold: #C2A36C;
    --gold-soft: #D4BC8A;
    --blush: #DCB6AD;
    --aqua: #B3D4CD;
    --gray: #D6D4D4;
    --muted: #6B655C;
    --rule: #E5DFD3;

    --serif-display: 'Italiana', 'Cormorant Garamond', Georgia, serif;
    --serif-body: 'Cormorant Garamond', Georgia, serif;
    --sans: 'Inter', system-ui, -apple-system, sans-serif;

    --max: 1280px;
    --pad: clamp(1.25rem, 4vw, 3.5rem);
    --section: clamp(4rem, 9vw, 8rem);
}

* { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
    margin: 0;
    background: var(--paper);
    color: var(--ink);
    font-family: var(--sans);
    font-size: 16px;
    line-height: 1.65;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
}

img { display: block; max-width: 100%; height: auto; }

a { color: inherit; text-decoration: none; }

/* ---------- Layout ---------- */

.shell { max-width: var(--max); margin: 0 auto; padding: 0 var(--pad); }

.section { padding: var(--section) 0; }

.section-band-black {
    background: var(--black);
    color: var(--paper);
    padding: var(--section) 0;
}

/* ---------- Typography ---------- */

.eyebrow {
    font-family: var(--sans);
    font-size: 0.72rem;
    letter-spacing: 0.42em;
    text-transform: uppercase;
    font-weight: 500;
    color: var(--gold);
    margin: 0 0 1.25rem 0;
}

.display {
    font-family: var(--serif-display);
    font-weight: 400;
    font-size: clamp(3.2rem, 8.5vw, 7.5rem);
    line-height: 0.96;
    letter-spacing: -0.01em;
    margin: 0;
    color: inherit;
}

.heading-1 {
    font-family: var(--serif-body);
    font-weight: 400;
    font-size: clamp(2rem, 4.5vw, 3.4rem);
    line-height: 1.08;
    letter-spacing: -0.005em;
    margin: 0 0 1rem 0;
}

.heading-2 {
    font-family: var(--serif-body);
    font-weight: 500;
    font-size: clamp(1.4rem, 2.4vw, 2rem);
    line-height: 1.2;
    margin: 0 0 0.75rem 0;
}

.lead {
    font-family: var(--serif-body);
    font-style: italic;
    font-weight: 400;
    font-size: clamp(1.15rem, 1.8vw, 1.5rem);
    line-height: 1.5;
    color: #2A2A2A;
    max-width: 32em;
    margin: 0 0 1.5rem 0;
}

p { margin: 0 0 1rem 0; }

.muted { color: var(--muted); }

/* ---------- Buttons & links ---------- */

.btn, .link-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    font-family: var(--sans);
    font-weight: 500;
    font-size: 0.78rem;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    padding: 1rem 2rem;
    border: 1px solid var(--ink);
    background: var(--ink);
    color: var(--paper);
    transition: all 250ms ease;
    cursor: pointer;
}
.btn:hover { background: var(--gold); border-color: var(--gold); color: var(--ink); }

.btn-ghost {
    background: transparent;
    color: var(--ink);
    border-color: var(--ink);
}
.btn-ghost:hover { background: var(--ink); color: var(--paper); }

.btn-on-dark {
    background: transparent;
    color: var(--paper);
    border-color: var(--paper);
}
.btn-on-dark:hover { background: var(--gold); color: var(--ink); border-color: var(--gold); }

.link-cta {
    border: none;
    background: transparent;
    color: var(--ink);
    padding: 0;
    border-bottom: 1px solid var(--gold);
    padding-bottom: 4px;
}
.link-cta:hover { color: var(--gold); }

.link-cta::after { content: " ⟶"; }

/* ---------- Header ---------- */

.site-header {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(250, 247, 242, 0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 0.5px solid var(--rule);
}

.site-header.on-dark {
    background: rgba(0, 0, 0, 0.65);
    border-bottom-color: rgba(255, 255, 255, 0.1);
    color: var(--paper);
}

.nav-shell {
    max-width: var(--max);
    margin: 0 auto;
    padding: 1rem var(--pad);
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 2rem;
}

.nav-shell .brand {
    font-family: var(--serif-display);
    font-size: 1.4rem;
    letter-spacing: 0.01em;
    text-align: center;
    text-transform: lowercase;
}

.nav-shell .brand small {
    display: block;
    font-family: var(--sans);
    font-size: 0.55rem;
    letter-spacing: 0.45em;
    text-transform: uppercase;
    margin-top: 4px;
    color: var(--muted);
}

.nav-primary, .nav-secondary {
    display: flex;
    gap: 1.8rem;
    font-family: var(--sans);
    font-size: 0.74rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    font-weight: 500;
}

.nav-primary a, .nav-secondary a {
    position: relative;
    padding-bottom: 2px;
    transition: color 200ms ease;
}

.nav-primary a:hover, .nav-secondary a:hover { color: var(--gold); }
.nav-primary a.is-active, .nav-secondary a.is-active { color: var(--gold); }
.nav-primary a.is-active::after, .nav-secondary a.is-active::after {
    content: ""; position: absolute; left: 0; right: 0; bottom: -4px;
    height: 1px; background: var(--gold);
}

.nav-secondary { justify-content: flex-end; }
.nav-primary { justify-content: flex-start; }

.nav-mobile-toggle {
    display: none;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    width: 28px;
    height: 18px;
    position: relative;
}
.nav-mobile-toggle span {
    position: absolute;
    left: 0; right: 0;
    height: 1px;
    background: var(--ink);
    transition: all 250ms ease;
}
.nav-mobile-toggle span:nth-child(1) { top: 0; }
.nav-mobile-toggle span:nth-child(2) { top: 8px; }
.nav-mobile-toggle span:nth-child(3) { top: 16px; }

.nav-mobile-toggle[aria-expanded="true"] span:nth-child(1) { top: 8px; transform: rotate(45deg); }
.nav-mobile-toggle[aria-expanded="true"] span:nth-child(2) { opacity: 0; }
.nav-mobile-toggle[aria-expanded="true"] span:nth-child(3) { top: 8px; transform: rotate(-45deg); }

.nav-mobile-panel {
    display: none;
    background: var(--paper);
    border-top: 0.5px solid var(--rule);
    padding: 1.5rem var(--pad);
}
.nav-mobile-panel.is-open { display: block; }
.nav-mobile-panel ul { list-style: none; padding: 0; margin: 0; }
.nav-mobile-panel li {
    font-family: var(--serif-body);
    font-size: 1.6rem;
    padding: 0.6rem 0;
    border-bottom: 0.5px solid var(--rule);
}
.nav-mobile-panel li:last-child { border-bottom: none; }
.nav-mobile-panel li a:hover { color: var(--gold); }

@media (max-width: 900px) {
    .nav-shell { grid-template-columns: 1fr auto auto; gap: 1rem; }
    .nav-primary { display: none; }
    .nav-secondary { display: none; }
    .nav-mobile-toggle { display: block; }
    .nav-shell .brand { font-size: 1.15rem; text-align: left; }
}

/* ---------- HERO ---------- */

.hero {
    position: relative;
    min-height: 92vh;
    display: flex;
    align-items: flex-end;
    padding: var(--pad);
    color: var(--paper);
    background: var(--black);
    overflow: hidden;
}

.hero-image {
    position: absolute; inset: 0;
    background-size: cover;
    background-position: center;
    filter: brightness(0.78);
}

.hero-image::after {
    content: ""; position: absolute; inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 80%);
}

.hero-content {
    position: relative;
    max-width: var(--max);
    margin: 0 auto;
    width: 100%;
    padding: 0 0 4rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: end;
}

.hero-content .issue {
    font-family: var(--serif-display);
    font-size: clamp(4rem, 10vw, 9rem);
    line-height: 0.85;
    margin: 0 0 1rem 0;
    color: var(--paper);
}

.hero-content .issue-meta {
    font-family: var(--sans);
    font-size: 0.7rem;
    letter-spacing: 0.42em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 0.8rem;
}

.hero-content .lead-block {
    border-left: 1px solid rgba(255,255,255,0.4);
    padding-left: 2rem;
}

.hero-content h1 {
    font-family: var(--serif-display);
    font-weight: 400;
    font-size: clamp(2.6rem, 5.5vw, 4.6rem);
    line-height: 1.0;
    margin: 0 0 1.5rem 0;
    color: var(--paper);
}

.hero-content p {
    font-family: var(--serif-body);
    font-style: italic;
    font-size: clamp(1rem, 1.5vw, 1.25rem);
    line-height: 1.55;
    max-width: 26em;
    color: rgba(250, 247, 242, 0.92);
}

@media (max-width: 900px) {
    .hero { min-height: 78vh; }
    .hero-content { grid-template-columns: 1fr; gap: 2rem; padding-bottom: 2rem; }
    .hero-content .lead-block { border-left: none; padding-left: 0; border-top: 1px solid rgba(255,255,255,0.3); padding-top: 1.5rem; }
}

/* ---------- Magazine numbering ---------- */

.numbered-section { display: grid; grid-template-columns: 100px 1fr; gap: 3rem; align-items: start; }
.numbered-section .num {
    font-family: var(--serif-display);
    font-size: 3.2rem;
    line-height: 1;
    color: var(--gold);
}
.numbered-section .body-col { max-width: 56ch; }

@media (max-width: 700px) {
    .numbered-section { grid-template-columns: 1fr; gap: 0.8rem; }
    .numbered-section .num { font-size: 2.4rem; }
}

/* ---------- Service cards ---------- */

.service-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(2rem, 5vw, 5rem);
    align-items: start;
}

.service-card {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
}

.service-card .img-frame {
    overflow: hidden;
    background: var(--gray);
    aspect-ratio: 4 / 5;
}

.service-card .img-frame img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 800ms ease;
}

.service-card:hover .img-frame img { transform: scale(1.04); }

.service-card .num {
    font-family: var(--serif-display);
    font-size: 1.4rem;
    color: var(--gold);
    line-height: 1;
    margin-top: 0.5rem;
}

.service-card h3 {
    font-family: var(--serif-display);
    font-weight: 400;
    font-size: clamp(2rem, 3.5vw, 2.8rem);
    margin: 0 0 0.5rem 0;
    line-height: 1.05;
}

.service-card p { color: #2A2A2A; }

@media (max-width: 800px) {
    .service-grid { grid-template-columns: 1fr; }
}

/* ---------- Portfolio grid ---------- */

.portfolio-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1rem;
}

.portfolio-grid .tile { overflow: hidden; background: var(--gray); }
.portfolio-grid .tile img { width: 100%; height: 100%; object-fit: cover; transition: transform 800ms ease; }
.portfolio-grid .tile:hover img { transform: scale(1.04); }

.portfolio-grid .tile.t-3 { grid-column: span 3; aspect-ratio: 3 / 4; }
.portfolio-grid .tile.t-4 { grid-column: span 4; aspect-ratio: 3 / 4; }
.portfolio-grid .tile.t-5 { grid-column: span 5; aspect-ratio: 4 / 5; }
.portfolio-grid .tile.t-6 { grid-column: span 6; aspect-ratio: 4 / 5; }
.portfolio-grid .tile.t-7 { grid-column: span 7; aspect-ratio: 16 / 11; }
.portfolio-grid .tile.t-8 { grid-column: span 8; aspect-ratio: 3 / 2; }
.portfolio-grid .tile.t-12 { grid-column: span 12; aspect-ratio: 16 / 7; }

@media (max-width: 800px) {
    .portfolio-grid .tile { grid-column: span 12 !important; aspect-ratio: 4 / 5 !important; }
}

/* ---------- Pull quote ---------- */

.pull-quote {
    text-align: center;
    max-width: 36ch;
    margin: 0 auto;
}

.pull-quote q {
    font-family: var(--serif-display);
    font-size: clamp(1.8rem, 4vw, 3.2rem);
    line-height: 1.15;
    quotes: '“' '”';
    font-weight: 400;
    color: var(--paper);
}

.pull-quote q::before { content: open-quote; }
.pull-quote q::after { content: close-quote; }

.pull-quote .attribution {
    margin-top: 2rem;
    font-family: var(--sans);
    font-size: 0.72rem;
    letter-spacing: 0.42em;
    text-transform: uppercase;
    color: var(--gold);
}

.gold-rule { display: block; width: 60px; height: 1px; background: var(--gold); margin: 2rem auto; }

/* ---------- Investment cards ---------- */

.invest-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }

.invest-card {
    background: var(--paper-warm);
    padding: 3rem 2.2rem;
    border: 1px solid var(--rule);
    position: relative;
    text-align: left;
}

.invest-card.featured {
    background: var(--ink);
    color: var(--paper);
    border-color: var(--ink);
}

.invest-card .label {
    font-family: var(--sans);
    font-size: 0.7rem;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1.2rem;
}

.invest-card h3 {
    font-family: var(--serif-display);
    font-weight: 400;
    font-size: 2.2rem;
    margin: 0 0 0.6rem 0;
    line-height: 1;
}

.invest-card .price {
    font-family: var(--serif-body);
    font-style: italic;
    font-size: 1.15rem;
    color: var(--muted);
    margin-bottom: 1.8rem;
}

.invest-card.featured .price { color: var(--gold-soft); }

.invest-card ul {
    list-style: none;
    padding: 0;
    margin: 0 0 2rem 0;
}

.invest-card li {
    padding: 0.6rem 0;
    border-bottom: 0.5px solid var(--rule);
    font-size: 0.95rem;
}
.invest-card.featured li { border-bottom-color: rgba(255,255,255,0.12); }

@media (max-width: 800px) { .invest-grid { grid-template-columns: 1fr; } }

/* ---------- Footer ---------- */

.site-footer {
    background: var(--black);
    color: var(--paper);
    padding: 6rem 0 3rem 0;
}

.footer-grid {
    max-width: var(--max);
    margin: 0 auto;
    padding: 0 var(--pad);
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 3rem;
    align-items: start;
}

.footer-brand .display {
    font-size: 2.6rem;
    margin: 0 0 0.8rem 0;
    color: var(--paper);
}

.footer-brand p { max-width: 28ch; color: rgba(255,255,255,0.7); }

.footer-col h4 {
    font-family: var(--sans);
    font-size: 0.7rem;
    letter-spacing: 0.42em;
    text-transform: uppercase;
    color: var(--gold);
    margin: 0 0 1.2rem 0;
    font-weight: 500;
}

.footer-col ul { list-style: none; padding: 0; margin: 0; }
.footer-col li { padding: 0.3rem 0; font-size: 0.95rem; color: rgba(255,255,255,0.85); }
.footer-col li a:hover { color: var(--gold); }

.footer-bottom {
    max-width: var(--max);
    margin: 4rem auto 0;
    padding: 2rem var(--pad) 0;
    border-top: 0.5px solid rgba(255,255,255,0.1);
    display: flex;
    justify-content: space-between;
    font-size: 0.78rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--muted);
}

@media (max-width: 800px) {
    .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
    .footer-bottom { flex-direction: column; gap: 1rem; }
}

/* ---------- Forms ---------- */

.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; max-width: 720px; }
.form-grid .full { grid-column: span 2; }

.form-field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

.form-field label {
    font-family: var(--sans);
    font-size: 0.7rem;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--muted);
    font-weight: 500;
}

.form-field input,
.form-field textarea,
.form-field select {
    border: none;
    border-bottom: 1px solid var(--ink);
    background: transparent;
    padding: 0.5rem 0;
    font-family: var(--sans);
    font-size: 1rem;
    color: var(--ink);
    transition: border-color 200ms ease;
}

.form-field input:focus,
.form-field textarea:focus,
.form-field select:focus { outline: none; border-bottom-color: var(--gold); }

.form-field textarea { min-height: 140px; resize: vertical; }

@media (max-width: 700px) { .form-grid { grid-template-columns: 1fr; } .form-grid .full { grid-column: span 1; } }

/* ---------- Journal cards ---------- */

.journal-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 3rem; }
.journal-card { display: flex; flex-direction: column; gap: 1rem; }
.journal-card .img-frame { aspect-ratio: 4 / 5; overflow: hidden; background: var(--gray); }
.journal-card .img-frame img { width: 100%; height: 100%; object-fit: cover; transition: transform 800ms ease; }
.journal-card:hover .img-frame img { transform: scale(1.04); }
.journal-card .meta {
    font-family: var(--sans);
    font-size: 0.7rem;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--gold);
}
.journal-card h3 {
    font-family: var(--serif-display);
    font-weight: 400;
    font-size: clamp(1.6rem, 2.6vw, 2.2rem);
    margin: 0;
    line-height: 1.1;
}
.journal-card p { color: #2A2A2A; }

@media (max-width: 900px) { .journal-grid { grid-template-columns: 1fr; } }

/* ---------- Two-column editorial split ---------- */

.split { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2rem, 5vw, 5rem); align-items: center; }
.split img { aspect-ratio: 4 / 5; object-fit: cover; width: 100%; }
.split.reverse > div:first-child { order: 2; }
@media (max-width: 800px) { .split { grid-template-columns: 1fr; } .split.reverse > div:first-child { order: 0; } }

/* ---------- Process steps ---------- */
.process-step {
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 2rem;
    padding: 2.5rem 0;
    border-top: 0.5px solid var(--rule);
}
.process-step:last-child { border-bottom: 0.5px solid var(--rule); }
.process-step .step-num {
    font-family: var(--serif-display);
    font-size: 2.4rem;
    color: var(--gold);
    line-height: 1;
}
.process-step h3 { font-family: var(--serif-display); font-size: 1.8rem; font-weight: 400; margin: 0 0 0.5rem 0; line-height: 1.1; }
.process-step p { max-width: 56ch; color: #2A2A2A; }

@media (max-width: 700px) {
    .process-step { grid-template-columns: 1fr; gap: 0.5rem; }
}

/* ---------- Accents ---------- */

.gold-divider { display: block; width: 80px; height: 1px; background: var(--gold); margin: 1.5rem 0; }
.center-gold-divider { margin-left: auto; margin-right: auto; }

.section-heading-center { text-align: center; }
.section-heading-center .gold-divider { margin-left: auto; margin-right: auto; }
"""


# -- JAVASCRIPT --------------------------------------------------------------

JS = """
// Mobile menu toggle
const toggle = document.querySelector('.nav-mobile-toggle');
const panel = document.querySelector('.nav-mobile-panel');
if (toggle && panel) {
    toggle.addEventListener('click', () => {
        const open = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !open);
        panel.classList.toggle('is-open');
    });
}

// Contact form submit (demo only)
const form = document.querySelector('form.inquiry-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const status = form.querySelector('.form-status');
        if (status) {
            status.textContent = 'Thank you. Emily will respond personally within 48 hours.';
            status.style.color = 'var(--gold)';
        }
        form.reset();
    });
}
"""


# -- HTML SCAFFOLDING --------------------------------------------------------

NAV_PRIMARY = [
    ("Senior Portraits", "senior.html"),
    ("Family Portraits", "family.html"),
    ("Portfolio", "portfolio.html"),
]

NAV_SECONDARY = [
    ("About", "about.html"),
    ("Investment", "investment.html"),
    ("Journal", "journal.html"),
    ("Contact", "contact.html"),
]


def header(active: str = ""):
    def link(label, href):
        cls = "is-active" if active == href else ""
        return f'<a href="{href}" class="{cls}">{label}</a>'
    primary = "".join(link(l, h) for l, h in NAV_PRIMARY)
    secondary = "".join(link(l, h) for l, h in NAV_SECONDARY)
    mobile = "".join(f'<li><a href="{h}">{l}</a></li>' for l, h in NAV_PRIMARY + NAV_SECONDARY)
    return f"""
<header class="site-header">
    <div class="nav-shell">
        <nav class="nav-primary">{primary}</nav>
        <a href="index.html" class="brand">emily kathryn<small>Photography</small></a>
        <nav class="nav-secondary">{secondary}</nav>
        <button class="nav-mobile-toggle" aria-expanded="false" aria-label="Open menu">
            <span></span><span></span><span></span>
        </button>
    </div>
    <div class="nav-mobile-panel">
        <ul>{mobile}</ul>
    </div>
</header>
"""


def footer():
    return """
<footer class="site-footer">
    <div class="footer-grid">
        <div class="footer-brand">
            <h2 class="display">emily kathryn</h2>
            <p>Editorial senior and family portraiture, made on location across South-Central Virginia — from Chatham to Lynchburg to Smith Mountain Lake.</p>
        </div>
        <div class="footer-col">
            <h4>Studio</h4>
            <ul>
                <li><a href="about.html">About</a></li>
                <li><a href="journal.html">Journal</a></li>
                <li><a href="investment.html">Investment</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </div>
        <div class="footer-col">
            <h4>Services</h4>
            <ul>
                <li><a href="senior.html">Senior Portraits</a></li>
                <li><a href="family.html">Family Portraits</a></li>
                <li><a href="portfolio.html">Portfolio</a></li>
            </ul>
        </div>
        <div class="footer-col">
            <h4>Connect</h4>
            <ul>
                <li>Gretna, Virginia</li>
                <li>emily@emilykathryn.com</li>
                <li>(434) 000-0000</li>
                <li><a href="https://instagram.com">Instagram</a> · <a href="https://tiktok.com">TikTok</a></li>
            </ul>
        </div>
    </div>
    <div class="footer-bottom">
        <span>© 2026 Emily Kathryn Photography</span>
        <span>Design — NXTLVL Digital</span>
    </div>
</footer>
"""


def html_doc(title, body, active=""):
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} · Emily Kathryn Photography</title>
<meta name="description" content="Editorial senior and family portraiture across South-Central Virginia. Emily Kathryn Photography — Danville, Lynchburg, Smith Mountain Lake.">
<style>{CSS}</style>
</head>
<body>
{header(active)}
{body}
{footer()}
<script>{JS}</script>
</body>
</html>"""


# ==========================================================================
# PAGE BUILDERS
# ==========================================================================

def page_home():
    body = f"""
<section class="hero">
    <div class="hero-image" style="background-image: url('{IMG['hero_senior_a']}');"></div>
    <div class="hero-content">
        <div>
            <div class="issue-meta">Issue Twenty-Six · Volume One</div>
            <div class="issue">EKP</div>
        </div>
        <div class="lead-block">
            <h1>Portraits made for the wall, not the phone.</h1>
            <p>Editorial senior + family portraiture, designed around you, photographed on location from Chatham to Lynchburg and across Smith Mountain Lake.</p>
            <a href="contact.html" class="btn-on-dark btn" style="margin-top: 1rem;">Inquire for Availability</a>
        </div>
    </div>
</section>

<section class="section">
    <div class="shell">
        <div class="numbered-section">
            <div class="num">01</div>
            <div class="body-col">
                <p class="eyebrow">The Studio</p>
                <h2 class="heading-1">A portrait studio with a magazine sensibility.</h2>
                <p class="lead">EKP is a boutique studio for high school seniors and the families that raise them — built on the belief that the right portrait, made well, deserves to outlast the trend that inspired it.</p>
                <p>Every session is shaped around the person on the other side of the camera. Locations, outfits, light, and direction are planned before we shoot — so your portraits feel like the most considered version of you, not the most filtered.</p>
                <p style="margin-top:2rem;"><a href="about.html" class="link-cta">Meet Emily</a></p>
            </div>
        </div>
    </div>
</section>

<section class="section" style="padding-top: 0;">
    <div class="shell">
        <div class="service-grid">
            <a class="service-card" href="senior.html">
                <div class="img-frame"><img src="{IMG['senior_g_1']}" alt="Senior portrait — editorial"></div>
                <div>
                    <div class="num">01</div>
                    <h3>Senior Portraits</h3>
                    <p>Magazine-quality sessions for the Class of 2027 and 2028 — designed around the senior, photographed across South-Central Virginia, finished as wall art and a senior album worth keeping.</p>
                    <p style="margin-top: 1rem;"><span class="link-cta">View Senior Portraits</span></p>
                </div>
            </a>
            <a class="service-card" href="family.html">
                <div class="img-frame"><img src="{IMG['family_1']}" alt="Family portrait — on location"></div>
                <div>
                    <div class="num">02</div>
                    <h3>Family Portraits</h3>
                    <p>Generational portraits made on location — backyards, farms, downtowns, dockside at Smith Mountain Lake. Quiet sessions, polished portraits, framed for the room they'll live in.</p>
                    <p style="margin-top: 1rem;"><span class="link-cta">View Family Portraits</span></p>
                </div>
            </a>
        </div>
    </div>
</section>

<section class="section-band-black">
    <div class="shell">
        <div class="pull-quote">
            <p class="eyebrow" style="color: var(--gold);">Voice</p>
            <q>A portrait that earns its place on the wall is worth more than a thousand on a phone.</q>
            <span class="gold-rule"></span>
            <div class="attribution">— Emily Kathryn</div>
        </div>
    </div>
</section>

<section class="section">
    <div class="shell">
        <div class="section-heading-center" style="margin-bottom: 4rem;">
            <p class="eyebrow">Recent Work</p>
            <h2 class="heading-1">From the portfolio.</h2>
            <span class="gold-divider center-gold-divider"></span>
            <p class="lead" style="margin: 0 auto;">A glimpse into the sessions we've been making — seniors, families, and the moments in between.</p>
        </div>
        <div class="portfolio-grid">
            <div class="tile t-5"><img src="{IMG['senior_g_2']}" alt=""></div>
            <div class="tile t-4"><img src="{IMG['senior_b_1']}" alt=""></div>
            <div class="tile t-3"><img src="{IMG['detail_florals']}" alt=""></div>
            <div class="tile t-4"><img src="{IMG['family_2']}" alt=""></div>
            <div class="tile t-4"><img src="{IMG['senior_g_3']}" alt=""></div>
            <div class="tile t-4"><img src="{IMG['senior_b_2']}" alt=""></div>
            <div class="tile t-6"><img src="{IMG['family_1']}" alt=""></div>
            <div class="tile t-6"><img src="{IMG['senior_g_4']}" alt=""></div>
        </div>
        <p style="text-align: center; margin-top: 3rem;"><a href="portfolio.html" class="link-cta">View Full Portfolio</a></p>
    </div>
</section>

<section class="section" style="background: var(--paper-warm);">
    <div class="shell">
        <div class="split">
            <div>
                <p class="eyebrow">From the Journal</p>
                <h2 class="heading-1">Notes on style, season, and the senior year.</h2>
                <p class="lead">A working journal for parents and seniors — outfit guides, location ideas, and the long answers to every "what should we wear" text I get.</p>
                <p><a href="journal.html" class="link-cta">Read the Journal</a></p>
            </div>
            <div><img src="{IMG['journal_1']}" alt=""></div>
        </div>
    </div>
</section>

<section class="section-band-black" style="padding-top: 6rem; padding-bottom: 6rem;">
    <div class="shell" style="text-align: center;">
        <p class="eyebrow" style="color: var(--gold);">Now Booking</p>
        <h2 class="display" style="color: var(--paper); max-width: 14ch; margin: 0 auto 2rem;">Class of '27 inquiries are open.</h2>
        <p style="max-width: 36ch; margin: 0 auto 2.5rem; color: rgba(250,247,242,0.85); font-family: var(--serif-body); font-style: italic; font-size: 1.25rem;">A handful of summer and fall dates remain for Class of 2027 seniors and family sessions across the corridor.</p>
        <a href="contact.html" class="btn btn-on-dark">Inquire for Availability</a>
    </div>
</section>
"""
    return html_doc("Editorial Senior & Family Portraits in South-Central Virginia", body, active="index.html")


def page_about():
    body = f"""
<section class="section" style="padding-top: 5rem;">
    <div class="shell">
        <div style="text-align: center; max-width: 50ch; margin: 0 auto 4rem;">
            <p class="eyebrow">The Studio</p>
            <h1 class="display" style="font-size: clamp(3rem, 7vw, 6rem);">Meet Emily.</h1>
            <span class="gold-divider center-gold-divider"></span>
        </div>
        <div class="split">
            <div><img src="{IMG['emily_portrait']}" alt="Emily Kathryn"></div>
            <div>
                <p class="lead">Emily Kathryn is a portrait photographer based in Gretna, Virginia. For more than a decade she has photographed the seniors and families of South-Central Virginia — and the people who drive a little farther because the work feels worth the drive.</p>
                <p>She studied photography after a career in education, where she spent years watching seniors get ready for prom, graduation, and college applications. That decade-long view shaped the studio's posture: the senior portrait is not a checkbox on a yearbook form. It is the marker of a year that won't repeat.</p>
                <p>The work is editorial in the sense that it is composed and considered — but never cold. Every session is planned: outfits, light, locations, posture. The goal is for the senior to look like the most confident, recognizable version of herself or himself, and for the parent to look at the wall five years later and feel that the moment was held.</p>
            </div>
        </div>
    </div>
</section>

<section class="section-band-black">
    <div class="shell">
        <div class="pull-quote">
            <q>The right portrait doesn't happen by accident. It is planned, directed, and finished with intent.</q>
            <span class="gold-rule"></span>
            <div class="attribution">— Emily Kathryn</div>
        </div>
    </div>
</section>

<section class="section">
    <div class="shell">
        <div class="numbered-section">
            <div class="num">02</div>
            <div class="body-col">
                <p class="eyebrow">Where We Photograph</p>
                <h2 class="heading-1">Across the South-Central Virginia corridor.</h2>
                <p class="lead">The studio serves Danville, Chatham, Gretna, Altavista, Evington, Forest, Lynchburg, Bedford, and Smith Mountain Lake. Sessions happen on location — at the family farm, the downtown alley, the field your daughter has been driving past for a year, or the dock at the lake house.</p>
                <p>If you are outside the corridor, write anyway. About one in four sessions each year is for a client traveling to be photographed somewhere that means something to them.</p>
            </div>
        </div>
    </div>
</section>

<section class="section" style="background: var(--paper-warm); padding-top: 6rem; padding-bottom: 6rem;">
    <div class="shell">
        <div class="section-heading-center" style="margin-bottom: 4rem;">
            <p class="eyebrow">The Experience</p>
            <h2 class="heading-1">How a session is planned, photographed, and finished.</h2>
            <span class="gold-divider center-gold-divider"></span>
        </div>
        <div style="max-width: 880px; margin: 0 auto;">
            <div class="process-step">
                <div class="step-num">01</div>
                <div>
                    <h3>Inquire</h3>
                    <p>Send a note. We schedule a 15-minute style call to talk about the senior or the family, the timing you have in mind, and the imagery you want to walk away with.</p>
                </div>
            </div>
            <div class="process-step">
                <div class="step-num">02</div>
                <div>
                    <h3>Plan</h3>
                    <p>Once you've booked, we plan the session — outfits, locations, season, light. You'll receive a custom style guide tailored to the session you booked.</p>
                </div>
            </div>
            <div class="process-step">
                <div class="step-num">03</div>
                <div>
                    <h3>Photograph</h3>
                    <p>Sessions run 1.5 to 3 hours depending on the package and the locations. Posing is guided; nothing about the experience asks you to know what you're doing.</p>
                </div>
            </div>
            <div class="process-step">
                <div class="step-num">04</div>
                <div>
                    <h3>Order</h3>
                    <p>Within three weeks of the session, we meet — in person or virtually — to design wall art, prints, and an album from the finished gallery. This is where the heirloom part of the experience happens.</p>
                </div>
            </div>
            <div class="process-step">
                <div class="step-num">05</div>
                <div>
                    <h3>Deliver</h3>
                    <p>Digital files arrive in your gallery. Wall art and album arrive at the studio four to six weeks later, ready for pickup or hand delivery within the corridor.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="section-band-black">
    <div class="shell" style="text-align: center;">
        <p class="eyebrow" style="color: var(--gold);">Begin</p>
        <h2 class="display" style="color: var(--paper); max-width: 16ch; margin: 0 auto 2rem;">Ready to plan a session?</h2>
        <a href="contact.html" class="btn btn-on-dark">Start an Inquiry</a>
    </div>
</section>
"""
    return html_doc("About Emily Kathryn", body, active="about.html")


def page_senior():
    body = f"""
<section class="hero" style="min-height: 70vh;">
    <div class="hero-image" style="background-image: url('{IMG['hero_senior_b']}'); filter: brightness(0.72);"></div>
    <div class="hero-content">
        <div>
            <div class="issue-meta">Service Line · No. 01</div>
            <div class="issue">Senior</div>
        </div>
        <div class="lead-block">
            <h1>Senior portraits, made for the wall.</h1>
            <p>Editorial sessions for the Class of 2027 and 2028 — designed around the senior, photographed across South-Central Virginia, finished as wall art and an album.</p>
        </div>
    </div>
</section>

<section class="section">
    <div class="shell">
        <div class="numbered-section">
            <div class="num">01</div>
            <div class="body-col">
                <p class="eyebrow">For the Senior</p>
                <h2 class="heading-1">The senior portrait, treated like a magazine assignment.</h2>
                <p class="lead">Every senior session is shaped around the student — the schools you attend, the activities you love, the version of yourself you want to remember.</p>
                <p>You don't have to know how to pose. You don't have to know what to wear. You don't have to figure out where to shoot. The studio handles all of it — so the only thing you have to do on session day is show up and be photographed.</p>
            </div>
        </div>
    </div>
</section>

<section class="section" style="padding-top: 0;">
    <div class="shell">
        <div class="portfolio-grid">
            <div class="tile t-6"><img src="{IMG['senior_g_1']}" alt=""></div>
            <div class="tile t-6"><img src="{IMG['senior_b_1']}" alt=""></div>
            <div class="tile t-4"><img src="{IMG['senior_g_2']}" alt=""></div>
            <div class="tile t-4"><img src="{IMG['senior_b_2']}" alt=""></div>
            <div class="tile t-4"><img src="{IMG['senior_g_3']}" alt=""></div>
            <div class="tile t-12"><img src="{IMG['hero_senior_a']}" alt=""></div>
        </div>
    </div>
</section>

<section class="section-band-black">
    <div class="shell">
        <div class="numbered-section">
            <div class="num" style="color: var(--gold);">02</div>
            <div class="body-col">
                <p class="eyebrow">For the Parent</p>
                <h2 class="heading-1" style="color: var(--paper);">A senior portrait you'll want to frame.</h2>
                <p class="lead" style="color: rgba(255,255,255,0.88);">EKP is for the family that has decided this milestone is worth doing well. The session is one part of the experience. The wall art and album that follow are the part you'll look at for the next twenty years.</p>
                <p style="color: rgba(255,255,255,0.78);">Investment begins at $799 for the session. Most families invest between $1,800 and $3,500 in total across digital files, wall art, and a senior album.</p>
                <p style="margin-top: 2rem;"><a href="investment.html" class="link-cta" style="color: var(--paper); border-bottom-color: var(--gold);">View Investment</a></p>
            </div>
        </div>
    </div>
</section>

<section class="section" style="background: var(--paper-warm);">
    <div class="shell">
        <div class="section-heading-center" style="margin-bottom: 4rem;">
            <p class="eyebrow">For Senior Boys</p>
            <h2 class="heading-1">Yes — we photograph boys too.</h2>
            <span class="gold-divider center-gold-divider"></span>
            <p class="lead" style="margin: 0 auto;">Sessions for senior boys are styled, paced, and directed differently than girl sessions — but with the same editorial standard. If you have a senior at home who doesn't love getting his picture taken, send him this page.</p>
        </div>
        <div class="portfolio-grid">
            <div class="tile t-4"><img src="{IMG['senior_b_1']}" alt=""></div>
            <div class="tile t-4"><img src="{IMG['senior_b_2']}" alt=""></div>
            <div class="tile t-4"><img src="{IMG['senior_b_3']}" alt=""></div>
        </div>
    </div>
</section>

<section class="section">
    <div class="shell">
        <div class="section-heading-center" style="margin-bottom: 4rem;">
            <p class="eyebrow">Common Questions</p>
            <h2 class="heading-1">Answers, before you ask.</h2>
            <span class="gold-divider center-gold-divider"></span>
        </div>
        <div style="max-width: 720px; margin: 0 auto;">
            <details style="border-bottom: 0.5px solid var(--rule); padding: 1.5rem 0;">
                <summary style="font-family: var(--serif-body); font-size: 1.35rem; cursor: pointer;">How much does a senior session cost?</summary>
                <p style="margin-top: 1rem; color: var(--muted);">The session begins at $799. Most families invest between $1,800 and $3,500 in total across digital files, wall art, and a senior album. A full investment guide is available on the <a href="investment.html" style="color: var(--gold); border-bottom: 1px solid var(--gold);">Investment</a> page.</p>
            </details>
            <details style="border-bottom: 0.5px solid var(--rule); padding: 1.5rem 0;">
                <summary style="font-family: var(--serif-body); font-size: 1.35rem; cursor: pointer;">When should we book?</summary>
                <p style="margin-top: 1rem; color: var(--muted);">Most Class of 2027 seniors book between May and August of their junior year. Class of 2028 inquiries are welcome any time after January 2027.</p>
            </details>
            <details style="border-bottom: 0.5px solid var(--rule); padding: 1.5rem 0;">
                <summary style="font-family: var(--serif-body); font-size: 1.35rem; cursor: pointer;">What's included with the session?</summary>
                <p style="margin-top: 1rem; color: var(--muted);">A pre-session style call, custom outfit and location guidance, the session itself, professional retouching, an in-person ordering appointment, and a private online gallery for sharing.</p>
            </details>
            <details style="border-bottom: 0.5px solid var(--rule); padding: 1.5rem 0;">
                <summary style="font-family: var(--serif-body); font-size: 1.35rem; cursor: pointer;">Where do sessions happen?</summary>
                <p style="margin-top: 1rem; color: var(--muted);">On location across Danville, Chatham, Gretna, Altavista, Evington, Forest, Lynchburg, Bedford, and Smith Mountain Lake. We plan the locations together based on your style direction.</p>
            </details>
            <details style="border-bottom: 0.5px solid var(--rule); padding: 1.5rem 0;">
                <summary style="font-family: var(--serif-body); font-size: 1.35rem; cursor: pointer;">Do you photograph senior boys?</summary>
                <p style="margin-top: 1rem; color: var(--muted);">Yes. Boy senior sessions are a meaningful part of the studio. Sessions are paced and directed differently than girl sessions but held to the same editorial standard.</p>
            </details>
        </div>
    </div>
</section>

<section class="section-band-black" style="padding: 6rem 0;">
    <div class="shell" style="text-align: center;">
        <p class="eyebrow" style="color: var(--gold);">Begin</p>
        <h2 class="display" style="color: var(--paper); max-width: 16ch; margin: 0 auto 2rem;">Inquire for senior availability.</h2>
        <a href="contact.html" class="btn btn-on-dark">Start an Inquiry</a>
    </div>
</section>
"""
    return html_doc("Senior Portraits", body, active="senior.html")


def page_family():
    body = f"""
<section class="hero" style="min-height: 70vh;">
    <div class="hero-image" style="background-image: url('{IMG['hero_family']}'); filter: brightness(0.72);"></div>
    <div class="hero-content">
        <div>
            <div class="issue-meta">Service Line · No. 02</div>
            <div class="issue">Family</div>
        </div>
        <div class="lead-block">
            <h1>Family portraits, made on location.</h1>
            <p>Generational portraits photographed at the place that means the most — backyards, farms, downtowns, and dockside at Smith Mountain Lake.</p>
        </div>
    </div>
</section>

<section class="section">
    <div class="shell">
        <div class="numbered-section">
            <div class="num">01</div>
            <div class="body-col">
                <p class="eyebrow">The Approach</p>
                <h2 class="heading-1">Family sessions, treated as commissioned portraiture.</h2>
                <p class="lead">EKP family sessions are not lifestyle shoots. They are commissioned portraits, planned and directed — the work that ends up framed above the fireplace, not just shared on the family group text.</p>
                <p>Sessions are scheduled at the time of day the light will work for you. Outfits are coordinated, not matched. Locations are chosen for their meaning — the family farm, the front porch, the dock, the downtown street where your kids grew up.</p>
            </div>
        </div>
    </div>
</section>

<section class="section" style="padding-top: 0;">
    <div class="shell">
        <div class="portfolio-grid">
            <div class="tile t-6"><img src="{IMG['family_1']}" alt=""></div>
            <div class="tile t-6"><img src="{IMG['family_2']}" alt=""></div>
            <div class="tile t-4"><img src="{IMG['family_3']}" alt=""></div>
            <div class="tile t-8"><img src="{IMG['lake_1']}" alt=""></div>
        </div>
    </div>
</section>

<section class="section" style="background: var(--paper-warm);">
    <div class="shell">
        <div class="split reverse">
            <div>
                <p class="eyebrow">Smith Mountain Lake</p>
                <h2 class="heading-1">Lake-house family sessions.</h2>
                <p class="lead">A dedicated family service line for the families who summer at Smith Mountain Lake. On the dock, on the boat, on the deck — photographed during the season the lake actually feels like home.</p>
                <p>Lake sessions are designed for multi-generational families, second-home owners, and the families who only get everyone together a few weekends a year. Bookings open in February each year for the May–September window.</p>
                <p style="margin-top: 2rem;"><a href="contact.html" class="link-cta">Plan a Lake Session</a></p>
            </div>
            <div><img src="{IMG['lake_1']}" alt="Smith Mountain Lake family session"></div>
        </div>
    </div>
</section>

<section class="section-band-black">
    <div class="shell">
        <div class="pull-quote">
            <q>The portraits that survive are the ones you decided to frame.</q>
            <span class="gold-rule"></span>
            <div class="attribution">— EKP Studio</div>
        </div>
    </div>
</section>

<section class="section">
    <div class="shell">
        <div class="numbered-section">
            <div class="num">02</div>
            <div class="body-col">
                <p class="eyebrow">Investment</p>
                <h2 class="heading-1">Sessions begin at $899.</h2>
                <p class="lead">Most families invest between $1,500 and $4,000 in total across digital files, framed prints, and a heirloom album.</p>
                <p>Multi-generational sessions, anniversary portraits, and Smith Mountain Lake bookings are priced separately. Investment guides are sent before every consultation.</p>
                <p style="margin-top: 2rem;"><a href="investment.html" class="link-cta">View Investment</a></p>
            </div>
        </div>
    </div>
</section>

<section class="section-band-black" style="padding: 6rem 0;">
    <div class="shell" style="text-align: center;">
        <p class="eyebrow" style="color: var(--gold);">Begin</p>
        <h2 class="display" style="color: var(--paper); max-width: 16ch; margin: 0 auto 2rem;">Plan a family session.</h2>
        <a href="contact.html" class="btn btn-on-dark">Start an Inquiry</a>
    </div>
</section>
"""
    return html_doc("Family Portraits", body, active="family.html")


def page_investment():
    body = f"""
<section class="section" style="padding-top: 5rem;">
    <div class="shell">
        <div style="text-align: center; max-width: 56ch; margin: 0 auto 5rem;">
            <p class="eyebrow">Investment</p>
            <h1 class="display" style="font-size: clamp(2.8rem, 6.5vw, 5.6rem);">Considered portraiture has a price — and a value.</h1>
            <span class="gold-divider center-gold-divider"></span>
            <p class="lead" style="margin: 0 auto;">The session is the beginning. The wall art, album, and prints are where the experience finishes — and where most of the lasting value lives.</p>
        </div>

        <div class="invest-grid">
            <div class="invest-card">
                <div class="label">Senior · The Session</div>
                <h3>The Session Investment</h3>
                <div class="price">begins at $799</div>
                <ul>
                    <li>Pre-session style call</li>
                    <li>Custom outfit + location guide</li>
                    <li>2-hour on-location session</li>
                    <li>20+ professionally retouched images</li>
                    <li>Private online gallery</li>
                    <li>In-person ordering session</li>
                </ul>
                <a href="contact.html" class="link-cta">Inquire</a>
            </div>
            <div class="invest-card featured">
                <div class="label">The Heirloom Collection</div>
                <h3>Most-Selected Collection</h3>
                <div class="price">avg. invest. $2,400</div>
                <ul>
                    <li>The Session (above)</li>
                    <li>16×24 framed wall print</li>
                    <li>10×10 leather senior album (20 pages)</li>
                    <li>Set of 8 gift prints</li>
                    <li>Full digital file release</li>
                </ul>
                <a href="contact.html" class="btn btn-on-dark" style="margin-top: 0.5rem;">Inquire</a>
            </div>
            <div class="invest-card">
                <div class="label">Family · The Session</div>
                <h3>Family Session Investment</h3>
                <div class="price">begins at $899</div>
                <ul>
                    <li>Pre-session planning call</li>
                    <li>Outfit + location guidance</li>
                    <li>1.5-hour on-location session</li>
                    <li>15+ retouched images</li>
                    <li>Private gallery + ordering session</li>
                    <li>Wall art & album à la carte</li>
                </ul>
                <a href="contact.html" class="link-cta">Inquire</a>
            </div>
        </div>
    </div>
</section>

<section class="section-band-black">
    <div class="shell">
        <div class="pull-quote">
            <q>Most families invest between $1,800 and $3,500 across files, wall art, and an album.</q>
            <span class="gold-rule"></span>
            <div class="attribution">— EKP Studio average, 2025</div>
        </div>
    </div>
</section>

<section class="section">
    <div class="shell">
        <div class="section-heading-center" style="margin-bottom: 4rem;">
            <p class="eyebrow">Heirloom Products</p>
            <h2 class="heading-1">What we make.</h2>
            <span class="gold-divider center-gold-divider"></span>
            <p class="lead" style="margin: 0 auto;">Every session ends with an ordering appointment. Wall art, albums, and prints are designed in person — sized for your home, finished to last.</p>
        </div>
        <div class="portfolio-grid">
            <div class="tile t-4"><img src="{IMG['detail_album']}" alt="Heirloom album"></div>
            <div class="tile t-4"><img src="{IMG['detail_florals']}" alt="Framed prints"></div>
            <div class="tile t-4"><img src="{IMG['detail_dress']}" alt="Wall art"></div>
        </div>
    </div>
</section>

<section class="section-band-black" style="padding: 6rem 0;">
    <div class="shell" style="text-align: center;">
        <h2 class="display" style="color: var(--paper); max-width: 18ch; margin: 0 auto 2rem;">Receive the full investment guide.</h2>
        <p style="max-width: 36ch; margin: 0 auto 2.5rem; color: rgba(250,247,242,0.85);">A PDF guide is sent before every consultation — full pricing, collection details, product samples.</p>
        <a href="contact.html" class="btn btn-on-dark">Request the Guide</a>
    </div>
</section>
"""
    return html_doc("Investment", body, active="investment.html")


def page_portfolio():
    body = f"""
<section class="section" style="padding-top: 5rem; padding-bottom: 3rem;">
    <div class="shell">
        <div style="text-align: center; max-width: 50ch; margin: 0 auto;">
            <p class="eyebrow">Portfolio</p>
            <h1 class="display" style="font-size: clamp(2.8rem, 6.5vw, 5.6rem);">The work.</h1>
            <span class="gold-divider center-gold-divider"></span>
            <p class="lead" style="margin: 0 auto;">A selection of recent senior and family sessions from across the corridor.</p>
        </div>
    </div>
</section>

<section class="section" style="padding-top: 0;">
    <div class="shell">
        <p class="eyebrow" style="margin-bottom: 2rem;">Senior Portraits · Class of 2026 / 2027</p>
        <div class="portfolio-grid">
            <div class="tile t-5"><img src="{IMG['senior_g_1']}" alt=""></div>
            <div class="tile t-7"><img src="{IMG['senior_b_1']}" alt=""></div>
            <div class="tile t-4"><img src="{IMG['senior_g_2']}" alt=""></div>
            <div class="tile t-4"><img src="{IMG['senior_b_2']}" alt=""></div>
            <div class="tile t-4"><img src="{IMG['senior_g_3']}" alt=""></div>
            <div class="tile t-6"><img src="{IMG['senior_g_4']}" alt=""></div>
            <div class="tile t-6"><img src="{IMG['senior_b_3']}" alt=""></div>
        </div>
    </div>
</section>

<section class="section">
    <div class="shell">
        <p class="eyebrow" style="margin-bottom: 2rem;">Family · 2025–2026</p>
        <div class="portfolio-grid">
            <div class="tile t-6"><img src="{IMG['family_1']}" alt=""></div>
            <div class="tile t-6"><img src="{IMG['family_2']}" alt=""></div>
            <div class="tile t-4"><img src="{IMG['family_3']}" alt=""></div>
            <div class="tile t-8"><img src="{IMG['lake_1']}" alt=""></div>
        </div>
    </div>
</section>

<section class="section-band-black" style="padding: 6rem 0;">
    <div class="shell" style="text-align: center;">
        <h2 class="display" style="color: var(--paper); max-width: 16ch; margin: 0 auto 2rem;">See yourself in the portfolio?</h2>
        <a href="contact.html" class="btn btn-on-dark">Inquire for a Session</a>
    </div>
</section>
"""
    return html_doc("Portfolio", body, active="portfolio.html")


def page_journal():
    body = f"""
<section class="section" style="padding-top: 5rem; padding-bottom: 3rem;">
    <div class="shell">
        <div style="text-align: center; max-width: 50ch; margin: 0 auto;">
            <p class="eyebrow">The Journal</p>
            <h1 class="display" style="font-size: clamp(2.8rem, 6.5vw, 5.6rem);">Notes from the studio.</h1>
            <span class="gold-divider center-gold-divider"></span>
            <p class="lead" style="margin: 0 auto;">A working journal — outfit guides, location ideas, behind-the-scenes from recent sessions, and the longer answers to the questions parents and seniors actually ask.</p>
        </div>
    </div>
</section>

<section class="section" style="padding-top: 2rem;">
    <div class="shell">
        <div class="journal-grid">
            <a class="journal-card" href="#">
                <div class="img-frame"><img src="{IMG['journal_1']}" alt=""></div>
                <div class="meta">Style · May 2026</div>
                <h3>What to wear for senior portraits in Virginia.</h3>
                <p>A working guide to outfit planning — color, texture, layers, what photographs well, and what to leave home.</p>
                <span class="link-cta">Read</span>
            </a>
            <a class="journal-card" href="#">
                <div class="img-frame"><img src="{IMG['journal_2']}" alt=""></div>
                <div class="meta">Location · April 2026</div>
                <h3>Senior locations across the corridor.</h3>
                <p>The fields, downtowns, lakesides, and farms that keep showing up in the portfolio — and how to choose between them.</p>
                <span class="link-cta">Read</span>
            </a>
            <a class="journal-card" href="#">
                <div class="img-frame"><img src="{IMG['journal_3']}" alt=""></div>
                <div class="meta">For Boys · March 2026</div>
                <h3>An editorial guide for senior boys.</h3>
                <p>For the senior boy (and his mom) who isn't sure what a senior portrait session is supposed to look like.</p>
                <span class="link-cta">Read</span>
            </a>
        </div>
    </div>
</section>

<section class="section" style="background: var(--paper-warm);">
    <div class="shell">
        <div class="journal-grid">
            <a class="journal-card" href="#">
                <div class="img-frame"><img src="{IMG['detail_album']}" alt=""></div>
                <div class="meta">Heirloom · March 2026</div>
                <h3>Why wall art matters more than files.</h3>
                <p>A conversation about the difference between photos that live on a phone and photos that live on a wall.</p>
                <span class="link-cta">Read</span>
            </a>
            <a class="journal-card" href="#">
                <div class="img-frame"><img src="{IMG['lake_1']}" alt=""></div>
                <div class="meta">Family · February 2026</div>
                <h3>Family portraits at Smith Mountain Lake.</h3>
                <p>Planning a lake-house session — timing, light, dock-versus-deck, and what to do with the boat.</p>
                <span class="link-cta">Read</span>
            </a>
            <a class="journal-card" href="#">
                <div class="img-frame"><img src="{IMG['senior_g_2']}" alt=""></div>
                <div class="meta">Booking · January 2026</div>
                <h3>The Class of 2027 booking window.</h3>
                <p>When to inquire, when to book, and why the families who plan early get the locations they want.</p>
                <span class="link-cta">Read</span>
            </a>
        </div>
    </div>
</section>

<section class="section-band-black" style="padding: 6rem 0;">
    <div class="shell" style="text-align: center;">
        <h2 class="display" style="color: var(--paper); max-width: 16ch; margin: 0 auto 2rem;">Want it in your inbox?</h2>
        <p style="max-width: 36ch; margin: 0 auto 2.5rem; color: rgba(250,247,242,0.85);">New journal entries land roughly twice a month. No spam, no scarcity-bait — just the studio.</p>
        <a href="contact.html" class="btn btn-on-dark">Subscribe</a>
    </div>
</section>
"""
    return html_doc("Journal", body, active="journal.html")


def page_contact():
    body = f"""
<section class="section" style="padding-top: 5rem;">
    <div class="shell">
        <div class="split">
            <div>
                <p class="eyebrow">Contact</p>
                <h1 class="display" style="font-size: clamp(2.8rem, 6vw, 5rem);">Let's plan something worth keeping.</h1>
                <span class="gold-divider"></span>
                <p class="lead">Tell me a little about the senior or the family and the timing you have in mind. I'll respond personally within 48 hours to start the conversation.</p>

                <div style="margin-top: 3rem;">
                    <p style="font-family: var(--sans); font-size: 0.74rem; letter-spacing: 0.4em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.5rem;">Studio</p>
                    <p>Gretna, Virginia</p>

                    <p style="font-family: var(--sans); font-size: 0.74rem; letter-spacing: 0.4em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.5rem; margin-top: 2rem;">Email</p>
                    <p>emily@emilykathryn.com</p>

                    <p style="font-family: var(--sans); font-size: 0.74rem; letter-spacing: 0.4em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.5rem; margin-top: 2rem;">Booking Windows</p>
                    <p>Class of 2027 — open<br>Class of 2028 — opens January 2027<br>Family — rolling</p>
                </div>
            </div>

            <div>
                <form class="inquiry-form">
                    <div class="form-grid">
                        <div class="form-field">
                            <label for="name">Your Name</label>
                            <input id="name" name="name" type="text" required>
                        </div>
                        <div class="form-field">
                            <label for="email">Email</label>
                            <input id="email" name="email" type="email" required>
                        </div>
                        <div class="form-field">
                            <label for="phone">Phone</label>
                            <input id="phone" name="phone" type="tel">
                        </div>
                        <div class="form-field">
                            <label for="service">Session Type</label>
                            <select id="service" name="service">
                                <option>Senior Portraits</option>
                                <option>Family Portraits</option>
                                <option>Smith Mountain Lake Family</option>
                                <option>Not sure yet</option>
                            </select>
                        </div>
                        <div class="form-field">
                            <label for="when">Timing in Mind</label>
                            <input id="when" name="when" type="text" placeholder="e.g. Fall 2026">
                        </div>
                        <div class="form-field">
                            <label for="grad">Graduation Year (if senior)</label>
                            <input id="grad" name="grad" type="text">
                        </div>
                        <div class="form-field full">
                            <label for="message">Tell me about the session you have in mind</label>
                            <textarea id="message" name="message"></textarea>
                        </div>
                        <div class="full">
                            <button type="submit" class="btn">Submit Inquiry</button>
                            <p class="form-status" style="margin-top: 1rem; font-family: var(--sans); font-size: 0.85rem;"></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
"""
    return html_doc("Contact", body, active="contact.html")


# ==========================================================================
# WRITE FILES
# ==========================================================================

PAGES = {
    "index.html": page_home,
    "about.html": page_about,
    "senior.html": page_senior,
    "family.html": page_family,
    "investment.html": page_investment,
    "portfolio.html": page_portfolio,
    "journal.html": page_journal,
    "contact.html": page_contact,
}


if __name__ == "__main__":
    for filename, fn in PAGES.items():
        (HERE / filename).write_text(fn(), encoding="utf-8")
        print(f"  → wrote {filename}")
    print(f"\nConcept A built: {len(PAGES)} pages")
