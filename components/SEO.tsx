import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    canonicalUrl?: string;
    type?: string;
    image?: string;
    structuredData?: Record<string, any> | Array<Record<string, any>>;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords,
    canonicalUrl,
    type = 'website',
    image = 'https://invoicecorehub.com/og-image.png',
    structuredData
}) => {
    const siteTitle = 'InvoiceCore Hub';
    const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
    const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : 'https://invoicecorehub.com');

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}

            {/* Canonical */}
            <link rel="canonical" href={currentUrl} />

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:site_name" content={siteTitle} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Structured Data */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
