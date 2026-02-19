import { defineType, defineField } from "sanity";

/**
 * Pricing tier document schema.
 *
 * Each pricing tier represents a photography package with a "Starting At" price,
 * description, and list of included items. Emily can mark one package as
 * featured to give it a gold border highlight.
 */
export const pricingTier = defineType({
  name: "pricingTier",
  title: "Pricing Package",
  type: "document",
  description:
    "A photography package with pricing details. Each package shows a starting price and what's included.",
  fields: [
    defineField({
      name: "name",
      title: "Package Name",
      type: "string",
      description:
        'The name visitors see (e.g., "Senior Portrait Session" or "Family Mini Session")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "startingAt",
      title: "Starting At Price",
      type: "number",
      description:
        'The lowest price for this package -- shown as "Starting At $X" on the website',
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      description:
        "A brief summary of what this package includes (2-3 sentences)",
    }),
    defineField({
      name: "features",
      title: "What's Included",
      type: "array",
      description:
        'Add each item that\'s included in this package (e.g., "1 hour session", "20 edited digital photos")',
      of: [{ type: "string" }],
    }),
    defineField({
      name: "highlight",
      title: "Featured Package?",
      type: "boolean",
      description:
        "Turn this on to make this package stand out with a gold border",
      initialValue: false,
    }),
    defineField({
      name: "sortOrder",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first on the page",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      name: "name",
      startingAt: "startingAt",
    },
    prepare({ name, startingAt }) {
      return {
        title: name || "Untitled Package",
        subtitle: startingAt ? `$${startingAt} starting` : "No price set",
      };
    },
  },
});
