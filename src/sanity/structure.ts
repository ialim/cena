import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Home")
        .child(
          S.list()
            .title("Home Content")
            .items([
              S.listItem()
                .title("Home Page")
                .id("homePage")
                .schemaType("homePage")
                .child(
                  S.document().schemaType("homePage").documentId("homePage")
                ),
              S.listItem()
                .title("Services")
                .schemaType("service")
                .child(S.documentTypeList("service").title("Services")),
              S.listItem()
                .title("Testimonials")
                .schemaType("testimonial")
                .child(
                  S.documentTypeList("testimonial").title("Testimonials")
                ),
              S.listItem()
                .title("Team Members")
                .schemaType("teamMember")
                .child(
                  S.documentTypeList("teamMember").title("Team Members")
                ),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Blog")
        .child(
          S.list()
            .title("Blog Content")
            .items(
              S.documentTypeListItems().filter((item) =>
                ["post", "author", "category"].includes(item.getId() || "")
              )
            )
        ),
      S.divider(),
      S.listItem()
        .title("Global")
        .child(
          S.list()
            .title("Global Content")
            .items([
              S.listItem()
                .title("Site Settings")
                .schemaType("siteSettings")
                .child(
                  S.document()
                    .schemaType("siteSettings")
                    .documentId("siteSettings")
                ),
            ])
        ),
    ]);
