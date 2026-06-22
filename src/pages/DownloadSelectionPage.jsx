import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { HiOutlineDownload, HiOutlineArrowLeft } from 'react-icons/hi';
import { FaTelegramPlane, FaGoogleDrive, FaDownload } from 'react-icons/fa';
import { toDirectDownload } from '../utils/downloadHelper';
import useSEO from '../hooks/useSEO';
import LoadingScreen from '../components/LoadingScreen';

const DownloadSelectionPage = ({ allMovies, onDownload, loading }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const id = query.get('id');
    const quality = query.get('quality');
    const type = query.get('type') || 'movies';
    const epId = query.get('epId'); // For episodes

    const [item, setItem] = useState(() => {
        return allMovies.find(m => (m.docId || m.id || m.$id) === id);
    });
    const [links, setLinks] = useState(() => {
        const found = allMovies.find(m => (m.docId || m.id || m.$id) === id);
        if (found) {
            if (epId && found.episodes) {
                const episodes = typeof found.episodes === 'string' ? JSON.parse(found.episodes) : found.episodes;
                const ep = episodes.find(e => String(e.episode) === epId);
                if (ep) {
                    const l = typeof ep.download_links === 'string' ? JSON.parse(ep.download_links || '{}') : ep.download_links;
                    return l?.[quality] || null;
                }
            } else {
                const l = typeof found.download_links === 'string' ? JSON.parse(found.download_links || '{}') : found.download_links;
                return l?.[quality] || null;
            }
        }
        return null;
    });

    useEffect(() => {
        const found = allMovies.find(m => (m.docId || m.id || m.$id) === id);
        if (found) {
            setItem(found);
            
            // Handle episodes vs movies
            if (epId && found.episodes) {
                const episodes = typeof found.episodes === 'string' ? JSON.parse(found.episodes) : found.episodes;
                const ep = episodes.find(e => String(e.episode) === epId);
                if (ep) {
                    const l = typeof ep.download_links === 'string' ? JSON.parse(ep.download_links || '{}') : ep.download_links;
                    setLinks(l?.[quality] || null);
                }
            } else {
                const l = typeof found.download_links === 'string' ? JSON.parse(found.download_links || '{}') : found.download_links;
                setLinks(l?.[quality] || null);
            }
        }
    }, [id, quality, allMovies, epId]);

    useSEO({
        title: item ? `Download ${item.title} - ${quality}` : 'Download Selection',
        description: `Select your preferred download provider for ${item?.title} in ${quality} quality.`,
        noindex: true
    });

    if (loading || (!item && allMovies.length === 0)) {
        return <LoadingScreen />;
    }

    if (!item || !links) {
        return (
            <div className="page-fade-in" style={{ paddingTop: '150px', textAlign: 'center', color: '#fff' }}>
                <h2>Download links not found for this quality.</h2>
                <button onClick={() => navigate(-1)} style={{ marginTop: '20px', padding: '10px 20px', background: '#8b5cf6', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer' }}>
                    Go Back
                </button>
            </div>
        );
    }

    const providers = [
        { key: 'direct', label: 'Direct Download', icon: <HiOutlineDownload />, color: '#22c55e', desc: 'Fast & Direct high speed link' },
        { key: 'telegram', label: 'Telegram File', icon: <FaTelegramPlane />, color: '#0088cc', desc: 'Download via Telegram channel' },
        { key: 'gdrive', label: 'Google Drive', icon: <FaGoogleDrive />, color: '#34a853', desc: 'Safe & Secure cloud download' },
        { key: 'pixeldrain', label: 'Pixeldrain', icon: <FaDownload />, color: '#f59e0b', desc: 'High speed cloud mirror' }
    ];

    const handleDownload = (providerLabel, url) => {
        if (onDownload) {
            onDownload({
                docId: id,
                type: type,
                title: `${item.title} (${quality} - ${providerLabel})`
            });
        }
        
        const directUrl = toDirectDownload(url);
        const encodedUrl = btoa(unescape(encodeURIComponent(directUrl)));
        
        const params = new URLSearchParams({
            url: encodedUrl,
            title: `${item.title} (${quality})`,
            poster: item.poster,
            id: id,
            type: type,
            quality: quality,
            provider: providerLabel
        });
        
        window.open(`/download?${params.toString()}`, '_blank');
    };

    return (
        <div className="page-fade-in" style={{ 
            height: '100vh', position: 'relative', color: '#fff',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            overflow: 'hidden'
        }}>
            {/* Full Display Background */}
            <div style={{
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                backgroundImage: `linear-gradient(to bottom, rgba(13, 13, 18, 0.8), rgba(13, 13, 18, 0.95)), url(${item.backdrop || item.poster})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                zIndex: 0
            }} />

            <div style={{ 
                position: 'relative', zIndex: 2, 
                paddingTop: '60px', paddingBottom: '60px',
                width: '100%', maxWidth: '900px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' 
            }}>
                
                <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', textShadow: '0 5px 15px rgba(0,0,0,0.5)' }}>{item.title}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', justifyContent: 'center' }}>
                        <span style={{ background: 'rgba(229, 9, 20, 0.2)', color: '#ff4d4d', padding: '5px 15px', borderRadius: '20px', fontWeight: '700', fontSize: '0.9rem', border: '1px solid rgba(229, 9, 20, 0.3)', backdropFilter: 'blur(10px)' }}>
                            {quality} Quality
                        </span>
                        <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: '500' }}>{item.year} • {type === 'tvshows' ? 'Series' : 'Movie'}</span>
                    </div>
                </div>

                <div style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '1.4rem', marginBottom: '20px', color: '#fff', borderLeft: '4px solid #e50914', paddingLeft: '15px' }}>Select Download Provider</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
                        {providers.map(p => links[p.key] && (
                            <div 
                                key={p.key}
                                onClick={() => handleDownload(p.label, links[p.key])}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    padding: '20px 25px', background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.06)', borderRadius: '15px',
                                    cursor: 'pointer', transition: 'all 0.3s',
                                    position: 'relative', overflow: 'hidden'
                                }}
                                className="provider-row"
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <div className="icon-box" style={{ 
                                        width: '50px', height: '50px', borderRadius: '12px', 
                                        background: `${p.color}22`, display: 'flex', 
                                        alignItems: 'center', justifyContent: 'center',
                                        fontSize: '1.5rem', color: p.color
                                    }}>
                                        {p.icon}
                                    </div>
                                    <div>
                                        <div className="provider-label" style={{ fontWeight: '700', fontSize: '1.1rem', color: '#fff' }}>{p.label}</div>
                                        <div className="provider-desc" style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '2px' }}>{p.desc}</div>
                                    </div>
                                </div>
                                <div style={{ 
                                    background: p.color, color: '#fff', padding: '8px 20px', 
                                    borderRadius: '10px', fontWeight: '700', fontSize: '0.9rem'
                                }}>
                                    Download
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ padding: '20px', background: 'rgba(229, 9, 20, 0.05)', borderRadius: '15px', border: '1px dashed rgba(229, 9, 20, 0.2)', marginTop: '40px' }}>
                    <p style={{ color: '#ff4d4d', fontSize: '0.85rem', textAlign: 'center', margin: 0 }}>
                        <b>Note:</b> If one link doesn't work, please try another provider. We recommend <b>Direct Download</b> for the best experience.
                    </p>
                </div>
            </div>

            <style>{`
                .provider-row:hover {
                    background: rgba(255,255,255,0.06) !important;
                    border: 1px solid #e50914 !important;
                    transform: translateX(5px);
                }
                @media (max-width: 600px) {
                    .provider-row { 
                        padding: 12px 15px !important; 
                    }
                    .provider-row .provider-label {
                        font-size: 0.95rem !important;
                    }
                    .provider-row .provider-desc {
                        font-size: 0.75rem !important;
                    }
                    .provider-row .icon-box {
                        width: 40px !important;
                        height: 40px !important;
                        font-size: 1.2rem !important;
                    }
                    .provider-row > div:last-child { display: none; }
                }
            `}</style>
        </div>
    );
};

export default DownloadSelectionPage;
