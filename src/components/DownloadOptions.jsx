import React from 'react';
import { HiOutlineDownload } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const DownloadOptions = ({ title, poster, id, type, download_links }) => {
    const navigate = useNavigate();
    
    // Parse unified links to see which qualities are available
    let allLinks = {};
    try {
        if (download_links) {
            allLinks = typeof download_links === 'string' ? JSON.parse(download_links) : download_links;
        }
    } catch (e) {
        console.error("Error parsing download links:", e);
    }

    const handleQualityClick = (quality) => {
        const params = new URLSearchParams({
            id: id,
            quality: quality,
            type: type
        });
        
        // If it's an episode, we might need more info, but for now we'll rely on the ID
        // and the fact that we're passing the quality. 
        // We'll use the title to help identify if it's an episode in the next page.
        
        // Check if title contains Episode info (e.g. "Series - S1 E5")
        const epMatch = title.match(/E(\d+)/);
        if (epMatch) {
            params.append('epId', epMatch[1]);
        }

        window.open(`/download-selection?${params.toString()}`, '_blank');
    };

    const qualities = [
        { key: '1080p', label: '1080p High Quality', icon: '🔥' },
        { key: '720p', label: '720p Standard Quality', icon: '✨' },
        { key: '480p', label: '480p Low Quality', icon: '📱' }
    ];

    // Check which qualities actually have links
    const availableQualities = qualities.filter(q => allLinks[q.key] && Object.keys(allLinks[q.key]).length > 0);

    if (availableQualities.length === 0) {
        return (
            <div className="download-options-container" style={{ marginTop: '20px', textAlign: 'center' }}>
                <p className="no-links" style={{ color: '#94a3b8' }}>Download links will be available soon.</p>
            </div>
        );
    }

    return (
        <div className="download-options-container" style={{ marginTop: '40px', margin: '40px auto', width: '100%', maxWidth: '500px' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '25px', color: '#fff', fontWeight: '800', textAlign: 'center', letterSpacing: '0.5px' }}>
                SELECT QUALITY
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {availableQualities.map((q) => (
                    <button 
                        key={q.key} 
                        className="quality-select-btn"
                        onClick={() => handleQualityClick(q.key)}
                        style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '16px 20px', borderRadius: '12px',
                            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                            color: '#fff', cursor: 'pointer', transition: 'all 0.2s',
                            width: '100%', marginBottom: '4px'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <HiOutlineDownload style={{ fontSize: '1.3rem', color: '#e50914' }} />
                            <span style={{ fontWeight: '600', fontSize: '0.95rem', color: 'rgba(255,255,255,0.9)' }}>{q.label}</span>
                        </div>
                        <span style={{ 
                            fontSize: '0.75rem', fontWeight: '800', color: '#e50914', 
                            textTransform: 'uppercase', letterSpacing: '0.5px' 
                        }}>
                            {q.key}
                        </span>
                    </button>
                ))}
            </div>

            <style>{`
                .quality-select-btn:hover {
                    background: rgba(229, 9, 20, 0.15) !important;
                    border-color: #e50914 !important;
                    transform: translateX(5px);
                }
                @media (max-width: 600px) {
                    .download-options-container {
                        padding: 0 !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default DownloadOptions;
