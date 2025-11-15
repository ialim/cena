export const blogPostFields = `
  {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    readingTime,
    "coverImage": coverImage.asset->url,
    "author": author->name
  }
`;

export const blogPostDetailFields = `
  {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    readingTime,
    body,
    "coverImage": coverImage.asset->url,
    "author": author->name
  }
`;

export const blogPostsQuery = `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0...12]
  ${blogPostFields}
`;

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0]{
    title,
    tagline,
    heroCopy,
    contactEmail,
    newsletterCta,
    socialLinks,
    "defaultOgImage": defaultOgImage.asset->url
  }
`;
