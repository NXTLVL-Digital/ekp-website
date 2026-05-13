import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { dataset, projectId } from "./env";
import { schemaTypes } from "./schemas";

// Singleton document types — only one document of each should ever exist.
// They get their own top-level nav items instead of appearing in lists.
const SINGLETONS = new Set(["siteSettings", "aboutPage"]);

export default defineConfig({
  name: "emilykathryn-photography",
  title: "Emily Kathryn Photography",
  basePath: "/studio",

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Your Website")
          .items([
            // ── PHOTOS ──────────────────────────────────────────────────────
            S.listItem()
              .title("My Galleries")
              .child(
                S.documentTypeList("gallery")
                  .title("Photo Galleries")
                  .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
              ),

            S.divider(),

            // ── CLIENTS & SOCIAL PROOF ──────────────────────────────────────
            S.listItem()
              .title("Client Testimonials")
              .child(
                S.documentTypeList("testimonial")
                  .title("Client Testimonials")
                  .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
              ),

            // ── PRICING ─────────────────────────────────────────────────────
            S.listItem()
              .title("Pricing & Packages")
              .child(
                S.documentTypeList("pricingTier")
                  .title("Pricing Packages")
                  .defaultOrdering([{ field: "sortOrder", direction: "asc" }])
              ),

            // ── AVAILABILITY ─────────────────────────────────────────────────
            S.listItem()
              .title("Availability Alerts")
              .child(
                S.documentTypeList("scarcityCue")
                  .title("Availability Alerts")
              ),

            S.divider(),

            // ── JOURNAL ─────────────────────────────────────────────────────
            S.listItem()
              .title("Journal Posts")
              .child(
                S.documentTypeList("journalPost")
                  .title("Journal Posts")
                  .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
              ),

            S.divider(),

            // ── CITY LANDING PAGES ───────────────────────────────────────────
            S.listItem()
              .title("City Pages")
              .child(
                S.documentTypeList("cityPage")
                  .title("City Landing Pages")
              ),

            S.divider(),

            // ── SINGLETONS ───────────────────────────────────────────────────
            S.listItem()
              .title("About Page")
              .child(
                S.document()
                  .schemaType("aboutPage")
                  .documentId("aboutPage")
                  .title("About Page")
              ),

            S.listItem()
              .title("Site Settings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
                  .title("Site Settings")
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Hide singleton types from the "New Document" menu — Emily shouldn't
    // create additional copies of About Page or Site Settings.
    templates: (prev) =>
      prev.filter((template) => !SINGLETONS.has(template.schemaType)),
  },
});
