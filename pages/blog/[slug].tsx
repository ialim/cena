import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Layout from "../../components/layout";
import { sanity } from "../../lib/sanity.client";
import {
  blogPostDetailFields,
  siteSettingsQuery,
} from "../../lib/sanity.queries";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  readingTime?: string;
  body?: any;
  coverImage?: string;
  author?: string;
}

interface SiteSettings {
  title?: string;
  heroCopy?: string;
  defaultOgImage?: string;
}

interface BlogPostPageProps {
  post: BlogPost | null;
  settings: SiteSettings | null;
}

const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0]
  ${blogPostDetailFields}
`;

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-GTSuper text-3xl mt-12 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-GTSuper text-2xl mt-10 mb-3">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="my-6 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand-primary pl-6 italic my-8 text-brand-secondary">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-brand-dark">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-brand-primary underline"
        target={value?.href?.startsWith("/") ? "_self" : "_blank"}
        rel="noreferrer"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-8 space-y-2 my-6">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-8 space-y-2 my-6">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-2">{children}</li>,
    number: ({ children }) => <li className="pl-2">{children}</li>,
  },
};

const formatPublishedDate = (date?: string) => {
  if (!date) return "Draft";
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  } catch {
    return date;
  }
};

const BlogPostPage = ({ post, settings }: BlogPostPageProps) => {
  if (!post) {
    return (
      <Layout>
        <div className="bg-brand-section min-h-screen flex items-center justify-center">
          <div className="bg-white rounded-xl p-12 text-center">
            <h2 className="font-GTSuper text-3xl text-brand-dark">
              Post not found
            </h2>
            <p className="mt-4 text-brand-secondary font-BasierCircle">
              The article you are trying to read might have been unpublished.
            </p>
            <Link
              href="/blog"
              className="text-brand-primary font-semibold mt-6 inline-block"
            >
              Back to blog →
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const siteTitle = settings?.title || "Cena Law Blog";
  const description = post.excerpt || settings?.heroCopy || "";
  const ogImage = post.coverImage || settings?.defaultOgImage || "";

  return (
    <Layout>
      <Head>
        <title>
          {post.title} | {siteTitle}
        </title>
        {description && (
          <meta name="description" content={description.slice(0, 155)} />
        )}
        <meta property="og:title" content={`${post.title} | ${siteTitle}`} />
        {description && (
          <meta property="og:description" content={description} />
        )}
        {ogImage && <meta property="og:image" content={ogImage} />}
      </Head>
      <article className="bg-white text-brand-dark">
        <div className="mx-11 lg:mx-48 py-16">
          <p className="text-sm font-BasierCircle text-brand-secondary uppercase tracking-wide">
            {formatPublishedDate(post.publishedAt)}{" "}
            {post.readingTime ? `· ${post.readingTime}` : ""}
          </p>
          <h1 className="font-GTSuper text-5xl font-bold mt-4">{post.title}</h1>
          <p className="mt-4 text-brand-secondary font-BasierCircle text-lg">
            {post.excerpt}
          </p>
          <div className="mt-6 text-sm font-semibold font-BasierCircle text-brand-dark">
            {post.author ? `By ${post.author}` : "Cena Law Editorial Team"}
          </div>
        </div>
        {post.coverImage && (
          <div className="mx-11 lg:mx-48 mb-12">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-96 object-cover rounded-xl"
            />
          </div>
        )}
        <div className="mx-11 lg:mx-48 pb-24 prose prose-lg max-w-none font-BasierCircle text-brand-dark">
          {post.body ? (
            <PortableText
              value={post.body}
              components={portableTextComponents}
            />
          ) : (
            <p className="italic text-brand-secondary">
              Article content will appear here once published.
            </p>
          )}
        </div>
      </article>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs =
    await sanity.fetch<{ slug: string }[]>(`*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`);

  return {
    paths:
      slugs?.map(({ slug }) => ({
        params: { slug },
      })) || [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({
  params,
}) => {
  const slug = params?.slug as string;

  try {
    const [post, settings] = await Promise.all([
      sanity.fetch<BlogPost>(postBySlugQuery, { slug }),
      sanity.fetch<SiteSettings | null>(siteSettingsQuery),
    ]);

    return {
      props: {
        post: post || null,
        settings: settings || null,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching post", error);
    return {
      props: {
        post: null,
        settings: null,
      },
      revalidate: 60,
    };
  }
};

export default BlogPostPage;
