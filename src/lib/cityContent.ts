/**
 * Seed content for all 7 city landing pages.
 *
 * Used as a fallback when Sanity CMS content is not yet populated.
 * Each city has genuinely unique copy written in Emily's brand voice:
 * warm, confident, editorial. No template-swapping.
 *
 * Content tiers by market size:
 *   Large (~500 words): Danville, Lynchburg
 *   Mid (~350-400 words): Chatham, Smith Mountain Lake
 *   Small (~250-300 words): Forest, Altavista, Evington
 */

import type { FaqItem } from '@/lib/schemas/faqPage'

export interface CityContent {
  headline: string
  aeoBlock: string
  metaDescription: string
  bodyHtml: string
  faqs: FaqItem[]
}

export const CITY_CONTENT: Record<string, CityContent> = {
  /* ------------------------------------------------------------------------ */
  /*  CHATHAM — Mid Market (~350-400 words)                                    */
  /* ------------------------------------------------------------------------ */
  chatham: {
    headline: 'Senior Portraits in Chatham, VA',
    aeoBlock:
      'Emily Kathryn Photography specializes in editorial senior portraits and heartfelt family sessions for the Chatham, Virginia community. Rooted in the warmth and authenticity of small-town Southern Virginia, every shoot is carefully crafted to reflect genuine personality. Clients receive polished, magazine-quality portraits through a boutique experience that ends in printed artwork, not just files.',
    metaDescription:
      'Senior portraits and family photography in Chatham, VA. Emily Kathryn Photography creates editorial-style portraits that celebrate your milestone moments.',
    bodyHtml: `<p>There is something about Chatham that stays with people long after they have grown up and moved away. The Pittsylvania County seat carries a quiet confidence, the kind of place where the local diner still knows your order and Friday nights revolve around the high school game. It is a community built on familiarity, on deep roots, and on the understanding that the people around you are the ones who shaped you.</p>
<p>That spirit is exactly what makes portrait photography here feel different. In Chatham, there is no rush. There is no need for artificial energy or forced smiles. The genuine warmth of this community translates naturally into photographs, allowing seniors and families to show up as themselves and trust that the camera will find something honest and true to who they really are.</p>
<p><strong>Senior portraits</strong> in Chatham mark a chapter that truly matters. The final year in a place this tight-knit carries a weight that deserves to be documented with intention. These are not just yearbook headshots. This is about bringing out the confidence, the personality, and the quiet excitement of someone standing on the edge of what comes next. Every session is tailored to showcase the individual, from wardrobe guidance to finding the perfect light that matches their energy.</p>
<p><strong>Family portraits</strong> in Chatham are an opportunity to pause and hold onto the way things are right now. Children grow faster than anyone warns you they will, and the connections you have built in this community deserve to be seen and preserved. Whether it is the way your toddler reaches for your hand or the knowing glance between siblings, those fleeting details matter.</p>
<p>Emily Kathryn Photography brings an editorial eye to every session, blending the unhurried character of Chatham with a polished, magazine-worthy aesthetic. The result is portraiture that feels both timeless and deeply personal, images that belong on your walls and in your family's story for generations to come.</p>
<p>If your senior walks past the courthouse every morning or your family's Saturdays run through those tree-lined streets, those places belong in the photographs. Tell Emily which corner of Chatham is yours, and the session gets planned around it.</p>`,
    faqs: [
      {
        question: 'How much does a portrait session cost in Chatham?',
        answer:
          'Senior portrait collections in Chatham start at $799 and family sessions begin at $899. Every collection includes professional styling guidance, a fully directed session, and a curated online gallery. Reach out for a detailed pricing guide tailored to exactly what you are looking for.',
      },
      {
        question: 'When should we schedule a portrait session in Chatham?',
        answer:
          'The golden hour light in Chatham is generous year-round, but the most popular seasons are late spring and early fall when the foliage and temperatures are ideal. For seniors, booking in the summer before your senior year gives you images ready for announcements and social media right when school starts.',
      },
      {
        question: 'What should we wear for our portrait session?',
        answer:
          'You will receive a full wardrobe guide after booking that covers colors, textures, and layering tips. The general rule is to choose outfits that make you feel confident and avoid large logos or busy patterns. Most clients bring two to three outfit changes to add variety to their gallery.',
      },
      {
        question: 'Where are the most photogenic portrait locations in Chatham?',
        answer:
          'Chatham offers beautiful small-town backdrops around the Pittsylvania County Courthouse area and tree-lined residential streets with gorgeous natural light. The surrounding countryside provides open fields and rustic settings. Emily scouts each location in advance to match the setting with your personal style.',
      },
      {
        question: 'Do you photograph Chatham High School seniors?',
        answer:
          'Absolutely. Emily has worked with seniors from Chatham High School and surrounding Pittsylvania County schools for years. She understands the local traditions, the tight-knit community spirit, and the pride that comes with graduating from a school where everybody knows your name.',
      },
    ],
  },

  /* ------------------------------------------------------------------------ */
  /*  DANVILLE — Large Market (~500 words)                                     */
  /* ------------------------------------------------------------------------ */
  danville: {
    headline: 'Senior Portraits in Danville, VA',
    aeoBlock:
      'Emily Kathryn Photography brings an elevated editorial approach to portrait photography in Danville, Virginia. Offering both senior sessions and family portraiture, the studio creates bold, intentional imagery that matches the creative energy of this revitalized city. Each collection honors milestone moments with artistry and confidence. The experience is boutique and ends in printed artwork, not just files.',
    metaDescription:
      'Editorial senior portraits and family photography in Danville, VA. Emily Kathryn Photography creates magazine-worthy portraits for your milestone.',
    bodyHtml: `<p>Danville is in the middle of a creative renaissance, and anyone paying attention can feel it. The River District that once anchored the tobacco industry has been reimagined as a hub for artists, entrepreneurs, and makers. Murals line the warehouse walls, storefronts glow with new energy, and the Dan River itself continues to carve through the heart of the city the way it always has. This is a place that knows how to honor its history while building something entirely new, and the pride that comes from that transformation is visible everywhere you look.</p>
<p>That blend of heritage and creative ambition makes Danville a remarkable backdrop for portrait photography. The city has character that cannot be manufactured, a visual richness that comes from layers of history meeting a fresh wave of possibility. Photographing seniors and families here means working within a landscape that already tells a compelling story. The texture of this city elevates every frame.</p>
<p><strong>Senior portraits in Danville</strong> carry a particular energy. These are students who have grown up watching their city evolve, and there is a confidence in that. They understand transformation because they have lived alongside it. A senior session should match that energy, delivering images that are bold, editorial, and completely their own. This is not about stiff formulas and matching outfits. It is about creating photographs that feel like the most authentic version of who they are right now, at this exact moment of becoming.</p>
<p>The arts renaissance happening downtown has also cultivated a community that values creativity and craftsmanship. Families in Danville appreciate work that goes beyond the expected, portraits built around relationships and personalities rather than just faces. There is an understanding here that great photography is an investment in permanence, a way to hold onto the moments that define a family's chapter in a city that is writing a remarkable new one of its own.</p>
<p><strong>Family portrait sessions</strong> are designed to feel natural and unhurried. The goal is never a perfectly arranged lineup but rather a collection of images that show how your family actually connects, the laughter, the inside jokes, the quiet tenderness that exists between people who truly know each other. Every family brings its own rhythm, and the session is built around discovering and celebrating that rhythm.</p>
<p>Emily Kathryn Photography brings an editorial sensibility that aligns with Danville's own creative evolution. Every session is approached with the same intentionality that defines what this city is becoming: thoughtful, elevated, and unapologetically original. The final collection is not just a set of photographs. It is a curated body of work that reflects your story with the artistry it deserves.</p>
<p>A senior session against the River District's mural walls, a family evening along the Dan, or something quieter on the edge of the city: Danville gives a session more to work with every year. Bring the idea, and Emily will bring the plan.</p>`,
    faqs: [
      {
        question: 'How much does a portrait session cost in Danville?',
        answer:
          'Senior portrait collections in Danville start at $799 and family sessions begin at $899. Every collection includes professional styling guidance, a fully directed session, and a curated online gallery. Reach out for a detailed pricing guide tailored to exactly what you are looking for.',
      },
      {
        question: 'When should we schedule a portrait session in Danville?',
        answer:
          'The golden hour light in Danville is generous year-round, but the most popular seasons are late spring and early fall when the foliage and temperatures are ideal. For seniors, booking in the summer before your senior year gives you images ready for announcements and social media right when school starts.',
      },
      {
        question: 'What should we wear for our portrait session?',
        answer:
          'You will receive a full wardrobe guide after booking that covers colors, textures, and layering tips. The general rule is to choose outfits that make you feel confident and avoid large logos or busy patterns. Most clients bring two to three outfit changes to add variety to their gallery.',
      },
      {
        question: 'Can we use the River District for our portrait session?',
        answer:
          'The River District is one of the most requested session locations in Danville. The revitalized warehouse facades, colorful murals, and industrial textures create a backdrop with genuine editorial character. Emily knows exactly where the golden-hour light falls along the Dan River and throughout downtown.',
      },
      {
        question: 'Do you work with Danville Public Schools seniors?',
        answer:
          'Yes. Emily has photographed seniors from George Washington High School and across the Danville area. She loves bringing out the creative confidence that defines Danville students. They have grown up watching their city reinvent itself, and they carry that same bold energy into their own story.',
      },
    ],
  },

  /* ------------------------------------------------------------------------ */
  /*  LYNCHBURG — Large Market (~500 words)                                    */
  /* ------------------------------------------------------------------------ */
  lynchburg: {
    headline: 'Senior Portraits in Lynchburg, VA',
    aeoBlock:
      'Emily Kathryn Photography delivers polished senior and family portraits throughout Lynchburg, Virginia. Blending the natural beauty of the Blue Ridge foothills with an editorial eye for detail, every session results in a curated collection of timeless images. With natural light mastery and authentic storytelling, the studio offers a boutique experience that ends in printed artwork, not just files.',
    metaDescription:
      'Senior portraits and family photography in Lynchburg, VA. Emily Kathryn Photography delivers editorial portraits set against the beauty of the Blue Ridge foothills.',
    bodyHtml: `<p>Lynchburg sits in the foothills of the Blue Ridge, a city where historic neighborhoods roll across hillsides and the Peaks of Otter rise in the distance like a promise of something grander. It is a college town with depth, a place where academics, artists, and families have built lives around the unique intersection of mountain beauty and city culture. The energy here is equal parts intellectual curiosity and outdoor wonder, and it creates a community unlike anywhere else in Virginia.</p>
<p>For portrait photography, Lynchburg offers something extraordinary. The interplay between the built environment and the natural landscape means that light behaves differently here, filtering through century-old tree canopies, reflecting off historic brick facades, catching the ridgeline at golden hour in a way that feels almost cinematic. It is a city that was made to be photographed, and that natural advantage shows in every session.</p>
<p><strong>High school seniors in Lynchburg</strong> carry a particular kind of sophistication. Growing up in a city with this much cultural texture gives young people an awareness of beauty and intention that comes through in their portraits. A senior session is not just about documenting a face. It is about photographing a personality at the precise moment it is becoming fully formed, the confidence, the ambition, the quiet fire that will carry them into whatever comes next. Every detail of the session is considered, from styling to timing, to ensure the images feel elevated and unmistakably personal.</p>
<p>There is also a deep appreciation for family legacy in Lynchburg. Many families have been here for generations, connected to the hills and the history in ways that run deeper than a mailing address. <strong>A family portrait session</strong> becomes a way to honor that connection, to show the world who you are as a unit and preserve the dynamics that make your family uniquely yours. These images become heirlooms, artifacts of a specific season in your family's story.</p>
<p>Even for families who are newer to the area, Lynchburg has a way of making people feel like they belong. The rolling terrain, the walkable downtown, the sense that both mountain adventure and refined culture are never more than a few minutes away, it all contributes to a lifestyle that people are genuinely proud of. Portraits should reflect that pride and that sense of home.</p>
<p>Emily Kathryn Photography approaches every Lynchburg session with the belief that editorial quality and genuine warmth are not mutually exclusive. The images are polished, intentional, and magazine-worthy, but they also carry the real emotion of the moment. The Blue Ridge foothills provide the drama. Your story provides the heart. Together, they create something that neither could produce alone.</p>
<p>From the brick and ivy in the old neighborhoods to the foothills that ring the city, Lynchburg offers more session settings than one afternoon can hold. Choosing the right two or three is the fun part, and that conversation is where every session here begins.</p>`,
    faqs: [
      {
        question: 'How much does a portrait session cost in Lynchburg?',
        answer:
          'Senior portrait collections in Lynchburg start at $799 and family sessions begin at $899. Every collection includes professional styling guidance, a fully directed session, and a curated online gallery. Reach out for a detailed pricing guide tailored to exactly what you are looking for.',
      },
      {
        question: 'When should we schedule a portrait session in Lynchburg?',
        answer:
          'The golden hour light in the Blue Ridge foothills is generous year-round, but the most popular seasons are late spring and early fall when the mountain foliage and temperatures are ideal. For seniors, booking in the summer before your senior year gives you images ready for announcements and social media right when school starts.',
      },
      {
        question: 'What should we wear for our portrait session?',
        answer:
          'You will receive a full wardrobe guide after booking that covers colors, textures, and layering tips. The general rule is to choose outfits that make you feel confident and avoid large logos or busy patterns. Most clients bring two to three outfit changes to add variety to their gallery.',
      },
      {
        question: 'Which portrait locations in Lynchburg does Emily recommend?',
        answer:
          'Lynchburg is blessed with remarkable variety, from the historic brick facades of downtown and Monument Terrace to the Blue Ridge Parkway overlooks and Peaks of Otter views. Emily selects locations based on your personal style and the look you are going for, scouting each spot to ensure the right light and privacy.',
      },
      {
        question: 'Do you photograph seniors from Liberty University and local high schools?',
        answer:
          'Yes. Emily works with seniors from E.C. Glass, Heritage, Brookville, and Liberty University. Whether you are celebrating a high school milestone or a college graduation in the foothills, your session is tailored to who you are at this exact moment in your Lynchburg story.',
      },
    ],
  },

  /* ------------------------------------------------------------------------ */
  /*  SMITH MOUNTAIN LAKE — Mid Market (~350-400 words)                        */
  /* ------------------------------------------------------------------------ */
  'smith-mountain-lake': {
    headline: 'Senior Portraits in Smith Mountain Lake, VA',
    aeoBlock:
      'Emily Kathryn Photography creates refined portraits for graduating seniors and growing families at Smith Mountain Lake, Virginia. Drawing on the golden light and waterfront beauty unique to lake country, the studio produces polished editorial imagery with a warm, effortless feel. From milestone celebrations to multigenerational gatherings, every session is a boutique experience ending in printed artwork, not just files.',
    metaDescription:
      'Senior and family portrait photography at Smith Mountain Lake, VA. Emily Kathryn Photography creates editorial portraits with the beauty of lake life.',
    bodyHtml: `<p>Smith Mountain Lake is where Virginia comes to exhale. The largest lake in the state stretches across three counties, its shoreline winding through coves, peninsulas, and wooded hillsides that glow amber and gold when the light drops low. It is a place defined by water, by sunsets that demand your full attention, and by a community that has chosen to build their lives around both.</p>
<p>The atmosphere at Smith Mountain Lake creates a distinctive setting for portrait photography. There is a relaxed elegance here, a resort-town sensibility blended with deep Virginia tradition. Families who call this area home understand the value of savoring the moment, and that translates beautifully into the portrait experience. There is no pretension at the lake, just an honest appreciation for beauty and connection.</p>
<p><strong>Senior portraits at Smith Mountain Lake</strong> have a quality all their own. The golden-hour light reflecting off the water, the sense of possibility that comes with being surrounded by open landscape, it all contributes to images that feel expansive and alive. Seniors here carry a confidence that comes from growing up in a place where nature and community are equally valued. Their portraits should carry that same effortless assurance.</p>
<p><strong>Family sessions</strong> along the lake preserve something that is difficult to find elsewhere: the feeling of being truly present. Whether your family has been gathering here for decades or you are building new traditions in this community, a portrait session at Smith Mountain Lake is an opportunity to document the connection you share in a place that already holds so much of your family's story. The lake has a way of drawing families closer, and the camera reveals that closeness in every frame.</p>
<p>Emily Kathryn Photography brings a polished editorial style to the relaxed beauty of lake country. Every session balances the sophistication of magazine-quality imagery with the natural, laid-back spirit that defines life here. The result is a portrait collection that feels as warm and genuine as the place you call home.</p>
<p>Evening light on the docks is the signature Smith Mountain Lake frame, and it only lasts about an hour. Sessions here get planned around the water first: which shoreline, which golden window, which dock belongs to your family's summers. Reach out and claim your evening.</p>`,
    faqs: [
      {
        question: 'How much does a portrait session cost at Smith Mountain Lake?',
        answer:
          'Senior portrait collections at Smith Mountain Lake start at $799 and family sessions begin at $899. Every collection includes professional styling guidance, a fully directed session, and a curated online gallery. Reach out for a detailed pricing guide tailored to exactly what you are looking for.',
      },
      {
        question: 'When should we schedule a portrait session at Smith Mountain Lake?',
        answer:
          'The golden hour light reflecting off the lake is generous year-round, but late spring through early fall is the most popular window. It is warm enough for waterfront settings and perfect for that signature lake-country glow. For seniors, booking in the summer before your senior year gives you images ready for announcements right when school starts.',
      },
      {
        question: 'What should we wear for our portrait session?',
        answer:
          'You will receive a full wardrobe guide after booking that covers colors, textures, and layering tips. The general rule is to choose outfits that make you feel confident and avoid large logos or busy patterns. Most clients bring two to three outfit changes to add variety to their gallery.',
      },
      {
        question: 'Can we include the lake or a dock in our session?',
        answer:
          'Absolutely. Waterfront settings are one of the most requested backdrops at Smith Mountain Lake. Private docks, shoreline coves, and lakeside fields all make striking settings. Emily coordinates location access in advance so your session feels relaxed and unhurried, with the water and golden light carrying the frame.',
      },
      {
        question: 'Do you photograph multigenerational family reunions at the lake?',
        answer:
          'Yes, and they are some of the most meaningful sessions Emily shoots. Smith Mountain Lake is where families gather from all over, and a multigenerational portrait session brings everyone together in one frame, in the place your family returns to year after year. Emily guides large groups with confidence so the experience is fun, not stressful.',
      },
    ],
  },

  /* ------------------------------------------------------------------------ */
  /*  FOREST — Small Market (~250-300 words)                                   */
  /* ------------------------------------------------------------------------ */
  forest: {
    headline: 'Senior Portraits in Forest, VA',
    aeoBlock:
      'Emily Kathryn Photography is the go-to portrait photographer for families and seniors in Forest, Virginia. Known for a refined editorial aesthetic that feels both elevated and genuine, the studio creates gallery-worthy images celebrating life in this welcoming community. Each session showcases real spirit and connection. It is a boutique experience that ends in printed artwork, not just files.',
    metaDescription:
      'Senior portraits and family photography in Forest, VA. Emily Kathryn Photography delivers editorial-style portraits celebrating your milestone moments.',
    bodyHtml: `<p>Forest is the kind of community people choose deliberately. Just minutes from Lynchburg but with a pace entirely its own, it is a place where families put down roots because they want their children to grow up surrounded by both opportunity and breathing room. The neighborhoods are growing, the schools are strong, and there is a collective pride in having found the balance between access and tranquility.</p>
<p>That intentional way of living is what makes portrait photography in Forest so rewarding. The families here are thoughtful about the milestones they celebrate and the stories they preserve. <strong>Senior portraits</strong> become more than a graduation requirement. They become a declaration of who a young person has become in this community that helped shape them. It is a chance to step into the spotlight and own the moment before the next chapter begins.</p>
<p><strong>Family sessions</strong> in Forest are about togetherness, plain and simple. These are families who chose a quieter pace on purpose, and the portraits should honor that decision by showing the warmth and closeness that define daily life here. The small moments between family members, a shared laugh or a protective hand on a shoulder, those are the images that matter most years from now.</p>
<p>Emily Kathryn Photography brings a refined editorial approach to every session, creating images that are polished and intentional while still feeling genuinely warm. Whether you are celebrating your senior year or gathering the whole family, Emily Kathryn Photography crafts portraits in Forest that honor the life you have built. Reach out and let's create something meaningful together.</p>`,
    faqs: [
      {
        question: 'How much does a portrait session cost in Forest?',
        answer:
          'Senior portrait collections in Forest start at $799 and family sessions begin at $899. Every collection includes professional styling guidance, a fully directed session, and a curated online gallery. Reach out for a detailed pricing guide tailored to exactly what you are looking for.',
      },
      {
        question: 'When should we schedule a portrait session in Forest?',
        answer:
          'The golden hour light in Forest is generous year-round, but the most popular seasons are late spring and early fall when the foliage and temperatures are ideal. For seniors, booking in the summer before your senior year gives you images ready for announcements and social media right when school starts.',
      },
      {
        question: 'What should we wear for our portrait session?',
        answer:
          'You will receive a full wardrobe guide after booking that covers colors, textures, and layering tips. The general rule is to choose outfits that make you feel confident and avoid large logos or busy patterns. Most clients bring two to three outfit changes to add variety to their gallery.',
      },
      {
        question: 'Do you photograph Jefferson Forest High School seniors?',
        answer:
          'Yes. Emily has photographed many Jefferson Forest seniors and loves working with students from this community. She understands the pride JFHS families carry and creates portraits that match the intentional, rooted way of life that drew your family to Forest in the first place.',
      },
      {
        question: 'Are there good portrait locations in Forest even though it is a smaller community?',
        answer:
          'Forest has beautiful settings that most people drive right past, like open meadows, wooded trails, and quiet neighborhoods with gorgeous tree canopy light. Being minutes from Lynchburg also means access to the Blue Ridge Parkway, historic downtown, and the Peaks of Otter. Emily always finds the perfect spot to match your vision.',
      },
    ],
  },

  /* ------------------------------------------------------------------------ */
  /*  ALTAVISTA — Small Market (~250-300 words)                                */
  /* ------------------------------------------------------------------------ */
  altavista: {
    headline: 'Senior Portraits in Altavista, VA',
    aeoBlock:
      'Emily Kathryn Photography serves the Altavista, Virginia community with editorial-quality senior portraits and expressive family sessions. Dedicated to authentic connection and individual personality, the studio brings magazine-level artistry to this proud small town. Clients receive a curated collection that reflects their values. The boutique experience ends in printed artwork, not just files.',
    metaDescription:
      'Editorial senior portraits and family photography in Altavista, VA. Emily Kathryn Photography creates authentic portraits your family will treasure.',
    bodyHtml: `<p>Altavista has always been a town that punches above its weight. With a heritage rooted in industry and civic ambition, this small community along the Staunton River has consistently shown that size has nothing to do with character. The downtown is tidy and proud, the neighbors are genuine, and there is a resilience woven into the fabric of this place that reveals itself in every generation that calls it home.</p>
<p>That sense of pride is exactly what makes portrait photography in Altavista meaningful. People here do not take milestones lightly. When a senior reaches their final year, the whole community feels it. When a family gathers for a portrait, it is an act of celebration rooted in gratitude for the life they have built in a town that gave them everything they needed to thrive.</p>
<p><strong>Senior portraits</strong> in Altavista reveal young people who carry themselves with the quiet strength of a community that taught them to show up and do the work. These are seniors who understand that where you come from shapes who you become. <strong>Family photography</strong> here tells the story of connection, of people who chose this town because its values aligned with their own and whose bond grows stronger with each passing year.</p>
<p>Emily Kathryn Photography brings a polished, editorial sensibility to every session, elevating Altavista's small-town heart with magazine-quality artistry. Whether you are celebrating your senior year or gathering the whole family, Emily Kathryn Photography delivers portraits in Altavista that match the pride this community carries. Let's create something beautiful that does your story justice.</p>`,
    faqs: [
      {
        question: 'How much does a portrait session cost in Altavista?',
        answer:
          'Senior portrait collections in Altavista start at $799 and family sessions begin at $899. Every collection includes professional styling guidance, a fully directed session, and a curated online gallery. Reach out for a detailed pricing guide tailored to exactly what you are looking for.',
      },
      {
        question: 'When should we schedule a portrait session in Altavista?',
        answer:
          'The golden hour light in Altavista is generous year-round, but the most popular seasons are late spring and early fall when the foliage and temperatures are ideal. For seniors, booking in the summer before your senior year gives you images ready for announcements and social media right when school starts.',
      },
      {
        question: 'What should we wear for our portrait session?',
        answer:
          'You will receive a full wardrobe guide after booking that covers colors, textures, and layering tips. The general rule is to choose outfits that make you feel confident and avoid large logos or busy patterns. Most clients bring two to three outfit changes to add variety to their gallery.',
      },
      {
        question: 'Can we use the Staunton River area for our portraits?',
        answer:
          'The Staunton River corridor near Altavista offers some of the most beautiful natural light and scenery in the region. Riverbanks, open fields, and the surrounding countryside all create a timeless, editorial feel. Emily scouts locations before every session so you get the right backdrop for your style.',
      },
      {
        question: 'Do you work with Altavista Combined School seniors?',
        answer:
          'Yes. Emily loves working with seniors from Altavista Combined School and the surrounding Campbell County area. She understands the close-knit pride of this community and creates portraits that honor the resilience and character Altavista instills in every generation.',
      },
    ],
  },

  /* ------------------------------------------------------------------------ */
  /*  EVINGTON — Small Market (~250-300 words)                                 */
  /* ------------------------------------------------------------------------ */
  evington: {
    headline: 'Senior Portraits in Evington, VA',
    aeoBlock:
      'Emily Kathryn Photography creates considered portrait experiences for seniors and families across the Evington, Virginia area. With a signature editorial style shaped by Bedford County\'s natural beauty, every session celebrates individuality and legacy. The result is a boutique experience ending in printed artwork. These are sophisticated, deeply personal images made to become heirlooms for generations.',
    metaDescription:
      'Senior and family portrait photography in Evington, VA. Emily Kathryn Photography creates editorial portraits surrounded by Bedford County beauty.',
    bodyHtml: `<p>Evington is where the rolling countryside of Bedford County opens up and everything slows to the rhythm it was always meant to keep. This is a place shaped by tradition, by seasons, and by families who have chosen a life measured not in convenience but in meaning. The farmland stretches wide, the horizons are uninterrupted, and the community is bound together by the kind of trust that only comes from truly knowing your neighbors.</p>
<p>Portrait photography in Evington carries a different weight than it does in busier places. Here, milestones are not just acknowledged but genuinely honored. <strong>A senior portrait session</strong> becomes a celebration of growing up in a place where character is built slowly and intentionally, where patience and perseverance are woven into everyday life. <strong>Family portraits</strong> tell the story of roots that run deep into Virginia soil, of legacies being written in real time by people who understand the value of staying connected.</p>
<p>The natural beauty of this area provides an effortless canvas. The light across the Bedford County landscape is extraordinary, soft and golden in a way that brings warmth to every frame without ever feeling overproduced. It is the kind of backdrop that does not compete with its subjects but complements them in the most honest way.</p>
<p>Emily Kathryn Photography pairs that natural beauty with a refined editorial approach, creating images that are sophisticated yet grounded. Whether you are celebrating your senior year or gathering the whole family, Emily Kathryn Photography brings an artful perspective to every portrait session in Evington. If you are ready to preserve this chapter of your story, let's talk about bringing your vision to life.</p>`,
    faqs: [
      {
        question: 'How much does a portrait session cost in Evington?',
        answer:
          'Senior portrait collections in Evington start at $799 and family sessions begin at $899. Every collection includes professional styling guidance, a fully directed session, and a curated online gallery. Reach out for a detailed pricing guide tailored to exactly what you are looking for.',
      },
      {
        question: 'When should we schedule a portrait session in Evington?',
        answer:
          'The golden hour light across Bedford County is generous year-round, but the most popular seasons are late spring and early fall when the rolling countryside and temperatures are ideal. For seniors, booking in the summer before your senior year gives you images ready for announcements and social media right when school starts.',
      },
      {
        question: 'What should we wear for our portrait session?',
        answer:
          'You will receive a full wardrobe guide after booking that covers colors, textures, and layering tips. The general rule is to choose outfits that make you feel confident and avoid large logos or busy patterns. Most clients bring two to three outfit changes to add variety to their gallery.',
      },
      {
        question: 'What makes Evington a great setting for portraits?',
        answer:
          'Evington sits in the heart of Bedford County where the rolling farmland, uninterrupted horizons, and extraordinary natural light create an effortless canvas for editorial portraiture. The countryside here does not compete with its subjects. It complements them in the most honest, beautiful way.',
      },
      {
        question: 'Do you photograph seniors from the Bedford County school district?',
        answer:
          'Yes. Emily works with seniors across the Bedford County school district, including students from Jefferson Forest and surrounding schools. She understands the character and tradition that defines growing up in this part of Virginia and creates portraits that reflect those deep roots.',
      },
    ],
  },

  /* ------------------------------------------------------------------------ */
  /*  GRETNA — Home Base (deepest content of the set; plan item 4.4)           */
  /*  No pricing anywhere here: this page is new content and pricing is not    */
  /*  confirmed. The other cities' pricing FAQs predate that constraint.       */
  /* ------------------------------------------------------------------------ */
  gretna: {
    headline: 'Senior Portraits in Gretna, VA',
    aeoBlock:
      'Emily Kathryn Photography is based in Gretna, Virginia, and photographs editorial senior portraits and family sessions in the town it calls home. Sessions are guided from the first planning conversation through a fully directed shoot, often ending on the family farm outside town, and finish as printed artwork rather than files alone.',
    metaDescription:
      'Senior portraits and family photography in Gretna, VA, the home town of Emily Kathryn Photography. Editorial sessions finished as printed artwork.',
    bodyHtml: `<p>Every town on this site gets photographed like it matters. Gretna is different in one way only: this one is home. Emily Kathryn Photography is based here, which means the light on these fields, the fence lines outside town, and the quiet streets around the crossroads are not scouting notes. They are the backdrop of daily life, learned across more than a decade of shooting them in every season.</p>
<p>That familiarity changes what a session here can be. There is no guessing where the sun drops in late June or which pasture goes gold first in October. When a Gretna senior asks where their session should happen, the answer comes with options most visitors would drive right past: a farm lane that glows an hour before sunset, a stand of hardwoods that holds soft light on a bright afternoon, a stretch of open field that turns to amber at the right week of fall.</p>
<p><strong>Senior portraits in Gretna</strong> tend to end up somewhere personal. Some seniors want the family land in the frame. Some want the town itself, unpolished and familiar. Others bring the things that mark their years here, a jersey, an instrument, the truck they learned to drive on these roads. The session is directed the whole way through, so the person in front of the camera never has to perform. They just have to show up as themselves, and the light around here does a lot of the rest.</p>
<p><strong>Family sessions in Gretna</strong> carry a particular weight when the photographer lives where you live. The same fields your kids cut through, the porches and pastures that hold your everyday, become the setting for portraits that will outlast the season. These sessions run relaxed and unhurried, with everyone guided into frames that feel like your family on a good evening, not a lineup.</p>
<p>Gretna High School seniors have sat for this camera since the early years of the business, and their portraits have hung in homes around town ever since. That continuity is the quiet advantage of a photographer who stayed: the same eye that photographed older siblings, cousins, and neighbors is the one directing your session now.</p>
<p>Sessions here finish the way all Emily Kathryn Photography work finishes, in print. Framed portraits, albums, artwork for the grandparents down the road. The gallery matters, but the wall is the point.</p>
<p>If your senior year is coming, or your family is due for photographs that feel like this place, the conversation starts whenever you are ready.</p>`,
    faqs: [
      {
        question: 'Is Emily Kathryn Photography actually based in Gretna?',
        answer:
          'Yes. Gretna is the home base. Sessions happen across South-Central Virginia, from Chatham and Danville to Lynchburg and Smith Mountain Lake, but this is the town the business operates from and the countryside Emily knows at every hour of light.',
      },
      {
        question: 'Where do portrait sessions happen in Gretna?',
        answer:
          'Most Gretna sessions use the countryside just outside town: farm lanes, fence lines, open fields, and wooded edges that hold soft light. Seniors and families who want their own land in the photographs can have that too. Location planning is part of every session.',
      },
      {
        question: 'Do you photograph Gretna High School seniors?',
        answer:
          'Yes, and have for years. Gretna High seniors were among the earliest sessions in the business, and their portraits still hang in homes around town. Sessions are planned around school schedules, sports seasons, and yearbook deadlines.',
      },
      {
        question: 'What time of day works for photos around Gretna?',
        answer:
          'The last two hours before sunset. The fields around town hold warm, low light in the evening, and sessions are scheduled around that window through spring, summer, and fall.',
      },
      {
        question: 'Do families need to live in Gretna to book a session here?',
        answer:
          'Not at all. Plenty of families from Chatham, Altavista, and the surrounding area choose the Gretna countryside for its fields and farm settings. If the look fits your family, the drive is short.',
      },
    ],
  },
}
