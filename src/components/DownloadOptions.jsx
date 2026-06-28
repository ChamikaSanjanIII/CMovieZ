import React, { useState, useEffect } from 'react';
import { toDirectDownload } from '../utils/downloadHelper';
import { HiOutlineDownload } from 'react-icons/hi';
import { FaTelegramPlane, FaGoogleDrive, FaDownload } from 'react-icons/fa';

const DownloadOptions = ({ title, poster, id, type, links, download_links, onDownload }) => {
    // Parse unified links to see which qualities are available
    let allLinks = {};
    try {
        if (download_links) {
            allLinks = typeof download_links === 'string' ? JSON.parse(download_links) : download_links;
        }
    } catch (e) {
        console.error("Error parsing download links:", e);
    }

    // Fallback to legacy links if empty
    if (Object.keys(allLinks).length === 0 && links && links.downloadUrl) {
        allLinks = {
            '720p': {
                direct: links.downloadUrl
            }
        };
    }

    // Define provider metadata with Vector Icons instead of Emojis
    const providerMeta = {
        direct: { 
            label: 'Direct Download', 
            color: '#e50914',
            icon: <HiOutlineDownload style={{ fontSize: '1.2rem' }} />
        },
        pixeldrain: { 
            label: 'Pixeldrain', 
            color: '#f59e0b',
            icon: <FaDownload style={{ fontSize: '1.05rem' }} />
        },
        gdrive: { 
            label: 'Google Drive', 
            color: '#22c55e',
            icon: <FaGoogleDrive style={{ fontSize: '1.1rem' }} />
        },
        telegram: { 
            label: 'Telegram', 
            color: '#0088cc',
            icon: <FaTelegramPlane style={{ fontSize: '1.1rem' }} />
        }
    };

    // Find all active providers
    const activeProviders = new Set();
    Object.keys(allLinks).forEach(quality => {
        Object.keys(allLinks[quality] || {}).forEach(prov => {
            if (allLinks[quality][prov] && providerMeta[prov]) {
                activeProviders.add(prov);
            }
        });
    });

    const providerList = Array.from(activeProviders);

    // Sort providers by priority
    const providerOrder = ['direct', 'pixeldrain', 'gdrive', 'telegram'];
    providerList.sort((a, b) => {
        const idxA = providerOrder.indexOf(a);
        const idxB = providerOrder.indexOf(b);
        return (idxA !== -1 ? idxA : 99) - (idxB !== -1 ? idxB : 99);
    });

    const [activeTab, setActiveTab] = useState('');

    useEffect(() => {
        if (providerList.length > 0 && !activeTab) {
            setActiveTab(providerList[0]);
        }
    }, [providerList, activeTab]);

    if (providerList.length === 0) {
        return (
            <div className="download-options-container" style={{ marginTop: '20px', textAlign: 'center' }}>
                <p className="no-links" style={{ color: '#94a3b8' }}>Download links will be available soon.</p>
            </div>
        );
    }

    // Build rows for the active tab
    const rows = [];
    if (activeTab) {
        const qualitiesOrder = ['1080p', '720p', '480p'];
        qualitiesOrder.forEach(q => {
            if (allLinks[q] && allLinks[q][activeTab]) {
                let size = 'Unknown';
                if (type === 'tvshows') {
                    if (q === '1080p') size = '950 MB';
                    else if (q === '720p') size = '450 MB';
                    else if (q === '480p') size = '220 MB';
                } else {
                    if (q === '1080p') size = '3.51 GB';
                    else if (q === '720p') size = '1.17 GB';
                    else if (q === '480p') size = '902 MB';
                }

                rows.push({
                    quality: q === '1080p' ? 'FHD 1080p' : q === '720p' ? 'HD 720p' : 'SD 480p',
                    rawQuality: q,
                    size: size,
                    url: allLinks[q][activeTab]
                });
            }
        });
    }

    const handleRowClick = (row) => {
        if (onDownload) {
            onDownload({
                docId: id,
                type: type,
                title: `${title} (${row.rawQuality} - ${providerMeta[activeTab]?.label || activeTab})`
            });
        }

        const directUrl = toDirectDownload(row.url);
        const encodedUrl = btoa(unescape(encodeURIComponent(directUrl)));

        const params = new URLSearchParams({
            url: encodedUrl,
            title: `${title} (${row.rawQuality})`,
            poster: poster,
            id: id,
            type: type,
            quality: row.rawQuality,
            provider: providerMeta[activeTab]?.label || activeTab
        });

        window.open(`/download?${params.toString()}`, '_blank');
    };

    const renderIcon = (provKey, showLabel = true, showIcon = true) => {
        const meta = providerMeta[provKey] || { label: provKey, icon: null };
        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {showIcon && meta.icon && (
                    <span style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: activeTab === provKey ? '#fff' : meta.color 
                    }}>
                        {meta.icon}
                    </span>
                )}
                {showLabel && <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{meta.label}</span>}
            </div>
        );
    };

    return (
        <div className="download-options-container" style={{ marginTop: '30px', width: '100%' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '20px', color: '#fff', fontWeight: '800', textAlign: 'left', letterSpacing: '0.5px' }}>
                Links
            </h3>

            {/* Provider Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                {providerList.map((prov) => {
                    const isActive = activeTab === prov;
                    return (
                        <button
                            key={prov}
                            onClick={() => setActiveTab(prov)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 18px',
                                borderRadius: '30px',
                                border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.15)',
                                background: isActive ? '#e50914' : 'rgba(255, 255, 255, 0.03)',
                                color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.7)',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '0.85rem',
                                transition: 'all 0.2s ease',
                                outline: 'none'
                            }}
                            className="provider-tab-btn"
                        >
                            {renderIcon(prov, true, false)}
                        </button>
                    );
                })}
            </div>

            {/* Links Table */}
            {rows.length > 0 && (
                <div style={{ 
                    width: '100%', 
                    overflowX: 'auto', 
                    borderRadius: '8px', 
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    background: 'rgba(15, 15, 15, 0.6)'
                }}>
                    <table className="download-options-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255, 255, 255, 0.02)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                <th style={{ padding: '12px 16px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase' }}>Options</th>
                                <th style={{ padding: '12px 16px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase' }}>Quality</th>
                                <th style={{ padding: '12px 16px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase' }}>Size</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, idx) => (
                                <tr 
                                    key={idx}
                                    onClick={() => handleRowClick(row)}
                                    style={{ 
                                        borderBottom: idx === rows.length - 1 ? 'none' : '1px solid rgba(255, 255, 255, 0.05)',
                                        cursor: 'pointer',
                                        transition: 'background 0.2s ease'
                                    }}
                                    className="table-row-hover"
                                >
                                    <td style={{ padding: '15px 16px' }}>
                                        {renderIcon(activeTab, true)}
                                    </td>
                                    <td style={{ padding: '15px 16px', color: 'rgba(255, 255, 255, 0.9)', fontWeight: '500', fontSize: '0.9rem' }}>
                                        {row.quality}
                                    </td>
                                    <td style={{ padding: '15px 16px', color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
                                        {row.size}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <style>{`
                .provider-tab-btn:hover {
                    border-color: #e50914 !important;
                    color: #fff !important;
                    background: rgba(229, 9, 20, 0.1) !important;
                }
                .table-row-hover:hover {
                    background: rgba(255, 255, 255, 0.04) !important;
                }
                @media (max-width: 600px) {
                    .provider-tab-btn {
                        padding: 6px 14px !important;
                        font-size: 0.8rem !important;
                        border-radius: 20px !important;
                    }
                    .provider-tab-btn span svg {
                        font-size: 1rem !important;
                    }
                    .provider-tab-btn span {
                        font-size: 0.8rem !important;
                    }
                    .download-options-table th,
                    .download-options-table td {
                        padding: 10px 8px !important;
                        font-size: 0.8rem !important;
                    }
                    .download-options-table td span svg {
                        font-size: 1rem !important;
                    }
                    .download-options-table td span {
                        font-size: 0.8rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default DownloadOptions;
