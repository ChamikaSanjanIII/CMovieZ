import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();
    useEffect(() => {
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                // Offset for navbar
                const headerOffset = 100;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                return;
            }
        }

        // Reset scroll position
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });

        // Reset manual body styles that might be stuck
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';

        // Extra insurance for mobile Safari
        setTimeout(() => {
            if (!hash) window.scrollTo(0, 0);
        }, 10);
    }, [pathname, hash]);
    return null;
};

export default ScrollToTop;
