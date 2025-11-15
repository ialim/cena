import { type SchemaTypeDefinition } from "sanity";
import { authorType } from "./authorType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { siteSettingsType } from "./siteSettingsType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [authorType, categoryType, postType, siteSettingsType],
};
