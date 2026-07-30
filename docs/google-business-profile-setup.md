# Google Business Profile Setup — Emily Kathryn Photography

Step-by-step guide for setting up GBP as a **service-area business** (SAB).
Written so Emily can complete it without developer help. Google's screens
change occasionally — if a screen looks different, the decision points below
still apply.

> **Before you start, have ready:**
> - The business phone number (must be entered **identically** on the website — tell Jeff the exact format you choose)
> - Your Gretna street address (given to Google privately for verification — it will NOT be shown publicly)
> - A Google account you want to own the listing long-term (use a business Google account, not a personal one, if possible)

---

## 1. Create the profile

1. Go to [google.com/business](https://www.google.com/business/) and sign in.
2. Enter business name exactly: **Emily Kathryn Photography**
   - Do not add keywords like "— Senior Portraits Danville" to the name. Google suspends profiles for this.
3. Business category (primary): **Photographer**
   - You can add secondary categories after setup: *Portrait studio*, *Photography service*.

## 2. Set up as a service-area business (the critical step)

1. When asked **"Do you want to add a location customers can visit, like a store or office?"** → answer **No**.
   - This is what makes you a service-area business. Your home address stays private.
2. When asked where you serve, add **all seven** areas:
   - Chatham, VA
   - Danville, VA
   - Lynchburg, VA
   - Smith Mountain Lake, VA (if not accepted, use Moneta, VA)
   - Forest, VA
   - Altavista, VA
   - Evington, VA
3. When asked for your address for **verification purposes**, enter the real Gretna street address. Google uses it for verification and proximity ranking but does not display it.
   - Later, in the profile dashboard, double-check: **Edit profile → Location** should show *no* business address publicly, only service areas.

## 3. Contact info

1. Phone: enter the business number. **Write down the exact format** (e.g. `(434) 555-1234`) and send it to Jeff — the website, schema markup, and GBP must match character-for-character.
2. Website: `https://emilykathryn.com`
3. Appointment link (after setup, under **Edit profile → Booking**): `https://emilykathryn.com/contact`

## 4. Verification

Google chooses the method — usually **video verification** for service-area businesses (they may ask you to show your equipment/workspace on camera), sometimes phone or postcard.

- If postcard: it arrives at the Gretna address in ~5 days with a code.
- If video: have business proof handy (equipment, a business card or insurance doc, vehicle if branded).
- The profile is not publicly visible until verification completes.

## 5. Fill out the profile completely (do this in one sitting)

In the dashboard (**Edit profile**):

- **Description** (750 chars max) — suggested draft:
  > Editorial senior portraits and family photography across South-Central Virginia. Based near Gretna and serving Chatham, Danville, Lynchburg, Smith Mountain Lake, Forest, Altavista, and Evington. Magazine-style sessions that make seniors feel like the cover story — and family portraits made for the wall, not the phone. Inquire for detailed pricing.
- **Opening hours:** Mon–Sat 9:00 AM – 5:00 PM (match the website; adjust if reality differs — then tell Jeff so the site schema is updated too).
- **Services** (under Services, add each; link the matching page in the description):
  - Senior Portraits → mention `emilykathryn.com/senior-portraits`
  - Family Portraits → mention `emilykathryn.com/family-portraits`
- **Attributes:** Identifies as women-owned (if desired), online estimates, etc.
- **Photos:** upload 10–15 of the same portfolio images used on the website, plus a headshot as the "team" photo and a cover image. Add 2–3 new photos monthly — recency matters.
- **Booking button:** `https://emilykathryn.com/contact`

## 6. Reviews (the #1 local ranking factor)

1. In the dashboard, get your **review link** (Ask for reviews) — a short `g.page/r/...` URL.
2. Send it to every past client with a personal note; aim for a steady trickle (2–4/month), not a burst.
3. Reply to every review within a week — replies show engagement to Google and to prospects.

## 7. After setup — connect the dots

- [ ] Send Jeff the exact phone number format used → he updates the website footer/schema to match.
- [ ] Confirm the profile shows **service areas only** (no street address visible).
- [ ] Google Search Console is already set up per `docs/google-search-console-setup.md` — the sitemap at `https://emilykathryn.com/sitemap.xml` should already be submitted there.
- [ ] Post a first "Update" on the profile (a recent session, with a link to the matching city page — e.g. a Danville senior session links `emilykathryn.com/danville`).

**Ongoing cadence:** one GBP post + a few fresh photos monthly, review requests after every gallery delivery.
