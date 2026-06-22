import { useState, useEffect, useRef } from 'react';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';

import useSEO from '../hooks/useSEO';

const MoviesPage = ({ onSelectMovie, allMovies = [], featuredMovie, categories = [], featuredHeroMovies = [] }) => {
    useSEO({
        title: 'Movies with Sinhala Subtitles',
        description: 'Download hit movies with Sinhala Subtitles for free. Action, Drama, Thriller and all latest movies with Sinhala subs on CMoviez.',
        keywords: 'sinhala sub movies, sinhala subtitles, download movies sinhala sub, movie sin sub, free movie downloads, cmoviez movies',
        url: window.location.href,
        type: 'website'
    });

    const moviesOnly = allMovies.filter(m => m._source === 'movies' || (m.type === 'movie' && m._source !== 'anime' && m._source !== 'tvshows'));
    const standardGenres = [
        '18+', 'Action', 'Adventure', 'Comedy', 'Crime', 'Documentary', 'Drama',
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
                {standardGenres.map((genre, index) => {
                    const filteredMovies = moviesOnly.filter(m => m.genres && m.genres.some(g => g.toLowerCase().trim() === genre.toLowerCase().trim()));
                    if (filteredMovies.length === 0) return null;
                    return (
                        <div key={genre}>
                            <MovieRow
                                title={`${genre} Movies`}
                                movies={filteredMovies.slice(0, 20)}
                                onSelect={onSelectMovie}
                                viewAllLink={`/genre/movie/${genre}`}
                            />

                        </div>
                    );
                })}
                {moviesOnly.length > 0 && (
                    <MovieRow
                        title="All Movies"
                        movies={moviesOnly.slice(0, 20)}
                        onSelect={onSelectMovie}
                        categoryId="movies"
                    />
                )}
            </main>
        </div>
    );
};

export default MoviesPage;
