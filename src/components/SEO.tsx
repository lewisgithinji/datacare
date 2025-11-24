import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
}

const SEO = ({
  title = "Datacare Limited - AI-Integrated IT Services & Solutions",
  description = "Leading East African provider of AI-powered IT services, Microsoft 365, Google Workspace, cybersecurity, cloud solutions, and web design services.",
  keywords = "IT services Kenya, AI solutions, Microsoft 365 Kenya, Google Workspace, cybersecurity Kenya, cloud solutions, web design Kenya, managed IT services",
  image = "https://datacare.co.ke/datacare-logo-new.png",
  url = "https://datacare.co.ke",
  type = "website",
  author = "Datacare Limited",
  publishedTime,
  modifiedTime,
  section,
}: SEOProps) => {
  const fullTitle = title.includes("Datacare") ? title : `${title} | Datacare Limited`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Datacare Limited" />
      <meta property="og:locale" content="en_KE" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@DatacareLimited" />

      {/* Article specific (for blog posts, case studies) */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {section && <meta property="article:section" content={section} />}
    </Helmet>
  );
};

export default SEO;
