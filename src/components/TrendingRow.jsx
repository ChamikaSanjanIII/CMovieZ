import { useRef, memo, useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { getOptimizedImage } from '../utils/imageOptimizer';

/**
 * @param {{ 
 *   title: string, 
 *   movies: any[], 
 *   onSelect: (movie: any) => void 
 * }} props 
 */
const TrendingRow = memo(({ title, movies, onSelect }) => {
    const rowRef = useRef(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);

    const updateScrollButtons = () => {
        if (rowRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
            setShowLeft(scrollLeft > 5);
            setShowRight(scrollLeft + clientWidth < scrollWidth - 5);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            updateScrollButtons();
        }, 100);
        
        window.addEventListener('resize', updateScrollButtons);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', updateScrollButtons);
        };
    }, [movies]);

    const handleScroll = (direction) => {
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    if (!movies || movies.length === 0) return null;

    return (
        <div className="row trending-row-wrapper">
            <div className="row-header">
                <h2 className="row-title">{title}</h2>
            </div>
            
            <div className={`row-posters-wrapper group ${showLeft ? 'has-left-gradient' : ''} ${showRight ? 'has-right-gradient' : ''}`}>
                {showLeft && (
                    <button className="handle handleLeft" onClick={() => handleScroll('left')}>
                        <IoIosArrowBack />
                    </button>
                )}

                <div className="row-posters trending-posters" ref={rowRef} onScroll={updateScrollButtons}>
                    {movies.slice(0, 10).map((movie, index) => (
                        <div
                            key={movie.id}
                            className="movie-card-container trending-card-container"
                            onClick={() => onSelect(movie)}
                        >
                            <div className="trending-rank-number">
                                {index + 1}
                            </div>
                            
                            <div className="card-top-tags">
                                {movie.language && <span className="tag-lang">{movie.language}</span>}
                                {movie.quality && <span className="tag-quality">{movie.quality}</span>}
                                {movie.format && <span className="tag-format">{movie.format}</span>}
                            </div>

                            <img
                                className="movie-card-img"
                                src={getOptimizedImage(movie.poster, { w: 400, q: 95 })}
                                alt={`${movie.title} Sinhala Subtitles`}
                                loading="lazy"
                            />

                            <div className="card-bottom-info">
                                <h3 className="card-title">{movie.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {showRight && (
                    <button className="handle handleRight" onClick={() => handleScroll('right')}>
                        <IoIosArrowForward />
                    </button>
                )}
            </div>
        </div>
    );
});

export default TrendingRow;
