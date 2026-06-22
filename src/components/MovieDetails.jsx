import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineDownload } from 'react-icons/hi';
import { FaFacebookF, FaWhatsapp, FaTelegramPlane, FaLink } from 'react-icons/fa';
import { PiCheckCircleFill } from 'react-icons/pi';
import EpisodesList from './EpisodesList';
import { getOptimizedImage } from '../utils/imageOptimizer';
import DownloadOptions from './DownloadOptions';



const MovieDetails = ({ movie, onDownload }) => {
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate();

    const ShareGroup = ({ isHero = false }) => (
        <div className={`share-section ${isHero ? 'hero-share' : ''}`}>
            {!isHero && <h3 className="share-title">Share with Friends</h3>}
            <div className="share-buttons">
                <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-btn fb"
                    title="Share on Facebook"
                >
                    <FaFacebookF />
                </a>
                <a
                    href={`https://wa.me/?text=${encodeURIComponent(movie.title + ' with Sinhala Subtitles: ' + window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-btn wa"
                    title="Share on WhatsApp"
                >
                    <FaWhatsapp />
                </a>
                <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(movie.title + ' with Sinhala Subtitles')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-btn tg"
                    title="Share on Telegram"
                >
                    <FaTelegramPlane />
                </a>
                <button
                    className={`share-btn copy ${copied ? 'copied' : ''}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(window.location.href);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                    }}
                    title="Copy Link"
                >
                    {copied ? <PiCheckCircleFill style={{ color: '#4BB543' }} /> : <FaLink />}
                    {copied && <span className="copy-tooltip">Copied!</span>}
                </button>
            </div>
        </div>
    );

    if (!movie) return null;

    return (
        <div className="movie-details page-fade-in">

            <header className="details-hero">
                <div className="hero-background">
                    {movie.backdrop || movie.poster ? (() => {
                        const bgSrc = movie.backdrop || movie.poster;
                        const dsktpUrl = getOptimizedImage(bgSrc, { w: 1280, skipProxy: true });
                        const mblUrl = getOptimizedImage(bgSrc, { w: 500, skipProxy: true });
                        return (
                            <img
                                className="hero-bg-img"
                                src={dsktpUrl}
                                srcSet={`${mblUrl} 500w, ${dsktpUrl} 1280w`}
                                sizes="(max-width: 600px) 500px, 1280px"
                                alt={`${movie.title} Background`}
                                fetchPriority="high"
                            />
                        );
                    })() : null}
                </div>
                <div className="hero-overlay-gradient" />

                {/* Mobile Hero Content (Home Slider Style) */}
                <div className="hero-container centered hide-desktop">
                    <div className="hero-content centered" style={{ transform: 'none', animation: 'none' }}>
                        {movie.logo ? (
                            <div className="hero-logo-container" style={{ marginBottom: '15px' }}>
                                <h1 style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: '0', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
                                    {movie.title} with Sinhala Subtitles
                                </h1>
                                <img src={movie.logo} alt={`${movie.title} with Sinhala Subtitles`} className="hero-logo" style={{ maxWidth: '240px' }} />
                            </div>
                        ) : (
                            <h1 className="hero-title centered" style={{ fontSize: '2.2rem', marginBottom: '10px', lineHeight: '1.1' }}>
                                {movie.title}
                            </h1>
                        )}

                        <div className="hero-meta-line" style={{ justifyContent: 'center', marginBottom: '12px', opacity: '0.9', fontSize: '0.85rem' }}>
                            <span className="hero-type-info">
                                {movie.seasons && movie.seasons.length > 0 ? 'Series' : 'Movie'}
                            </span>
                            <span className="hero-meta-separator">·</span>
                            <span className="hero-genres">{movie.genres?.slice(0, 2).join(' · ')}</span>
                            <span className="hero-meta-separator">·</span>
                            <span className="hero-age-rating">{movie.year}</span>
                        </div>
                        <div className="hero-description centered" style={{ marginBottom: '15px' }} dangerouslySetInnerHTML={{ __html: movie.description }} />
                        <div className="hero-buttons" style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '5px', position: 'relative', zIndex: '20' }}>
                            <button
                                className="btn btn-more-info"
                                onClick={() => {
                                    const el = document.getElementById('movie-download-options') || document.querySelector('.episodes-container');
                                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }}
                            >
                                <HiOutlineDownload style={{ fontSize: '1.2rem' }} /> Download
                            </button>
                        </div>
                        <ShareGroup isHero={true} />
                    </div>
                </div>
            </header>

            <div className="details-content">
                <div className="details-grid">
                    <div className="details-left">
                        <div className="mobile-series-poster hide-desktop hide-mobile">
                            <img src={getOptimizedImage(movie.poster, { w: 500, q: 95 })} alt={`${movie.title} with Sinhala Subtitles`} />
                        </div>
                        <h1 className="details-title-desktop hide-mobile">
                            {movie.title} <span className="sinhala-title-badge">with Sinhala Subtitles</span>
                        </h1>
                        <div className="details-meta hide-mobile">
                            <span className="rating">{movie.rating} Rating</span>
                            <span className="details-year">{movie.year}</span>
                            <span className="badge">
                                {movie.seasons && movie.seasons.length > 0 ? 'TV Series' : 'Movie'}
                            </span>
                            {movie.language && <span className="badge lang">{movie.language}</span>}
                        </div>

                        <div className="details-tags-row hide-mobile">
                            {movie.quality && <span className="tag-quality">{movie.quality}</span>}
                            {movie.format && <span className="tag-format">{movie.format}</span>}
                        </div>

                        {/* Share Buttons Section (Desktop) */}
                        <div className="hide-mobile" style={{ marginTop: '-10px', marginBottom: '20px' }}>
                            <ShareGroup />
                        </div>



                        <div className="description-container">
                            <h2 className="more-details-title hide-desktop" style={{ marginBottom: '15px' }}>Description</h2>
                            <div className="details-desc" dangerouslySetInnerHTML={{ __html: movie.description }} />
                        </div>



                        <div className="details-action-buttons">
                            {movie.isUpcoming && (
                                <button className="btn btn-list" style={{ opacity: 0.7, cursor: 'not-allowed' }}>
                                    Coming Soon
                                </button>
                            )}
                        </div>




                    </div>

                    <div className="details-right hide-mobile">
                        <div className="details-poster-card">
                            <img src={getOptimizedImage(movie.poster, { w: 500, q: 95 })} alt={`${movie.title} Sinhala Subtitles`} />
                        </div>
                    </div>
                </div>



                {movie.seasons && movie.seasons.length > 0 && (
                    <div className="episodes-preview-section" style={{ marginTop: '20px' }}>
                        <EpisodesList
                            seasons={movie.seasons}
                            seriesImage={movie.backdrop || movie.poster}
                            posterImage={movie.poster}
                            onDownload={() => onDownload(movie)}
                            seriesId={movie.docId}
                            seriesType={movie.type}
                            seriesSlug={movie.slug}
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
                                <span className="detail-value">{movie.watchOffline || "Available to download"}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Genres</span>
                                <span className="detail-value">
                                    {movie.genres ? movie.genres.map((genre, index) => (
                                        <span key={genre}>
                                            <Link
                                                to={`/genre/all/${genre.trim()}`}
                                                style={{ color: '#fff', textDecoration: 'none' }}
                                            >
                                                {genre.trim()}
                                            </Link>
                                            {index < movie.genres.length - 1 ? ', ' : ''}
                                        </span>
                                    )) : 'N/A'}
                                </span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">This show is...</span>
                                <span className="detail-value" dangerouslySetInnerHTML={{ __html: movie.thisShowIs ? movie.thisShowIs.join(', ') : 'Exciting, Suspenseful' }} />
                            </div>
                            {movie.title === "Squid Game" && (
                                <div className="detail-item">
                                    <span className="detail-label">About Squid Game</span>
                                    <span className="detail-value">Go behind the scenes and learn more on <a href="#" style={{ color: '#fff', textDecoration: 'underline' }}>Tudum.com</a></span>
                                </div>
                            )}
                        </div>

                        <div className="more-details-column">

                            <div className="detail-item">
                                <span className="detail-label">Audio</span>
                                <span className="detail-value">{movie.audio ? movie.audio.join(', ') : 'English [Original]'}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Subtitles</span>
                                <span className="detail-value">{movie.subtitles && movie.subtitles.length > 0 ? movie.subtitles.join(', ') : 'Sinhala'}</span>
                            </div>
                        </div>

                        {/* 3rd Column: CAST BOX */}
                        {movie.cast && movie.cast !== 'N/A' && (
                            <div className="more-details-column">
                                <div className="detail-item">
                                    <span className="detail-label">Cast & Crew</span>
                                    <span className="detail-value" dangerouslySetInnerHTML={{ __html: (Array.isArray(movie.cast) ? movie.cast.join(', ') : movie.cast) }} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>





                {!movie.isUpcoming && (!movie.seasons || movie.seasons.length === 0) && (
                    <div id="movie-download-options" style={{
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        paddingTop: '30px',
                        marginTop: '30px',
                        marginBottom: '30px'
                    }}>
                        <DownloadOptions
                            title={movie.title}
                            poster={movie.poster}
                            id={movie.docId || movie.id}
                            type="movies"
                            links={{
                                downloadUrl: movie.downloadUrl,
                            }}
                            download_links={movie.download_links}
                            onDownload={onDownload}
                        />
                    </div>
                )}


                {movie.seasons && movie.seasons.length > 0 && (
                    <div style={{ marginTop: '40px' }}>
                        <EpisodesList
                            seasons={movie.seasons}
                            seriesImage={movie.backdrop || movie.poster}
                            posterImage={movie.poster}
                            onDownload={() => onDownload(movie)}
                            seriesId={movie.docId}
                            seriesType={movie.type}
                            seriesSlug={movie.slug}
                            showOnly="list"
                        />
                    </div>
                )}
            </div>
        </div >
    );
};

export default MovieDetails;

