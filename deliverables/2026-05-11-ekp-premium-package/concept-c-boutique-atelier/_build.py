"""
CONCEPT C — BOUTIQUE ATELIER
============================
Ultra-minimal, gallery-white, quiet-luxury direction. Massive whitespace.
Pure ink + cream + hairline gold. Tall image rhythm. Slow, confident, silent.
Reference: The Row, Khaite, atelier brand websites, KT Merry, fine-art
portraitists who treat sessions as commissioned works.

Builds all 8 pages by running this script:
    python3 _build.py
"""

from pathlib import Path

HERE = Path(__file__).parent

IMG = {
    "hero": "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=2200&q=85&auto=format",
    "second": "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=1800&q=85&auto=format",
    "senior_1": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=85&auto=format",
    "senior_2": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=85&auto=format",
    "senior_3": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1200&q=85&auto=format",
    "senior_4": "https://images.unsplash.com/photo-1502323777036-f29e3972d82f?w=1200&q=85&auto=format",
    "senior_5": "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=1200&q=85&auto=format",
    "senior_b_1": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200&q=85&auto=format",
    "senior_b_2": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=1200&q=85&auto=format",
    "senior_b_3": "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=1200&q=85&auto=format",
    "family_1": "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1200&q=85&auto=format",
    "family_2": "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&q=85&auto=format",
    "family_3": "https://images.unsplash.com/photo-1581952976147-5a2d15560349?w=1200&q=85&auto=format",
    "lake": "https://images.unsplash.com/photo-1517824806704-9040b037703b?w=1400&q=85&auto=format",
    "emily": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=900&q=85&auto=format",
    "detail_1": "https://images.unsplash.com/photo-1591084728795-1149f32d9866?w=900&q=85&auto=format",
    "detail_2": "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=900&q=85&auto=format",
    "detail_3": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=900&q=85&auto=format",
    "journal_1": "https://images.unsplash.com/photo-1492447166138-50c3889fccb1?w=1400&q=85&auto=format",
    "journal_2": "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=1400&q=85&auto=format",
    "journal_3": "https://images.unsplash.com/photo-1532635241-17e820acc59f?w=1400&q=85&auto=format",
}


CSS = """
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Italiana&family=Inter:wght@200;300;400;500;600&display=swap');

:root {
    --ink: #161616;
    --ink-soft: #2A2A2A;
    --paper: #FCFAF5;
    --paper-deep: #F4EFE5;
    --gold: #B5996A;
    --gold-soft: #D4C19A;
    --muted: #7C766B;
    --rule: #E8E2D5;
    --hairline: #DAD2C0;

    --serif-display: 'Italiana', 'Cormorant Garamond', Georgia, serif;
    --serif-body: 'Cormorant Garamond', Georgia, serif;
    --sans: 'Inter', system-ui, -apple-system, sans-serif;

    --max: 1340px;
    --pad: clamp(1.5rem, 5vw, 5rem);
    --section: clamp(5rem, 11vw, 10rem);
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }

body {
    margin: 0;
    background: var(--paper);
    color: var(--ink);
    font-family: var(--sans);
    font-weight: 300;
    font-size: 15.5px;
    line-height: 1.75;
    -webkit-font-smoothing: antialiased;
}
img { display: block; max-width: 100%; height: auto; }
a { color: inherit; text-decoration: none; }
p { margin: 0 0 1rem 0; }

.shell { max-width: var(--max); margin: 0 auto; padding: 0 var(--pad); }
.section { padding: var(--section) 0; }

/* ---------- Typography ---------- */

.eyebrow {
    font-family: var(--sans);
    font-size: 0.66rem;
    letter-spacing: 0.6em;
    text-transform: uppercase;
    font-weight: 500;
    color: var(--muted);
    margin: 0 0 1.5rem 0;
}

.display {
    font-family: var(--serif-display);
    font-weight: 400;
    font-size: clamp(3rem, 7vw, 6rem);
    line-height: 1.0;
    letter-spacing: 0;
    margin: 0;
    color: var(--ink);
}

.h-lg {
    font-family: var(--serif-display);
    font-weight: 400;
    font-size: clamp(2.4rem, 4.5vw, 3.6rem);
    line-height: 1.1;
    margin: 0 0 1.5rem 0;
}

.h-md {
    font-family: var(--serif-body);
    font-weight: 400;
    font-size: clamp(1.5rem, 2.4vw, 2rem);
    line-height: 1.3;
    margin: 0 0 0.8rem 0;
}

.body-prose {
    font-family: var(--sans);
    font-size: 1rem;
    line-height: 1.75;
    color: var(--ink-soft);
    max-width: 38em;
    font-weight: 300;
}

.lead {
    font-family: var(--serif-body);
    font-style: italic;
    font-weight: 400;
    font-size: clamp(1.1rem, 1.7vw, 1.4rem);
    line-height: 1.6;
    color: var(--ink-soft);
    max-width: 36em;
    margin: 0 0 1.5rem 0;
}

/* ---------- Links + buttons ---------- */

.cta {
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    font-family: var(--sans);
    font-size: 0.7rem;
    letter-spacing: 0.42em;
    text-transform: uppercase;
    font-weight: 500;
    padding: 1.1rem 2.2rem;
    border: 1px solid var(--ink);
    background: transparent;
    color: var(--ink);
    transition: all 350ms ease;
    cursor: pointer;
}
.cta:hover { background: var(--ink); color: var(--paper); }

.cta.cta-filled { background: var(--ink); color: var(--paper); }
.cta.cta-filled:hover { background: transparent; color: var(--ink); }

.cta.cta-on-dark { border-color: var(--paper); color: var(--paper); }
.cta.cta-on-dark:hover { background: var(--paper); color: var(--ink); }

.link {
    font-family: var(--sans);
    font-size: 0.7rem;
    letter-spacing: 0.42em;
    text-transform: uppercase;
    font-weight: 500;
    padding-bottom: 2px;
    border-bottom: 0.5px solid var(--ink);
    transition: all 300ms ease;
}
.link:hover { color: var(--gold); border-bottom-color: var(--gold); padding-bottom: 4px; }
.link::after { content: " ⟶"; }

/* ---------- Header ---------- */

.site-header {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(252, 250, 245, 0.94);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
}

.nav-shell {
    max-width: var(--max);
    margin: 0 auto;
    padding: 1.6rem var(--pad);
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 2rem;
}

.brand-mark {
    text-align: center;
    grid-column: 2;
}
.brand-mark .word {
    font-family: var(--serif-display);
    font-size: 1.6rem;
    line-height: 1;
    letter-spacing: 0;
    text-transform: lowercase;
    display: block;
}
.brand-mark .sub {
    display: block;
    font-family: var(--sans);
    font-size: 0.56rem;
    letter-spacing: 0.6em;
    text-transform: uppercase;
    color: var(--muted);
    margin-top: 6px;
}

.nav-left, .nav-right {
    display: flex;
    gap: 2.2rem;
    font-family: var(--sans);
    font-size: 0.66rem;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    font-weight: 500;
}
.nav-left { justify-content: flex-start; }
.nav-right { justify-content: flex-end; }

.nav-left a, .nav-right a {
    transition: color 250ms ease;
    padding-bottom: 2px;
    border-bottom: 0.5px solid transparent;
}
.nav-left a:hover, .nav-right a:hover,
.nav-left a.is-active, .nav-right a.is-active { color: var(--gold); border-bottom-color: var(--gold); }

.nav-mobile-toggle {
    display: none;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    width: 28px;
    height: 20px;
    position: relative;
    grid-column: 1;
    justify-self: start;
}
.nav-mobile-toggle span { position: absolute; left: 0; right: 0; height: 1px; background: var(--ink); transition: all 300ms ease; }
.nav-mobile-toggle span:nth-child(1) { top: 4px; }
.nav-mobile-toggle span:nth-child(2) { top: 12px; }
.nav-mobile-toggle[aria-expanded="true"] span:nth-child(1) { top: 8px; transform: rotate(45deg); }
.nav-mobile-toggle[aria-expanded="true"] span:nth-child(2) { top: 8px; transform: rotate(-45deg); }

.nav-mobile-panel { display: none; padding: 2rem var(--pad); border-top: 0.5px solid var(--hairline); background: var(--paper); }
.nav-mobile-panel.is-open { display: block; }
.nav-mobile-panel ul { list-style: none; padding: 0; margin: 0; }
.nav-mobile-panel li {
    padding: 0.8rem 0;
    border-bottom: 0.5px solid var(--rule);
    font-family: var(--serif-display);
    font-size: 1.8rem;
}
.nav-mobile-panel li:last-child { border-bottom: none; }

@media (max-width: 900px) {
    .nav-shell { grid-template-columns: auto 1fr auto; }
    .nav-left, .nav-right { display: none; }
    .nav-mobile-toggle { display: block; }
    .brand-mark { text-align: left; grid-column: 2; }
}

/* ---------- HERO ---------- */

.hero {
    padding: clamp(3rem, 7vw, 7rem) 0;
    background: var(--paper);
}

.hero-shell {
    max-width: var(--max);
    margin: 0 auto;
    padding: 0 var(--pad);
}

.hero-eyebrow {
    text-align: center;
    margin-bottom: 4rem;
}

.hero-image {
    width: 100%;
    aspect-ratio: 16 / 9;
    background-size: cover;
    background-position: center;
    margin-bottom: 4rem;
}

.hero-headline-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(2rem, 6vw, 6rem);
    align-items: end;
}

.hero-headline {
    font-family: var(--serif-display);
    font-weight: 400;
    font-size: clamp(2.6rem, 6.5vw, 5.2rem);
    line-height: 1.0;
    letter-spacing: 0;
    margin: 0;
    color: var(--ink);
}

.hero-side {
    max-width: 28em;
}

.hero-side p {
    font-family: var(--serif-body);
    font-style: italic;
    font-size: clamp(1.05rem, 1.4vw, 1.2rem);
    line-height: 1.55;
    color: var(--ink-soft);
    margin-bottom: 2rem;
}

@media (max-width: 800px) {
    .hero-headline-grid { grid-template-columns: 1fr; }
    .hero-image { aspect-ratio: 4 / 5; }
}

/* ---------- Editorial split (asymmetric content / image) ---------- */

.atelier-split {
    display: grid;
    grid-template-columns: 5fr 7fr;
    gap: clamp(2rem, 6vw, 6rem);
    align-items: start;
}

.atelier-split.reverse { grid-template-columns: 7fr 5fr; }
.atelier-split.reverse .text-col { order: 2; }

.atelier-split .image-col img { width: 100%; aspect-ratio: 4 / 5; object-fit: cover; }

.atelier-split.tall .image-col img { aspect-ratio: 3 / 4; }

.atelier-split .text-col {
    padding-top: 1rem;
}

@media (max-width: 800px) {
    .atelier-split, .atelier-split.reverse { grid-template-columns: 1fr; }
    .atelier-split.reverse .text-col { order: 0; }
}

/* ---------- Service mini-cards ---------- */

.service-mini {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(2rem, 5vw, 5rem);
}
.service-mini .card { display: flex; flex-direction: column; gap: 1.5rem; }
.service-mini .card img {
    width: 100%; aspect-ratio: 3 / 4; object-fit: cover;
    transition: filter 700ms ease;
    filter: grayscale(15%) brightness(0.98);
}
.service-mini .card:hover img { filter: grayscale(0%) brightness(1); }
.service-mini .num {
    font-family: var(--serif-display);
    font-size: 1.2rem;
    color: var(--gold);
    letter-spacing: 0.4em;
}
@media (max-width: 700px) { .service-mini { grid-template-columns: 1fr; } }

/* ---------- Pull quote ---------- */

.quote-band {
    padding: var(--section) 0;
    background: var(--paper);
    text-align: center;
}

.quote {
    max-width: 30ch;
    margin: 0 auto;
    font-family: var(--serif-display);
    font-size: clamp(1.8rem, 3.5vw, 2.6rem);
    line-height: 1.25;
    color: var(--ink);
    font-weight: 400;
    quotes: '“' '”';
}
.quote::before { content: open-quote; }
.quote::after { content: close-quote; }

.quote-attr {
    margin-top: 2.5rem;
    font-family: var(--sans);
    font-size: 0.66rem;
    letter-spacing: 0.6em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 500;
}

.hairline-rule { display: block; width: 60px; height: 1px; background: var(--gold); margin: 2.5rem auto; }

/* ---------- Portfolio (atelier grid) ---------- */

.atelier-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 2.5rem 1.5rem;
}

.atelier-grid .tile { overflow: hidden; background: var(--paper-deep); }
.atelier-grid .tile img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 1200ms ease, filter 700ms ease;
    filter: grayscale(8%);
}
.atelier-grid .tile:hover img { transform: scale(1.03); filter: grayscale(0%); }

.atelier-grid .tile.t-4 { grid-column: span 4; aspect-ratio: 3 / 4; }
.atelier-grid .tile.t-5 { grid-column: span 5; aspect-ratio: 4 / 5; }
.atelier-grid .tile.t-6 { grid-column: span 6; aspect-ratio: 3 / 4; }
.atelier-grid .tile.t-7 { grid-column: span 7; aspect-ratio: 4 / 5; }
.atelier-grid .tile.t-8 { grid-column: span 8; aspect-ratio: 3 / 2; }
.atelier-grid .tile.t-12 { grid-column: span 12; aspect-ratio: 16 / 7; }

/* Tile captions, very subtle */
.atelier-grid .tile-meta {
    grid-column: span 12;
    font-family: var(--sans);
    font-size: 0.66rem;
    letter-spacing: 0.5em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: -1.5rem;
}

@media (max-width: 800px) {
    .atelier-grid .tile { grid-column: span 12 !important; aspect-ratio: 4 / 5 !important; }
}

/* ---------- Section opener ---------- */

.section-opener {
    text-align: center;
    max-width: 60ch;
    margin: 0 auto var(--section);
}
.section-opener .hairline-rule { margin: 2rem auto; }

/* ---------- Investment ---------- */

.invest-list {
    max-width: 880px;
    margin: 0 auto;
    border-top: 0.5px solid var(--hairline);
}

.invest-row {
    display: grid;
    grid-template-columns: 2fr 3fr;
    gap: clamp(1.5rem, 5vw, 4rem);
    padding: clamp(2rem, 4vw, 3.5rem) 0;
    border-bottom: 0.5px solid var(--hairline);
    align-items: start;
}
.invest-row.featured { background: var(--paper-deep); margin: 0 -2rem; padding-left: 2rem; padding-right: 2rem; }
.invest-row.featured .invest-name { color: var(--ink); }
.invest-row.featured .invest-name::before { content: "★ "; color: var(--gold); }

.invest-name {
    font-family: var(--serif-display);
    font-weight: 400;
    font-size: clamp(1.6rem, 2.6vw, 2.1rem);
    line-height: 1.1;
    margin: 0 0 0.5rem 0;
}

.invest-name + .price {
    font-family: var(--serif-body);
    font-style: italic;
    color: var(--muted);
    font-size: 1.1rem;
}

.invest-row ul {
    list-style: none;
    padding: 0;
    margin: 0 0 1.5rem 0;
}
.invest-row li {
    padding: 0.4rem 0;
    color: var(--ink-soft);
    font-size: 0.96rem;
    border-bottom: 0.5px solid var(--hairline);
}
.invest-row li:last-child { border-bottom: none; }

@media (max-width: 700px) { .invest-row { grid-template-columns: 1fr; } }

/* ---------- Process steps (atelier) ---------- */

.process-list { max-width: 880px; margin: 0 auto; }

.process-row {
    display: grid;
    grid-template-columns: 60px 1fr;
    gap: 3rem;
    padding: clamp(2rem, 4vw, 3rem) 0;
    border-top: 0.5px solid var(--hairline);
    align-items: baseline;
}
.process-row:last-child { border-bottom: 0.5px solid var(--hairline); }

.process-row .step-num {
    font-family: var(--serif-display);
    font-weight: 400;
    font-size: 1.8rem;
    color: var(--gold);
    letter-spacing: 0.05em;
}

.process-row h3 {
    font-family: var(--serif-display);
    font-weight: 400;
    font-size: clamp(1.5rem, 2.4vw, 2rem);
    margin: 0 0 0.5rem 0;
    line-height: 1.15;
}
.process-row p { max-width: 56ch; color: var(--ink-soft); }

@media (max-width: 700px) { .process-row { grid-template-columns: 1fr; gap: 0.5rem; } }

/* ---------- Footer ---------- */

.site-footer {
    background: var(--paper-deep);
    padding: 6rem 0 3rem 0;
    border-top: 0.5px solid var(--hairline);
}
.footer-shell {
    max-width: var(--max);
    margin: 0 auto;
    padding: 0 var(--pad);
}

.footer-brand-row {
    text-align: center;
    margin-bottom: 5rem;
}
.footer-brand-row .display {
    font-size: clamp(2.6rem, 5vw, 4rem);
    margin: 0 0 1rem 0;
}
.footer-brand-row p {
    max-width: 36em;
    margin: 0 auto;
    color: var(--ink-soft);
}

.footer-cols {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 3rem;
    padding-bottom: 4rem;
    border-bottom: 0.5px solid var(--hairline);
}

.footer-col h4 {
    font-family: var(--sans);
    font-size: 0.66rem;
    letter-spacing: 0.5em;
    text-transform: uppercase;
    color: var(--gold);
    margin: 0 0 1rem 0;
    font-weight: 500;
}
.footer-col ul { list-style: none; padding: 0; margin: 0; }
.footer-col li { padding: 0.3rem 0; font-size: 0.96rem; color: var(--ink-soft); }
.footer-col li a:hover { color: var(--gold); }

.footer-bottom {
    margin-top: 3rem;
    display: flex;
    justify-content: space-between;
    font-family: var(--sans);
    font-size: 0.66rem;
    letter-spacing: 0.5em;
    text-transform: uppercase;
    color: var(--muted);
}

@media (max-width: 800px) {
    .footer-cols { grid-template-columns: 1fr 1fr; gap: 2rem; }
    .footer-bottom { flex-direction: column; gap: 1rem; }
}

/* ---------- Forms ---------- */

.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; max-width: 720px; }
.form-grid .full { grid-column: span 2; }
.form-field { display: flex; flex-direction: column; gap: 0.6rem; }
.form-field label {
    font-family: var(--sans);
    font-size: 0.66rem;
    letter-spacing: 0.5em;
    text-transform: uppercase;
    color: var(--muted);
    font-weight: 500;
}
.form-field input,
.form-field textarea,
.form-field select {
    border: none;
    border-bottom: 0.5px solid var(--ink);
    background: transparent;
    padding: 0.8rem 0;
    font-family: var(--serif-body);
    font-size: 1.1rem;
    color: var(--ink);
    transition: border-color 300ms ease;
}
.form-field input:focus,
.form-field textarea:focus,
.form-field select:focus { outline: none; border-bottom-color: var(--gold); }
.form-field textarea { min-height: 140px; resize: vertical; }
@media (max-width: 700px) { .form-grid { grid-template-columns: 1fr; } .form-grid .full { grid-column: span 1; } }

/* ---------- Journal ---------- */

.journal-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(3rem, 6vw, 5rem);
    max-width: 1100px;
    margin: 0 auto;
}
.journal-card { display: flex; flex-direction: column; gap: 1.2rem; }
.journal-card .frame { aspect-ratio: 3 / 4; overflow: hidden; background: var(--paper-deep); }
.journal-card .frame img { width: 100%; height: 100%; object-fit: cover; transition: transform 1000ms ease; }
.journal-card:hover .frame img { transform: scale(1.03); }
.journal-card .meta { font-family: var(--sans); font-size: 0.66rem; letter-spacing: 0.5em; text-transform: uppercase; color: var(--gold); }
.journal-card h3 {
    font-family: var(--serif-display);
    font-weight: 400;
    font-size: clamp(1.5rem, 2.4vw, 2rem);
    margin: 0;
    line-height: 1.15;
}
.journal-card p { color: var(--ink-soft); font-family: var(--sans); font-weight: 300; }
@media (max-width: 800px) { .journal-list { grid-template-columns: 1fr; } }

/* ---------- Accent rules ---------- */

.center-text { text-align: center; }
.muted { color: var(--muted); }
.center-rule { margin-left: auto; margin-right: auto; }

/* Slow-reveal subtle */
.section .display, .section .h-lg, .section .lead, .section .body-prose { transition: opacity 600ms ease; }
"""


JS = """
const toggle = document.querySelector('.nav-mobile-toggle');
const panel = document.querySelector('.nav-mobile-panel');
if (toggle && panel) {
    toggle.addEventListener('click', () => {
        const open = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !open);
        panel.classList.toggle('is-open');
    });
}

const form = document.querySelector('form.inquiry-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const status = form.querySelector('.form-status');
        if (status) {
            status.textContent = 'Received. Emily will respond personally within 48 hours.';
            status.style.color = 'var(--gold)';
        }
        form.reset();
    });
}
"""


NAV_LEFT = [
    ("Senior", "senior.html"),
    ("Family", "family.html"),
    ("Portfolio", "portfolio.html"),
]
NAV_RIGHT = [
    ("Studio", "about.html"),
    ("Investment", "investment.html"),
    ("Journal", "journal.html"),
    ("Inquire", "contact.html"),
]


def header(active=""):
    def link(label, href):
        cls = "is-active" if active == href else ""
        return f'<a href="{href}" class="{cls}">{label}</a>'
    left = "".join(link(l, h) for l, h in NAV_LEFT)
    right = "".join(link(l, h) for l, h in NAV_RIGHT)
    mobile = "".join(f'<li><a href="{h}">{l}</a></li>' for l, h in NAV_LEFT + NAV_RIGHT)
    return f"""
<header class="site-header">
    <div class="nav-shell">
        <button class="nav-mobile-toggle" aria-expanded="false" aria-label="Open menu"><span></span><span></span></button>
        <nav class="nav-left">{left}</nav>
        <a href="index.html" class="brand-mark">
            <span class="word">emily kathryn</span>
            <span class="sub">Photography</span>
        </a>
        <nav class="nav-right">{right}</nav>
    </div>
    <div class="nav-mobile-panel"><ul>{mobile}</ul></div>
</header>
"""


def footer():
    return """
<footer class="site-footer">
    <div class="footer-shell">
        <div class="footer-brand-row">
            <h2 class="display">emily kathryn</h2>
            <p>A boutique portrait studio in South-Central Virginia, photographing seniors and families across Danville, Lynchburg, and Smith Mountain Lake.</p>
        </div>
        <div class="footer-cols">
            <div class="footer-col"><h4>Studio</h4><ul><li><a href="about.html">About Emily</a></li><li><a href="journal.html">Journal</a></li><li><a href="investment.html">Investment</a></li><li><a href="contact.html">Inquire</a></li></ul></div>
            <div class="footer-col"><h4>Services</h4><ul><li><a href="senior.html">Senior Portraits</a></li><li><a href="family.html">Family Portraits</a></li><li><a href="portfolio.html">Portfolio</a></li></ul></div>
            <div class="footer-col"><h4>Studio</h4><ul><li>Gretna, Virginia</li><li>By appointment</li><li>(434) 000-0000</li></ul></div>
            <div class="footer-col"><h4>Elsewhere</h4><ul><li><a href="#">Instagram</a></li><li><a href="#">Pinterest</a></li><li><a href="#">TikTok</a></li></ul></div>
        </div>
        <div class="footer-bottom">
            <span>© 2026 Emily Kathryn Photography</span>
            <span>Design — NXTLVL Digital</span>
        </div>
    </div>
</footer>
"""


def html_doc(title, body, active=""):
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} — Emily Kathryn Photography</title>
<meta name="description" content="A boutique portrait studio in South-Central Virginia — senior and family portraiture, photographed on location.">
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

def page_home():
    body = f"""
<section class="hero">
    <div class="hero-shell">
        <p class="eyebrow hero-eyebrow">Boutique Portrait Studio · South-Central Virginia · est. 2014</p>
        <div class="hero-image" style="background-image: url('{IMG['hero']}');"></div>
        <div class="hero-headline-grid">
            <h1 class="hero-headline">A portrait studio for seniors and families.</h1>
            <div class="hero-side">
                <p>Considered portraiture, made on location across the Danville–Lynchburg–Smith Mountain Lake corridor.</p>
                <a href="contact.html" class="cta">Inquire</a>
            </div>
        </div>
    </div>
</section>

<section class="section" style="background: var(--paper-deep);">
    <div class="shell">
        <div class="atelier-split">
            <div class="text-col">
                <p class="eyebrow">The Studio</p>
                <h2 class="h-lg">Portraits that earn the wall.</h2>
                <p class="body-prose">EKP is a quiet, deliberate studio. Two service lines — senior portraits and family portraits — done well, on location, finished as wall art and albums that outlast the trend that inspired them.</p>
                <p class="body-prose" style="margin-top: 1.5rem;">Every session is planned: outfits, light, locations, posture. The result is a portrait that looks composed, calm, and recognizably you.</p>
                <p style="margin-top: 2.5rem;"><a href="about.html" class="link">Meet Emily</a></p>
            </div>
            <div class="image-col">
                <img src="{IMG['second']}" alt="">
            </div>
        </div>
    </div>
</section>

<section class="section">
    <div class="shell">
        <div class="section-opener">
            <p class="eyebrow">Service Lines</p>
            <h2 class="h-lg">Two services. Done well.</h2>
            <span class="hairline-rule"></span>
        </div>
        <div class="service-mini">
            <a href="senior.html" class="card">
                <img src="{IMG['senior_1']}" alt="">
                <div>
                    <p class="num">— 01</p>
                    <h3 class="h-md">Senior Portraits</h3>
                    <p class="body-prose">Magazine-quality sessions for the Class of 2027 and 2028 — designed around the senior, photographed across South-Central Virginia, finished as wall art and a senior album.</p>
                    <p style="margin-top: 1.5rem;"><span class="link">Senior</span></p>
                </div>
            </a>
            <a href="family.html" class="card">
                <img src="{IMG['family_1']}" alt="">
                <div>
                    <p class="num">— 02</p>
                    <h3 class="h-md">Family Portraits</h3>
                    <p class="body-prose">Generational portraits made on location — backyards, farms, downtowns, dockside at Smith Mountain Lake. Quiet sessions, polished portraits, framed for the room they'll live in.</p>
                    <p style="margin-top: 1.5rem;"><span class="link">Family</span></p>
                </div>
            </a>
        </div>
    </div>
</section>

<section class="quote-band">
    <div class="shell">
        <p class="quote">A portrait is not a snapshot. It is a small piece of commissioned work that asks to live somewhere on purpose.</p>
        <span class="hairline-rule"></span>
        <p class="quote-attr">— Emily Kathryn</p>
    </div>
</section>

<section class="section">
    <div class="shell">
        <div class="section-opener">
            <p class="eyebrow">Recent Work</p>
            <h2 class="h-lg">From the portfolio.</h2>
            <span class="hairline-rule"></span>
        </div>
        <div class="atelier-grid">
            <div class="tile t-5"><img src="{IMG['senior_2']}" alt=""></div>
            <div class="tile t-7"><img src="{IMG['senior_b_1']}" alt=""></div>
            <div class="tile t-4"><img src="{IMG['senior_3']}" alt=""></div>
            <div class="tile t-4"><img src="{IMG['senior_b_2']}" alt=""></div>
            <div class="tile t-4"><img src="{IMG['senior_4']}" alt=""></div>
            <div class="tile t-6"><img src="{IMG['family_1']}" alt=""></div>
            <div class="tile t-6"><img src="{IMG['family_2']}" alt=""></div>
        </div>
        <p class="center-text" style="margin-top: 3rem;"><a href="portfolio.html" class="link">View Portfolio</a></p>
    </div>
</section>

<section class="section" style="background: var(--paper-deep);">
    <div class="shell">
        <div class="atelier-split reverse tall">
            <div class="image-col"><img src="{IMG['journal_1']}" alt=""></div>
            <div class="text-col">
                <p class="eyebrow">The Journal</p>
                <h2 class="h-lg">Notes on style, season, and the senior year.</h2>
                <p class="body-prose">A working journal — outfit guides, location ideas, the longer answers to every question parents and seniors actually ask.</p>
                <p style="margin-top: 2rem;"><a href="journal.html" class="link">Read the Journal</a></p>
            </div>
        </div>
    </div>
</section>

<section class="section center-text">
    <div class="shell">
        <p class="eyebrow">Now Booking</p>
        <h2 class="display" style="max-width: 14ch; margin: 0 auto 2rem;">Class of 2027 inquiries are open.</h2>
        <p class="lead" style="margin: 0 auto 2.5rem;">A handful of summer and fall dates remain for Class of 2027 seniors and family sessions across the corridor.</p>
        <a href="contact.html" class="cta cta-filled">Inquire for Availability</a>
    </div>
</section>
"""
    return html_doc("Boutique Portrait Studio — South-Central Virginia", body, active="index.html")


def page_about():
    body = f"""
<section class="section">
    <div class="shell">
        <div class="section-opener">
            <p class="eyebrow">The Studio</p>
            <h1 class="display">Meet Emily.</h1>
            <span class="hairline-rule"></span>
        </div>

        <div class="atelier-split tall">
            <div class="image-col"><img src="{IMG['emily']}" alt="Emily Kathryn"></div>
            <div class="text-col">
                <p class="lead">Emily Kathryn is a portrait photographer based in Gretna, Virginia.</p>
                <p class="body-prose">For more than a decade she has photographed the seniors and families of South-Central Virginia — and the people who drive a little farther because the work feels worth the drive.</p>
                <p class="body-prose" style="margin-top: 1.5rem;">She studied photography after a career in education, where she spent years watching seniors get ready for prom, graduation, and college applications. That decade-long view shaped the studio's posture: the senior portrait is not a checkbox on a yearbook form. It is the marker of a year that won't repeat.</p>
                <p class="body-prose" style="margin-top: 1.5rem;">The work is editorial in the sense that it is composed and considered — but never cold. Every session is planned: outfits, light, locations, posture. The goal is for the senior or family to look like the most confident, recognizable version of themselves.</p>
            </div>
        </div>
    </div>
</section>

<section class="quote-band">
    <div class="shell">
        <p class="quote">The right portrait doesn't happen by accident. It is planned, directed, and finished with intent.</p>
        <span class="hairline-rule"></span>
        <p class="quote-attr">— Emily Kathryn</p>
    </div>
</section>

<section class="section">
    <div class="shell">
        <div class="section-opener">
            <p class="eyebrow">The Experience</p>
            <h2 class="h-lg">From inquiry to delivery.</h2>
            <span class="hairline-rule"></span>
        </div>
        <div class="process-list">
            <div class="process-row">
                <div class="step-num">— 01</div>
                <div>
                    <h3>Inquire</h3>
                    <p>Send a note. We schedule a 15-minute style call to talk about the senior or the family, the timing you have in mind, and the imagery you want to walk away with.</p>
                </div>
            </div>
            <div class="process-row">
                <div class="step-num">— 02</div>
                <div>
                    <h3>Plan</h3>
                    <p>Once you've booked, we plan the session — outfits, locations, season, light. You'll receive a custom style guide tailored to your session.</p>
                </div>
            </div>
            <div class="process-row">
                <div class="step-num">— 03</div>
                <div>
                    <h3>Photograph</h3>
                    <p>Sessions run 1.5 to 3 hours depending on the package and the locations. Posing is guided; nothing about the experience asks you to know what you're doing.</p>
                </div>
            </div>
            <div class="process-row">
                <div class="step-num">— 04</div>
                <div>
                    <h3>Order</h3>
                    <p>Within three weeks of the session, we meet — in person or virtually — to design wall art, prints, and an album from the finished gallery.</p>
                </div>
            </div>
            <div class="process-row">
                <div class="step-num">— 05</div>
                <div>
                    <h3>Deliver</h3>
                    <p>Digital files arrive in your gallery. Wall art and album arrive at the studio four to six weeks later, ready for pickup or hand delivery within the corridor.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="section center-text">
    <div class="shell">
        <h2 class="display" style="max-width: 18ch; margin: 0 auto 2rem;">Ready to plan a session?</h2>
        <a href="contact.html" class="cta cta-filled">Begin</a>
    </div>
</section>
"""
    return html_doc("Studio", body, active="about.html")


def page_senior():
    body = f"""
<section class="hero">
    <div class="hero-shell">
        <p class="eyebrow hero-eyebrow">Service No. 01 · Senior Portraits</p>
        <div class="hero-image" style="background-image: url('{IMG['senior_2']}'); aspect-ratio: 16 / 10;"></div>
        <div class="hero-headline-grid">
            <h1 class="hero-headline">Senior portraits, made for the wall.</h1>
            <div class="hero-side">
                <p>Editorial sessions for the Class of 2027 and 2028 — designed around the senior, photographed across the corridor, finished as wall art and an album.</p>
                <a href="contact.html" class="cta">Inquire</a>
            </div>
        </div>
    </div>
</section>

<section class="section">
    <div class="shell">
        <div class="atelier-split">
            <div class="text-col">
                <p class="eyebrow">For the Senior</p>
                <h2 class="h-lg">A session shaped around you.</h2>
                <p class="body-prose">You don't have to know how to pose, what to wear, or where to go. The studio handles all of it — so the only thing you have to do on session day is show up and be photographed.</p>
                <p class="body-prose" style="margin-top: 1.5rem;">Every session is planned around the student — the schools you attend, the activities you love, the version of yourself you want to remember. Sessions run two hours, two outfits, two locations, minimum.</p>
            </div>
            <div class="image-col">
                <img src="{IMG['senior_3']}" alt="">
            </div>
        </div>
    </div>
</section>

<section class="section" style="padding-top: 0;">
    <div class="shell">
        <div class="atelier-grid">
            <div class="tile t-12"><img src="{IMG['hero']}" alt=""></div>
            <div class="tile t-6"><img src="{IMG['senior_1']}" alt=""></div>
            <div class="tile t-6"><img src="{IMG['senior_b_1']}" alt=""></div>
            <div class="tile t-4"><img src="{IMG['senior_2']}" alt=""></div>
            <div class="tile t-4"><img src="{IMG['senior_b_2']}" alt=""></div>
            <div class="tile t-4"><img src="{IMG['senior_3']}" alt=""></div>
        </div>
    </div>
</section>

<section class="section" style="background: var(--paper-deep);">
    <div class="shell">
        <div class="atelier-split reverse">
            <div class="image-col"><img src="{IMG['detail_2']}" alt="Heirloom senior album"></div>
            <div class="text-col">
                <p class="eyebrow">For the Parent</p>
                <h2 class="h-lg">A senior portrait you'll want to frame.</h2>
                <p class="body-prose">EKP is for the family that has decided this milestone is worth doing well. The session is one part of the experience. The wall art and album that follow are the part you'll look at for the next twenty years.</p>
                <p class="body-prose" style="margin-top: 1.5rem;">Sessions begin at $799. Most families invest between $1,800 and $3,500 across digital files, wall art, and a senior album.</p>
                <p style="margin-top: 2rem;"><a href="investment.html" class="link">View Investment</a></p>
            </div>
        </div>
    </div>
</section>

<section class="section">
    <div class="shell">
        <div class="section-opener">
            <p class="eyebrow">For Senior Boys</p>
            <h2 class="h-lg">Yes — we photograph boys too.</h2>
            <span class="hairline-rule"></span>
            <p class="lead" style="margin: 0 auto;">Sessions for senior boys are paced, styled, and directed differently than girl sessions — but with the same editorial standard.</p>
        </div>
        <div class="atelier-grid">
            <div class="tile t-4"><img src="{IMG['senior_b_1']}" alt=""></div>
            <div class="tile t-4"><img src="{IMG['senior_b_2']}" alt=""></div>
            <div class="tile t-4"><img src="{IMG['senior_b_3']}" alt=""></div>
        </div>
    </div>
</section>

<section class="section" style="background: var(--paper-deep);">
    <div class="shell">
        <div class="section-opener">
            <p class="eyebrow">Common Questions</p>
            <h2 class="h-lg">Answers, before you ask.</h2>
            <span class="hairline-rule"></span>
        </div>
        <div style="max-width: 720px; margin: 0 auto;">
            <details style="border-bottom: 0.5px solid var(--hairline); padding: 1.5rem 0;">
                <summary style="font-family: var(--serif-display); font-size: 1.35rem; cursor: pointer;">How much does a senior session cost?</summary>
                <p style="margin-top: 1rem; color: var(--muted);">The session begins at $799. Most families invest between $1,800 and $3,500 in total across digital files, wall art, and a senior album.</p>
            </details>
            <details style="border-bottom: 0.5px solid var(--hairline); padding: 1.5rem 0;">
                <summary style="font-family: var(--serif-display); font-size: 1.35rem; cursor: pointer;">When should we book?</summary>
                <p style="margin-top: 1rem; color: var(--muted);">Most Class of 2027 seniors book between May and August of their junior year. Class of 2028 inquiries are welcome any time after January 2027.</p>
            </details>
            <details style="border-bottom: 0.5px solid var(--hairline); padding: 1.5rem 0;">
                <summary style="font-family: var(--serif-display); font-size: 1.35rem; cursor: pointer;">What is included with the session?</summary>
                <p style="margin-top: 1rem; color: var(--muted);">A pre-session style call, custom outfit and location guidance, the session itself, professional retouching, an in-person ordering appointment, and a private online gallery.</p>
            </details>
            <details style="border-bottom: 0.5px solid var(--hairline); padding: 1.5rem 0;">
                <summary style="font-family: var(--serif-display); font-size: 1.35rem; cursor: pointer;">Where do sessions happen?</summary>
                <p style="margin-top: 1rem; color: var(--muted);">On location across Danville, Chatham, Gretna, Altavista, Evington, Forest, Lynchburg, Bedford, and Smith Mountain Lake. We plan the locations together based on your style direction.</p>
            </details>
            <details style="border-bottom: 0.5px solid var(--hairline); padding: 1.5rem 0;">
                <summary style="font-family: var(--serif-display); font-size: 1.35rem; cursor: pointer;">Do you photograph senior boys?</summary>
                <p style="margin-top: 1rem; color: var(--muted);">Yes. Boy senior sessions are a meaningful part of the studio. They are paced and directed differently than girl sessions but held to the same editorial standard.</p>
            </details>
        </div>
    </div>
</section>

<section class="section center-text">
    <div class="shell">
        <h2 class="display" style="max-width: 18ch; margin: 0 auto 2rem;">Inquire for senior availability.</h2>
        <a href="contact.html" class="cta cta-filled">Begin</a>
    </div>
</section>
"""
    return html_doc("Senior Portraits", body, active="senior.html")


def page_family():
    body = f"""
<section class="hero">
    <div class="hero-shell">
        <p class="eyebrow hero-eyebrow">Service No. 02 · Family Portraits</p>
        <div class="hero-image" style="background-image: url('{IMG['family_1']}'); aspect-ratio: 16 / 10;"></div>
        <div class="hero-headline-grid">
            <h1 class="hero-headline">Family portraits, made on location.</h1>
            <div class="hero-side">
                <p>Generational portraits photographed at the place that means the most — backyards, farms, downtowns, dockside at Smith Mountain Lake.</p>
                <a href="contact.html" class="cta">Inquire</a>
            </div>
        </div>
    </div>
</section>

<section class="section">
    <div class="shell">
        <div class="atelier-split">
            <div class="text-col">
                <p class="eyebrow">The Approach</p>
                <h2 class="h-lg">Family sessions as commissioned portraiture.</h2>
                <p class="body-prose">EKP family sessions are not lifestyle shoots. They are commissioned portraits, planned and directed — the work that ends up framed above the fireplace, not just shared on the family group text.</p>
                <p class="body-prose" style="margin-top: 1.5rem;">Sessions are scheduled at the time of day the light will work for you. Outfits are coordinated, not matched. Locations are chosen for their meaning — the family farm, the front porch, the dock, the downtown street where your kids grew up.</p>
            </div>
            <div class="image-col">
                <img src="{IMG['family_2']}" alt="">
            </div>
        </div>
    </div>
</section>

<section class="section" style="padding-top: 0;">
    <div class="shell">
        <div class="atelier-grid">
            <div class="tile t-6"><img src="{IMG['family_1']}" alt=""></div>
            <div class="tile t-6"><img src="{IMG['family_3']}" alt=""></div>
            <div class="tile t-12"><img src="{IMG['lake']}" alt=""></div>
        </div>
    </div>
</section>

<section class="section" style="background: var(--paper-deep);">
    <div class="shell">
        <div class="atelier-split reverse">
            <div class="image-col"><img src="{IMG['lake']}" alt="Smith Mountain Lake family"></div>
            <div class="text-col">
                <p class="eyebrow">Smith Mountain Lake</p>
                <h2 class="h-lg">Lake-house family sessions.</h2>
                <p class="body-prose">A dedicated family service line for the families who summer at Smith Mountain Lake. On the dock, on the boat, on the deck — photographed during the season the lake actually feels like home.</p>
                <p class="body-prose" style="margin-top: 1.5rem;">Lake sessions are designed for multi-generational families, second-home owners, and the families who only get everyone together a few weekends a year. Bookings open in February each year for the May–September window.</p>
                <p style="margin-top: 2rem;"><a href="contact.html" class="link">Plan a Lake Session</a></p>
            </div>
        </div>
    </div>
</section>

<section class="quote-band">
    <div class="shell">
        <p class="quote">The portraits that survive are the ones you decided to frame.</p>
        <span class="hairline-rule"></span>
        <p class="quote-attr">— EKP Studio</p>
    </div>
</section>

<section class="section">
    <div class="shell">
        <div class="atelier-split">
            <div class="text-col">
                <p class="eyebrow">Investment</p>
                <h2 class="h-lg">Sessions begin at $899.</h2>
                <p class="body-prose">Most families invest between $1,500 and $4,000 in total across digital files, framed prints, and a heirloom album.</p>
                <p class="body-prose" style="margin-top: 1.5rem;">Multi-generational sessions, anniversary portraits, and Smith Mountain Lake bookings are priced separately. Investment guides are sent before every consultation.</p>
                <p style="margin-top: 2rem;"><a href="investment.html" class="link">View Investment</a></p>
            </div>
            <div class="image-col"><img src="{IMG['detail_2']}" alt="Heirloom album"></div>
        </div>
    </div>
</section>

<section class="section center-text">
    <div class="shell">
        <h2 class="display" style="max-width: 18ch; margin: 0 auto 2rem;">Plan a family session.</h2>
        <a href="contact.html" class="cta cta-filled">Begin</a>
    </div>
</section>
"""
    return html_doc("Family Portraits", body, active="family.html")


def page_investment():
    body = f"""
<section class="section">
    <div class="shell">
        <div class="section-opener">
            <p class="eyebrow">Investment</p>
            <h1 class="display">A small piece of commissioned work.</h1>
            <span class="hairline-rule"></span>
            <p class="lead" style="margin: 0 auto;">The session is the beginning. The wall art, album, and prints are where the experience finishes — and where most of the lasting value lives.</p>
        </div>

        <div class="invest-list">
            <div class="invest-row">
                <div>
                    <h3 class="invest-name">The Senior Session</h3>
                    <p class="price">begins at $799</p>
                </div>
                <div>
                    <ul>
                        <li>Pre-session style call</li>
                        <li>Custom outfit + location guide</li>
                        <li>Two-hour on-location session</li>
                        <li>Two outfits, two locations, minimum</li>
                        <li>20+ professionally retouched images</li>
                        <li>Private online gallery</li>
                        <li>In-person ordering session</li>
                    </ul>
                    <a href="contact.html" class="link">Inquire</a>
                </div>
            </div>

            <div class="invest-row featured">
                <div>
                    <h3 class="invest-name">The Heirloom Collection</h3>
                    <p class="price">avg. investment $2,400</p>
                </div>
                <div>
                    <ul>
                        <li>The Senior Session (above)</li>
                        <li>16×24 framed wall print</li>
                        <li>10×10 leather senior album (20 pages)</li>
                        <li>Set of 8 gift prints</li>
                        <li>Full digital file release</li>
                    </ul>
                    <a href="contact.html" class="cta cta-filled" style="margin-top: 0.5rem;">Inquire</a>
                </div>
            </div>

            <div class="invest-row">
                <div>
                    <h3 class="invest-name">The Family Session</h3>
                    <p class="price">begins at $899</p>
                </div>
                <div>
                    <ul>
                        <li>Pre-session planning call</li>
                        <li>Outfit + location guidance</li>
                        <li>1.5-hour on-location session</li>
                        <li>15+ retouched images</li>
                        <li>Private gallery + ordering session</li>
                        <li>Wall art and album à la carte</li>
                    </ul>
                    <a href="contact.html" class="link">Inquire</a>
                </div>
            </div>

            <div class="invest-row">
                <div>
                    <h3 class="invest-name">The Lake-House Session</h3>
                    <p class="price">begins at $1,400</p>
                </div>
                <div>
                    <ul>
                        <li>Multi-generational Smith Mountain Lake session</li>
                        <li>Dock, boat, deck, and shoreline coverage</li>
                        <li>2.5-hour session window</li>
                        <li>25+ retouched images</li>
                        <li>Custom wall art consultation for lake-house interior</li>
                        <li>Hand delivery within the corridor</li>
                    </ul>
                    <a href="contact.html" class="link">Inquire</a>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="quote-band">
    <div class="shell">
        <p class="quote">Most families invest between $1,800 and $3,500 across files, wall art, and an album.</p>
        <span class="hairline-rule"></span>
        <p class="quote-attr">— EKP Studio average, 2025</p>
    </div>
</section>

<section class="section">
    <div class="shell">
        <div class="section-opener">
            <p class="eyebrow">Heirloom Products</p>
            <h2 class="h-lg">What we make.</h2>
            <span class="hairline-rule"></span>
            <p class="lead" style="margin: 0 auto;">Every session ends with an ordering appointment. Wall art, albums, and prints are designed in person — sized for your home, finished to last.</p>
        </div>
        <div class="atelier-grid">
            <div class="tile t-4"><img src="{IMG['detail_2']}" alt=""></div>
            <div class="tile t-4"><img src="{IMG['detail_1']}" alt=""></div>
            <div class="tile t-4"><img src="{IMG['detail_3']}" alt=""></div>
        </div>
    </div>
</section>

<section class="section center-text" style="background: var(--paper-deep);">
    <div class="shell">
        <h2 class="display" style="max-width: 20ch; margin: 0 auto 2rem;">Receive the full investment guide.</h2>
        <p class="lead" style="margin: 0 auto 2.5rem;">A PDF guide is sent before every consultation — full pricing, collection details, product samples.</p>
        <a href="contact.html" class="cta cta-filled">Request the Guide</a>
    </div>
</section>
"""
    return html_doc("Investment", body, active="investment.html")


def page_portfolio():
    body = f"""
<section class="section">
    <div class="shell">
        <div class="section-opener">
            <p class="eyebrow">Portfolio</p>
            <h1 class="display">The work.</h1>
            <span class="hairline-rule"></span>
            <p class="lead" style="margin: 0 auto;">A selection of recent senior and family sessions from across the corridor.</p>
        </div>

        <p class="eyebrow center-text" style="margin-bottom: 3rem;">— Senior Portraits, Class of 2026 / 2027</p>
        <div class="atelier-grid">
            <div class="tile t-5"><img src="{IMG['senior_1']}" alt=""></div>
            <div class="tile t-7"><img src="{IMG['senior_b_1']}" alt=""></div>
            <div class="tile t-4"><img src="{IMG['senior_2']}" alt=""></div>
            <div class="tile t-4"><img src="{IMG['senior_b_2']}" alt=""></div>
            <div class="tile t-4"><img src="{IMG['senior_3']}" alt=""></div>
            <div class="tile t-6"><img src="{IMG['senior_4']}" alt=""></div>
            <div class="tile t-6"><img src="{IMG['senior_b_3']}" alt=""></div>
        </div>
    </div>
</section>

<section class="section" style="background: var(--paper-deep);">
    <div class="shell">
        <p class="eyebrow center-text" style="margin-bottom: 3rem;">— Family Portraits, 2025–2026</p>
        <div class="atelier-grid">
            <div class="tile t-6"><img src="{IMG['family_1']}" alt=""></div>
            <div class="tile t-6"><img src="{IMG['family_2']}" alt=""></div>
            <div class="tile t-4"><img src="{IMG['family_3']}" alt=""></div>
            <div class="tile t-8"><img src="{IMG['lake']}" alt=""></div>
        </div>
    </div>
</section>

<section class="section center-text">
    <div class="shell">
        <h2 class="display" style="max-width: 16ch; margin: 0 auto 2rem;">See yourself in the portfolio?</h2>
        <a href="contact.html" class="cta cta-filled">Inquire for a Session</a>
    </div>
</section>
"""
    return html_doc("Portfolio", body, active="portfolio.html")


def page_journal():
    body = f"""
<section class="section">
    <div class="shell">
        <div class="section-opener">
            <p class="eyebrow">The Journal</p>
            <h1 class="display">Notes from the studio.</h1>
            <span class="hairline-rule"></span>
            <p class="lead" style="margin: 0 auto;">A working journal — outfit guides, location ideas, behind-the-scenes from recent sessions, and the longer answers to the questions parents and seniors actually ask.</p>
        </div>

        <div class="journal-list">
            <a class="journal-card" href="#">
                <div class="frame"><img src="{IMG['journal_1']}" alt=""></div>
                <span class="meta">Style · May 2026</span>
                <h3>What to wear for senior portraits in Virginia.</h3>
                <p>A working guide to outfit planning — color, texture, layers, what photographs well, and what to leave home.</p>
                <span class="link">Read</span>
            </a>
            <a class="journal-card" href="#">
                <div class="frame"><img src="{IMG['journal_2']}" alt=""></div>
                <span class="meta">Location · April 2026</span>
                <h3>Senior locations across the corridor.</h3>
                <p>The fields, downtowns, lakesides, and farms that keep showing up in the portfolio — and how to choose between them.</p>
                <span class="link">Read</span>
            </a>
        </div>
    </div>
</section>

<section class="section" style="background: var(--paper-deep);">
    <div class="shell">
        <div class="journal-list">
            <a class="journal-card" href="#">
                <div class="frame"><img src="{IMG['journal_3']}" alt=""></div>
                <span class="meta">For Boys · March 2026</span>
                <h3>An editorial guide for senior boys.</h3>
                <p>For the senior boy (and his mom) who isn't sure what a senior portrait session is supposed to look like.</p>
                <span class="link">Read</span>
            </a>
            <a class="journal-card" href="#">
                <div class="frame"><img src="{IMG['detail_2']}" alt=""></div>
                <span class="meta">Heirloom · March 2026</span>
                <h3>Why wall art matters more than files.</h3>
                <p>A conversation about the difference between photos that live on a phone and photos that live on a wall.</p>
                <span class="link">Read</span>
            </a>
        </div>
    </div>
</section>

<section class="section">
    <div class="shell">
        <div class="journal-list">
            <a class="journal-card" href="#">
                <div class="frame"><img src="{IMG['lake']}" alt=""></div>
                <span class="meta">Family · February 2026</span>
                <h3>Family portraits at Smith Mountain Lake.</h3>
                <p>Planning a lake-house session — timing, light, dock-versus-deck, and what to do with the boat.</p>
                <span class="link">Read</span>
            </a>
            <a class="journal-card" href="#">
                <div class="frame"><img src="{IMG['senior_2']}" alt=""></div>
                <span class="meta">Booking · January 2026</span>
                <h3>The Class of 2027 booking window.</h3>
                <p>When to inquire, when to book, and why the families who plan early get the locations they want.</p>
                <span class="link">Read</span>
            </a>
        </div>
    </div>
</section>

<section class="section center-text" style="background: var(--paper-deep);">
    <div class="shell">
        <h2 class="display" style="max-width: 16ch; margin: 0 auto 2rem;">Want it in your inbox?</h2>
        <p class="lead" style="margin: 0 auto 2.5rem;">New journal entries land roughly twice a month. No spam, no scarcity-bait — just the studio.</p>
        <a href="contact.html" class="cta cta-filled">Subscribe</a>
    </div>
</section>
"""
    return html_doc("Journal", body, active="journal.html")


def page_contact():
    body = f"""
<section class="section">
    <div class="shell">
        <div class="atelier-split">
            <div class="text-col">
                <p class="eyebrow">Contact</p>
                <h1 class="display">Begin.</h1>
                <span class="hairline-rule" style="margin: 2rem 0; margin-left: 0;"></span>
                <p class="lead">Tell me a little about the senior or the family and the timing you have in mind. I'll respond personally within 48 hours.</p>

                <div style="margin-top: 4rem;">
                    <p class="eyebrow">Studio</p>
                    <p class="body-prose">Gretna, Virginia · By appointment</p>

                    <p class="eyebrow" style="margin-top: 2.5rem;">Email</p>
                    <p class="body-prose">emily@emilykathryn.com</p>

                    <p class="eyebrow" style="margin-top: 2.5rem;">Phone</p>
                    <p class="body-prose">(434) 000-0000</p>

                    <p class="eyebrow" style="margin-top: 2.5rem;">Booking Windows</p>
                    <p class="body-prose">Class of 2027 — open<br>Class of 2028 — opens January 2027<br>Family — rolling</p>
                </div>
            </div>

            <div>
                <form class="inquiry-form">
                    <div class="form-grid">
                        <div class="form-field">
                            <label>Your Name</label>
                            <input name="name" type="text" required>
                        </div>
                        <div class="form-field">
                            <label>Email</label>
                            <input name="email" type="email" required>
                        </div>
                        <div class="form-field">
                            <label>Phone</label>
                            <input name="phone" type="tel">
                        </div>
                        <div class="form-field">
                            <label>Session Type</label>
                            <select name="service">
                                <option>Senior Portraits</option>
                                <option>Family Portraits</option>
                                <option>Smith Mountain Lake Family</option>
                                <option>Not sure yet</option>
                            </select>
                        </div>
                        <div class="form-field">
                            <label>Timing in Mind</label>
                            <input name="when" type="text" placeholder="e.g. Fall 2026">
                        </div>
                        <div class="form-field">
                            <label>Graduation Year (if senior)</label>
                            <input name="grad" type="text">
                        </div>
                        <div class="form-field full">
                            <label>Tell me about the session you have in mind</label>
                            <textarea name="message"></textarea>
                        </div>
                        <div class="full">
                            <button type="submit" class="cta cta-filled">Submit Inquiry</button>
                            <p class="form-status" style="margin-top: 1.5rem; font-family: var(--sans); font-size: 0.9rem;"></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
"""
    return html_doc("Contact", body, active="contact.html")


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
    print(f"\nConcept C built: {len(PAGES)} pages")
