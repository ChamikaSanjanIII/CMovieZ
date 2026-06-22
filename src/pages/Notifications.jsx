import { useState, useEffect } from 'react';
import useSEO from '../hooks/useSEO';
import { getOptimizedImage } from '../utils/imageOptimizer';
import { PiBellLight } from 'react-icons/pi';
import { HiOutlineDownload } from 'react-icons/hi';

const Notifications = ({ onSelectMovie, allMovies = [] }) => {
    useSEO({
        title: 'Notifications - New Releases | CMoviez',
        description: 'Check out the latest movies and series added to CMoviez with Sinhala Subtitles.',
        url: window.location.href
    });

    const [recentMovies, setRecentMovies] = useState([]);

    useEffect(() => {
        // Sort by createdAt descending and take the top 30
        const sorted = [...allMovies].sort((a, b) => {
            const timeA = (a.createdAt?.seconds || 0) + (a.createdAt?.nanoseconds || 0) / 1e9;
            const timeB = (b.createdAt?.seconds || 0) + (b.createdAt?.nanoseconds || 0) / 1e9;
            return timeB - timeA;
        }).slice(0, 10);
        setRecentMovies(sorted);
    }, [allMovies]);

    return (
        <div className="page-fade-in notifications-page" style={{ paddingBottom: '90px', minHeight: '100vh' }}>
            <div className="contact-hero" style={{ backgroundImage: 'none', backgroundColor: '#0f0f0f', height: '50vh' }}>
                <div className="contact-hero-overlay" style={{ background: 'linear-gradient(to bottom, transparent 0%, #0f0f0f 100%)' }}></div>
                <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 5%' }}>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, marginBottom: '15px' }}>
                        Latest <span>Updates</span>
                    </h1>
                    <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '800px', margin: '0 auto' }}>
                        Stay updated with the newest movies, TV series, and animation collections added daily with Sinhala Subtitles.
                    </p>
                </div>
            </div>

            <main className="content" style={{ padding: '0 5%', marginTop: '40px' }}>
                <div className="notifications-grid">
                    {recentMovies.length > 0 ? (
                        recentMovies.map((movie, index) => (
                            <div
                                key={movie.id}
                                className="notification-card"
                                onClick={() => onSelectMovie(movie)}
                                style={{
                                    display: 'flex',
                                    gap: '20px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    padding: '15px',
                                    borderRadius: '16px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <div className="notification-img-wrapper" style={{
                                    flex: '0 0 150px',
                                    height: '220px',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                                }}>
                                    <img
                                        src={getOptimizedImage(movie.poster || movie.backdrop, { w: 200, q: 90 })}
                                        alt={movie.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>

                                <div className="notification-details" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: '5px' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--cmoviez-red)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '5px', letterSpacing: '1px' }}>
                                        {movie._source === 'tvshows' ? 'New Series Update' : movie._source === 'anime' ? 'New Animation Added' : 'New Movie Release'}
                                    </div>
                                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: '#fff' }}>{movie.title}</h2>
                                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                        <span style={{ fontSize: '0.8rem', color: '#888' }}>{movie.year}</span>
                                        <span style={{ fontSize: '0.8rem', color: '#888' }}>•</span>
                                        <span style={{ fontSize: '0.8rem', color: '#888' }}>{movie.genres?.slice(0, 2).join(', ')}</span>
                                    </div>
                                    <div style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        color: '#fff',
                                        fontSize: '0.9rem',
                                        fontWeight: 600
                                    }}>
                                        <HiOutlineDownload style={{ fontSize: '1.1rem' }} /> Download Now
                                    </div>
                                </div>

                                {index < 5 && (
                                    <div className="new-badge" style={{
                                        position: 'absolute',
                                        top: '15px',
                                        right: '15px',
                                        background: 'var(--cmoviez-red)',
                                        color: '#fff',
                                        fontSize: '0.65rem',
                                        fontWeight: 900,
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        textTransform: 'uppercase'
                                    }}>
                                        New
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div style={{ textAlign: 'center', padding: '100px 0' }}>
                            <p style={{ color: '#888' }}>Checking for new updates...</p>
                        </div>
                    )}
                </div>
            </main>

            <style>{`
                .notifications-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 25px;
                }
                .notification-card:hover {
                    background: rgba(255, 255, 255, 0.08) !important;
                    border-color: rgba(229, 9, 20, 0.3) !important;
                }
                @media (max-width: 1024px) {
                    .notifications-grid {
                        grid-template-columns: 1fr;
                        gap: 5px !important;
                    }
                }
                @media (max-width: 600px) {
                    .notifications-page {
                        padding-top: 90px !important;
                    }
                    .category-header {
                        margin-bottom: 50px !important;
                        padding: 0 10px !important;
                    }
                    .content {
                        padding: 0 10px !important;
                    }
                    .category-header h1 {
                        font-size: 1.8rem !important;
                        margin-bottom: 5px !important;
                    }
                    .category-header p {
                        font-size: 0.85rem !important;
                        line-height: 1.5 !important;
                        margin-bottom: 20px !important;
                    }
                    .notification-card {
                        gap: 25px !important;
                        padding: 15px !important;
                        border-radius: 12px !important;
                        margin-bottom: 10px !important;
                    }
                    .notification-img-wrapper {
                        flex: 0 0 85px !important;
                        height: 120px !important;
                    }
                    .notification-card h2 {
                        font-size: 1.05rem !important;
                        margin-bottom: 5px !important;
                    }
                    .new-badge {
                        top: 12px !important;
                        right: 12px !important;
                        font-size: 0.55rem !important;
                        padding: 3px 6px !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Notifications;
