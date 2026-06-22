import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import { getOptimizedImage } from '../utils/imageOptimizer';
import NotFound from './NotFound';

const GenrePage = ({ onSelectMovie, allMovies = [] }) => {
    const { type, genreName } = useParams();
    const typeLabel = type === 'all' ? 'Collection' : type === 'tv' ? 'TV Shows' : type === 'movie' ? 'Genres' : 'Animation';
    useSEO({
        title: `${genreName} ${typeLabel} with Sinhala Subtitles`,
        description: `Download the best ${genreName} ${typeLabel} with Sinhala Subtitles on CMoviez. High quality downloads for all titles.`,
        keywords: `${genreName} ${typeLabel} sinhala subs, ${genreName} sinhala subtitles, download ${genreName} ${typeLabel}`,
        url: window.location.href
    });
    const [visibleCount, setVisibleCount] = useState(24);

    let filtered = [];
    let pageTitle = "";

    if (type === 'movie') {
        filtered = allMovies.filter(m => m.type === 'movie' && !(m.genres && m.genres.some(g => g.toLowerCase().trim() === 'animation')) && m.genres && m.genres.some(g => g.toLowerCase().trim() === genreName.toLowerCase().trim()));
        pageTitle = `${genreName} Genres`;
    } else if (type === 'tv') {
        filtered = allMovies.filter(m => (m.type === 'tv' || m.type === 'tvshow') && m.genres && m.genres.some(g => g.toLowerCase().trim() === genreName.toLowerCase().trim()));
        pageTitle = `${genreName} TV Shows`;
    } else if (type === 'anime') {
        filtered = allMovies.filter(m => m.genres && m.genres.some(g => g.toLowerCase().trim() === 'animation') && m.genres.some(g => g.toLowerCase().trim() === genreName.toLowerCase().trim()));
        pageTitle = `${genreName} Animation`;
    } else if (type === 'all') {
        filtered = allMovies.filter(m => m.genres && m.genres.some(g => g.toLowerCase().trim() === genreName.toLowerCase().trim()));
        pageTitle = `${genreName} Collection`;
    }

    const description = `Explore our collection of ${genreName} ${type === 'movie' ? 'genres' : type === 'tv' ? 'TV shows' : 'animation'}. Handpicked titles for your entertainment.`;

    if (filtered.length === 0) {
        return <NotFound />;
    }

    const visibleItems = filtered.slice(0, visibleCount);

    return (
        <div className="page-fade-in category-page" style={{ paddingTop: '100px', paddingBottom: '90px' }}>
            <div className="category-header" style={{ padding: '0 4%', marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '15px' }} className="cat-page-title">{pageTitle}</h1>
                <p style={{ fontSize: '0.95rem', color: '#ccc', maxWidth: '800px', lineHeight: '1.6' }} className="cat-page-desc">{description}</p>
            </div>

            <main className="content">
                <div className="category-grid-layout">
                    {visibleItems.map(movie => (
                        <div key={movie.id} className="movie-card-container" onClick={() => onSelectMovie(movie)}>
                            <div className="card-top-tags">
                                {movie.language && <span className="tag-lang">{movie.language}</span>}
                                {movie.quality && <span className="tag-quality">{movie.quality}</span>}
                                {movie.format && <span className="tag-format">{movie.format}</span>}
                            </div>
                            <img className="movie-card-img" src={getOptimizedImage(movie.poster, { w: 500, q: 95 })} alt={movie.title} loading="lazy" />
                            <div className="card-bottom-info">
                                <h3 className="card-title">{movie.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {filtered.length > visibleCount && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                        <button
                            className="btn-show-more"
                            onClick={() => setVisibleCount(prev => prev + 24)}
                        >
                            Show More
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default GenrePage;
