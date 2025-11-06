import { Metadata } from 'next'
import { seoConfig } from '@/lib/seo-config'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
}

export function generateSEOMetadata({
  title = seoConfig.title,
  description = seoConfig.description,
  keywords = seoConfig.keywords,
  image = seoConfig.openGraph.images[0].url,
  url = seoConfig.siteUrl
}: SEOProps = {}): Metadata {
  const fullTitle = title === seoConfig.title ? title : `${title} | ${seoConfig.siteName}`

  return {
    title: fullTitle,
    description,
    keywords,
    authors: [{ name: seoConfig.siteName }],
    robots: seoConfig.robots,
    verification: {
      google: seoConfig.googleSiteVerification
    },
    openGraph: {
      type: 'website',
      locale: seoConfig.locale,
      url,
      siteName: seoConfig.siteName,
      title: fullTitle,
      description,
      images: [{
        url: image,
        width: 1200,
        height: 630,
        alt: fullTitle
      }]
    },
    twitter: {
      card: 'summary_large_image',
      site: seoConfig.twitter.site,
      creator: seoConfig.twitter.handle,
      title: fullTitle,
      description,
      images: [image]
    },
    alternates: {
      canonical: url
    }
  }
}