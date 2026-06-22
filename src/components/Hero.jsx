import { useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { FiFilm } from 'react-icons/fi';
import { getOptimizedImage } from '../utils/imageOptimizer';

const Hero = ({ movie, onSelect, currentIndex, totalItems, onDotClick }) => {
    if (!movie) return null;

    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    // Minimum swipe distance (in px)
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            const next = (currentIndex + 1) % totalItems;
            onDotClick(next);
        } else if (isRightSwipe) {
            const prev = (currentIndex - 1 + totalItems) % totalItems;
            onDotClick(prev);
        }
    };

    const genresLine = movie.genres ? movie.genres.slice(0, 2).join(' · ') : '';
    const isAnimation = movie.genres?.some(g => g.toLowerCase().includes('animation') || g.toLowerCase() === 'anime') || movie._source === 'anime';
    const isSeries = movie.type === 'tv' || movie.type === 'tvshow' || (movie.seasons && movie.seasons.length > 0);
    const typeLabel = isSeries ? 'Series' : 'Movie';

    return (
        <header 
            className="hero"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <div className="hero-background">
                {movie.backdrop || movie.poster ? (() => {
                    const bgSrc = movie.backdrop || movie.poster;
                    const dsktpUrl = getOptimizedImage(bgSrc, { w: 1280, skipProxy: true });
                    const mblUrl = getOptimizedImage(bgSrc, { w: 500, skipProxy: true });
                    
                    // Specific mobile hero optimization
                    const mobileHeroSrc = movie.mobileHero ? getOptimizedImage(movie.mobileHero, { w: 780, skipProxy: true }) : mblUrl;

                    return (
                        <div className="hero-bg-wrapper">
                            <picture>
                                {movie.mobileHero && (
                                    <source 
                                        media="(max-width: 768px)" 
                                        srcSet={mobileHeroSrc} 
                                    />
                                )}
                                <img
                                    className="hero-bg-img"
                                    src={dsktpUrl}
                                    srcSet={`${mblUrl} 500w, ${dsktpUrl} 1280w`}
                                    sizes="(max-width: 600px) 500px, 1280px"
                                    alt={`${movie.title} Background`}
                                    fetchPriority="high"
                                    key={movie.id || movie.title}
                                />
                            </picture>
                        </div>
                    );
                })() : null}
                <div className="hero-overlay-gradient" />
            </div>

            <div className="hero-container centered">
                <div className="hero-content centered" key={movie.id || movie.title + "-content"}>
                    {movie.logo ? (
                        <div className="hero-logo-container">
                            <h1 style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: '0', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
                                {movie.title}
                            </h1>
                            <img src={movie.logo} alt={movie.title} className="hero-logo" />
                        </div>
                    ) : (
                        <h1 className="hero-title centered">{movie.title}</h1>
                    )}

                    <div className="hero-meta-line">
                        <span className="hero-type-info"><FiFilm className="type-icon" /> {typeLabel}</span>
                        {genresLine && <span className="hero-meta-separator">·</span>}
                        <span className="hero-genres">{genresLine}</span>
                        <span className="hero-meta-separator">·</span>
                        <span className="hero-age-rating">{movie.year || 'N/A'}</span>
                    </div>

                    <div className="hero-description centered" dangerouslySetInnerHTML={{ __html: movie.description }} />

                    <div className="hero-buttons centered">
                        <button className="btn btn-more-info" onClick={() => onSelect(movie)}>
                            <AiOutlineInfoCircle /> More Info
                        </button>
                    </div>

                </div>

                {/* Pagination Dots */}
                {totalItems > 1 && (
                    <div className="hero-pagination">
                        {[...Array(totalItems)].map((_, idx) => (
                            <button
                                key={idx}
                                className={`hero-dot ${idx === currentIndex ? 'active' : ''}`}
                                onClick={() => onDotClick(idx)}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Hero;
