import { defineType, defineField, defineArrayMember } from "sanity";

/**
 * Journal Post document schema.
 *
 * Emily's blog — session recaps, style tips, announcements, and behind-the-scenes.
 * Each post has a cover image, rich body content, and a category tag.
 */
export const journalPost = defineType({
  name: "journalPost",
  title: "Journal Post",
  type: "document",
  description:
    "A blog post for your journal — session recaps, style tips, announcements, or behind-the-scenes content.",
  fields: [
    defineField({
      name: "title",
      title: "Post Title",
      type: "string",
      description: 'The headline of your post (e.g., "5 Tips for Picking Your Senior Session Outfit")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Path",
      type: "slug",
      description: 'The web address for this post. Click "Generate" to create it from the title.',
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Publish Date",
      type: "date",
      description: "The date this post was published (shown on the post and in search results).",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "What type of post is this?",
      options: {
        list: [
          { title: "Style Tips", value: "style-tips" },
          { title: "Session Recap", value: "session-recap" },
          { title: "Behind the Scenes", value: "behind-the-scenes" },
          { title: "Announcement", value: "announcement" },
          { title: "For Families", value: "for-families" },
          { title: "For Seniors", value: "for-seniors" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Short Summary",
      type: "text",
      rows: 3,
      description:
        "1-2 sentences that appear on the journal listing page and in search previews. Keep it under 160 characters.",
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Photo",
      type: "image",
      description: "The main photo for this post — shown at the top of the post and in listing cards.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Photo Description",
          type: "string",
          description: "Describe what is in this photo (helps with Google search and accessibility).",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Post Content",
      type: "array",
      description: "Write your post here. You can add text, headings, and photos.",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({
          type: "image",
          title: "Photo",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Photo Description",
              type: "string",
            }),
            defineField({
              name: "caption",
              title: "Caption (optional)",
              type: "string",
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1).error("Post content is required"),
    }),
    defineField({
      name: "featured",
      title: "Feature on Journal Homepage?",
      type: "boolean",
      description:
        "Turn on to pin this post at the top of the journal listing page.",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Newest First",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      publishedAt: "publishedAt",
      category: "category",
      media: "coverImage",
    },
    prepare({ title, publishedAt, category, media }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "Unpublished";
      return {
        title: title || "Untitled Post",
        subtitle: `${date} · ${category || "Uncategorized"}`,
        media,
      };
    },
  },
});
