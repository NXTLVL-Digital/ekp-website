import type { FaqItem } from '@/lib/schemas/faqPage'

/**
 * Homepage FAQ (v3 audit AEO-04, plan item 5.0).
 *
 * The homepage was the only key page without FAQPage schema, and it is the
 * page AI engines hit first for brand and "photographer near me" queries.
 * One source of truth for both the visible section and the JSON-LD.
 *
 * No pricing question until Jeff confirms real pricing (standing constraint).
 */
export const HOME_FAQS: FaqItem[] = [
  {
    question: 'What areas does Emily Kathryn Photography serve?',
    answer:
      'Emily is based in Gretna, Virginia and photographs across South-Central Virginia: Chatham, Danville, Lynchburg, Smith Mountain Lake, Forest, Altavista, Evington, and the communities around them.',
  },
  {
    question: 'Do you photograph senior guys as well as girls?',
    answer:
      'Yes. Senior sessions are built around the person in front of the camera, whether that means a suit, a letterman jacket, a truck, or a fence line on the family farm. Every session is directed the whole way through, so nobody has to guess what to do with their hands.',
  },
  {
    question: 'What happens at a session?',
    answer:
      'It starts with a planning conversation about locations, outfits, and the feel you want. On session day Emily guides everything: where to stand, how to move, when to relax. Afterward you see the finished gallery and choose what becomes prints, albums, and wall art.',
  },
  {
    question: 'How far in advance should we book?',
    answer:
      'For seniors, spring of junior year is the comfortable window for a summer or fall session, and fall dates go first. Family sessions book a few weeks to a couple of months out depending on the season. Later works too, it just means fewer date choices.',
  },
  {
    question: 'Do you photograph families too, or just seniors?',
    answer:
      'Both. Senior portraits and family sessions are the two halves of the work: editorial senior sessions for the class ahead, and relaxed, directed family sessions where everyone ends up in the frame.',
  },
]
