import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "heroCopy",
      title: "Blog Hero Copy",
      type: "text",
      rows: 3,
      description: "Shown on the /blog intro section.",
    }),
    defineField({
      name: "defaultOgImage",
      title: "Default OG Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "newsletterCta",
      title: "Newsletter CTA",
      type: "object",
      fields: [
        { name: "heading", title: "Heading", type: "string" },
        { name: "subheading", title: "Subheading", type: "text", rows: 2 },
        { name: "buttonText", title: "Button Text", type: "string" },
      ],
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "email",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        defineField({
          type: "object",
          name: "socialLink",
          fields: [
            { name: "label", title: "Label", type: "string" },
            {
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.uri(),
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});
