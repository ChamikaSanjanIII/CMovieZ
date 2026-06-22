import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MdChevronLeft, MdChevronRight, MdExpandMore, MdExpandLess } from 'react-icons/md';
import { HiOutlineDownload } from 'react-icons/hi';

import { toDirectDownload } from '../utils/downloadHelper';

const triggerDownload = (url) => {
    if (!url) return;
    const a = document.createElement('a');
    a.href = url;
    a.download = '';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};

/**
 * EpisodesList component for displaying seasons and episodes of a series.
 * @param {object} props - Component props.
 * @param {Array} props.seasons - List of seasons.
 * @param {string} props.seriesImage - Backdrop or placeholder image for the series.
 * @param {string} props.posterImage - Poster image for the series.
 * @param {function} props.onDownload - Handle download clicks.
 * @param {string} props.seriesId - Document ID or unique identifier for the series.
 * @param {string} props.seriesType - Type ('tv', 'anime', etc.).
 * @param {string} props.seriesSlug - URL slug for the series.
 * @param {number|string} [props.initialSeason] - The season to show initially.
 * @param {string} [props.activeEpisodeId] - The ID of the currently playing/active episode.
 */
const EpisodesList = ({ seasons, seriesImage, posterImage, onDownload, seriesId, seriesType, seriesSlug, initialSeason, activeEpisodeId, showOnly }) => {
    const navigate = useNavigate();
    const [activeSeason, setActiveSeason] = useState(() => {
        if (initialSeason !== undefined && initialSeason !== null) {
            return Number(initialSeason);
        }
        return seasons[0]?.number ?? 1;
    });
    const [expandedEpisode, setExpandedEpisode] = useState(null);
    const [isDescExpanded, setIsDescExpanded] = useState(false);
    const [isSeasonDropdownOpen, setIsSeasonDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const scrollRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsSeasonDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSeasonChange = (seasonNum) => {
        setActiveSeason(seasonNum);
        setIsSeasonDropdownOpen(false);
        if (setExpandedEpisode) setExpandedEpisode(null);
        if (setIsDescExpanded) setIsDescExpanded(false);
    };

    const SeasonSelector = () => (
        <div className="custom-season-select-container" ref={dropdownRef}>
            <button 
                className="custom-season-trigger"
                onClick={() => setIsSeasonDropdownOpen(!isSeasonDropdownOpen)}
                aria-label="Select Season"
            >
                <div className="trigger-arrows">
                    <MdExpandLess className={`arrow-up ${isSeasonDropdownOpen ? 'active' : ''}`} />
                    <MdExpandMore className={`arrow-down ${isSeasonDropdownOpen ? '' : 'active'}`} />
                </div>
            </button>
            {isSeasonDropdownOpen && (
                <div className="custom-season-dropdown">
                    {seasons.map(s => (
                        <div 
                            key={s.number} 
                            className={`custom-season-option ${s.number === activeSeason ? 'selected' : ''}`}
                            onClick={() => handleSeasonChange(s.number)}
                        >
                            Season {s.number}
                            {s.episodes && <span className="ep-count">{s.episodes.length} Episodes</span>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    useEffect(() => {
        if (initialSeason !== undefined && initialSeason !== null) {
            setActiveSeason(Number(initialSeason));
        }
    }, [initialSeason]);

    const currentSeason = seasons.find(s => s.number === activeSeason);

    const handleEpisodeClick = (episode, index) => {
        const epNum = episode.episode || index + 1;
        const slug = seriesSlug || seriesId;
        navigate(`/watch/${slug}/season/${activeSeason}/episode/${epNum}`);
        window.scrollTo(0, 0);
    };

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (current) {
            const scrollAmount = 320;
            current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const getEpImage = (episode) => episode.thumbnail || seriesImage;

    return (
        <div className="episodes-container">
            {/* Preview Cards */}
            {(!showOnly || showOnly === 'preview') && (
                <div className="episodes-preview-section" style={{ marginTop: '-50px', position: 'relative', marginBottom: '40px' }}>
                    <div className="episodes-header" style={{ border: 'none', padding: '0', marginBottom: '0' }}>
                        <div className="episodes-header-left" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '0px' }}>Season {activeSeason} Previews</h2>
                            {seasons.length > 1 && <SeasonSelector />}
                        </div>
                    </div>

                    <div className="episodes-scroll-wrapper" style={{ position: 'relative' }}>
                        <button className="scroll-arrow left" onClick={() => scroll('left')}>
                            <MdChevronLeft />
                        </button>

                        <div className="episodes-scroll-container" ref={scrollRef}>
                            <div className="episodes-grid-style">
                                {currentSeason?.episodes.map((episode, index) => {
                                    const baseSlug = String(seriesSlug || seriesId || '');
                                    const finalSlug = (baseSlug.includes('-sinhala-sub') || baseSlug.includes('-with-sinhala-subtitles')) ? baseSlug : `${baseSlug}-with-sinhala-subtitles`;
                                    const epNum = episode.episode || index + 1;
                                    const epUrl = `/watch/${finalSlug}/season/${activeSeason}/episode/${epNum}`;

                                    return (
                                        <Link
                                            key={`preview-${episode.id}`}
                                            to={epUrl}
                                            className="episode-card-new"
                                            style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
                                            onClick={() => window.scrollTo(0, 0)}
                                        >
                                            <div className="ep-card-thumb-container">
                                                <img src={getEpImage(episode)} alt={episode.title} className="ep-thumb-img" />
                                            </div>
                                            <div className="ep-card-info">
                                                <div className="ep-card-title-prefix">Episode {index + 1} • {episode.duration}</div>
                                                <h3 className="ep-card-title">{episode.title}</h3>
                                                <div className="ep-card-desc" dangerouslySetInnerHTML={{ __html: episode.description }} />
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        <button className="scroll-arrow right" onClick={() => scroll('right')}>
                            <MdChevronRight />
                        </button>
                    </div>
                </div>
            )}

            {/* Header + Season Selector + Episode List */}
            {(!showOnly || showOnly === 'list') && (
                <>
                    <div className="episodes-header" style={{ borderTop: showOnly ? 'none' : '1px solid rgba(255,255,255,0.1)', paddingTop: showOnly ? '0' : '40px' }}>
                        <div className="episodes-header-left" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <h2>Season {activeSeason} Episodes</h2>
                            {seasons.length > 1 && <SeasonSelector />}
                        </div>
                    </div>

                    <div className="episodes-list">
                        {currentSeason?.episodes.map((episode, index) => {
                            const baseSlug = String(seriesSlug || seriesId || '');
                            const finalSlug = (baseSlug.includes('-sinhala-sub') || baseSlug.includes('-with-sinhala-subtitles')) ? baseSlug : `${baseSlug}-with-sinhala-subtitles`;
                            const epNum = episode.episode || index + 1;
                            const epUrl = `/watch/${finalSlug}/season/${activeSeason}/episode/${epNum}`;

                            const isExpanded = expandedEpisode === episode.id;
                            const cleanDesc = (episode.description || '').replace(/<[^>]*>/g, '');
                            const isLongDesc = cleanDesc.length > 220;
                            const displayDesc = isLongDesc && !isDescExpanded
                                ? cleanDesc.slice(0, 220) + '...'
                                : episode.description;

                            return (
                                <Link
                                    to={epUrl}
                                    key={episode.id}
                                    className={`episode-item ${isExpanded ? 'episode-item--expanded' : ''} ${episode.id === activeEpisodeId ? 'active-episode-item' : ''}`}
                                    style={{ animationDelay: `${index * 0.1}s`, cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
                                    onClick={() => window.scrollTo(0, 0)}
                                >
                                    <div className="episode-number">{index + 1}</div>

                                    <div className="episode-thumbnail-container">
                                        <div className="episode-thumbnail">
                                            <img src={getEpImage(episode)} alt={episode.title} />
                                        </div>
                                    </div>

                                    <div className="episode-info">
                                        <div className="episode-info-top">
                                            <h3 className="episode-title">{episode.title}</h3>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                                                <span className="episode-duration">{episode.duration}</span>
                                            </div>
                                        </div>

                                        <div className="episode-description" dangerouslySetInnerHTML={{ __html: displayDesc }} />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default EpisodesList;
