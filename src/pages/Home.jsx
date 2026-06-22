import { useState, useEffect, useRef } from 'react';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import TrendingRow from '../components/TrendingRow';

import useSEO from '../hooks/useSEO';

const Home = ({ onSelectMovie, featuredMovie, categories = [], featuredHeroMovies = [], trendingMovies = [] }) => {
    useSEO({
        title: 'Download Movies & TV Shows with Sinhala Subtitles',
        description: 'Download the latest movies, TV shows, and animation with Sinhala Subtitles on CMoviez. High quality direct downloads for free.',
        keywords: 'movies, tv shows, animation, sinhala subtitles, sinhala sub, sinhala sub movies, sin sub, direct download, free movies, download online, cmoviez, cineru, baiscope, sinesub, zoom, pirith sub, new movies sinhala sub',
        url: window.location.href,
        type: 'website'
    });

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
        <>
            <Hero
                movie={currentHeroMovie}
                onSelect={onSelectMovie}
                currentIndex={currentIndex}
                totalItems={featuredList.length}
                onDotClick={handleDotClick}
            />
            <main className="content" style={{ marginTop: '-40px', position: 'relative', zIndex: 10 }}>
                {trendingMovies && trendingMovies.length > 0 && (
                    <TrendingRow
                        title="Trending Today"
                        movies={trendingMovies}
                        onSelect={onSelectMovie}
                    />
                )}
                
                {categories.map((category, index) => (
                    <div key={category.id}>
                        <MovieRow
                            title={category.title}
                            movies={category.movies}
                            isLargeRow={category.id === 'most-downloaded'}
                            onSelect={onSelectMovie}
                            categoryId={category.id}
                            viewAllLink={category.viewAllLink}
                        />

                    </div>
                ))}
            </main>
        </>
    );
};

export default Home;
