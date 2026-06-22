import React, { useState, useEffect } from 'react';
import './AdBlockDetector.css';

const AdBlockDetector = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [isChecking, setIsChecking] = useState(false);

    const performDetection = async () => {
        let adBlockEnabled = false;

        // Method 1: Bait script check
        const baitUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
        try {
            const response = await fetch(baitUrl, {
                method: 'HEAD',
                mode: 'no-cors',
                cache: 'no-store', // Avoid cache
            });
            // If it succeeds, it might still be adblock if Method 2 says so, 
            // but usually this is the most reliable network check
        } catch (e) {
            adBlockEnabled = true;
        }

        // Method 2: Bait element check
        if (!adBlockEnabled) {
            const bait = document.createElement('div');
            bait.setAttribute('class', 'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads ad-unit ad-search ad-wrapper adsense-ad');
            bait.setAttribute('style', 'width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;');
            document.body.appendChild(bait);

            const baitStyles = window.getComputedStyle(bait);
            if (baitStyles.getPropertyValue('display') === 'none' ||
                baitStyles.getPropertyValue('visibility') === 'hidden' ||
                bait.offsetParent === null ||
                bait.offsetHeight === 0 ||
                bait.offsetWidth === 0) {
                adBlockEnabled = true;
            }
            document.body.removeChild(bait);
        }

        return adBlockEnabled;
    };

    const runDetection = async (isInitial = false) => {
        if (isChecking) return;
        
        // Initial load needs more time for extensions to settle
        if (isInitial) {
            await new Promise(resolve => setTimeout(resolve, 2500));
        }

        let isDetected = await performDetection();
        
        // Retry logic: If detected, check again twice with a small delay
        // to avoid false positives during extension state changes
        if (isDetected) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            isDetected = await performDetection();
            
            if (isDetected) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                isDetected = await performDetection();
            }
        }

        if (isDetected) {
            setShowPopup(true);
        } else {
            setShowPopup(false);
        }
    };

    useEffect(() => {
        const handleLoad = () => {
            runDetection(true);
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
            return () => window.removeEventListener('load', handleLoad);
        }
    }, []);

    const handleRefresh = async () => {
        setIsChecking(true);
        
        // Wait for potential extension state sync
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const isStillDetected = await performDetection();
        
        if (!isStillDetected) {
            setShowPopup(false);
            setIsChecking(false);
        } else {
            // Still detected, try one final check before giving up on the auto-recheck
            setTimeout(async () => {
                const finalCheck = await performDetection();
                if (!finalCheck) {
                    setShowPopup(false);
                } else {
                    // If still detected, reload the page as a last resort
                    window.location.reload();
                }
                setIsChecking(false);
            }, 1000);
        }
    };

    if (!showPopup) return null;

    return (
        <div className="ab-detector-overlay">
            <div className="ab-detector-modal">
                <div className="ab-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <h2>Adblock Detected!</h2>
                <p>We notice that you are using an adblocker. Ads help us keep this site free for everyone. Please support us by disabling your adblocker and refreshing the page.</p>
                <button 
                    onClick={handleRefresh} 
                    className={`ab-refresh-btn ${isChecking ? 'checking' : ''}`}
                    disabled={isChecking}
                >
                    {isChecking ? 'Checking...' : "I've disabled it, Check & Refresh"}
                </button>
                <p className="ab-subtext">Thank you for your support!</p>
            </div>
        </div>
    );
};

export default AdBlockDetector;
