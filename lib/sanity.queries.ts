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

export const homePageQuery = `
  *[_type == "homePage"][0]{
    hero{
      title,
      tagline,
      ctas,
      "backgroundImage": backgroundImage.asset->url
    },
    about{
      title,
      paragraphs,
      "images": images[]{
        "url": asset->url,
        "alt": coalesce(alt, "")
      }
    },
    embeddedVideo{
      videoUrl,
      "poster": poster.asset->url
    },
    servicesSection{
      title,
      paragraph,
      services[]->{
        title,
        description,
        keynotes
      }
    },
    testimonialsSection{
      title,
      paragraph,
      testimonials[]->{
        fullname,
        profession,
        comment,
        rating,
        "photo": photo.asset->url
      }
    },
    teamSection{
      title,
      paragraph,
      teamMembers[]->{
        fullname,
        role,
        "photo": photo.asset->url,
        socials[]{
          platform,
          url
        }
      }
    },
    contact{
      title,
      ctas,
      "backgroundImage": backgroundImage.asset->url
    }
  }
`;
