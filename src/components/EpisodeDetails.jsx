import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineDownload } from 'react-icons/hi';
import { getOptimizedImage } from '../utils/imageOptimizer';
import EpisodesList from './EpisodesList';
import DownloadOptions from './DownloadOptions';



const EpisodeDetails = ({ series, episode, seasonNum, episodeNum, onDownload }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            document.documentElement.style.setProperty('--scroll-offset', `${scrolled}px`);
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [series]);

    if (!series || !episode) return null;

    const displayTitle = `${series.title} - S${seasonNum} E${episodeNum}`;
    const displayImage = episode.thumbnail || series.backdrop || series.poster;

    return (
        <div className="movie-details page-fade-in">
            <header className="details-hero">
                <div className="hero-background">
                    {(() => {
                        const dsktpUrl = getOptimizedImage(displayImage, { w: 1280, skipProxy: true });
                        const mblUrl = getOptimizedImage(displayImage, { w: 500, skipProxy: true });
                        return (
                            <img
                                className="hero-bg-img"
                                src={dsktpUrl}
                                srcSet={`${mblUrl} 500w, ${dsktpUrl} 1280w`}
                                sizes="(max-width: 600px) 500px, 1280px"
                                alt={`${series.title} Background`}
                                fetchPriority="high"
                            />
                        );
                    })()}
                </div>
                <div className="hero-overlay-gradient" />

                {/* Mobile Hero Content (Home Slider Style) */}
                <div className="hero-container centered hide-desktop">
                    <div className="hero-content centered" style={{ transform: 'none', animation: 'none' }}>
                        {series.logo ? (
                            <div className="hero-logo-container" style={{ marginBottom: '15px' }}>
                                <h1 style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: '0', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
                                    {series.title} - S{seasonNum} E{episodeNum} with Sinhala Subtitles
                                </h1>
                                <img src={series.logo} alt={series.title} className="hero-logo" style={{ maxWidth: '240px' }} />
                            </div>
                        ) : (
                            <h1 className="hero-title centered" style={{ fontSize: '1.8rem', marginBottom: '10px', lineHeight: '1.1' }}>
                                {series.title} <span style={{ display: 'block', fontSize: '1.1rem', opacity: '0.8', marginTop: '5px' }}>S{seasonNum} E{episodeNum}</span>
                            </h1>
                        )}
                        
                        <div className="hero-meta-line" style={{ justifyContent: 'center', marginBottom: '12px', opacity: '0.9', fontSize: '0.85rem' }}>
                            <span className="hero-type-info">Episode Details</span>
                            <span className="hero-meta-separator">·</span>
                            <span className="hero-genres">Season {seasonNum} · Episode {episodeNum}</span>
                            <span className="hero-meta-separator">·</span>
                            <span className="hero-age-rating">{series.year}</span>
                        </div>
                        <div className="hero-description centered" style={{ marginBottom: '15px' }} dangerouslySetInnerHTML={{ __html: episode.description || series.description }} />
                        <div className="hero-buttons" style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '5px', position: 'relative', zIndex: '20' }}>
                            <button
                                className="btn btn-more-info"
                                onClick={() => {
                                    const el = document.getElementById('episode-download-options');
                                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }}
                            >
                                <HiOutlineDownload style={{ fontSize: '1.2rem' }} /> Download
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="details-content">
                <div className="details-grid">
                    <div className="details-left">
                        <div className="mobile-series-poster hide-desktop hide-mobile">
                            <img src={getOptimizedImage(series.poster, { w: 500, q: 95 })} alt={displayTitle} />
                        </div>
                        <h1 className="details-title-desktop hide-mobile">{displayTitle}</h1>
                        <h2 className="hide-mobile" style={{ fontSize: '1.4rem', color: '#e5e5e5', marginBottom: '15px' }}>{episode.title}</h2>

                        <div className="details-meta hide-mobile">
                            <span className="rating">{series.rating} Rating</span>
                            <span className="details-year">{series.year}</span>
                            <span className="badge">Season {seasonNum}</span>
                            <span className="badge">Episode {episodeNum}</span>
                        </div>

                        <div className="description-container">
                            <h2 className="more-details-title hide-desktop" style={{ marginBottom: '15px' }}>Episode Description</h2>
                            <div className="details-desc" dangerouslySetInnerHTML={{ __html: episode.description || series.description }} />
                        </div>
                    </div>

                    <div className="details-right hide-mobile">
                        <div className="details-poster-card">
                            <img src={getOptimizedImage(series.poster, { w: 500, q: 95 })} alt={series.title} />
                        </div>
                    </div>
                </div>

                {series.seasons && series.seasons.length > 0 && (
                    <div className="episodes-preview-section" style={{ marginTop: '20px' }}>
                        <EpisodesList
                            seasons={series.seasons}
                            seriesImage={series.backdrop || series.poster}
                            posterImage={series.poster}
                            onDownload={() => onDownload(series)}
                            seriesId={series.docId}
                            seriesType={series.type}
                            seriesSlug={series.slug}
                            initialSeason={seasonNum}
                            activeEpisodeId={episode.id}
                            showOnly="preview"
                        />
                    </div>
                )}

                <div className="more-details-section">
                    <h2 className="more-details-title">More Details</h2>
                    <div className="more-details-grid">
                        <div className="more-details-column">
                            <div className="detail-item">
                                <span className="detail-label">Watch offline</span>
                                <span className="detail-value">Available to download</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Genres</span>
                                <span className="detail-value">{series.genres?.join(', ')}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Audio</span>
                                <span className="detail-value">{series.language || series.audio?.join(', ') || 'English'}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Subtitles</span>
                                <span className="detail-value">{series.subtitles && series.subtitles.length > 0 ? series.subtitles.join(', ') : 'Sinhala'}</span>
                            </div>
                        </div>



                        <div className="more-details-column">

                            <div className="detail-item">
                                <span className="detail-label">Series Info</span>
                                <span className="detail-value">Title: {series.title}</span>
                                <span className="detail-value">Year: {series.year}</span>
                                <span className="detail-value">Rating: {series.rating}</span>
                                <span className="detail-value">Seasons: {series.seasons?.length}</span>
                            </div>
                        </div>
                        
                        {/* 3rd Column: CAST BOX */}
                        {series.cast && series.cast !== 'N/A' && (
                            <div className="more-details-column">
                                <div className="detail-item">
                                    <span className="detail-label">Cast & Crew</span>
                                    <span className="detail-value" dangerouslySetInnerHTML={{ __html: (Array.isArray(series.cast) ? series.cast.join(', ') : series.cast) }} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>



                <div id="episode-download-options" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '30px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '40px' }}>
                    <DownloadOptions 
                        title={`${series.title} - S${seasonNum} E${episodeNum}`}
                        poster={series.poster}
                        id={series.docId || series.id}
                        type="tvshows"
                        links={{
                            downloadUrl: episode.downloadUrl,
                        }}
                        download_links={episode.download_links}
                        subtitles={episode.subtitles || series.subtitles}
                        onDownload={onDownload}
                    />
                </div>

                {series.seasons && series.seasons.length > 0 && (
                    <div style={{ marginTop: '40px' }}>
                        <EpisodesList
                            seasons={series.seasons}
                            seriesImage={series.backdrop || series.poster}
                            posterImage={series.poster}
                            onDownload={() => onDownload(series)}
                            seriesId={series.docId}
                            seriesType={series.type}
                            seriesSlug={series.slug}
                            initialSeason={seasonNum}
                            activeEpisodeId={episode.id}
                            showOnly="list"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default EpisodeDetails;
