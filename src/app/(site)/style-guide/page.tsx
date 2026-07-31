import Image from 'next/image'
import Link from 'next/link'
import { Section } from '@/components/shared/Section'
import { RevealOnScroll } from '@/components/shared/RevealOnScroll'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Style Guide',
  description:
    'Your complete senior portrait wardrobe guide. Outfit ideas, color palettes, seasonal advice, and styling tips from Emily Kathryn Photography in South-Central Virginia.',
  openGraph: {
    title: 'Senior Style Guide | Emily Kathryn Photography',
    description:
      'Your complete senior portrait wardrobe guide. Outfit ideas, color palettes, seasonal advice, and styling tips for guys and girls.',
    url: 'https://emilykathryn.com/style-guide',
    siteName: 'Emily Kathryn Photography',
    images: [
      {
        url: '/og/style-guide.jpg',
        width: 1200,
        height: 630,
        alt: 'Senior Style Guide with wardrobe tips from Emily Kathryn Photography',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Senior Style Guide | Emily Kathryn Photography',
    description:
      'Your complete senior portrait wardrobe guide. Outfit ideas, color palettes, seasonal advice, and styling tips.',
    images: ['/og/style-guide.jpg'],
  },
}

/** Contents, so a long guide stays scannable and jumpable. */
const GUIDE_INDEX = [
  { num: '01', label: 'How Many Outfits', href: '#outfits' },
  { num: '02', label: 'Colors That Photograph', href: '#color' },
  { num: '03', label: 'Dressing for the Season', href: '#seasons' },
  { num: '04', label: 'The Art of Layering', href: '#layering' },
  { num: '05', label: 'What to Skip', href: '#skip' },
  { num: '06', label: 'Accessories', href: '#accessories' },
  { num: '07', label: 'Tips for Guys', href: '#guys' },
  { num: '08', label: 'Session Day', href: '#session-day' },
]

const OUTFIT_CATEGORIES = [
  {
    num: '01',
    title: 'Dressy / Editorial',
    text: 'Think that outfit that makes you feel like you are on a magazine cover. A beautiful dress, a sharp blazer, heels or polished boots. This is the “wow” look.',
  },
  {
    num: '02',
    title: 'Casual / Effortless',
    text: 'Your favorite jeans, a cozy sweater or a simple tee, and your go-to sneakers. This look says, “This is me, just being me.”',
  },
  {
    num: '03',
    title: 'School Spirit or Hobby',
    text: 'Letterman jacket, cheer uniform, band gear, your jersey. Bring whatever represents a piece of your high school story. These images are the ones your parents will absolutely treasure.',
  },
  {
    num: '04',
    title: 'Bonus: Something Bold',
    text: 'A statement piece you would not normally wear every day. Maybe a leather jacket, a tulle skirt, a hat. These create the most unexpected and striking images.',
  },
]

const COLOR_FAMILIES = [
  {
    title: 'Earth Tones',
    text: 'Cream, tan, camel, olive, rust, and chocolate brown. These are universally flattering and blend effortlessly with Virginia’s natural landscapes, like golden fields, red barns, and winding trails.',
  },
  {
    title: 'Jewel Tones',
    text: 'Emerald, burgundy, navy, mauve, and deep plum. Rich and saturated, jewel tones add depth and drama to your images, especially against green forests and moody fall backdrops.',
  },
  {
    title: 'Muted Pastels',
    text: 'Dusty rose, sage, lavender, and soft blue. These delicate tones create a dreamy, editorial quality and photograph gorgeously in spring and summer light.',
  },
]

const COLOR_STRIP = [
  {
    src: '/images/seniors/EKP_5321.jpg',
    alt: 'Senior portrait holding a colorful bouquet',
  },
  {
    src: '/images/seniors/EKP_0030.jpg',
    alt: 'Senior portrait in a woodland setting',
  },
  {
    src: '/images/seniors/EKP_5166.jpg',
    alt: 'Bright floral senior portrait',
  },
]

const SEASONS: Array<{
  name: string
  dotClass: string
  tag?: string
  text: string
}> = [
  {
    name: 'Spring',
    dotClass: 'text-brand-sage',
    text: 'Light layers are your friend. Think flowy dresses, pastel blouses, and soft cardigans. Floral prints work if they are subtle. Go for small, ditsy patterns rather than bold tropical prints. The blooming dogwoods and fresh green backdrops pair beautifully with light, airy outfits. Avoid heavy fabrics that look out of season.',
  },
  {
    name: 'Summer',
    dotClass: 'text-brand-gold',
    text: 'Breezy fabrics like linen and cotton keep you comfortable and photograph with beautiful movement. Sundresses, rompers, and light denim are all great choices. Keep makeup minimal and natural. Virginia humidity is real, and less is more when the temperature climbs. Golden hour sessions in summer give us rich, warm light, so lean into warm tones.',
  },
  {
    name: 'Fall',
    dotClass: 'text-brand-gold',
    tag: 'Most Popular',
    text: 'This is our busiest (and most magical) season, and for good reason. The warm tones of changing leaves create an unbelievable backdrop. Embrace layers. Flannel shirts, cozy knits, scarves, ankle boots, and denim jackets are all fair game. Rich colors like burgundy, mustard, forest green, and rust pair beautifully with autumn landscapes. This is the season to go all-in on texture and warmth.',
  },
  {
    name: 'Winter',
    dotClass: 'text-muted-foreground',
    text: 'Winter sessions are underrated and quietly dramatic. Think rich textures, like chunky knits, faux fur, wool coats, and leather. Jewel tones like deep red, emerald, and navy contrast beautifully against bare trees and moody skies. Cozy accessories (beanies, gloves, scarves) add visual interest and make the images feel warm and inviting even in the cold.',
  },
]

const LAYERING_PIECES = [
  {
    title: 'Jackets and blazers',
    text: 'A leather jacket instantly adds edge. A denim jacket keeps things casual. A tailored blazer gives an editorial, polished vibe.',
  },
  {
    title: 'Cardigans and sweaters',
    text: 'Chunky knits and oversized cardigans create a cozy, relaxed look. Draping a cardigan off one shoulder adds effortless movement to the image.',
  },
  {
    title: 'Scarves and wraps',
    text: 'Lightweight scarves add texture without bulk. They catch the wind beautifully and create organic movement in outdoor shots.',
  },
  {
    title: 'Hats',
    text: 'Wide-brimmed hats add instant editorial drama. Baseball caps work for a sporty, casual vibe. Beanies are perfect for fall and winter warmth.',
  },
]

const AVOID = [
  {
    item: 'Neon or fluorescent colors',
    reason:
      'They cast colored reflections on your skin and overpower natural surroundings.',
  },
  {
    item: 'Large logos or text on shirts',
    reason:
      'Brand logos and graphic text pull attention away from your face and expressions.',
  },
  {
    item: 'Overly trendy items',
    reason:
      'Ultra-current micro-trends fade fast. Choose pieces with staying power. Your future self will thank you.',
  },
  {
    item: 'Brand-new shoes',
    reason:
      'Break them in before session day! Blisters and discomfort show in your expression and posture.',
  },
  {
    item: 'Heavy glitter or shimmer',
    reason:
      'Glitter catches light unpredictably and can create distracting sparkle in images.',
  },
  {
    item: 'Busy or oversized patterns',
    reason:
      'Large-scale florals and complex patterns compete with the background and your face for attention.',
  },
]

const ACCESSORIES = [
  {
    title: 'Jewelry',
    text: 'Delicate, simple pieces photograph well. Layered necklaces, small hoops, thin bracelets, and dainty rings add subtle sparkle without distraction. Avoid anything overly chunky or reflective. Large gemstones and statement pieces can catch light in unexpected ways.',
  },
  {
    title: 'Shoes',
    text: 'Yes, shoes matter. They are in more shots than you think! Boots (ankle or knee-high), clean sneakers, heels for dressy looks, and sandals for summer are all great options. Bring a variety and we will match them to the location and outfit.',
  },
  {
    title: 'Sunglasses',
    text: 'A great pair of sunglasses adds instant cool-factor. They are perfect for candid, editorial shots. Hold them, push them up on your head, or wear them mid-laugh. Stick to classic shapes that complement your face.',
  },
  {
    title: 'Meaningful Items',
    text: 'This is where it gets personal. Your letterman jacket, a musical instrument, your favorite book, sports equipment, your pet. These are the details that make your session uniquely yours. These items tell your story in a way that clothes alone cannot.',
  },
]

const GUYS_ESSENTIALS = [
  {
    title: 'Well-fitted jeans',
    text: 'Dark wash or medium wash, not ripped or overly distressed. A proper fit makes all the difference.',
  },
  {
    title: 'Button-down shirts',
    text: 'Rolled sleeves, top button undone. A classic look that photographs remarkably well. Stick to solid colors or subtle patterns.',
  },
  {
    title: 'Solid tees',
    text: 'A simple, well-fitted crew neck or henley in a solid color is effortlessly cool. Pair it with a jacket for a layered look.',
  },
  {
    title: 'Leather or denim jacket',
    text: 'The ultimate layering piece for guys. Adds texture and personality instantly.',
  },
  {
    title: 'Boots or clean sneakers',
    text: 'Leather boots give an editorial edge. Clean white sneakers keep things modern and casual. No worn-out athletic shoes.',
  },
]

const GUYS_AVOID = [
  {
    title: 'Baggy or oversized clothing',
    text: 'Fit is king. Clothes that are too large hide your frame and look sloppy on camera.',
  },
  {
    title: 'Athletic wear',
    text: 'Unless it represents your sport (jersey, letterman jacket, cleats), leave the gym shorts and basketball shoes at home.',
  },
  {
    title: 'Hat-hair',
    text: 'If you wear a hat to the session, bring a comb. We can absolutely incorporate your hat into some shots, but we need your hair looking good for the hatless ones too.',
  },
]

const SESSION_DAY = [
  {
    num: '01',
    title: 'Start Planning Early',
    text: 'Do not leave outfit planning to the night before. Start collecting pieces a few weeks out so you have time to try things on, mix and match, and even shop for anything missing.',
  },
  {
    num: '02',
    title: 'Try Everything On',
    text: 'Put together your complete outfits, shoes and accessories included, and try them on. Check the mirror from different angles. Sit down, walk around. Make sure you feel comfortable and confident in every look.',
  },
  {
    num: '03',
    title: 'Bring a Steamer',
    text: 'Wrinkles are the number one outfit issue on session day. A small travel steamer or iron can save the day. If you do not have one, hang your outfits in the bathroom during a hot shower the night before.',
  },
  {
    num: '04',
    title: 'Hair and Makeup',
    text: 'Arrive with hair and makeup done, or book a professional. I am happy to recommend local artists. Keep makeup a touch more polished than everyday and skip the heavy shimmer. If you want your nails visible in shots, a fresh manicure goes a long way.',
  },
  {
    num: '05',
    title: 'Pack Smart',
    text: 'Bring your outfits on hangers in a garment bag. Pack your accessories and shoes in a separate bag with labels. A small kit with safety pins, double-sided tape, breath mints, and blotting papers is a lifesaver.',
  },
  {
    num: '06',
    title: 'Trust the Process',
    text: 'This is the most important tip. I will guide you through every movement, every expression, and every angle. All you have to do is show up, be yourself, and have fun. I promise you are going to love the result.',
  },
]

function ArrowLink({ href, label, tone = 'dark' }: { href: string; label: string; tone?: 'dark' | 'light' }) {
  return (
    <Link href={href} className="group inline-flex min-h-11 items-center gap-3">
      <span
        className={`editorial-label transition-colors duration-300 group-hover:text-brand-gold ${
          tone === 'light' ? 'text-white' : 'text-foreground'
        }`}
      >
        {label}
      </span>
      <svg
        width="24"
        height="8"
        viewBox="0 0 24 8"
        fill="none"
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        <path
          d="M0 4H22M22 4L18.5 0.5M22 4L18.5 7.5"
          stroke="currentColor"
          strokeWidth="0.75"
          className="text-brand-gold"
        />
      </svg>
    </Link>
  )
}

export default function StyleGuidePage() {
  return (
    <>
      {/* Editorial page header */}
      <section className="bg-foreground pt-52 pb-20 md:pt-56 md:pb-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="editorial-label text-brand-gold">Wardrobe</span>
            <h1 className="mt-4 font-heading text-5xl font-light text-white md:text-6xl lg:text-7xl">
              Senior Style Guide
            </h1>
            <div className="mx-auto mt-6 h-px w-12 bg-brand-gold" />
            <p className="mt-6 text-sm leading-relaxed text-white/50 md:text-base">
              One of the most common questions I get is, &quot;What should I
              wear?&quot; Your wardrobe is not just about looking great in photos.
              It is about feeling like the most confident version of
              <em> you</em>.
            </p>
          </div>
        </div>
      </section>

      {/* Overture: a photograph and the contents, before any advice */}
      <Section spacing="wide">
        <RevealOnScroll variant="up">
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-0">
            <div className="editorial-image-hover relative md:col-span-5">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/seniors/EKP_8529.jpg"
                  alt="Senior portrait in a flowing floral dress"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 42vw"
                  priority
                />
              </div>
            </div>

            <div className="relative z-10 md:col-span-7 md:col-start-6 md:-ml-8 md:mt-16">
              <div className="bg-background md:p-12">
                <span className="editorial-label text-brand-gold">
                  In This Guide
                </span>
                <h2 className="mt-4 font-heading text-3xl font-light md:text-4xl">
                  Everything I Walk Through Before Session Day
                </h2>
                <div className="mt-5 h-px w-12 bg-brand-gold" />
                <p className="mt-8 text-sm leading-relaxed text-muted-foreground md:text-base">
                  Read it start to finish or jump to the part you are stuck on.
                  We will go through your choices together before your session
                  either way.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
                  {GUIDE_INDEX.map((entry) => (
                    <a
                      key={entry.href}
                      href={entry.href}
                      className="group flex min-h-11 items-baseline gap-4 border-t border-border py-4"
                    >
                      <span className="editorial-label text-brand-gold/60">
                        {entry.num}
                      </span>
                      <span className="text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                        {entry.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </Section>

      {/* 01. How Many Outfits */}
      <Section background="muted" id="outfits" className="scroll-mt-28">
        <RevealOnScroll variant="up">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-0">
            <div className="md:col-span-6 md:pr-12">
              <span className="editorial-label text-brand-gold">Chapter 01</span>
              <h2 className="mt-4 font-heading text-3xl font-light md:text-4xl">
                How Many Outfits Should You Bring?
              </h2>
              <div className="mt-5 h-px w-12 bg-brand-gold" />
              <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                <p>
                  I recommend bringing{' '}
                  <strong className="font-medium text-foreground">
                    3 to 5 outfits
                  </strong>{' '}
                  to your session. Why so many? Because variety is what makes
                  your gallery feel like a magazine spread, not just a collection
                  of pictures in the same look. Different outfits create
                  completely different moods, and they let us take advantage of
                  multiple locations and lighting conditions.
                </p>
                <p>
                  Do not stress about getting it perfect. We will talk through
                  your outfit choices together during your pre-session
                  consultation, and I will help you narrow it down if needed.
                </p>
              </div>
            </div>

            <div className="editorial-image-hover relative md:col-span-6 md:col-start-7">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/seniors/EKP_8781.jpg"
                  alt="Senior athlete portrait with a letterman jacket"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll variant="up" className="mt-16 md:mt-20">
          <p className="editorial-label text-brand-gold">
            Think of Your Wardrobe in Categories
          </p>
        </RevealOnScroll>

        <RevealOnScroll variant="stagger" className="mt-8">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {OUTFIT_CATEGORIES.map((category) => (
              <div key={category.num} className="border-t border-border pt-6">
                <span className="font-heading text-4xl font-light text-brand-gold/40">
                  {category.num}
                </span>
                <h3 className="mt-2 font-heading text-xl">{category.title}</h3>
                <div className="mt-4 h-px w-8 bg-brand-gold/40" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {category.text}
                </p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </Section>

      {/* Pull quote: the whole guide in one line */}
      <section className="relative overflow-hidden bg-foreground py-20 md:py-28">
        <div className="pattern-hex absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <RevealOnScroll variant="up">
            <figure className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-8 h-px w-12 bg-brand-gold" />
              <blockquote className="font-heading text-3xl font-light leading-tight text-white md:text-4xl lg:text-5xl">
                Wear the thing you stand taller in. Everything after that is
                detail.
              </blockquote>
              <figcaption className="editorial-label mt-8 text-white/40">
                Emily Kathryn
              </figcaption>
            </figure>
          </RevealOnScroll>
        </div>
      </section>

      {/* 02. Color */}
      <Section id="color" className="scroll-mt-28">
        <RevealOnScroll variant="up">
          <div className="max-w-2xl">
            <span className="editorial-label text-brand-gold">Chapter 02</span>
            <h2 className="mt-4 font-heading text-3xl font-light md:text-4xl">
              Colors That Photograph Beautifully
            </h2>
            <div className="mt-5 h-px w-12 bg-brand-gold" />
            <p className="mt-8 text-sm leading-relaxed text-muted-foreground md:text-base">
              Color can make or break a portrait. The right tones complement
              your skin, enhance the natural surroundings, and create a timeless
              feel. The wrong tones can distract from your face and compete with
              the environment. Here is what works:
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll variant="stagger" className="mt-14">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
            {COLOR_FAMILIES.map((family) => (
              <div key={family.title} className="border-t border-border pt-6">
                <h3 className="font-heading text-xl">{family.title}</h3>
                <div className="mt-4 h-px w-8 bg-brand-gold/40" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {family.text}
                </p>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll variant="stagger" className="mt-16">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
            {COLOR_STRIP.map((image, i) => (
              <div
                key={image.src}
                className={`editorial-image-hover relative aspect-[4/5] overflow-hidden ${
                  i === 1 ? 'sm:mt-10' : ''
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll variant="up" className="mt-16">
          <div className="max-w-3xl border-l-2 border-brand-gold bg-muted p-8 md:p-10">
            <span className="editorial-label text-brand-gold">
              Colors to Avoid
            </span>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              Neon or fluorescent colors cast unflattering reflections onto skin.
              Bright white can be overpowering in outdoor light. All-black can
              lose detail in shadows. Busy prints, large logos, and graphic text
              on shirts draw the eye away from your face, and that is the last
              thing we want.
            </p>
          </div>
        </RevealOnScroll>
      </Section>

      {/* 03. Seasons */}
      <Section background="muted" id="seasons" className="scroll-mt-28">
        <RevealOnScroll variant="up">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-0">
            <div className="editorial-image-hover relative order-1 md:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/seniors/EKP_8750.jpg"
                  alt="Editorial senior boy portrait in autumn"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="order-2 md:col-span-6 md:col-start-7 md:pl-12">
              <span className="editorial-label text-brand-gold">Chapter 03</span>
              <h2 className="mt-4 font-heading text-3xl font-light md:text-4xl">
                Dressing for the Season
              </h2>
              <div className="mt-5 h-px w-12 bg-brand-gold" />
              <p className="mt-8 text-sm leading-relaxed text-muted-foreground md:text-base">
                Virginia gives us four gorgeous seasons to work with, and each
                one brings its own styling magic. Here is how to make the most of
                yours:
              </p>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll variant="stagger" className="mt-16 md:mt-20">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {SEASONS.map((season) => (
              <div key={season.name} className="border border-border bg-white p-6 md:p-8">
                <h3 className="flex flex-wrap items-center gap-3 font-heading text-xl">
                  <span className={season.dotClass} aria-hidden="true">
                    &#9679;
                  </span>
                  {season.name}
                  {season.tag ? (
                    <span className="editorial-label text-[0.65rem] text-brand-gold">
                      {season.tag}
                    </span>
                  ) : null}
                </h3>
                <div className="mt-4 h-px w-8 bg-brand-gold/40" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {season.text}
                </p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </Section>

      {/* 04. Layering */}
      <Section id="layering" className="scroll-mt-28">
        <RevealOnScroll variant="up">
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-0">
            <div className="editorial-image-hover relative md:col-span-5">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/seniors/EKP_7803.jpg"
                  alt="Senior boy portrait at a rustic location"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 42vw"
                />
              </div>
            </div>

            <div className="relative z-10 md:col-span-7 md:col-start-6 md:-ml-8 md:mt-12">
              <div className="bg-background md:p-12">
                <span className="editorial-label text-brand-gold">
                  Chapter 04
                </span>
                <h2 className="mt-4 font-heading text-3xl font-light md:text-4xl">
                  The Art of Layering
                </h2>
                <div className="mt-5 h-px w-12 bg-brand-gold" />
                <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                  <p>
                    Layers are a portrait photographer&apos;s secret weapon. They
                    add visual interest, create depth and dimension, and give us
                    so many more options during the session. A single outfit can
                    look completely different when you add or remove a jacket.
                  </p>
                  <p>Here are the layering pieces I love:</p>
                </div>

                <dl className="mt-8">
                  {LAYERING_PIECES.map((piece) => (
                    <div
                      key={piece.title}
                      className="border-t border-border py-5"
                    >
                      <dt className="editorial-label text-foreground">
                        {piece.title}
                      </dt>
                      <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {piece.text}
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
                  The key with layering? Make sure each piece works as a
                  standalone look too. That way, we can create three different
                  looks from one base outfit just by adding or removing a layer.
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </Section>

      {/* 05. What to Skip, on dark for contrast */}
      <section
        id="skip"
        className="relative scroll-mt-28 overflow-hidden bg-foreground py-24 md:py-32"
      >
        <div className="pattern-hex absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <RevealOnScroll variant="up">
            <div className="max-w-2xl">
              <span className="editorial-label text-brand-gold">Chapter 05</span>
              <h2 className="mt-4 font-heading text-4xl font-light text-white md:text-5xl">
                What to Skip
              </h2>
              <div className="mt-5 h-px w-12 bg-brand-gold" />
              <p className="mt-8 text-sm leading-relaxed text-white/50 md:text-base">
                I would never tell you what <em>not</em> to wear without a good
                reason. These are items that consistently do not photograph well
                or tend to date your images sooner than you would like:
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll variant="stagger" className="mt-14">
            <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {AVOID.map((avoid) => (
                <div
                  key={avoid.item}
                  className="flex items-start gap-4 border-t border-white/10 pt-6"
                >
                  <span className="mt-1 text-brand-rose" aria-hidden="true">
                    &#10007;
                  </span>
                  <div>
                    <h3 className="font-heading text-lg text-white">
                      {avoid.item}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/50">
                      {avoid.reason}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 06. Accessories */}
      <Section background="muted" id="accessories" className="scroll-mt-28">
        <RevealOnScroll variant="up">
          <div className="max-w-2xl">
            <span className="editorial-label text-brand-gold">Chapter 06</span>
            <h2 className="mt-4 font-heading text-3xl font-light md:text-4xl">
              Accessories That Elevate
            </h2>
            <div className="mt-5 h-px w-12 bg-brand-gold" />
            <p className="mt-8 text-sm leading-relaxed text-muted-foreground md:text-base">
              The right accessories take an outfit from good to magazine-worthy.
              But the key word is <em>right</em>. Accessories should complement,
              not compete.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll variant="stagger" className="mt-14">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {ACCESSORIES.map((accessory) => (
              <div
                key={accessory.title}
                className="border border-border bg-white p-6 md:p-8"
              >
                <h3 className="font-heading text-xl">{accessory.title}</h3>
                <div className="mt-4 h-px w-8 bg-brand-gold/40" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {accessory.text}
                </p>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll variant="scale" className="mt-16">
          <div className="editorial-image-hover relative md:ml-[25%]">
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src="/images/seniors/EKP_0913.jpg"
                alt="Fashion-forward senior portrait with a wide-brim hat"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 75vw"
              />
            </div>
          </div>
        </RevealOnScroll>
      </Section>

      {/* 07. Tips for Guys */}
      <Section id="guys" className="scroll-mt-28">
        <RevealOnScroll variant="up">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-0">
            <div className="md:col-span-6 md:pr-12">
              <span className="editorial-label text-brand-gold">Chapter 07</span>
              <h2 className="mt-4 font-heading text-3xl font-light md:text-4xl">
                Tips for Guys
              </h2>
              <div className="mt-5 h-px w-12 bg-brand-gold" />
              <p className="mt-8 text-sm leading-relaxed text-muted-foreground md:text-base">
                Guys, senior portraits are absolutely for you too. And no, they
                do not have to feel awkward or forced. Some of my favorite
                sessions have been with guys who came in a little skeptical and
                left saying, &quot;That was actually really fun.&quot; Here is
                how to make your session look as effortless as it feels:
              </p>
            </div>

            <div className="editorial-image-hover relative md:col-span-6 md:col-start-7">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/seniors/EKP_7812.jpg"
                  alt="Senior boy portrait among historic stonework"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll variant="up" className="mt-16 md:mt-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <h3 className="font-heading text-2xl font-light">
                Wardrobe Essentials
              </h3>
              <dl className="mt-6">
                {GUYS_ESSENTIALS.map((piece) => (
                  <div key={piece.title} className="border-t border-border py-5">
                    <dt className="editorial-label text-foreground">
                      {piece.title}
                    </dt>
                    <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {piece.text}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="md:col-span-5">
              <h3 className="font-heading text-2xl font-light">What to Avoid</h3>
              <dl className="mt-6">
                {GUYS_AVOID.map((piece) => (
                  <div key={piece.title} className="border-t border-border py-5">
                    <dt className="editorial-label text-foreground">
                      {piece.title}
                    </dt>
                    <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {piece.text}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll variant="scale" className="mt-16">
          <div className="editorial-image-hover relative md:mr-[25%]">
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src="/images/seniors/EKP_8081.jpg"
                alt="Senior boy portrait with a vintage truck on a country road"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll variant="up" className="mt-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <span className="editorial-label text-brand-gold">
                Grooming Tips
              </span>
              <div className="mt-4 h-px w-8 bg-brand-gold/40" />
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                Get a haircut about a week before your session, not the day
                before. You want it to look natural, not fresh-out-of-the-chair.
                If you have facial hair, make sure it is trimmed and neat. Clean
                nails, moisturized skin, and a chapstick in your pocket go a long
                way.
              </p>
            </div>
            <div>
              <span className="editorial-label text-brand-gold">
                Props That Work
              </span>
              <div className="mt-4 h-px w-8 bg-brand-gold/40" />
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                This is where you get to show off who you are. Bring your guitar,
                football, skateboard, fishing rod, truck, dirt bike, whatever
                represents you. Some of the most impactful senior portraits I
                have taken feature something meaningful that tells the
                person&apos;s story. Do not be afraid to bring it.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </Section>

      {/* 08. Session Day */}
      <Section background="muted" id="session-day" className="scroll-mt-28">
        <RevealOnScroll variant="up">
          <div className="max-w-2xl">
            <span className="editorial-label text-brand-gold">Chapter 08</span>
            <h2 className="mt-4 font-heading text-3xl font-light md:text-4xl">
              Final Tips for Session Day
            </h2>
            <div className="mt-5 h-px w-12 bg-brand-gold" />
            <p className="mt-8 text-sm leading-relaxed text-muted-foreground md:text-base">
              You have planned your outfits, you have read the guide, and now
              session day is almost here. Here are my last-minute tips to make
              sure everything goes smoothly:
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll variant="stagger" className="mt-14">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {SESSION_DAY.map((tip) => (
              <div key={tip.num} className="border-t border-border pt-6">
                <span className="font-heading text-4xl font-light text-brand-gold/40">
                  {tip.num}
                </span>
                <h3 className="mt-2 font-heading text-xl">{tip.title}</h3>
                <div className="mt-4 h-px w-8 bg-brand-gold/40" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {tip.text}
                </p>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll variant="up" className="mt-16">
          <div className="flex flex-col gap-6 border-t border-border pt-10 sm:flex-row sm:items-center sm:gap-14">
            <ArrowLink href="/senior-portraits" label="See Senior Portraits" />
            <ArrowLink href="/family-portraits" label="See Family Portraits" />
          </div>
        </RevealOnScroll>
      </Section>

      {/* CTA section */}
      <section className="relative overflow-hidden bg-foreground py-24 md:py-32">
        <div className="pattern-hex absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <RevealOnScroll variant="up">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto mb-6 h-px w-12 bg-brand-gold" />
              <h2 className="font-heading text-4xl font-light text-white md:text-5xl">
                Ready to Plan Your Session?
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-white/50 md:text-base">
                Now that you have the style inspiration, let&apos;s talk about
                bringing your vision to life.
              </p>
              <div className="mt-8 flex justify-center">
                <ArrowLink href="/contact" label="Inquire About a Session" tone="light" />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
