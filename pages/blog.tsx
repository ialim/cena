import Link from "next/link";
import { GetStaticProps } from "next";
import Layout from "../components/layout";
import { sanity } from "../lib/sanity.client";
import { blogPostsQuery, siteSettingsQuery } from "../lib/sanity.queries";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  author?: string;
  readingTime?: string;
  coverImage?: string;
  publishedAt?: string;
}

interface SiteSettings {
  title?: string;
  tagline?: string;
  heroCopy?: string;
  contactEmail?: string;
  newsletterCta?: {
    heading?: string;
    subheading?: string;
    buttonText?: string;
  };
  socialLinks?: { label: string; url: string }[];
}

interface BlogPageProps {
  posts: BlogPost[];
  settings: SiteSettings | null;
}

const formatPublishedDate = (date?: string) => {
  if (!date) return "Draft";
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(new Date(date));
  } catch {
    return date;
  }
};

const BlogPage = ({ posts, settings }: BlogPageProps) => {
  const hasPosts = posts && posts.length > 0;
  const heroEyebrow = settings?.tagline || "Insights & Resources";
  const heroTitle = settings?.title || "Immigration Law Blog";
  const heroCopy =
    settings?.heroCopy ||
    "Actionable explainers, policy updates, and success stories from the Cena Law team. Subscribe to stay informed before policy changes affect your plans.";

  return (
    <Layout>
      <section className="bg-white text-brand-dark">
        <div className="mx-11 lg:mx-48 py-24">
          <p className="uppercase text-sm font-BasierCircle tracking-widest text-brand-secondary">
            {heroEyebrow}
          </p>
          <h1 className="font-GTSuper font-bold text-5xl mt-4">{heroTitle}</h1>
          <p className="font-BasierCircle text-lg text-brand-secondary mt-6 max-w-3xl">
            {heroCopy}
          </p>
        </div>
      </section>
      <section className="bg-brand-section min-h-screen">
        <div className="mx-11 lg:mx-48 py-16">
          {hasPosts ? (
            <div className="grid gap-10 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post._id}
                  className="bg-white rounded-xl shadow-md flex flex-col overflow-hidden"
                >
                  <div className="h-56 bg-brand-dark">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white font-BasierCircle text-xs tracking-wide uppercase">
                        Image coming soon
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <p className="text-xs font-semibold text-brand-primary tracking-wide uppercase">
                      {formatPublishedDate(post.publishedAt)}{" "}
                      {post.readingTime ? `· ${post.readingTime}` : ""}
                    </p>
                    <h2 className="mt-4 font-GTSuper text-2xl font-bold leading-tight">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-4 text-brand-secondary font-BasierCircle flex-1">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-8 flex items-center justify-between">
                      <span className="text-sm font-semibold font-BasierCircle text-brand-dark">
                        {post.author || "Cena Law Editorial Team"}
                      </span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-brand-primary font-semibold font-BasierCircle text-sm"
                      >
                        Read article →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-12 text-center">
              <h3 className="font-GTSuper text-3xl text-brand-dark">
                Blog posts coming soon
              </h3>
              <p className="mt-4 text-brand-secondary font-BasierCircle">
                Connect your Sanity dataset and publish your first article to
                see it here automatically.
              </p>
            </div>
          )}
        </div>
      </section>
      {settings?.newsletterCta && (
        <section className="bg-white">
          <div className="mx-11 lg:mx-48 py-16 flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="font-GTSuper text-3xl text-brand-dark">
                {settings.newsletterCta.heading}
              </h3>
              <p className="mt-4 text-brand-secondary font-BasierCircle max-w-2xl">
                {settings.newsletterCta.subheading}
              </p>
            </div>
            <button className="mt-6 lg:mt-0 bg-brand-primary text-white px-6 py-3 font-BasierCircle font-semibold rounded-md">
              {settings.newsletterCta.buttonText || "Subscribe"}
            </button>
          </div>
        </section>
      )}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<BlogPageProps> = async ({
  preview = false,
}) => {
  const fetchOptions = preview
    ? { perspective: "drafts" as const, useCdn: false, stega: true }
    : undefined;

  try {
    const [posts, settings] = await Promise.all([
      sanity.fetch<BlogPost[]>(blogPostsQuery, {}, fetchOptions),
      sanity.fetch<SiteSettings | null>(siteSettingsQuery, {}, fetchOptions),
    ]);

    return {
      props: {
        posts: posts || [],
        settings: settings || null,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching blog posts", error);
    return {
      props: {
        posts: [],
        settings: null,
      },
      revalidate: 60,
    };
  }
};

export default BlogPage;
