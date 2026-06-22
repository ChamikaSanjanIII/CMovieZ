/**
 * Optimizes an image URL and converts it to WebP using a free, high-performance image proxy (wsrv.nl).
 * @param {string} url - The original image URL (TMDB or otherwise).
 * @param {object} [options] - Options for optimization.
 * @param {number} [options.w] - Target width.
 * @param {number} [options.h] - Target height.
 * @param {number} [options.q] - Quality (0-100), default 80.
 * @param {string} [options.fit] - Fit mode ('cover', 'contain', etc.), default 'cover'.
 * @param {boolean} [options.isPoster] - If it's a poster, use specific TMDB sizes if possible first.
 * @returns {string} - The optimized image URL.
 */
export const getOptimizedImage = (url, options = {}) => {
    if (!url) return '';

    // 🚀 SVG or Local Assets (logo, etc.) - Return as-is to prevent blurry/missing images
    const lowerUrl = url.toLowerCase();
    const isSvg = lowerUrl.endsWith('.svg') || lowerUrl.includes('logo');
    const isLocalPath = url.startsWith('/') && !url.startsWith('/t/p/') && (isSvg || lowerUrl.includes('assets') || lowerUrl.includes('site-logo'));

    if (isLocalPath) {
        // If it's a TMDB relative path, we handle it below. 
        // If it's your own local file (/logo.svg, /assets/...), return it now.
        if (url.startsWith('/') && !url.includes('/t/p/')) {
            // Add a cache buster (v1.0) to ensure the LATEST file is loaded after hosting
            return `${url}?v=1.0.1`;
        }
    }

    if (isSvg) return url; // Catch-all for other SVG URLs

    let { w, h, q = 95, fit = 'cover', skipProxy = false } = options;

    // Determine the best TMDB source size based on requested width
    let tmdbSize = 'w500'; // Default
    if (w) {
        if (w <= 200) tmdbSize = 'w154';
        else if (w <= 350) tmdbSize = 'w342';
        else if (w <= 550) tmdbSize = 'w500';
        else if (w <= 850) tmdbSize = 'w780';
        else tmdbSize = 'w1280';
    } else {
        tmdbSize = 'w1280'; 
    }

    let fullUrl = url;

    // 1. Handle TMDB relative paths
    if (url.startsWith('/')) {
        if (url.startsWith('/t/p/')) {
            // Already a partial TMDB path, just ensure the size is right
            fullUrl = `https://image.tmdb.org${url.replace(/\/t\/p\/[^/]+\//, `/t/p/${tmdbSize}/`)}`;
        } else {
            fullUrl = `https://image.tmdb.org/t/p/${tmdbSize}${url}`;
        }
    } 
    // 2. Handle full TMDB URLs - optimize the source size before proxying
    else if (url.includes('image.tmdb.org/t/p/')) {
        fullUrl = url.replace(/\/t\/p\/[^/]+\//, `/t/p/${tmdbSize}/`);
    }

    return fullUrl;
};


