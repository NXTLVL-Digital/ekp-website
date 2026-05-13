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
        alt: 'Senior Style Guide — wardrobe tips from Emily Kathryn Photography',
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

export default function StyleGuidePage() {
  return (
    <>
      {/* Editorial page header */}
      <section className="bg-foreground pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="editorial-label text-brand-gold">Wardrobe</span>
            <h1 className="mt-4 font-heading text-5xl font-light text-white md:text-6xl lg:text-7xl">
              Senior Style Guide
            </h1>
            <div className="mx-auto mt-6 h-px w-12 bg-brand-gold" />
            <p className="mt-6 text-sm leading-relaxed text-white/50 md:text-base">
              One of the most common questions I get is, &quot;What should I
              wear?&quot; Your wardrobe is not just about looking great in photos
              — it is about feeling like the most confident version of
              <em> you</em>.
            </p>
          </div>
        </div>
      </section>

      {/* 2. How Many Outfits */}
      <Section background="muted">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-3xl font-light md:text-4xl">
            How Many Outfits Should You Bring?
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I recommend bringing <strong>3 to 5 outfits</strong> to your
              session. Why so many? Because variety is what makes your gallery
              feel like a magazine spread, not just a collection of pictures in
              the same look. Different outfits create completely different moods,
              and they let us take advantage of multiple locations and lighting
              conditions.
            </p>
            <p>Think of your wardrobe in categories:</p>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                <strong>Dressy / Editorial:</strong> Think that outfit that makes
                you feel like you are on a magazine cover. A beautiful dress, a
                sharp blazer, heels or polished boots. This is the &quot;wow&quot;
                look.
              </li>
              <li>
                <strong>Casual / Effortless:</strong> Your favorite jeans, a cozy
                sweater or a simple tee, and your go-to sneakers. This look says,
                &quot;This is me, just being me.&quot;
              </li>
              <li>
                <strong>School Spirit or Hobby-Related:</strong> Letterman jacket,
                cheer uniform, band gear, your jersey — whatever represents a
                piece of your high school story. These images are the ones your
                parents will absolutely treasure.
              </li>
              <li>
                <strong>Bonus: Something Bold:</strong> A statement piece you
                would not normally wear every day — a leather jacket, a tulle
                skirt, a hat. These create the most unexpected and stunning
                images.
              </li>
            </ul>
            <p>
              Do not stress about getting it perfect. We will talk through your
              outfit choices together during your pre-session consultation, and I
              will help you narrow it down if needed.
            </p>
          </div>
        </div>
      </Section>

      {/* 3. Color Theory */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-3xl font-light md:text-4xl">
            Colors That Photograph Beautifully
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Color can make or break a portrait. The right tones complement
              your skin, enhance the natural surroundings, and create a timeless
              feel. The wrong tones can distract from your face and compete with
              the environment. Here is what works best:
            </p>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="border border-border bg-white p-5">
                <h3 className="font-heading text-lg">Earth Tones</h3>
                <p className="mt-2 text-sm">
                  Cream, tan, camel, olive, rust, and chocolate brown. These are
                  universally flattering and blend effortlessly with Virginia&apos;s
                  natural landscapes — golden fields, red barns, and winding trails.
                </p>
              </div>
              <div className="border border-border bg-white p-5">
                <h3 className="font-heading text-lg">Jewel Tones</h3>
                <p className="mt-2 text-sm">
                  Emerald, burgundy, navy, mauve, and deep plum. Rich and saturated,
                  jewel tones add depth and drama to your images, especially against
                  green forests and moody fall backdrops.
                </p>
              </div>
              <div className="border border-border bg-white p-5">
                <h3 className="font-heading text-lg">Muted Pastels</h3>
                <p className="mt-2 text-sm">
                  Dusty rose, sage, lavender, and soft blue. These delicate tones
                  create a dreamy, editorial quality and photograph gorgeously in
                  spring and summer light.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-brand-gold/30 bg-brand-gold/5 p-5">
              <h3 className="font-heading text-lg">Colors to Avoid</h3>
              <p className="mt-2 text-sm">
                Neon or fluorescent colors cast unflattering reflections onto skin.
                Bright white can be overpowering in outdoor light. All-black can
                lose detail in shadows. Busy prints, large logos, and graphic text
                on shirts draw the eye away from your face — and that is the last
                thing we want.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 4. Seasonal Advice */}
      <Section background="muted">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-3xl font-light md:text-4xl">
            Dressing for the Season
          </h2>
          <p className="mt-4 text-muted-foreground">
            Virginia gives us four gorgeous seasons to work with, and each one
            brings its own styling magic. Here is how to make the most of yours:
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="border border-border bg-white p-6">
              <h3 className="font-heading text-xl">
                <span className="text-brand-sage">&#9679;</span> Spring
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Light layers are your best friend. Think flowy dresses, pastel
                blouses, and soft cardigans. Floral prints work if they are
                subtle — small, ditsy patterns rather than bold tropical
                prints. The blooming dogwoods and fresh green backdrops pair
                beautifully with light, airy outfits. Avoid heavy fabrics that
                look out of season.
              </p>
            </div>

            <div className="border border-border bg-white p-6">
              <h3 className="font-heading text-xl">
                <span className="text-brand-gold">&#9679;</span> Summer
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Breezy fabrics like linen and cotton keep you comfortable and
                photograph with beautiful movement. Sundresses, rompers, and
                light denim are all great choices. Keep makeup minimal and
                natural — Virginia humidity is real, and less is more when the
                temperature climbs. Golden hour sessions in summer give us
                stunning warm light, so lean into warm tones.
              </p>
            </div>

            <div className="border border-border bg-white p-6">
              <h3 className="font-heading text-xl">
                <span className="text-brand-gold">&#9679;</span> Fall
                <span className="ml-2 text-xs font-medium text-brand-gold">
                  Most Popular
                </span>
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                This is our busiest (and most magical) season, and for good
                reason. The warm tones of changing leaves create an
                unbelievable backdrop. Embrace layers — flannel shirts, cozy
                knits, scarves, ankle boots, and denim jackets. Rich colors
                like burgundy, mustard, forest green, and rust pair
                beautifully with autumn landscapes. This is the season to go
                all-in on texture and warmth.
              </p>
            </div>

            <div className="border border-border bg-white p-6">
              <h3 className="font-heading text-xl">
                <span className="text-muted-foreground">&#9679;</span> Winter
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Winter sessions are underrated and absolutely stunning. Think
                rich textures — chunky knits, faux fur, wool coats, and
                leather. Jewel tones like deep red, emerald, and navy
                contrast beautifully against bare trees and moody skies. Cozy
                accessories (beanies, gloves, scarves) add visual interest
                and make the images feel warm and inviting even in the cold.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 5. Layering Tips */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-3xl font-light md:text-4xl">
            The Art of Layering
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Layers are a portrait photographer&apos;s secret weapon. They add
              visual interest, create depth and dimension, and give us so many
              more options during the session. A single outfit can look
              completely different when you add or remove a jacket.
            </p>
            <p>Here are the layering pieces I love:</p>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                <strong>Jackets and blazers:</strong> A leather jacket instantly
                adds edge. A denim jacket keeps things casual. A tailored blazer
                gives an editorial, polished vibe.
              </li>
              <li>
                <strong>Cardigans and sweaters:</strong> Chunky knits and
                oversized cardigans create a cozy, relaxed look. Draping a
                cardigan off one shoulder adds effortless movement to the image.
              </li>
              <li>
                <strong>Scarves and wraps:</strong> Lightweight scarves add
                texture without bulk. They catch the wind beautifully and create
                organic movement in outdoor shots.
              </li>
              <li>
                <strong>Hats:</strong> Wide-brimmed hats add instant editorial
                drama. Baseball caps work for a sporty, casual vibe.
                Beanies are perfect for fall and winter warmth.
              </li>
            </ul>
            <p>
              The key with layering? Make sure each piece works as a standalone
              look too. That way, we can create three different looks from one
              base outfit just by adding or removing a layer.
            </p>
          </div>
        </div>
      </Section>

      {/* 6. Accessories */}
      <Section background="muted">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-3xl font-light md:text-4xl">
            Accessories That Elevate
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              The right accessories take an outfit from good to
              magazine-worthy. But the key word is <em>right</em> —
              accessories should complement, not compete.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="border border-border bg-white p-5">
                <h3 className="font-heading text-lg">Jewelry</h3>
                <p className="mt-2 text-sm">
                  Delicate, simple pieces photograph best. Layered necklaces, small
                  hoops, thin bracelets, and dainty rings add subtle sparkle without
                  distraction. Avoid anything overly chunky or reflective — large
                  gemstones and statement pieces can catch light in unexpected ways.
                </p>
              </div>
              <div className="border border-border bg-white p-5">
                <h3 className="font-heading text-lg">Shoes</h3>
                <p className="mt-2 text-sm">
                  Yes, shoes matter — they are in more shots than you think! Boots
                  (ankle or knee-high), clean sneakers, heels for dressy looks, and
                  sandals for summer are all great options. Bring a variety and we
                  will match them to the location and outfit.
                </p>
              </div>
              <div className="border border-border bg-white p-5">
                <h3 className="font-heading text-lg">Sunglasses</h3>
                <p className="mt-2 text-sm">
                  A great pair of sunglasses adds instant cool-factor. They are
                  perfect for candid, editorial shots — holding them, pushing
                  them up on your head, or wearing them mid-laugh. Stick to
                  classic shapes that complement your face.
                </p>
              </div>
              <div className="border border-border bg-white p-5">
                <h3 className="font-heading text-lg">Meaningful Items</h3>
                <p className="mt-2 text-sm">
                  This is where it gets personal. Your letterman jacket, a
                  musical instrument, your favorite book, sports equipment,
                  your pet — these are the details that make your session
                  uniquely yours. These items tell your story in a way that
                  clothes alone cannot.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 7. What to Avoid */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-3xl font-light md:text-4xl">
            What to Skip
          </h2>
          <p className="mt-4 text-muted-foreground">
            I would never tell you what <em>not</em> to wear without a good
            reason. These are items that consistently do not photograph well
            or tend to date your images quickly:
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
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
                  'Ultra-current micro-trends date quickly. Choose pieces with staying power — your future self will thank you.',
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
            ].map((avoid) => (
              <div
                key={avoid.item}
                className="flex items-start gap-3 border border-border p-4"
              >
                <span className="mt-0.5 text-brand-rose" aria-hidden="true">
                  &#10007;
                </span>
                <div>
                  <p className="font-heading text-sm font-medium">
                    {avoid.item}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {avoid.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 8. Tips for Guys */}
      <Section background="muted">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-3xl font-light md:text-4xl">
            Tips for Guys
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Guys — senior portraits are absolutely for you too. And no, they
              do not have to feel awkward or forced. Some of my favorite
              sessions have been with guys who came in a little skeptical and
              left saying, &quot;That was actually really fun.&quot; Here is
              how to make your session look as effortless as it feels:
            </p>

            <h3 className="font-heading text-xl text-foreground">
              Wardrobe Essentials
            </h3>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                <strong>Well-fitted jeans:</strong> Dark wash or medium wash — not
                ripped or overly distressed. A proper fit makes all the
                difference.
              </li>
              <li>
                <strong>Button-down shirts:</strong> Rolled sleeves, top button
                undone. A classic look that photographs incredibly well. Solid
                colors or subtle patterns work best.
              </li>
              <li>
                <strong>Solid tees:</strong> A simple, well-fitted crew neck or
                henley in a solid color is effortlessly cool. Pair it with a
                jacket for a layered look.
              </li>
              <li>
                <strong>Leather or denim jacket:</strong> The ultimate layering
                piece for guys. Adds texture and personality instantly.
              </li>
              <li>
                <strong>Boots or clean sneakers:</strong> Leather boots give an
                editorial edge. Clean white sneakers keep things modern and
                casual. No worn-out athletic shoes.
              </li>
            </ul>

            <h3 className="font-heading text-xl text-foreground">
              What to Avoid
            </h3>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                <strong>Baggy or oversized clothing:</strong> Fit is king. Clothes
                that are too large hide your frame and look sloppy on camera.
              </li>
              <li>
                <strong>Athletic wear:</strong> Unless it represents your sport
                (jersey, letterman jacket, cleats), leave the gym shorts and
                basketball shoes at home.
              </li>
              <li>
                <strong>Hat-hair:</strong> If you wear a hat to the session, bring
                a comb. We can absolutely incorporate your hat into some shots, but
                we need your hair looking good for the hatless ones too.
              </li>
            </ul>

            <h3 className="font-heading text-xl text-foreground">
              Grooming Tips
            </h3>
            <p>
              Get a haircut about a week before your session — not the day
              before. You want it to look natural, not fresh-out-of-the-chair.
              If you have facial hair, make sure it is trimmed and neat. Clean
              nails, moisturized skin, and a chapstick in your pocket go a long
              way.
            </p>

            <h3 className="font-heading text-xl text-foreground">
              Props That Work
            </h3>
            <p>
              This is where you get to show off who you are. Bring your guitar,
              football, skateboard, fishing rod, truck, dirt bike — whatever
              represents you. Some of the most impactful senior portraits I
              have taken feature something meaningful that tells the person&apos;s
              story. Do not be afraid to bring it.
            </p>
          </div>
        </div>
      </Section>

      {/* 9. Final Tips */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-3xl font-light md:text-4xl">
            Final Tips for Session Day
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              You have planned your outfits, you have read the guide, and now
              session day is almost here. Here are my last-minute tips to make
              sure everything goes smoothly:
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-lg border border-border bg-brand-gold/5 p-5">
                <span className="font-heading text-lg text-brand-gold">01</span>
                <div>
                  <h3 className="font-heading text-base">Start Planning Early</h3>
                  <p className="mt-1 text-sm">
                    Do not leave outfit planning to the night before. Start
                    collecting pieces a few weeks out so you have time to try
                    things on, mix and match, and even shop for anything
                    missing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-border bg-brand-gold/5 p-5">
                <span className="font-heading text-lg text-brand-gold">02</span>
                <div>
                  <h3 className="font-heading text-base">Try Everything On</h3>
                  <p className="mt-1 text-sm">
                    Put together your complete outfits — shoes, accessories, and
                    all — and try them on. Check the mirror from different
                    angles. Sit down, walk around. Make sure you feel
                    comfortable and confident in every look.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-border bg-brand-gold/5 p-5">
                <span className="font-heading text-lg text-brand-gold">03</span>
                <div>
                  <h3 className="font-heading text-base">Bring a Steamer</h3>
                  <p className="mt-1 text-sm">
                    Wrinkles are the number one outfit issue on session day. A
                    small travel steamer or iron can save the day. If you do
                    not have one, hang your outfits in the bathroom during a
                    hot shower the night before.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-border bg-brand-gold/5 p-5">
                <span className="font-heading text-lg text-brand-gold">04</span>
                <div>
                  <h3 className="font-heading text-base">Hair and Makeup</h3>
                  <p className="mt-1 text-sm">
                    Arrive with hair and makeup done (or book a professional —
                    I am happy to recommend local artists). Keep makeup a touch
                    more polished than everyday and skip the heavy shimmer. If
                    you want your nails visible in shots, a fresh manicure goes
                    a long way.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-border bg-brand-gold/5 p-5">
                <span className="font-heading text-lg text-brand-gold">05</span>
                <div>
                  <h3 className="font-heading text-base">Pack Smart</h3>
                  <p className="mt-1 text-sm">
                    Bring your outfits on hangers in a garment bag. Pack your
                    accessories and shoes in a separate bag with labels. A
                    small kit with safety pins, double-sided tape, breath mints,
                    and blotting papers is a lifesaver.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-border bg-brand-gold/5 p-5">
                <span className="font-heading text-lg text-brand-gold">06</span>
                <div>
                  <h3 className="font-heading text-base">Trust the Process</h3>
                  <p className="mt-1 text-sm">
                    This is the most important tip. I will guide you through
                    every pose, every expression, and every angle. All you have
                    to do is show up, be yourself, and have fun. I promise — you
                    are going to love the result.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
              <Link
                href="/contact"
                className="group mt-8 inline-flex items-center gap-3"
              >
                <span className="editorial-label text-white transition-colors duration-300 group-hover:text-brand-gold">
                  Let&apos;s Get Started
                </span>
                <svg width="24" height="8" viewBox="0 0 24 8" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M0 4H22M22 4L18.5 0.5M22 4L18.5 7.5" stroke="currentColor" strokeWidth="0.75" className="text-brand-gold" />
                </svg>
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
