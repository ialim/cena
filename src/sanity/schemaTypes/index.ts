import { type SchemaTypeDefinition } from "sanity";
import { authorType } from "./authorType";
import { categoryType } from "./categoryType";
import { homePageType } from "./homePageType";
import { postType } from "./postType";
import { serviceType } from "./serviceType";
import { siteSettingsType } from "./siteSettingsType";
import { teamMemberType } from "./teamMemberType";
import { testimonialType } from "./testimonialType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    authorType,
    categoryType,
    postType,
    siteSettingsType,
    serviceType,
    testimonialType,
    teamMemberType,
    homePageType,
  ],
};
