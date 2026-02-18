import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "businessName",
      title: "Business Name",
      type: "string",
      description: "Must match Google Business Profile exactly",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Brand Tagline",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      description: "Format: (434) XXX-XXXX -- must match GBP exactly",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "address",
      title: "Business Address",
      type: "object",
      fields: [
        defineField({ name: "street", type: "string", title: "Street" }),
        defineField({ name: "city", type: "string", title: "City" }),
        defineField({ name: "state", type: "string", title: "State" }),
        defineField({ name: "zip", type: "string", title: "ZIP Code" }),
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "object",
      fields: [
        defineField({ name: "instagram", type: "url", title: "Instagram" }),
        defineField({ name: "facebook", type: "url", title: "Facebook" }),
        defineField({ name: "tiktok", type: "url", title: "TikTok" }),
      ],
    }),
  ],
});
