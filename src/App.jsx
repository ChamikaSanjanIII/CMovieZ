import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop';
import AdBlockDetector from './components/AdBlockDetector';
import AppContent from './pages/AppContent';
import { client, databases, DATABASE_ID, COLLECTIONS } from './appwrite';
import { Query } from './appwrite';

import './index.css';

const TMDB_API_KEY = '40b557990477e6f677364ac110f530e7';

// --- Utility Functions ---

const formatData = (item) => {
    const data = { ...item };
    const ensureArray = (val) => {
        if (!val) return [];
        if (Array.isArray(val)) return val.map(String);
        if (typeof val === 'string') {
            if (val.trim().startsWith('[') && val.trim().endsWith(']')) {
                try { return JSON.parse(val).map(String); } catch (e) { }
            }
            return val.split(',').map(s => s.trim()).filter(Boolean);
        }
        return [String(val)];
    };
    data.genres = ensureArray(data.genres || data.genre).map(g => {
        const trimmed = g.trim();
        const lower = trimmed.toLowerCase();
        if (lower === 'sci-fi' || lower === 'sci fi') return 'Science Fiction';
        return trimmed;
    });
    data.cast = ensureArray(data.cast);
    data.audio = ensureArray(data.audio);
    data.subtitles = ensureArray(data.subtitles);
    data.thisShowIs = ensureArray(data.thisShowIs);
    data.downloadUrl = data.downloadUrl || data.videoUrl || '';
    data.poster = data.poster || data.posterUrl || data.image || '';
    data.backdrop = data.backdrop || data.backdropUrl || data.banner || data.poster || '';
    
    // Parse seasons from JSON string if needed
    if (typeof data.seasons === 'string' && data.seasons) {
        try { data.seasons = JSON.parse(data.seasons); } catch (e) { data.seasons = null; }
    }
    // Parse episodes from JSON string if needed
    if (typeof data.episodes === 'string' && data.episodes) {
        try { data.episodes = JSON.parse(data.episodes); } catch (e) { data.episodes = null; }
    }
    
    if (data.episodes && !data.seasons) {
        const episodes = Array.isArray(data.episodes) ? data.episodes : [];
        const seasonsMap = {};
        episodes.forEach(ep => {
            const sNum = Number(ep.season) || 1;
            if (!seasonsMap[sNum]) seasonsMap[sNum] = { number: sNum, episodes: [] };
            seasonsMap[sNum].episodes.push({
                id: ep.id || `${sNum}-${ep.episode}`,
                title: ep.title || `Episode ${ep.episode}`,
                description: ep.description || '',
                duration: ep.duration || '',
                downloadUrl: ep.downloadUrl || ep.videoUrl || ep.url || ep.link || ep.src || '',
                downloadUrl480p: ep.downloadUrl480p || '',
                downloadUrl720p: ep.downloadUrl720p || '',
                downloadUrl1080p: ep.downloadUrl1080p || '',
                thumbnail: ep.thumbnail || data.backdrop || data.poster
            });
        });
        data.seasons = Object.values(seasonsMap).sort((a, b) => a.number - b.number);
    }
    return data;
};

// Helper: Convert Appwrite document to our format
const docToItem = (doc, colName) => {
    const { $id, $collectionId, $databaseId, $createdAt, $updatedAt, $permissions, ...rawData } = doc;
    return formatData({
        ...rawData,
        docId: $id,
        id: rawData.id || $id,
        slug: rawData.slug || rawData.id || $id,
        isUpcoming: colName === 'upcoming',
        _source: colName,
        // Convert Appwrite ISO date to seconds-based format for compatibility
        createdAt: rawData.createdAt ? { seconds: Math.floor(new Date(rawData.createdAt).getTime() / 1000) } : 
                   $createdAt ? { seconds: Math.floor(new Date($createdAt).getTime() / 1000) } : null
    });
};

// --- App Component ---

function App() {
    const [moviesData, setMoviesData] = useState([]);
    const [tvShowsData, setTvShowsData] = useState([]);
    const [animeData, setAnimeData] = useState([]);
    const [upcomingData, setUpcomingData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [featuredMovie, setFeaturedMovie] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        setLoading(true);
        console.log("Setting up data sync with Appwrite...");

        const collections = [
            { name: 'movies', setter: setMoviesData },
            { name: 'tvshows', setter: setTvShowsData },
            { name: 'anime', setter: setAnimeData },
            { name: 'upcoming', setter: setUpcomingData }
        ];

        const loadedCollections = new Set();

        const fetchCollection = async (colName, setter) => {
            try {
                // Fetch documents - Appwrite max 100 per request, so we paginate
                let allDocs = [];
                let offset = 0;
                const batchSize = 100;
                let hasMore = true;

                while (hasMore) {
                    const response = await databases.listDocuments(
                        DATABASE_ID,
                        COLLECTIONS[colName],
                        [
                            Query.orderDesc('$createdAt'),
                            Query.limit(batchSize),
                            Query.offset(offset)
                        ]
                    );
                    allDocs = [...allDocs, ...response.documents];
                    offset += batchSize;
                    hasMore = response.documents.length === batchSize;
                }

                const items = allDocs.map(doc => docToItem(doc, colName));
                setter(items);
                
                loadedCollections.add(colName);
                if (loadedCollections.size >= collections.length) {
                    setTimeout(() => setLoading(false), 1000);
                }
            } catch (error) {
                console.error(`Error fetching ${colName}:`, error);
                loadedCollections.add(colName);
                if (loadedCollections.size >= collections.length) {
                    setLoading(false);
                }
            }
        };

        // Fetch all collections
        collections.forEach(({ name, setter }) => fetchCollection(name, setter));

        // Set up Appwrite Realtime subscriptions for live updates
        const unsubscribes = [];
        try {
            Object.entries(COLLECTIONS).forEach(([colName, colId]) => {
                const channel = `databases.${DATABASE_ID}.collections.${colId}.documents`;
                const unsubscribe = client.subscribe(channel, (response) => {
                    const events = response.events || [];
                    const doc = response.payload;

                    const setter = colName === 'movies' ? setMoviesData :
                        colName === 'tvshows' ? setTvShowsData :
                            colName === 'upcoming' ? setUpcomingData : setAnimeData;

                    if (events.some(e => e.includes('.create'))) {
                        const item = docToItem(doc, colName);
                        setter(prev => {
                            if (prev.some(m => m.id === item.id)) return prev;
                            return [item, ...prev];
                        });
                    } else if (events.some(e => e.includes('.update'))) {
                        const item = docToItem(doc, colName);
                        setter(prev => prev.map(m => m.docId === item.docId ? item : m));
                    } else if (events.some(e => e.includes('.delete'))) {
                        setter(prev => prev.filter(m => m.docId !== doc.$id));
                    }
                });
                unsubscribes.push(unsubscribe);
            });
        } catch (err) {
            console.error("Realtime subscription error:", err);
        }

        // Safety timeout: If site hasn't loaded in 6 seconds, force-disable loading screen
        const safetyTimeout = setTimeout(() => {
            if (loading) {
                console.log("Loading taking too long, forcing site to render...");
                setLoading(false);
            }
        }, 6000);

        return () => {
            unsubscribes.forEach(unsub => {
                if (typeof unsub === 'function') unsub();
            });
            clearTimeout(safetyTimeout);
        };
    }, []);

    // Safety: ensure we don't have duplicates or undefined IDs
    const allMovies = Array.from(
        new Map(
            [...moviesData, ...tvShowsData, ...animeData]
                .filter(m => m && m.id)
                .map(m => [String(m.id), m])
        ).values()
    ).sort((a, b) => {
        const timeA = a.createdAt?.seconds || 0;
        const timeB = b.createdAt?.seconds || 0;
        return timeB - timeA;
    });

    const recentlyAdded = [...allMovies].sort((a, b) => {
        const timeA = (a.createdAt?.seconds || 0) + (a.createdAt?.nanoseconds || 0) / 1e9;
        const timeB = (b.createdAt?.seconds || 0) + (b.createdAt?.nanoseconds || 0) / 1e9;
        return timeB - timeA;
    }).slice(0, 20);

    const homeCategories = [
        { id: 'recently-added', title: 'Recently Added', movies: recentlyAdded },
        { id: 'movies', title: 'Movies', movies: [...moviesData].sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)).slice(0, 20), viewAllLink: '/movies' },
        { id: 'tv-shows', title: 'TV Shows', movies: [...tvShowsData].sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)).slice(0, 20), viewAllLink: '/tv-shows' },
        { id: 'anime', title: 'Animation', movies: [...animeData].sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)).slice(0, 20), viewAllLink: '/anime' }
    ];

    const homeFeatured = allMovies.filter(m => m.isFeaturedHome === true);
    const moviesFeatured = allMovies.filter(m => m.isFeaturedMovies === true);
    const tvFeatured = allMovies.filter(m => m.isFeaturedTV === true);
    const animeFeatured = allMovies.filter(m => m.isFeaturedAnime === true);
    const trendingMovies = allMovies
        .filter(m => m.isTrending === true && m.trendingRank >= 1 && m.trendingRank <= 10)
        .sort((a, b) => (a.trendingRank || 99) - (b.trendingRank || 99));
    
    // Fallback for Hero slider (backward compatibility or main hero)
    const featuredHeroMovies = homeFeatured.length > 0 ? homeFeatured : allMovies.filter(m => m.isFeatured === true);

    useEffect(() => {
        if (!featuredMovie && allMovies.length > 0) {
            // Priority to featured movies
            if (featuredHeroMovies.length > 0) {
                setFeaturedMovie(featuredHeroMovies[0]);
            } else {
                setFeaturedMovie(allMovies[Math.floor(Math.random() * allMovies.length)]);
            }
        }
    }, [allMovies, featuredMovie, featuredHeroMovies]);

    const handleDownload = async (movie) => {
        if (!movie || !movie.docId) return;
        try {
            // Determine collection name from type
            let colName = movie._source || 'movies';
            const t = (movie.type || '').toLowerCase();
            if (!movie._source) {
                if (t === 'tv' || t === 'tvshow' || t === 'tvshows') colName = 'tvshows';
                else if (t === 'anime' || (movie.genres && movie.genres.some(g => g.toLowerCase() === 'anime' || g.toLowerCase().includes('animation')))) colName = 'anime';
            }

            // Appwrite doesn't have increment() - read current value and increment
            // const currentDoc = await databases.getDocument(DATABASE_ID, COLLECTIONS[colName], movie.docId);
            // const currentCount = Number(currentDoc.downloadCount) || 0;
            // await databases.updateDocument(DATABASE_ID, COLLECTIONS[colName], movie.docId, {
            //     downloadCount: currentCount + 1
            // });
            // console.log(`Incremented download count for ${movie.title} in ${colName}`);
        } catch (error) {
            // console.error("Error incrementing download count:", error);
        }
    };

    const handleSelectMovie = (movie, navigate) => {
        if (navigate && movie && (movie.slug || movie.id)) {
            let slug = String(movie.slug || movie.id);
            // Ensure the internal link also uses the SEO suffix so Google Bot sees consistency
            if (!slug.includes('-sinhala-sub') && !slug.includes('-with-sinhala-subtitles')) {
                slug = `${slug}-with-sinhala-subtitles`;
            }
            navigate(`/watch/${slug}`);
            window.scrollTo(0, 0);
        }
    };

    const handleSearch = async (queryTerm, isManualTrigger = false) => {
        setSearchQuery(queryTerm);

        // If query is too short, clear results
        if (!queryTerm || queryTerm.length < 2) {
            setSearchResults([]);
            return;
        }

        // ONLY proceed if manual trigger (Enter or Icon click)
        if (!isManualTrigger) return;

        console.log(`Manual search triggered for: "${queryTerm}"`);
        const term = queryTerm.toLowerCase();

        // 1. Local Filter
        const categorized = [
            { id: 'movies', title: 'Movies', movies: moviesData.filter(m => (m.title && m.title.toLowerCase().includes(term)) || (m.genres && m.genres.some(g => g.toLowerCase().includes(term)))) },
            { id: 'tv-shows', title: 'TV Shows', movies: tvShowsData.filter(m => (m.title && m.title.toLowerCase().includes(term)) || (m.genres && m.genres.some(g => g.toLowerCase().includes(term)))) },
            { id: 'anime', title: 'Animation', movies: animeData.filter(m => (m.title && m.title.toLowerCase().includes(term)) || (m.genres && m.genres.some(g => g.toLowerCase().includes(term)))) }
        ].filter(cat => cat.movies.length > 0);

        setSearchResults(categorized);

        // 2. Server-side Search via Appwrite
        try {
            const collectionNames = ['movies', 'tvshows', 'anime'];
            const searchPromises = collectionNames.map(async colName => {
                try {
                    const response = await databases.listDocuments(
                        DATABASE_ID,
                        COLLECTIONS[colName],
                        [
                            Query.search('title', queryTerm),
                            Query.limit(40)
                        ]
                    );
                    return response.documents.map(doc => docToItem(doc, colName));
                } catch (error) {
                    // Fallback: If full-text search not available, try contains
                    try {
                        const response = await databases.listDocuments(
                            DATABASE_ID,
                            COLLECTIONS[colName],
                            [
                                Query.contains('title', [queryTerm]),
                                Query.limit(40)
                            ]
                        );
                        return response.documents.map(doc => docToItem(doc, colName));
                    } catch (err2) {
                        console.error(`Search error for ${colName}:`, err2);
                        return [];
                    }
                }
            });

            const results = await Promise.all(searchPromises);
            const allFound = results.flat();

            if (allFound.length > 0) {
                setMoviesData(prev => [...new Map([...prev, ...allFound].map(m => [m.id, m])).values()]);
                
                setSearchResults(prev => {
                    const getCombined = (typeId, serverItems) => {
                        const local = (prev.find(c => c.id === typeId)?.movies || []);
                        const server = serverItems.filter(m => {
                            if (typeId === 'anime') return m._source === 'anime';
                            if (typeId === 'tv-shows') return m._source === 'tvshows';
                            if (typeId === 'movies') return m._source === 'movies';
                            return false;
                        });
                        const combined = [...local, ...server];
                        return Array.from(new Map(combined.map(m => [m.id, m])).values());
                    };

                    const newResults = [
                        { id: 'movies', title: 'Movies', movies: getCombined('movies', allFound) },
                        { id: 'tv-shows', title: 'TV Shows', movies: getCombined('tv-shows', allFound) },
                        { id: 'anime', title: 'Animation', movies: getCombined('anime', allFound) }
                    ].filter(cat => cat.movies.length > 0);
                    
                    return newResults;
                });
            }
        } catch (err) {
            console.error("Search error:", err);
        }
    };

    return (
        <Router>
            <ScrollToTop />
            <AdBlockDetector />
            <AppContent
                handleSelectMovie={handleSelectMovie}
                searchQuery={searchQuery}
                handleSearch={handleSearch}
                searchResults={searchResults}
                featuredMovie={featuredMovie}
                homeCategories={homeCategories}
                featuredHeroMovies={featuredHeroMovies}
                moviesFeatured={moviesFeatured}
                tvFeatured={tvFeatured}
                animeFeatured={animeFeatured}
                trendingMovies={trendingMovies}
                allMovies={allMovies}
                upcomingData={upcomingData}
                loading={loading}
                onDownload={handleDownload}
            />
        </Router>
    );
}

export default App;
