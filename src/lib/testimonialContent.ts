/**
 * Real client testimonials recovered from the previous emilykathryn.com site
 * before it was decommissioned (see docs/legacy-content/page-raves-testimonials.md).
 *
 * These are genuine client words with genuine attributions. They are stored
 * VERBATIM and must not be edited to fit the brand voice. Several contain
 * words the copy plan bans in Emily's own writing ("amazing", "incredible",
 * "gorgeous"). That rule governs what Emily says about herself, not what a
 * client said about her. Rewriting a named person's quote would be inventing
 * a testimonial. Only straight-quote normalization has been applied.
 *
 * Source of truth is Sanity once Emily populates it. These seed entries are
 * the fallback, matching the cityContent.ts and journalContent.ts pattern.
 */

export interface SeedTestimonial {
  /** Stable key for React lists. */
  id: string
  /** Verbatim client quote. */
  quote: string
  /** First name as published on the original site. */
  name: string
  /** School or relationship, as published. Real local schools. */
  context: string
  /** Shown on the homepage selection when true. */
  featured?: boolean
}

export const SEED_TESTIMONIALS: SeedTestimonial[] = [
  {
    id: 'mindy-abby',
    featured: true,
    name: 'Mindy',
    context: 'Mom to Abby, Person High School',
    quote:
      "If you are looking for a senior photographer, I absolutely cannot recommend anyone better than Emily. It wasn't just the photographs (which were simply incredible) but what we loved most was the experience. From start to finish Emily gives your senior an experience that truly celebrates their personality, their beauty and their character. We felt so special and as if we were the most important client she ever photographed (which can't possibly be true but nevertheless feels nice). It's a bit of a drive from Roxboro but there is nothing that compares and I would do it again in a heartbeat, it was so worth it! Thank you Emily for starting Abby's senior year with a moment that really celebrated her. We are so grateful!",
  },
  {
    id: 'lynn-brentley',
    featured: true,
    name: 'Lynn',
    context: 'Mom to Brentley, William Campbell High School',
    quote:
      "I started following Emily's work several years ago. I knew from that moment I wanted her to take Brentley's photos. The whole experience was top notch. We absolutely loved the town of Chatham. Every spot Emily picked for the shoot was perfect. Then Emily's family farm was beautiful and that setting gave us the country girl pictures that we envisioned. Thank you so much Emily for making Brentley feel so special. We never felt rushed and the experience overall was the best ever! Thanks again and we will be using EKP again when my baby boy graduates in a few more years!",
  },
  {
    id: 'rachel-altavista',
    featured: true,
    name: 'Rachel',
    context: 'Altavista High School',
    quote:
      "I've known that I wanted to take my senior pictures with Emily since the 6th grade and I'm so glad that I finally got to. I was really nervous going into the shoot, but after only 5 minutes I felt totally comfortable. The entire experience was even better than I dreamed it would be, and it is definitely a highlight of my senior year. Emily did everything that she could to make sure that my session was perfect and I couldn't be more grateful. I've always heard people rave about their EKP experience and now I can do the same. It was truly amazing.",
  },
  {
    id: 'christy-hailey',
    featured: true,
    name: 'Christy',
    context: 'Mom to Hailey, Altavista High School',
    quote:
      'My oldest daughter had her EKP senior experience last year and we were so pleased that we came back with our youngest daughter this year. Both girls were nervous going into the shoot but Emily made them feel so relaxed and comfortable and with her guidance they looked as if they were experienced models. Emily made the senior experience amazing. After only a few minutes together you feel like you have known her forever. I highly recommend EKP for your photography needs.',
  },
  {
    id: 'cassidy-homeschool',
    name: 'Cassidy',
    context: 'Homeschool',
    quote:
      "A huge thanks to Emily for making my senior pics a dream come true. Even with all the crazy things that have been going on this year because of Covid-19, you still made my session everything I ever wanted, and it was one of the most memorable highlights of my senior year. Growing up I always knew I wanted my pictures done by Emily and it was something I have looked forward to for a long time. Can't wait to see all the beautiful girls you make feel so gorgeous and special throughout the years ahead doing what you love!",
  },
  {
    id: 'kate-madison',
    name: 'Kate',
    context: 'Mom to Madison, Altavista High School',
    quote:
      "My daughter's one wish for her senior year was to have Emily take her senior pictures. We have admired her incredible work for several years and to finally get the chance to experience it ourselves was amazing! Emily was so good at telling my daughter exactly what to do to get the perfect pose each time. A wonderful experience!",
  },
  {
    id: 'devin-jefferson-forest',
    name: 'Devin',
    context: 'Jefferson Forest High School',
    quote:
      'Emily made me feel so comfortable and was so patient with me! I honestly cannot thank her enough for everything she did. I am speechless looking at the sneak peaks; I can only imagine my reaction to the rest of the pictures! I will be sure to spread the word about her amazing talent.',
  },
  {
    id: 'lauren-altavista',
    name: 'Lauren',
    context: 'Altavista High School',
    quote:
      "OMG, Emily, you are awesome! I saw some sneak peeks on Instagram and teared up. I am so so so excited to see them, I cannot wait. I'm already in love. The experience with you was so fun. I did not have specific ideas of what to do so I was nervous but you completely did everything that I wanted and more! I'm so happy with the experience and everything that we got to do.",
  },
]

/** The four strongest, used for the homepage selection. */
export const FEATURED_TESTIMONIALS: SeedTestimonial[] = SEED_TESTIMONIALS.filter(
  (item) => item.featured
)
