import { useState, useEffect, useRef } from 'react';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';

import useSEO from '../hooks/useSEO';

const TVShows = ({ onSelectMovie, allMovies = [], featuredMovie, categories = [], featuredHeroMovies = [] }) => {
    useSEO({
        title: 'TV Shows with Sinhala Subtitles',
        description: 'Download your favorite TV series and shows with Sinhala Subtitles. All episodes and seasons with high quality Sinhala subs on CMoviez.',
        keywords: 'tv shows sinhala sub, sinhala subtitles, download series sinhala sub, sin sub tv series, free downloads, cmoviez tv',
        url: window.location.href,
        type: 'website'
    });

    const allTV = allMovies.filter(m => m._source === 'tvshows' || ((m.type === 'tv' || m.type === 'tvshow') && m._source !== 'anime' && m._source !== 'movies'));
    const standardGenres = [
        '18+', 'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama',
        'Family', 'Fantasy', 'History', 'Horror', 'Mystery', 'Romance', 'Science Fiction',
        'Short', 'Sport', 'Thriller', 'War'
    ];

    const [featuredList, setFeaturedList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const timerRef = useRef(null);

    useEffect(() => {
        if (featuredHeroMovies && featuredHeroMovies.length > 0) {
            setFeaturedList(featuredHeroMovies);
        } else {
            const trendingCategory = categories.find(c => c.id === 'trending' || c.id === 'new-releases');
            let list = trendingCategory ? trendingCategory.movies.slice(0, 7) : [];
            if (list.length === 0 && categories.length > 0) {
                list = categories[0].movies.slice(0, 7);
            }
            if (featuredMovie && !list.find(m => m.id === featuredMovie.id)) {
                list = [featuredMovie, ...list];
            }
            setFeaturedList(list);
        }
    }, [categories, featuredMovie, featuredHeroMovies]);

    const resetTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (featuredList.length > 1) {
            timerRef.current = setInterval(() => {
                setCurrentIndex(prev => (prev + 1) % featuredList.length);
            }, 8000);
        }
    };

    useEffect(() => {
        resetTimer();
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [featuredList.length]);

    const handleDotClick = (index) => {
        setCurrentIndex(index);
        resetTimer();
    };

    const currentHeroMovie = featuredList[currentIndex] || featuredMovie;

    return (
        <div className="page-fade-in">
            <Hero
                movie={currentHeroMovie}
                onSelect={onSelectMovie}
                currentIndex={currentIndex}
                totalItems={featuredList.length}
                onDotClick={handleDotClick}
            />
            <main className="content" style={{ marginTop: '-40px', position: 'relative', zIndex: 10 }}>
                {(() => {
                    let visibleIndex = -1;
                    return standardGenres.map(genre => {
                        const filteredMovies = allTV.filter(m => m.genres && m.genres.some(g => g.toLowerCase().trim() === genre.toLowerCase().trim()));
                        if (filteredMovies.length === 0) return null;
                        visibleIndex++;
                        return (
                            <div key={genre}>
                                <MovieRow
                                    title={`${genre} TV Shows`}
                                    movies={filteredMovies.slice(0, 20)}
                                    onSelect={onSelectMovie}
                                    viewAllLink={`/genre/tv/${genre}`}
                                />

                            </div>
                        );
                    });
                })()}
                {allTV.length > 0 && (
                    <MovieRow
                        title="All TV Shows"
                        movies={allTV.slice(0, 20)}
                        onSelect={onSelectMovie}
                        categoryId="tv-shows"
                    />
                )}
            </main>
        </div>
    );
};

export default TVShows;
