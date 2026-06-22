// =====================================================================
// CMoviez - D1 Database Client (Drop-in Appwrite Replacement)
// =====================================================================

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'https://cmoviez.com/api';
// Fallback if env variable isn't set
const BASE_URL = API_ENDPOINT.endsWith('/') ? API_ENDPOINT.slice(0, -1) : API_ENDPOINT;

// Keep original variables for compatibility
export const DATABASE_ID = 'd1-db'; 
export const COLLECTIONS = {
    movies: 'movies',
    tvshows: 'tvshows',
    anime: 'anime',
    upcoming: 'upcoming'
};

// ── Query Builder (Mock Appwrite Query) ──────────────────────────────
export const Query = {
    limit: (val) => `limit=${val}`,
    offset: (val) => `offset=${val}`,
    orderDesc: (field) => `orderBy=${field.replace('$', '')}&orderDir=DESC`,
    orderAsc: (field) => `orderBy=${field.replace('$', '')}&orderDir=ASC`,
    search: (field, term) => `searchField=${field}&search=${encodeURIComponent(term)}`,
    contains: (field, terms) => `searchField=${field}&search=${encodeURIComponent(terms[0])}`
};

function parseQueries(queries = []) {
    if (!queries || queries.length === 0) return '';
    return '?' + queries.join('&');
}

// ── Databases Service ────────────────────────────────────────────────
export const databases = {
    async listDocuments(dbId, collectionId, queries = []) {
        const url = `${BASE_URL}/collections/${collectionId}/documents${parseQueries(queries)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
        return await res.json();
    },
    
    async getDocument(dbId, collectionId, docId) {
        const url = `${BASE_URL}/collections/${collectionId}/documents/${docId}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
        return await res.json();
    },

    // film frontend doesn't use these, but adding for completeness
    async updateDocument() { throw new Error('Not implemented for frontend'); },
    async createDocument() { throw new Error('Not implemented for frontend'); },
    async deleteDocument() { throw new Error('Not implemented for frontend'); }
};

// ── Client (Mock Realtime) ───────────────────────────────────────────
export const client = {
    subscribe: (channel, callback) => {
        console.log(`[D1 Client] Mock subscribe to ${channel}`);
        // No realtime in D1 yet, returning mock unsubscribe
        return () => console.log(`[D1 Client] Mock unsubscribe from ${channel}`);
    }
};
