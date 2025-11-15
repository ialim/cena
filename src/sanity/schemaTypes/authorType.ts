import { defineType } from "sanity";

export const authorType = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required().min(3),
    },
    {
      name: "role",
      title: "Role / Title",
      type: "string",
    },
    {
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "bio",
      title: "Short Bio",
      type: "text",
      rows: 3,
    },
    {
      name: "socials",
      title: "Social Profiles",
      type: "array",
      of: [
        {
          type: "object",
          name: "socialLink",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
            },
            {
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.uri().required(),
            },
          ],
        },
      ],
    },
  ],
});
