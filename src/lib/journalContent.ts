/**
 * Seed content for the Journal (blog).
 *
 * Six posts recovered from the decommissioned pre-2026 GoHighLevel site and
 * rewritten in the current brand voice per docs/copy-plan.md. Every real
 * specific from the original posts is preserved: names, schools, towns,
 * outfits, product orders. Nothing new was invented.
 *
 * These are ARCHIVE posts (2018-2019). Where a detail is no longer current
 * (the Chatham studio address, the hair and makeup partnership), the copy
 * says so in past tense rather than pretending it still applies.
 *
 * Used as a fallback when Sanity CMS content is not yet populated, exactly
 * like CITY_CONTENT in src/lib/cityContent.ts. If Sanity returns posts, the
 * CMS wins and these are ignored.
 */

import type { FaqItem } from '@/lib/schemas/faqPage'

/** Matches the CATEGORY_LABELS keys used on the journal pages. */
export type JournalCategory =
  | 'session-recap'
  | 'style-tips'
  | 'behind-the-scenes'
  | 'announcement'
  | 'for-families'
  | 'for-seniors'

export interface JournalCoverImage {
  /** Root-relative path to a real file in /public. */
  src: string
  alt: string
  width: number
  height: number
}

export interface JournalPostContent {
  slug: string
  title: string
  /** ISO date. Historically honest to when the original post was written. */
  publishedAt: string
  category: JournalCategory
  excerpt: string
  coverImage: JournalCoverImage
  bodyHtml: string
  faqs: FaqItem[]
  featured?: boolean
  /**
   * Drafts stay in the repo but are never rendered, linked, or indexed.
   * Used to hold a restored post back until Emily approves publishing it.
   */
  draft?: boolean
}

/* -------------------------------------------------------------------------- */
/*  Posts, newest first (matches the Sanity query ordering)                    */
/* -------------------------------------------------------------------------- */

const ALL_JOURNAL_POSTS: JournalPostContent[] = [
  /* ------------------------------------------------------------------------ */
  /*  Raegan, 2019 Altavista High senior                                       */
  /* ------------------------------------------------------------------------ */
  {
    slug: 'raegan-2019-altavista-va-senior',
    title: 'Raegan: 2019 Altavista High Senior Portraits',
    publishedAt: '2019-09-10',
    category: 'session-recap',
    excerpt:
      'Seven outfits, two towns, and a country girl who knew exactly what she wanted. Raegan\'s 2019 Altavista High senior session ended at the farm fence line.',
    coverImage: {
      src: '/images/seniors/EKP_8368.jpg',
      alt: 'Senior girl in a graduation cap sitting in a field of crimson clover at sunset',
      width: 1602,
      height: 2400,
    },
    bodyHtml: `<p>Raegan is a 2019 Altavista High senior who wanted her session to look like her, and what she is, all the way through, is a country girl. We shot seven outfits across Chatham and Gretna, started in town, and finished on the farm. Her parents chose their canvas from that last stop.</p>
<h2>Her sister sat for me first</h2>
<p>I photographed Raegan's older sister, Alanna, a few years back. Getting the second sister is one of the better parts of doing this work in one area long enough to watch families grow up.</p>
<p>It also means the pressure is different. Alanna's portrait was already hanging. Raegan's had to belong beside it.</p>
<h2>Why we don't cap outfit changes</h2>
<p>Plenty of senior sessions limit you to two or three looks. Mine don't, and there's a reason.</p>
<p>One outfit can show you a person. It can't show you their personality. Raegan used all seven of hers:</p>
<ul>
<li>In town in Chatham to open the session</li>
<li>A dress on my favorite tree-lined road</li>
<li>An American flag tank she brought herself, shot exactly where it belonged</li>
<li>Out to the country in Gretna for the rest of the afternoon</li>
</ul>
<p>She had so many frames worth arguing over that narrowing them down at her viewing session took a while. That's the right problem to have.</p>
<h2>Hair and makeup before the camera came out</h2>
<p>Raegan got glammed up with Rachael at Mint on Main, the hair and makeup artist who shared our Chatham studio at the time, with airbrush makeup and hairstyling.</p>
<p>Seniors underestimate that part of the day and then never want to go without it again. It isn't about looking like someone else. It's about not thinking about your hair for four straight hours.</p>
<h2>The farm, and where the pictures ended up</h2>
<p>The last stop was our own farm. Barns, fence lines, green pastures, all of it right up Raegan's alley.</p>
<p>I knew while I was shooting it that her parents were going to want these frames, and I was right.</p>
<blockquote>That farm set became their canvas, and it hangs beside Alanna's senior portrait.</blockquote>
<p><strong>Two sisters, a few years apart, on the same wall.</strong> That is what a senior portrait is supposed to do, and it is not something a folder of files can manage.</p>
<p>If your senior already knows who they are, half of my job is done before I show up. <a href="/contact">Tell me about them</a> and we'll build the day around it.</p>`,
    faqs: [
      {
        question: 'How many outfit changes do you allow in a senior session?',
        answer:
          'There is no cap. Raegan did seven looks across two towns. The point of a senior session is that your style and your personality end up in the gallery, and one outfit cannot carry that on its own. Bring what you love and we will find the right setting for each piece.',
      },
      {
        question: 'Do you photograph Altavista High School seniors?',
        answer:
          'Yes. Raegan was a 2019 Altavista High senior, and her sister Alanna sat for her senior portraits a few years before her. Sessions for Altavista families usually run between Chatham, Gretna, and the surrounding countryside, depending on the look the senior is after.',
      },
      {
        question: 'What is a viewing session?',
        answer:
          'It is the appointment after the shoot where you see the finished images at full size and decide what to do with them. That is where Raegan narrowed down her favorites and where her parents chose the farm frame that became their canvas. Choosing wall art on a phone screen is how people end up with nothing on the wall.',
      },
    ],
  },

  /* ------------------------------------------------------------------------ */
  /*  The new Chatham studio                                                   */
  /* ------------------------------------------------------------------------ */
  {
    slug: 'emily-kathryn-photography-chatham-va',
    title: 'The New Home of Emily Kathryn Photography in Chatham, VA',
    publishedAt: '2019-04-16',
    category: 'announcement',
    excerpt:
      'In 2018 the studio moved from Altavista to 10 North Main Street in Chatham, a former Planters Bank and Trust building with the vault still inside.',
    coverImage: {
      src: '/images/seniors/EKP_0913.jpg',
      alt: 'Senior girl in a rust sweater and wide-brim hat sitting against a painted brick wall downtown',
      width: 2400,
      height: 1602,
    },
    bodyHtml: `<p>Emily Kathryn Photography moved to Chatham, Virginia, into a building at 10 North Main Street that started life as the Planters Bank and Trust. The vault is still in there. This post comes from the archive, written about a year after the move, back when the space was brand new to us.</p>
<h2>Why Chatham</h2>
<p>The business spent three years in Altavista and I loved every bit of that run. Then our family moved to Gretna, and getting the studio closer to home went from a someday idea to a plan with a deadline.</p>
<p>Chatham made the decision for us. It's quaint, it's full of history, and I'd wanted to work there long before I had a reason to.</p>
<h2>What is inside 10 North Main Street</h2>
<p>We could not have dreamed up a better building. The photo in this post was taken right before we started work on the space, so what you're looking at is the before.</p>
<p>Here is what came with it:</p>
<ul>
<li><strong>The vault.</strong> Original to the Planters Bank and Trust, still standing inside.</li>
<li><strong>The floors.</strong> Original hardwood, worn in the way only a hundred years of foot traffic does it.</li>
<li><strong>The ceiling.</strong> Decorative, detailed, and worth looking up at.</li>
</ul>
<blockquote>All it needed was a little care, and it looks better now than it has in years.</blockquote>
<h2>Hair, makeup, and photographs under one roof</h2>
<p>One thing set the senior experience apart at the time: sessions included professional airbrush makeup and hairstyling, not as an add-on but as part of the day.</p>
<p>The Chatham space made that far simpler, because I shared it with Rachael at Mint on Main, my longtime hair and makeup artist and a friend. A senior could show up once and get all three done in the same building.</p>
<p>It was a good partnership, and it took a real logistics problem off a parent's plate.</p>
<h2>A note from now</h2>
<p>This post is part of the archive from the Chatham studio years. The address, the makeup partnership, and what a session includes have all changed since it was written.</p>
<p>Sessions still run across Chatham, Danville, Gretna, Altavista, and Evington. If you'd like the current version of how any of it works, <a href="/contact">ask me directly</a> and I'll walk you through it.</p>`,
    faqs: [
      {
        question: 'What was 10 North Main Street in Chatham before it was a photography studio?',
        answer:
          'It was the Planters Bank and Trust. The vault is still inside, along with the original hardwood floors and a decorative ceiling. Emily Kathryn Photography took the space over after three years in Altavista and restored it before opening.',
      },
      {
        question: 'Where is Emily Kathryn Photography based now?',
        answer:
          'The studio is based in Gretna, Virginia, and works on location across Chatham, Danville, Lynchburg, Smith Mountain Lake, Forest, Altavista, and Evington. The Chatham storefront described in this post is part of the archive. Get in touch and Emily will tell you where your session would happen.',
      },
      {
        question: 'Do senior sessions include hair and makeup?',
        answer:
          'They did during the Chatham studio years, through a partnership with Rachael at Mint on Main. What is included in a session today has changed since 2019, so ask directly rather than going by this post.',
      },
    ],
  },

  /* ------------------------------------------------------------------------ */
  /*  Faith, 2019 Gretna High senior                                           */
  /* ------------------------------------------------------------------------ */
  {
    slug: 'faith-2019-gretna-high-senior',
    title: 'Faith: 2019 Gretna High Senior Portraits',
    publishedAt: '2019-03-12',
    category: 'session-recap',
    excerpt:
      'Faith danced for fifteen years before her senior session, so we built the afternoon around it. A burgundy top, a friend\'s farm, and the shoes that tell.',
    coverImage: {
      src: '/images/seniors/EKP_1337.jpg',
      alt: 'Senior dancer holding an arabesque in a pasture in front of red barns at sunset',
      width: 2400,
      height: 1601,
    },
    bodyHtml: `<p>Faith is a 2019 Gretna High senior who had been dancing for fifteen years by the time we shot together, starting at three years old. When something has that much of a person's life in it, you build the session around it. So that's what we did.</p>
<h2>I photographed her sister first</h2>
<p>I've known Faith for years, and I photographed her older sister, Grace, back when Grace was the senior. When their family reached out this year for Faith's turn, I was glad the way you're glad about family.</p>
<p>She also reminds me of my younger sister, Sarah. That is not a neutral fact and I'm not pretending otherwise.</p>
<h2>Fifteen years of dance, in one session</h2>
<p>Dancers are different in front of a camera. They already know where their weight sits, where a line ends, what their hands are doing. You direct less and watch more.</p>
<p>I'll take a session with a dancer in it every time.</p>
<blockquote>If you want to see what fifteen years of work looks like, don't look at the line. Look at the shoes.</blockquote>
<h2>What Faith wore, and why burgundy</h2>
<p>Every outfit came from Altar'd State, which is where I send seniors more than anywhere else for session wardrobes. The pieces read well on camera and they don't fight the setting.</p>
<p>The <strong>burgundy top</strong> was my favorite of the day. Burgundy is my standing recommendation for fall senior sessions:</p>
<ul>
<li>It holds its own against fall color instead of disappearing into it</li>
<li>It's warm against almost every skin tone</li>
<li>It prints and frames well in a room people actually live in</li>
</ul>
<h3>Where we shot</h3>
<p>Partway through the afternoon we changed things up and drove out to a friend's farm. New scenery, different light, and a second half of the gallery that looks nothing like the first.</p>
<h2>What Faith's family ordered</h2>
<p>Her order is the part I still think about. Faith's session did not end with a folder of files.</p>
<ul>
<li>A fine art canvas</li>
<li>A leather album</li>
<li>A wall collage</li>
<li>Proofs</li>
<li>A crystal USB</li>
</ul>
<p>The canvas and the collage went on a wall. The album sits on a shelf and gets opened. That is the difference between owning photographs and living with them.</p>
<p>If you have a senior with fifteen years of something behind them, that's the session I want to build. <a href="/contact">Start here</a> and tell me what they've been doing all this time.</p>`,
    faqs: [
      {
        question: 'Do you photograph Gretna High School seniors?',
        answer:
          'Yes. Faith was a 2019 Gretna High senior, and her older sister Grace sat for her senior portraits a few years earlier. Gretna is home base, so sessions for Gretna High families can run in town, out in the county, or on a working farm nearby.',
      },
      {
        question: 'What should a dancer wear for senior portraits?',
        answer:
          'Bring the dance wardrobe and the everyday wardrobe both. Faith brought outfits from Altar\'d State along with what she dances in, and the session moved between the two. The dance frames carry the story, the styled frames carry the year, and you want both in the gallery.',
      },
      {
        question: 'What colors work for fall senior portraits?',
        answer:
          'Burgundy is the one I recommend most. It stands up against fall color rather than blending into it, it is warm on nearly every skin tone, and it prints and frames well in a real room. Deep greens and warm neutrals do the same job.',
      },
    ],
  },

  /* ------------------------------------------------------------------------ */
  /*  Valentine's styled shoot with Ellery                                     */
  /* ------------------------------------------------------------------------ */
  {
    slug: 'valentines-day-styled-shoot-ellery',
    title: 'A Valentine\'s Styled Shoot with Ellery',
    publishedAt: '2019-02-20',
    category: 'behind-the-scenes',
    excerpt:
      'A cold, windy afternoon, one senior named Ellery, and a styled Valentine\'s shoot with a point: showing a teenager what everyone else already sees.',
    coverImage: {
      src: '/images/seniors/EKP_5455.jpg',
      alt: 'Close-up senior portrait of a girl framed by backlit lace in golden hour light',
      width: 2400,
      height: 1601,
    },
    bodyHtml: `<p>This one was a styled Valentine's shoot with Ellery, one of my seniors. It was cold, it was windy, we worked fast, and you cannot tell any of that from the frames. I don't fit many styled shoots in between client sessions anymore, so the ones I do get to make have to count.</p>
<h2>Why I still make room for styled shoots</h2>
<p>Between being a wife, a mom, and a photographer, styled shoots are the first thing to fall off a calendar.</p>
<p>They're also where I learn the most. No shot list, no expectations, just an idea and somebody willing to stand in the wind for it.</p>
<h2>What a senior session is actually for</h2>
<p>Teenagers, and teenage girls in particular, live inside a running commentary telling them they are not enough. My job is to argue with it.</p>
<blockquote>It isn't the hair or the makeup or the clothes. I want a senior to look at her own photograph and finally see what everybody else already sees.</blockquote>
<p>That's why I turn the camera around mid-session and show them the back of it. The moment a senior sees the first frame is the moment her posture changes, and every frame after that one is different.</p>
<h2>What went into this shoot</h2>
<ul>
<li><strong>The senior:</strong> Ellery, one of my own clients</li>
<li><strong>The concept:</strong> Valentine's, styled start to finish</li>
<li><strong>The video:</strong> filmed by my sister Sarah at White Oak Films</li>
<li><strong>The conditions:</strong> cold, windy, and completely invisible in the final images</li>
</ul>
<p>Having a second person there changes the rhythm of a session for the better. Ellery had someone to talk to between setups instead of standing in the wind waiting on me.</p>
<h2>Where the confidence comes from</h2>
<p>Ellery showed up as herself and left holding proof of it. That's the version of this job I care about.</p>
<p>Nothing about a session turns a person into somebody else. It just gets the real one on record, lit properly and printed large enough to see.</p>
<p>If there's a senior in your house who could use an afternoon like this one, <a href="/contact">start a conversation with me</a> and I'll tell you what it looks like.</p>`,
    faqs: [
      {
        question: 'What is a styled shoot?',
        answer:
          'A styled shoot is built around a concept rather than a client\'s calendar. The wardrobe, the setting, and the mood are decided first, and the session serves the idea. Ellery\'s was Valentine\'s themed, filmed by White Oak Films, and shot in one cold afternoon.',
      },
      {
        question: 'Do you show seniors their photos during the session?',
        answer:
          'Yes, and it is one of the most useful things I do. Turning the camera around mid-session lets a senior see herself the way the lens sees her. Posture changes, shoulders drop, and everything shot after that moment is better than everything shot before it.',
      },
      {
        question: 'Can we still shoot if it is cold or windy?',
        answer:
          'Yes. Ellery\'s session was both and you would never know it. Cold days call for shorter bursts of shooting with warm-up breaks in between, and wind is often doing you a favor with hair and fabric. What you cannot fix later is a session that never happened.',
      },
    ],
  },

  /* ------------------------------------------------------------------------ */
  /*  First shoot of 2019                                                      */
  /* ------------------------------------------------------------------------ */
  {
    slug: 'first-shoot-of-2019',
    title: 'The First Shoot of 2019',
    publishedAt: '2019-01-02',
    category: 'session-recap',
    excerpt:
      'The first session of 2019 was a New Year\'s shoot with Braelyn and Brianna. It rained the whole time, so we worked fast and got the glam set anyway.',
    coverImage: {
      src: '/images/seniors/EKP_9695.jpg',
      alt: 'Senior girl in a black dress standing in a field of crimson clover at golden hour',
      width: 1597,
      height: 2400,
    },
    bodyHtml: `<p>The first session of 2019 was a New Year's themed shoot with two seniors I'd already photographed that fall, Braelyn and Brianna. It rained the entire time. We worked fast, warmed up between setups, and still walked away with the glam set they came for.</p>
<h2>Why a themed session is worth doing</h2>
<p>A themed session gives a senior a reason to try a look she would never build a whole session around. Sequins, a bold lip, hair that takes an hour.</p>
<p>It's also a low-stakes way to start a year with something on the calendar that isn't a deadline.</p>
<h2>What to do when it rains on a session</h2>
<p>Rain is not the emergency people think it is. Overcast light is soft and even, which is flattering on everybody, and wet ground goes saturated and rich instead of washed out.</p>
<p>A few things keep a wet-weather session on track:</p>
<ol>
<li>Finish hair and makeup indoors before anybody checks the forecast again</li>
<li>Work in short bursts and warm up in between</li>
<li>Pick fewer locations and commit to them completely</li>
<li>Let the weather into the frame instead of trying to hide it</li>
</ol>
<blockquote>Rain doesn't ruin a session. Standing around waiting for it to stop does.</blockquote>
<h2>Their second time in front of my camera</h2>
<p>Braelyn and Brianna had already done full senior sessions with me that fall. This was the extra one.</p>
<p>That's usually how it goes. Once a senior sees herself in the first gallery, she wants to do it again with a different look, and the second session is always looser than the first.</p>
<p>Thinking through the timing of your own senior year? <a href="/contact">Send me a note</a> and we'll work out when to shoot.</p>`,
    faqs: [
      {
        question: 'Can you still shoot senior portraits in the rain?',
        answer:
          'Yes. Braelyn and Brianna\'s New Year\'s session was shot in steady rain and it does not show. Overcast light is soft and even, and it removes the harsh shadows you fight on a bright day. The trick is fewer locations, shorter bursts, and somewhere warm to stand in between.',
      },
      {
        question: 'What is a themed senior session?',
        answer:
          'It is a short styled session built around one idea, like New Year\'s or Valentine\'s, usually done in addition to a full senior session. It gives a senior room to try a look she would not commit an entire session to, and it is a good excuse to get back in front of the camera.',
      },
      {
        question: 'When should a senior schedule their portrait session?',
        answer:
          'Most seniors shoot the summer or fall before they graduate, which leaves time for announcements and for a wall piece to be printed and framed before graduation. Spring sessions work too, especially for seniors who want blossoms and green in the gallery.',
      },
    ],
  },

  /* ------------------------------------------------------------------------ */
  /*  2018 year in review (personal)                                           */
  /* ------------------------------------------------------------------------ */
  {
    // Held back pending Emily's explicit approval. This is a detailed account
    // of her daughter's hospitalization at age three, including named doctors.
    // Emily published it herself in 2018, but the old site is gone, so putting
    // it back is a fresh decision about their family's medical history and
    // hers alone to make. Flip `draft` to false to publish.
    draft: true,
    slug: 'hardest-photos-of-2018',
    title: 'The Hardest Photos I Took in 2018',
    publishedAt: '2018-12-28',
    category: 'behind-the-scenes',
    excerpt:
      'Most of the photos I think about from 2018 were taken on a phone in a hospital room. Here\'s what that year did to our family, and why I kept shooting.',
    coverImage: {
      src: '/images/families/WOF_8608.jpg',
      alt: 'Young girl in a floral dress leaning against a brick wall in soft natural light',
      width: 1601,
      height: 2400,
    },
    bodyHtml: `<p>The photographs I think about most from 2018 were not made with my camera. They're phone photos from hospital rooms in Gretna, Lynchburg, and Roanoke, taken across the days our three year old daughter, Ava, spent fighting a ruptured appendix. I didn't want to take a single one of them.</p>
<h2>What happened in May</h2>
<p>Ava got sick on Saturday, May 12. By the next morning she was worse, and the days that followed ran together like this:</p>
<ul>
<li><strong>Mother's Day:</strong> all of it in the Gretna emergency room</li>
<li><strong>Midnight:</strong> admitted at Lynchburg General</li>
<li><strong>That afternoon:</strong> transported to Roanoke Memorial</li>
<li><strong>The CT scan:</strong> a ruptured appendix, plus an abscess that had caused a bowel blockage</li>
</ul>
<p>The blockage was the part that scared us most. There were a lot of uncertain hours in there, and a peace over us the whole time that I still can't explain.</p>
<h2>Thirteen days with nothing to eat or drink</h2>
<p>Ava's bowels weren't working, so she couldn't have food or water for thirteen days. An NG tube in her nose suctioned out her stomach. A PICC line ran to her heart to feed her.</p>
<p>That was the hardest part for me. For the first few days she begged.</p>
<blockquote>"What is that, Mommy? Is there food in there?" She asked it every single time we passed the food carts on the way down to X-ray.</blockquote>
<p>If she spotted a cup sitting in our room she'd ask what was in it and whether she could have some. Telling her no, over and over, broke my heart.</p>
<p>The wanting faded once her nutrition started through the PICC line. After that, walking to the vending machine became the high point of her day. She saved every snack for later and never once complained about the waiting.</p>
<h2>How it ended</h2>
<p>We spent seventeen days in the hospital that first stay. Six weeks later we drove back to Roanoke Memorial, where Ava had a successful appendectomy and a surprise hernia repair, and came home the next day.</p>
<p>Plenty of people carried us through it:</p>
<ul>
<li>Our family, our friends, and our church, in more ways than we've finished counting</li>
<li>Dr. Russo at Lynchburg General</li>
<li>Dr. Safford and every pediatric nurse on that floor at Roanoke Memorial</li>
</ul>
<p>Thank you for standing with us, in person and in prayer.</p>
<h2>Why I kept taking the photos</h2>
<p>I didn't bring my real camera to the hospital for the first week. I couldn't bring myself to do it.</p>
<p>Something kept telling me to document it anyway. I believed we were going to come out the other side of it, and I wanted reminders for when we did.</p>
<p>I look at those frames now and see God's faithfulness in all of them. On the last night of the year I was driving with Ava while she belted out "Reckless Love" from the backseat, and I understood exactly what the photos had been for.</p>
<h2>What it changed about my work</h2>
<p>There's nothing a parent fears more than watching their child suffer. Going through it changed what I think a photograph is for.</p>
<p><strong>A portrait isn't a nice thing to have.</strong> It's proof of a season your family lived through together, and it belongs somewhere you can see it.</p>
<p>If your family is in the middle of a chapter worth marking, <a href="/contact">tell me about it</a>. I'd like to hear where you are.</p>`,
    faqs: [
      {
        question: 'Is Ava okay now?',
        answer:
          'Yes. After seventeen days in the hospital in May, she went back to Roanoke Memorial six weeks later for a successful appendectomy and a hernia repair and came home the next day. By the last night of the year she was in the backseat of my car singing loud enough to hear over the road.',
      },
      {
        question: 'Why post hospital photos on a photography blog?',
        answer:
          'Because they were the photographs that mattered most that year, and almost none of them were taken with a real camera. Looking back at them is what convinced me that a portrait is not decoration. It is a record of a season a family got through together.',
      },
      {
        question: 'Where was Ava treated?',
        answer:
          'The Gretna emergency room first, then Lynchburg General overnight, then Roanoke Memorial, where she stayed for most of the seventeen days and later had her appendectomy. Dr. Russo, Dr. Safford, and the Roanoke Memorial pediatric nurses looked after her.',
      },
    ],
  },
]

/**
 * Published posts only. Every consumer (journal index, post pages,
 * generateStaticParams, sitemap) reads this, so flipping a post to
 * `draft: true` removes it from the live site everywhere at once.
 */
export const JOURNAL_CONTENT: JournalPostContent[] = ALL_JOURNAL_POSTS.filter(
  (post) => !post.draft
)

/** All seed slugs, for generateStaticParams and the sitemap. */
export const JOURNAL_SLUGS: string[] = JOURNAL_CONTENT.map((post) => post.slug)

/** Look up a single seed post by slug. */
export function getJournalPost(slug: string): JournalPostContent | undefined {
  return JOURNAL_CONTENT.find((post) => post.slug === slug)
}
