import { defineArrayMember, defineField, defineType } from "sanity";

const socialOptions = [
  { title: "Facebook", value: "facebook" },
  { title: "Instagram", value: "instagram" },
  { title: "Twitter / X", value: "twitter" },
];

export const homePageType = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "about", title: "About" },
    { name: "video", title: "Embedded Video" },
    { name: "services", title: "Services" },
    { name: "testimonials", title: "Testimonials" },
    { name: "team", title: "Team" },
    { name: "contact", title: "Contact" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "tagline",
          title: "Tagline",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "backgroundImage",
          title: "Background Image",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "ctas",
          title: "Call to actions",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
      ],
    }),
    defineField({
      name: "about",
      title: "About Section",
      type: "object",
      group: "about",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "paragraphs",
          title: "Paragraphs",
          type: "array",
          of: [defineArrayMember({ type: "text" })],
        }),
        defineField({
          name: "images",
          title: "Gallery Images",
          type: "array",
          of: [
            defineArrayMember({
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  title: "Alt Text",
                  type: "string",
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "embeddedVideo",
      title: "Embedded Video",
      type: "object",
      group: "video",
      fields: [
        defineField({
          name: "videoUrl",
          title: "Video URL",
          type: "url",
        }),
        defineField({
          name: "poster",
          title: "Poster Image",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: "servicesSection",
      title: "Services Section",
      type: "object",
      group: "services",
      fields: [
        defineField({
          name: "title",
          title: "Section Title",
          type: "string",
        }),
        defineField({
          name: "paragraph",
          title: "Intro Paragraph",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "services",
          title: "Services",
          type: "array",
          of: [
            defineArrayMember({
              type: "reference",
              to: [{ type: "service" }],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "testimonialsSection",
      title: "Testimonials Section",
      type: "object",
      group: "testimonials",
      fields: [
        defineField({
          name: "title",
          title: "Section Title",
          type: "string",
        }),
        defineField({
          name: "paragraph",
          title: "Intro Paragraph",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "testimonials",
          title: "Testimonials",
          type: "array",
          of: [
            defineArrayMember({
              type: "reference",
              to: [{ type: "testimonial" }],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "teamSection",
      title: "Team Section",
      type: "object",
      group: "team",
      fields: [
        defineField({
          name: "title",
          title: "Section Title",
          type: "string",
        }),
        defineField({
          name: "paragraph",
          title: "Intro Paragraph",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "teamMembers",
          title: "Team Members",
          type: "array",
          of: [
            defineArrayMember({
              type: "reference",
              to: [{ type: "teamMember" }],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "contact",
      title: "Contact Section",
      type: "object",
      group: "contact",
      fields: [
        defineField({
          name: "title",
          title: "Section Title",
          type: "string",
        }),
        defineField({
          name: "backgroundImage",
          title: "Background Image",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "ctas",
          title: "CTA Buttons",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Home Page",
      };
    },
  },
});
