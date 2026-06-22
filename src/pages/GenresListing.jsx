import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';

const GenresListing = ({ allMovies }) => {
    useSEO({
        title: 'Genres & Years',
        description: 'Browse movies and TV shows by genre or release year. Action, Drama, Comedy, and more.',
        url: window.location.href
    });

    // Standard genres from the dashboard (19 genres)
    const genres = [
        '18+', 'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama',
        'Family', 'Fantasy', 'History', 'Horror', 'Mystery', 'Romance', 'Science Fiction',
        'Short', 'Sport', 'Thriller', 'War'
    ];

    // Generate list of years from 2026 down to 2000
    const years = Array.from({ length: 27 }, (_, i) => 2026 - i);

    // Mapping for better images - Using high-quality reliable stock images for standard genres
    const getGenreBackdrop = (genre) => {
        const g = genre.toLowerCase().trim();

        const standardMappings = {
            'action': 'https://images.unsplash.com/photo-1542204172-353328909191?auto=format&fit=crop&q=80&w=1080',
            'adventure': 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=1080',
            'animation': 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&q=80&w=1080',
            'comedy': 'https://images.unsplash.com/photo-1517604412707-884962418524?auto=format&fit=crop&q=80&w=1080',
            'crime': 'https://images.unsplash.com/photo-1522252234503-e356532cafd5?auto=format&fit=crop&q=80&w=1080',
            'documentary': 'https://images.unsplash.com/photo-1553484771-047a44eee27b?auto=format&fit=crop&q=80&w=1080',
            'drama': 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=1080',
            'family': 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1080',
            'fantasy': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1080',
            'history': 'https://images.unsplash.com/photo-1461360228754-6e81c478585b?auto=format&fit=crop&q=80&w=1080',
            'horror': 'https://images.unsplash.com/photo-1505633560063-d8247f63626e?auto=format&fit=crop&q=80&w=1080',
            'mystery': 'https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?auto=format&fit=crop&q=80&w=1080',
            'romance': 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&q=80&w=1080',
            'science fiction': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1080',
            'thriller': 'https://images.unsplash.com/photo-1518709766631-a6a7f4593b3f?auto=format&fit=crop&q=80&w=1080',
            'war': 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&q=80&w=1080',
            '18+': 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&q=80&w=1080',
            'sport': 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1080',
            'short': 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1080'
        };

        if (standardMappings[g]) return standardMappings[g];

        // Fallback: Find a movie in this genre that has a backdrop from your collection
        const movieWithBackdrop = allMovies.find(m =>
            m.genres &&
            m.genres.some(tg => tg.toLowerCase().trim() === g) &&
            m.backdrop
        );
        return movieWithBackdrop ? movieWithBackdrop.backdrop : null;
    };

    return (
        <div className="page-fade-in genres-page" style={{ paddingBottom: '90px', minHeight: '80vh' }}>
            {/* Genres Hero */}
            <div className="contact-hero" style={{ backgroundImage: 'none', backgroundColor: '#0f0f0f', height: '50vh' }}>
                <div className="contact-hero-overlay" style={{ background: 'linear-gradient(to bottom, transparent 0%, #0f0f0f 100%)' }}></div>
                <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 5%' }}>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, marginBottom: '15px' }}>
                        Explore by <span>Genre</span>
                    </h1>
                    <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '800px', margin: '0 auto' }}>
                        Browse our entire collection across all categories and release years.
                    </p>
                </div>
            </div>

            {/* Genres Grid */}
            <div className="grids-container">
                <div className="genres-grid">
                    {genres.map(genre => {
                        const backdrop = getGenreBackdrop(genre);
                        return (
                            <Link
                                key={genre}
                                to={`/genre/all/${genre}`}
                                className="genre-card"
                                style={{
                                    backgroundImage: backdrop ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${backdrop})` : 'none',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            >
                                <span>{genre}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Years Hero */}
            <div id="years-section" className="contact-hero" style={{ 
                backgroundImage: 'none', backgroundColor: '#0f0f0f', height: '40vh', 
                marginTop: '80px', marginBottom: '40px' 
            }}>
                <div className="contact-hero-overlay" style={{ background: 'linear-gradient(to bottom, transparent 0%, #0f0f0f 100%)' }}></div>
                <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 5%' }}>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontWeight: 900, marginBottom: '15px' }}>
                        Browse by <span>Year</span>
                    </h1>
                    <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.1rem)', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '800px', margin: '0 auto' }}>
                        Find your favorite titles by their release year from our archive.
                    </p>
                </div>
            </div>

            {/* Years Grid */}
            <div className="grids-container">
                <div className="years-grid">
                    {years.map(year => (
                        <Link
                            key={year}
                            to={`/year/${year}`}
                            className="year-card"
                        >
                            <span>{year}</span>
                        </Link>
                    ))}
                </div>
            </div>

            <style>{`
                .grids-container {
                    padding: 0 4%;
                }
                .genres-grid {
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    gap: 20px;
                }
                .genre-card {
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
                    border: 0.5px solid rgba(255, 255, 255, 0.15);
                    border-radius: 16px;
                    height: 140px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;
                    color: white;
                    font-size: 1.25rem;
                    font-weight: 700;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    text-align: center;
                    padding: 25px;
                    cursor: pointer;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                    backdrop-filter: blur(10px);
                }
                .genre-card:hover {
                    background: linear-gradient(135deg, #e50914 0%, #b20710 100%);
                    transform: translateY(-8px) scale(1.02);
                    border-color: #ff1f1f;
                    box-shadow: 0 15px 30px rgba(229, 9, 20, 0.4);
                }
                .genre-card span {
                    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
                }

                .years-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
                    gap: 20px;
                }
                .year-card {
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
                    border: 0.5px solid rgba(255, 255, 255, 0.15);
                    border-radius: 12px;
                    height: 90px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;
                    color: white;
                    font-size: 1.5rem;
                    font-weight: 700;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    backdrop-filter: blur(10px);
                }
                .year-card:hover {
                    background: #e50914;
                    transform: scale(1.05);
                    border-color: #ff1f1f;
                    box-shadow: 0 10px 20px rgba(229, 9, 20, 0.3);
                }

                @media (max-width: 1100px) {
                    .genres-grid {
                        grid-template-columns: repeat(4, 1fr);
                    }
                }
                @media (max-width: 900px) {
                    .genres-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }
                    .genre-card {
                        height: 120px;
                        font-size: 1.1rem;
                    }
                }
                @media (max-width: 600px) {
                    .genres-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 15px;
                    }
                    .genre-card {
                        height: 110px;
                        font-size: 1rem;
                        padding: 15px;
                    }
                    .year-card {
                        height: 70px;
                        font-size: 1.2rem;
                    }
                    .years-grid {
                        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
                        gap: 10px;
                    }
                    .grids-container {
                        padding: 0 20px !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default GenresListing;
