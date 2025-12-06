import { Helmet } from "react-helmet-async";

// Organization Schema - Use on all pages
export const OrganizationSchema = () => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Datacare Limited",
        "url": "https://datacare.co.ke",
        "logo": "https://datacare.co.ke/datacare-logo.png",
        "description": "Leading East African provider of AI-powered IT services, Microsoft 365, Google Workspace, cybersecurity, cloud solutions, and web design services.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Westlands Business District, Ring Road Parklands",
          "addressLocality": "Nairobi",
          "addressCountry": "KE"
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+254-784-155-752",
            "contactType": "Customer Service",
            "areaServed": ["KE", "UG", "TZ"],
            "availableLanguage": ["English", "Swahili"]
          }
        ],
        "sameAs": [
          "https://linkedin.com/company/datacare-limited",
          "https://twitter.com/DatacareLimited",
          "https://facebook.com/DatacareLimited"
        ],
        "foundingDate": "2012",
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "value": 50
        },
        "areaServed": {
          "@type": "Place",
          "name": "East Africa"
        }
      })}
    </script>
  </Helmet>
);

// LocalBusiness Schema - Use on homepage and contact page
export const LocalBusinessSchema = () => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Datacare Limited",
        "image": "https://datacare.co.ke/datacare-logo-new.png",
        "url": "https://datacare.co.ke",
        "telephone": "+254-784-155-752",
        "email": "info@datacare.co.ke",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Westlands Business District, Ring Road Parklands",
          "addressLocality": "Nairobi",
          "addressRegion": "Nairobi County",
          "addressCountry": "KE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -1.2639,
          "longitude": 36.8047
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
          ],
          "opens": "08:00",
          "closes": "17:00"
        },
        "priceRange": "$$",
        "servesCuisine": "IT Services"
      })}
    </script>
  </Helmet>
);

// Service Schema - For solution pages
interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  category?: string;
  provider?: string;
}

export const ServiceSchema = ({ name, description, url, category, provider }: ServiceSchemaProps) => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": name,
        "description": description,
        "url": url,
        "provider": {
          "@type": "Organization",
          "name": provider || "Datacare Limited",
          "url": "https://datacare.co.ke"
        },
        "serviceType": category || "IT Services",
        "areaServed": {
          "@type": "Place",
          "name": "East Africa"
        }
      })}
    </script>
  </Helmet>
);

// Product Schema - For product pages
interface ProductSchemaProps {
  name: string;
  description: string;
  url: string;
  image?: string;
  brand?: string;
  offers?: {
    price: string;
    priceCurrency: string;
    availability: string;
  };
}

export const ProductSchema = ({ name, description, url, image, brand, offers }: ProductSchemaProps) => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": name,
        "description": description,
        "url": url,
        "image": image || "https://datacare.co.ke/og-image.png",
        "brand": {
          "@type": "Brand",
          "name": brand || "Datacare Limited"
        },
        ...(offers && {
          "offers": {
            "@type": "Offer",
            "price": offers.price,
            "priceCurrency": offers.priceCurrency,
            "availability": offers.availability,
            "seller": {
              "@type": "Organization",
              "name": "Datacare Limited"
            }
          }
        })
      })}
    </script>
  </Helmet>
);

// FAQ Schema - For pages with FAQs
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export const FAQSchema = ({ faqs }: FAQSchemaProps) => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      })}
    </script>
  </Helmet>
);

// Article Schema - For knowledge base articles
interface ArticleSchemaProps {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  author?: string;
  image?: string;
  keywords?: string[];
}

export const ArticleSchema = ({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  author,
  image,
  keywords
}: ArticleSchemaProps) => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": headline,
        "description": description,
        "url": url,
        "datePublished": datePublished,
        "dateModified": dateModified,
        "author": {
          "@type": "Person",
          "name": author || "Datacare Limited"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Datacare Limited",
          "logo": {
            "@type": "ImageObject",
            "url": "https://datacare.co.ke/datacare-logo.png"
          }
        },
        "image": image || "https://datacare.co.ke/og-image.png",
        ...(keywords && { "keywords": keywords.join(", ") })
      })}
    </script>
  </Helmet>
);

// BreadcrumbList Schema - For navigation breadcrumbs
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url
        }))
      })}
    </script>
  </Helmet>
);

// WebSite Schema - For homepage
export const WebSiteSchema = () => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Datacare Limited",
        "url": "https://datacare.co.ke",
        "description": "Leading East African provider of AI-powered IT services, Microsoft 365, Google Workspace, cybersecurity, cloud solutions, and web design services.",
        "publisher": {
          "@type": "Organization",
          "name": "Datacare Limited"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://datacare.co.ke/resources/knowledge-base?search={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      })}
    </script>
  </Helmet>
);

// ItemList Schema - For listing pages (products, solutions, case studies)
interface ListItem {
  name: string;
  url: string;
  description?: string;
}

interface ItemListSchemaProps {
  items: ListItem[];
  name: string;
}

export const ItemListSchema = ({ items, name }: ItemListSchemaProps) => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": name,
        "numberOfItems": items.length,
        "itemListElement": items.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "url": item.url,
          ...(item.description && { "description": item.description })
        }))
      })}
    </script>
  </Helmet>
);
