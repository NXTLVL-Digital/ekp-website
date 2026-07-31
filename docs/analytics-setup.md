# Analytics Setup — Google Analytics 4 and Microsoft Clarity

The tracking code is already built and deployed. Both tools stay dormant until
their IDs are set as environment variables in Vercel, so nothing is tracked and
nothing breaks until you deliberately turn them on.

---

## Important context: the site is currently not tracked at all

The old GoHighLevel site carried whatever tracking GHL had wired in. That did
not survive the rebuild. As of the DNS cutover on July 31, 2026, the new site
sends data to no analytics property. Any Google Analytics property Emily has is
sitting at zero traffic, and it is not a reporting glitch. Setting the
`NEXT_PUBLIC_GA_MEASUREMENT_ID` variable below is what starts the data flowing.

Search Console is a different story and is fine. Verification for
emilykathryn.com is done through a DNS TXT record, which moved to Vercel DNS
with everything else, so Google still recognizes ownership. See
`docs/google-search-console-setup.md` for the sitemap submission steps.

---

## Google Analytics 4

### 1. Find or create the property

1. Sign in at [analytics.google.com](https://analytics.google.com) with the
   Google account that owns Emily's marketing data (the same account used for
   Google Business Profile keeps life simple).
2. Check **Admin > Property** for an existing "Emily Kathryn Photography"
   property.
   - **If one exists**, use it. Historical data stays intact and the new site
     simply resumes reporting into it.
   - **If nothing exists**, create a property: Admin > Create > Property. Name
     it "Emily Kathryn Photography", set the time zone to Eastern Time and the
     currency to US Dollar.
3. Under the property, open **Data Streams** and select the web stream for
   emilykathryn.com, or create one with the URL `https://emilykathryn.com` and
   the stream name "Website".

### 2. Copy the Measurement ID

On the data stream page, copy the **Measurement ID** in the top right. It looks
like `G-XXXXXXXXXX`. That is the only value needed.

### 3. Add it to Vercel

Either send the ID over and it gets added by CLI, or do it directly:
Vercel dashboard > emilykathryn-photography > Settings > Environment Variables >
Add, with name `NEXT_PUBLIC_GA_MEASUREMENT_ID`, the `G-` value, and the
Production and Preview environments checked. A redeploy activates it, because
`NEXT_PUBLIC_` variables are compiled into the browser bundle at build time.

### 4. Verify it works

Open emilykathryn.com in a browser, then check GA under **Reports > Realtime**.
Your own visit should appear within about 30 seconds. If it does not, confirm
the site was redeployed after the variable was added.

### 5. Worth doing once

- In **Admin > Data Streams > Enhanced measurement**, confirm it is on. It
  captures scrolls, outbound clicks, and file downloads with no extra code.
- Add an annotation or a note marking July 31, 2026 as the site relaunch, so a
  future traffic shift is not mistaken for a ranking problem.
- Expect a temporary dip in impressions and clicks after any migration. The
  redirects from the old URLs are in place, so recovery is normal.

---

## Microsoft Clarity

Clarity is free with no traffic limits, and it shows session recordings and
heatmaps: exactly where visitors hesitate, rage-click, or abandon the inquiry
form.

### 1. Create the project

1. Sign in at [clarity.microsoft.com](https://clarity.microsoft.com) with a
   Microsoft, Google, or Facebook account.
2. Select **New project**. Name it "Emily Kathryn Photography", set the website
   to `emilykathryn.com`, and choose the site category.
3. When Clarity offers installation methods, ignore all of them. The tracking
   code is already in the site. Go to **Settings > Overview** and copy the
   **Project ID**, a short alphanumeric string such as `abcdefghij`.

### 2. Add it to Vercel

Same as above: name `NEXT_PUBLIC_CLARITY_PROJECT_ID`, the project ID as the
value, Production and Preview checked, then redeploy.

### 3. Verify

Visit the site, then check the Clarity dashboard. Recordings usually appear
within a few minutes, though the first session can take up to half an hour.

### 4. Where the value is

- **Recordings** filtered to the Contact page show whether people start the
  inquiry form and give up, and at which field.
- **Heatmaps** on the Senior Portraits page show how far down people actually
  scroll, which tells you whether the pricing and FAQ sections are ever seen.
- **Dead clicks** reveal images or text that people tap expecting something to
  happen. On a photography site that usually means they wanted a bigger view.

---

## Privacy obligations

Both tools are disclosed on `/privacy` under the Analytics heading, including
the fact that Clarity records session activity and that both set cookies. If
either tool is ever removed, or a third is added, that page has to be updated to
match. The site should never claim a privacy posture it does not have.
