import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineDownload } from 'react-icons/hi';
import { IoMdArrowBack } from 'react-icons/io';
import { getOptimizedImage } from '../utils/imageOptimizer';

const DownloadPage = ({ onDownload }) => {
    const location = useLocation();
    const navigate = useNavigate();

    // Get params from URL search
    const searchParams = new URLSearchParams(location.search);
    const encodedUrl = searchParams.get('url');
    const movieTitle = searchParams.get('title');
    const moviePoster = searchParams.get('poster');
    const movieDocId = searchParams.get('id');
    const movieType = searchParams.get('type');

    const downloadUrl = encodedUrl ? decodeURIComponent(escape(atob(encodedUrl))) : null;
    const isFinalStep = searchParams.get('step') === 'final';

    const [timeLeft, setTimeLeft] = useState(10);
    const [showContinue, setShowContinue] = useState(false);

    useEffect(() => {
        // Lock scroll
        document.body.style.overflow = 'hidden';
        return () => {
            // Unlock scroll on unmount
            document.body.style.overflow = 'auto';
        };
    }, []);

    useEffect(() => {
        if (!isFinalStep && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (!isFinalStep) {
            setShowContinue(true);
        }
    }, [timeLeft, isFinalStep]);

    const handleContinue = () => {
        const currentParams = new URLSearchParams(location.search);
        currentParams.set('step', 'final');
        // ✅ Open final download page in a new tab
        window.open(`/final-download?${currentParams.toString()}`, '_blank');
    };

    const [isDownloading, setIsDownloading] = useState(false);

    // If we are on the /final-download path, force final step UI
    const isActuallyFinal = isFinalStep || location.pathname.includes('/final-download');

    const handleFinalDownload = async () => {
        if (!downloadUrl) {
            alert('Download link is missing. Please try again.');
            return;
        }

        setIsDownloading(true);

        try {
            // Safari detection (it often ignores 'download' attribute on large files)
            const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            
            // Generate valid filename
            const fileName = movieTitle ? `${movieTitle.replace(/[^a-z0-9]/gi, '_')}.mp4` : 'video.mp4';

            if (isSafari) {
                // For Safari: Force download by fetching file first (bypass "View" button)
                const response = await fetch(downloadUrl);
                if (!response.ok) throw new Error('Network response was not ok');
                
                const blob = await response.blob();
                const blobUrl = window.URL.createObjectURL(blob);
                
                const link = document.createElement('a');
                link.href = blobUrl;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                
                // Cleanup
                setTimeout(() => {
                    window.URL.revokeObjectURL(blobUrl);
                    if (document.body.contains(link)) document.body.removeChild(link);
                }, 1000);
            } else {
                // For Chrome/Edge/Firefox: Standard anchor tag trick
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', fileName);
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                
                // Safety cleanup
                setTimeout(() => {
                    if (document.body.contains(link)) document.body.removeChild(link);
                }, 5000);
            }

            // Keep status for feedback
            setTimeout(() => {
                setIsDownloading(false);
            }, 3000);

        } catch (err) {
            console.error("Download error:", err);
            // Universal fallback if blob fetch fails (e.g., CORS)
            setIsDownloading(false);
            window.location.href = downloadUrl;
        }
    };



    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (timeLeft / 10) * circumference;

    return (
        <div className="download-page-container">
            <div className="download-content-card">
                {moviePoster && (
                    <div className="download-card-bg">
                        <img src={getOptimizedImage(moviePoster, { w: 600, q: 65 })} alt="" />
                        <div className="download-card-overlay"></div>
                    </div>
                )}

                <div className="download-card-inner">
                    <div className="download-info">
                        <h1 className="download-title">{movieTitle || 'Your Download'}</h1>
                    </div>

                    <div className="countdown-section">
                        {!isActuallyFinal && !showContinue && (
                            <div className="countdown-linear-wrapper">
                                <div className="countdown-number-linear">
                                    Link ready in {timeLeft}<span>s</span>
                                </div>
                                <div className="countdown-line-container">
                                    <div 
                                        className="countdown-line-progress" 
                                        style={{ width: `${(timeLeft / 10) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        {!isActuallyFinal && showContinue && (
                            <button className="btn-download-action btn-continue" onClick={handleContinue}>
                                Continue Download
                            </button>
                        )}

                        {isActuallyFinal && (
                            <button 
                                className="btn-download-action btn-final" 
                                onClick={handleFinalDownload}
                                disabled={isDownloading}
                                style={{ opacity: isDownloading ? 0.7 : 1 }}
                            >
                                {isDownloading ? 'Starting Download...' : <><HiOutlineDownload /> Download Now</>}
                            </button>
                        )}
                    </div>

                    <div className="download-footer-notes">
                        <p>Thank you for using CMoviez. High quality content for free.</p>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .download-page-container {
                    min-height: 100vh;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #050505;
                    padding: 20px;
                    overflow: hidden;
                    position: relative;
                }

                .download-content-card {
                    background: #111;
                    border: 0.5px solid rgba(255, 255, 255, 0.25);
                    border-radius: 24px;
                    width: fit-content;
                    max-width: 90%;
                    max-height: 85vh;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 30px 70px rgba(0, 0, 0, 0.9);
                    position: relative;
                    z-index: 5;
                    overflow: hidden;
                    animation: cardSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .download-card-bg {
                    position: relative;
                    max-height: 85vh;
                    z-index: 1;
                    display: flex;
                }

                .download-card-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.4);
                    z-index: 2;
                }

                .download-card-bg img {
                    width: auto;
                    max-width: 100%;
                    max-height: 85vh;
                    object-fit: contain;
                    display: block;
                }

                .download-card-inner {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    top: auto;
                    z-index: 10;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-end;
                    padding: 60px 50px 40px 50px;
                    overflow: hidden;
                }

                .download-card-inner::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 60%, transparent 100%);
                    backdrop-filter: blur(15px);
                    -webkit-backdrop-filter: blur(15px);
                    mask-image: linear-gradient(to top, black 20%, rgba(0,0,0,0.8) 50%, transparent 100%);
                    -webkit-mask-image: linear-gradient(to top, black 20%, rgba(0,0,0,0.8) 50%, transparent 100%);
                    z-index: -1;
                }

                @keyframes cardSlideUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .download-info {
                    text-align: left;
                    margin-bottom: 15px;
                    width: 100%;
                }

                .download-title {
                    font-size: clamp(1.8rem, 4vw, 2.8rem);
                    font-weight: 800;
                    color: #fff;
                    margin-bottom: 5px;
                    line-height: 1.1;
                    text-shadow: 0 4px 20px rgba(0,0,0,0.8);
                    width: 100%;
                    max-width: 100%;
                }

                .download-subtitle {
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 1.1rem;
                    font-weight: 500;
                    display: inline-block;
                }

                .countdown-section {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    width: 100%;
                    margin-top: 5px;
                }

                .countdown-linear-wrapper {
                    width: 100%;
                    max-width: 350px;
                }

                .countdown-number-linear {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: rgba(255, 255, 255, 0.9);
                    margin-bottom: 8px;
                }

                .countdown-number-linear span {
                    color: #e50914;
                    margin-left: 4px;
                    font-weight: 800;
                }

                .countdown-line-container {
                    width: 100%;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                    overflow: hidden;
                }

                .countdown-line-progress {
                    height: 100%;
                    background: #e50914;
                    box-shadow: 0 0 10px rgba(229, 9, 20, 0.5);
                    transition: width 1s linear;
                    border-radius: 10px;
                }

                .btn-download-action {
                    width: auto;
                    min-width: 220px;
                    padding: 10px 30px;
                    font-size: 0.95rem;
                    font-weight: 700;
                    border-radius: 10px;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .btn-continue {
                    background: #fff;
                    color: #000;
                }

                .btn-final {
                    background: #e50914;
                    color: #fff;
                    box-shadow: 0 10px 30px rgba(229, 9, 20, 0.4);
                }

                .btn-download-action:hover {
                    transform: translateY(-5px) scale(1.05);
                }

                .download-footer-notes {
                    margin-top: 15px;
                    text-align: center;
                    color: rgba(255, 255, 255, 0.4);
                    font-size: 0.8rem;
                    width: 100%;
                }

                @media (max-width: 480px) {
                    .download-content-card {
                        width: 95%;
                        max-width: 95%;
                        max-height: 92vh;
                    }
                    .download-card-bg {
                        max-height: 92vh;
                    }
                    .download-card-bg img {
                        max-height: 92vh;
                    }
                    .download-card-inner {
                        padding: 25px 20px 35px 20px;
                        background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 100%);
                        backdrop-filter: blur(5px);
                        -webkit-backdrop-filter: blur(5px);
                    }
                    .download-title {
                        font-size: 1.5rem;
                    }
                    .btn-download-action {
                        width: 100%;
                        padding: 12px 20px;
                        font-size: 0.9rem;
                    }
                    .download-footer-notes {
                        font-size: 0.7rem;
                        text-align: center;
                    }
                }
            ` }} />
        </div>
    );
};

export default DownloadPage;
