/**
 * Converts a storage URL (like Cloudflare R2 or Backblaze B2) 
 * into a direct download link by adding specific query parameters.
 * 
 * @param {string} url - The original file URL
 * @returns {string|null} - The modified URL with download headers
 */
export const toDirectDownload = (url) => {
    if (!url) return null;
    try {
        const urlObj = new URL(url);
        urlObj.searchParams.set('dl', '1');
        
        // Backblaze Native API parameter
        urlObj.searchParams.set('b2-content-disposition', 'attachment');
        
        // S3-Compatible API parameters (Cloudflare interaction)
        urlObj.searchParams.set('response-content-disposition', 'attachment');
        urlObj.searchParams.set('response-content-type', 'application/octet-stream');
        urlObj.searchParams.set('response-content-language', 'en');
        
        return urlObj.toString();
    } catch (e) {
        // Fallback for non-URL strings or failed parsing
        const base = url.split('?')[0];
        const params = new URLSearchParams(url.split('?')[1] || '');
        params.set('dl', '1');
        params.set('b2-content-disposition', 'attachment');
        params.set('response-content-disposition', 'attachment');
        return `${base}?${params.toString()}`;
    }
};


