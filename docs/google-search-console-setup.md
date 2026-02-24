# Google Search Console Setup Guide

This guide walks you through setting up Google Search Console for your website so Google can find, crawl, and display your pages in search results. Each step has clear instructions -- you've got this!

---

## 1. Create Your Google Search Console Account

1. Go to [Google Search Console](https://search.google.com/search-console/about)
2. Sign in with your Google account (use the same one tied to your Google Business Profile if possible -- this keeps everything connected)
3. Click **Add a property**
4. Choose the **URL prefix** method
5. Enter `https://emilykathryn.com`
6. Click **Continue**

---

## 2. Get Your Verification Code

1. On the verification page, you will see several methods. Choose **HTML tag**
2. You will see a meta tag that looks something like this:
   ```
   <meta name="google-site-verification" content="abc123def456..." />
   ```
3. Copy **only the content value** -- that is the string of letters and numbers between the quotes after `content=`. For example, if you see `content="abc123def456"`, you only need `abc123def456`
4. Keep this page open -- you will come back to it in a moment

---

## 3. Add the Code to Your Website

1. Go to [Vercel](https://vercel.com) and log in
2. Navigate to your **Emily Kathryn Photography** project
3. Click **Settings** in the top navigation
4. Click **Environment Variables** in the left sidebar
5. Add a new variable:
   - **Key:** `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
   - **Value:** Paste the verification code you copied in Step 2
   - **Environments:** Check **Production** and **Preview** (Development is optional)
6. Click **Save**
7. Now trigger a new deployment so the code goes live:
   - Click **Deployments** in the top navigation
   - Find the most recent deployment
   - Click the three-dot menu on the right and select **Redeploy**
   - Wait for the deployment to finish (usually takes about 1-2 minutes)

---

## 4. Verify Ownership

1. Go back to the Google Search Console tab you left open
2. Click **Verify**
3. You should see a green checkmark and the message **Ownership verified**
4. If it does not verify right away, wait a few minutes for the deployment to finish and try again

---

## 5. Submit Your Sitemap

Your website automatically generates a sitemap that tells Google about all your pages. Now you just need to point Google to it.

1. In Google Search Console, click **Sitemaps** in the left sidebar
2. In the **Add a new sitemap** field, type: `sitemap.xml`
3. Click **Submit**
4. The status should change to **Success** after a few minutes

That is it! Google now knows about every page on your site, including your senior portraits, family portraits, investment info, and more.

---

## 6. What Happens Next

You are all set! Here is what to expect going forward:

- **First few days:** Google will start crawling and indexing your pages. This is automatic -- you do not need to do anything.
- **Coverage report:** After a few days, check the **Pages** report (in the left sidebar) to see which of your pages Google has indexed.
- **Performance report:** After about 2-4 weeks, the **Performance** report will start showing data -- which search terms people used to find your site, how many clicks you received, and your average position in search results.
- **Ongoing:** Google Search Console will email you if it finds any issues with your site. These emails are helpful and worth reading, but most of the time everything runs smoothly on its own.

You are doing great -- your site is now set up to be discovered by everyone searching for a photographer in your area!
