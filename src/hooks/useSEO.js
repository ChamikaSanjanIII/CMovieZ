import { useEffect } from 'react';

/**
 * Custom hook to update SEO meta tags.
 * @param {object} options - SEO options.
 * @param {string} [options.title] - Page title.
 * @param {string} [options.description] - Meta description.
 * @param {string} [options.keywords] - Meta keywords.
 * @param {string} [options.image] - Social media sharing image URL.
 * @param {string} [options.url] - Canonical URL.
 * @param {string} [options.type] - Meta type (e.g., 'website', 'movie').
 * @param {object} [options.structuredData] - JSON-LD structured data.
 */

const useSEO = ({ title, description, keywords, image, url, type = 'website', structuredData }) => {
    useEffect(() => {
        // --- Standard Meta Tags ---
        if (title) {
            document.title = `${title} | CMoviez`;
            const metaTitle = document.querySelector('meta[name="title"]');
            if (metaTitle) metaTitle.setAttribute('content', `${title} | CMoviez`);
        }

        if (description) {
            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
                metaDesc = document.createElement('meta');
                metaDesc.setAttribute('name', 'description');
                document.head.appendChild(metaDesc);
            }
            metaDesc.setAttribute('content', description);
        }

        if (keywords) {
            let metaKeywords = document.querySelector('meta[name="keywords"]');
            if (!metaKeywords) {
                metaKeywords = document.createElement('meta');
                metaKeywords.setAttribute('name', 'keywords');
                document.head.appendChild(metaKeywords);
            }
            metaKeywords.setAttribute('content', keywords);
        }

        // --- Open Graph / Facebook ---
        const setOG = (property, content) => {
            let el = document.querySelector(`meta[property="${property}"]`);
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute('property', property);
                document.head.appendChild(el);
            }
            el.setAttribute('content', content);
        };

        if (title) setOG('og:title', `${title} | CMoviez`);
        if (description) setOG('og:description', description);
        if (type) setOG('og:type', type);
        if (url) setOG('og:url', url);
        if (image) setOG('og:image', image);

        // --- Twitter ---
        const setTwitter = (name, content) => {
            let el = document.querySelector(`meta[name="${name}"]`);
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute('name', name);
                document.head.appendChild(el);
            }
            el.setAttribute('content', content);
        };

        setTwitter('twitter:card', 'summary_large_image');
        if (title) setTwitter('twitter:title', `${title} | CMoviez`);
        if (description) setTwitter('twitter:description', description);
        if (image) setTwitter('twitter:image', image);

        // --- Canonical URL ---
        let linkCanonical = document.querySelector('link[rel="canonical"]');
        if (!linkCanonical) {
            linkCanonical = document.createElement('link');
            linkCanonical.setAttribute('rel', 'canonical');
            document.head.appendChild(linkCanonical);
        }
        if (url) linkCanonical.setAttribute('href', url);

        // --- Structured Data (Schema.org) ---
        let scriptSchema = document.querySelector('script[type="application/ld+json"]#structured-data');
        if (structuredData) {
            if (!scriptSchema) {
                scriptSchema = document.createElement('script');
                scriptSchema.setAttribute('type', 'application/ld+json');
                scriptSchema.setAttribute('id', 'structured-data');
                document.head.appendChild(scriptSchema);
            }
            scriptSchema.textContent = JSON.stringify(structuredData);
        } else if (scriptSchema) {
            // Provide a generic fallback for every page if none specified
            const genericSchema = {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "CMoviez",
                "url": url || window.location.origin
            };
            scriptSchema.textContent = JSON.stringify(genericSchema);
        }

    }, [title, description, keywords, image, url, type, structuredData]);
};

export default useSEO;
