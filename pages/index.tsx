import { GetStaticProps } from "next";
import Layout, { LayoutProps } from "../components/layout";
import AbuotUs, { AboutUsProp } from "../components/sections/abuot-us";
import ContactUs, { ContactUsProps } from "../components/sections/contact-us";
import EmbededVideo, {
  EmbeddedVideoProps,
} from "../components/sections/embeded-video";
import FeedBack, { FeedBackProp } from "../components/sections/feed-back";
import { HeroImage, HeroImageProps } from "../components/sections/hero-bg-image";
import Services, { ServicesProp } from "../components/sections/services";
import Team, { TeamProp } from "../components/sections/team";
import { sanity } from "../lib/sanity.client";
import { homePageQuery, siteSettingsQuery } from "../lib/sanity.queries";

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
  socialLinks?: { label?: string; url?: string }[];
}

interface SanityImageWithAlt {
  url?: string;
  alt?: string;
}

interface SanityService {
  title?: string;
  keynotes?: string[];
}

interface SanityTestimonial {
  fullname?: string;
  profession?: string;
  comment?: string;
  rating?: number;
  photo?: string;
}

interface SanityTeamSocial {
  platform?: string;
  url?: string;
}

interface SanityTeamMember {
  fullname?: string;
  role?: string;
  photo?: string;
  socials?: SanityTeamSocial[];
}

interface HomePageData {
  hero?: {
    title?: string;
    tagline?: string;
    backgroundImage?: string;
    ctas?: string[];
  };
  about?: {
    title?: string;
    paragraphs?: string[];
    images?: SanityImageWithAlt[];
  };
  embeddedVideo?: {
    videoUrl?: string;
    poster?: string;
  };
  servicesSection?: {
    title?: string;
    paragraph?: string;
    services?: SanityService[];
  };
  testimonialsSection?: {
    title?: string;
    paragraph?: string;
    testimonials?: SanityTestimonial[];
  };
  teamSection?: {
    title?: string;
    paragraph?: string;
    teamMembers?: SanityTeamMember[];
  };
  contact?: {
    title?: string;
    backgroundImage?: string;
    ctas?: string[];
  };
}

interface HomePageProps {
  homePage: HomePageData | null;
  settings: SiteSettings | null;
}

const DEFAULT_TESTIMONIAL_IMAGE = "/images/Omar_Epps.png";
const DEFAULT_TEAM_IMAGE = "/images/af.png";

const cleanStringArray = (
  values?: (string | null | undefined)[]
): string[] | undefined => {
  if (!values) {
    return undefined;
  }

  const filtered = values
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .filter((value): value is string => Boolean(value));

  return filtered.length ? filtered : undefined;
};

const mapAboutImages = (
  images?: SanityImageWithAlt[]
): AboutUsProp["imgUrls"] | undefined => {
  if (!images) {
    return undefined;
  }

  const sanitized = images
    .filter((image): image is SanityImageWithAlt & { url: string } =>
      Boolean(image?.url)
    )
    .map((image, index) => ({
      name: image.alt || `Gallery image ${index + 1}`,
      imgUrl: image.url,
    }));

  return sanitized.length >= 2 ? sanitized : undefined;
};

const mapServices = (
  services?: SanityService[]
): ServicesProp["services"] | undefined => {
  if (!services) {
    return undefined;
  }

  const sanitized = services
    .filter((service): service is SanityService & { title: string } =>
      Boolean(service?.title)
    )
    .map((service) => ({
      title: service.title,
      keynotes: cleanStringArray(service.keynotes) ?? [],
    }));

  return sanitized.length ? sanitized : undefined;
};

const mapTestimonials = (
  testimonials?: SanityTestimonial[]
): FeedBackProp["feedbacks"] | undefined => {
  if (!testimonials) {
    return undefined;
  }

  const sanitized = testimonials
    .filter(
      (testimonial): testimonial is SanityTestimonial & {
        fullname: string;
        comment: string;
      } => Boolean(testimonial?.fullname && testimonial?.comment)
    )
    .map((testimonial) => ({
      fullname: testimonial.fullname,
      profession: testimonial.profession || "",
      comment: testimonial.comment,
      imageUrl: testimonial.photo || DEFAULT_TESTIMONIAL_IMAGE,
      rating: typeof testimonial.rating === "number" ? testimonial.rating : 5,
    }));

  return sanitized.length ? sanitized : undefined;
};

const mapTeamMembers = (
  teamMembers?: SanityTeamMember[]
): TeamProp["team"] | undefined => {
  if (!teamMembers) {
    return undefined;
  }

  const sanitized = teamMembers
    .filter((member): member is SanityTeamMember & { fullname: string } =>
      Boolean(member?.fullname)
    )
    .map((member) => ({
      fullname: member.fullname,
      role: member.role || "",
      imgUrl: member.photo || DEFAULT_TEAM_IMAGE,
      socials:
        member.socials
          ?.filter(
            (social): social is SanityTeamSocial & {
              platform: string;
              url: string;
            } => Boolean(social?.platform && social?.url)
          )
          .map((social) => ({
            name: social.platform,
            link: social.url,
          })) ?? [],
    }));

  return sanitized.length ? sanitized : undefined;
};

const buildLayoutProps = (
  settings: SiteSettings | null
): Partial<LayoutProps> => {
  if (!settings) {
    return {};
  }

  const layoutProps: Partial<LayoutProps> = {};

  if (settings.title) {
    layoutProps.title = settings.title;
    layoutProps.home = settings.title;
  }

  if (settings.socialLinks?.length) {
    const socials = settings.socialLinks
      .filter(
        (link): link is { label: string; url: string } =>
          Boolean(link?.label && link?.url)
      )
      .map((link) => ({
        name: link.label,
        link: link.url,
      }));

    if (socials.length) {
      layoutProps.socials = socials;
    }
  }

  return layoutProps;
};

export default function Home({ homePage, settings }: HomePageProps) {
  const heroProps: HeroImageProps = {
    title: homePage?.hero?.title,
    tagline: homePage?.hero?.tagline,
    backgroundImage: homePage?.hero?.backgroundImage,
    ctas: cleanStringArray(homePage?.hero?.ctas),
  };

  const aboutProps: AboutUsProp = {
    title: homePage?.about?.title,
    paragraphs: cleanStringArray(homePage?.about?.paragraphs),
    imgUrls: mapAboutImages(homePage?.about?.images),
  };

  const servicesProps: Partial<ServicesProp> = {
    title: homePage?.servicesSection?.title,
    paragraph: homePage?.servicesSection?.paragraph,
    services: mapServices(homePage?.servicesSection?.services),
  };

  const testimonialsProps: Partial<FeedBackProp> = {
    title: homePage?.testimonialsSection?.title,
    paragraph: homePage?.testimonialsSection?.paragraph,
    feedbacks: mapTestimonials(homePage?.testimonialsSection?.testimonials),
  };

  const teamProps: Partial<TeamProp> = {
    title: homePage?.teamSection?.title,
    paragraph: homePage?.teamSection?.paragraph,
    team: mapTeamMembers(homePage?.teamSection?.teamMembers),
  };

  const contactProps: Partial<ContactUsProps> = {
    title: homePage?.contact?.title,
    backgroundImage: homePage?.contact?.backgroundImage,
    ctas: cleanStringArray(homePage?.contact?.ctas),
  };

  const videoProps: Partial<EmbeddedVideoProps> = {
    videoUrl: homePage?.embeddedVideo?.videoUrl,
    posterImage: homePage?.embeddedVideo?.poster,
  };

  const layoutOverrides = buildLayoutProps(settings);

  return (
    <Layout {...layoutOverrides}>
      <HeroImage {...heroProps} />
      <AbuotUs {...aboutProps} />
      <EmbededVideo {...videoProps} />
      <Services {...servicesProps} />
      <FeedBack {...testimonialsProps} />
      <Team {...teamProps} />
      <ContactUs {...contactProps} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<HomePageProps> = async ({
  preview = false,
}) => {
  const fetchOptions = preview
    ? { perspective: "drafts" as const, useCdn: false, stega: true }
    : undefined;

  try {
    const [homePage, settings] = await Promise.all([
      sanity.fetch<HomePageData | null>(homePageQuery, {}, fetchOptions),
      sanity.fetch<SiteSettings | null>(siteSettingsQuery, {}, fetchOptions),
    ]);

    return {
      props: {
        homePage: homePage || null,
        settings: settings || null,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching home page data", error);

    return {
      props: {
        homePage: null,
        settings: null,
      },
      revalidate: 60,
    };
  }
};
