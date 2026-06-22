import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { PiMagnifyingGlassLight, PiListLight, PiXLight, PiHouseLight, PiTelevisionLight, PiFilmReelLight, PiGhostLight, PiTagLight, PiStarLight, PiInfoLight, PiPhoneCallLight, PiUsersLight, PiBellLight, PiBookOpenLight } from 'react-icons/pi';

const Navbar = ({ onSearch, initialSearch = '', onNavChange }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchActive, setSearchActive] = useState(!!initialSearch);
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const searchInputRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Auto-navigate to /search if there is a persisted search query on load
    useEffect(() => {
        if (initialSearch && location.pathname !== '/search') {
            navigate('/search', { state: { from: location.pathname } });
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Close mobile menu and search bar on specific route changes
    useEffect(() => {
        setMobileMenuOpen(false);
        if (location.pathname !== '/search' && location.pathname !== '/') {
            setSearchActive(false);
        }
    }, [location.pathname]);

    // Lock scroll when mobile menu is active
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    const handleSearchClick = () => {
        // If search is already active and has a query, clicking the icon triggers a server search
        if (searchActive && searchQuery.trim().length >= 2) {
            onSearch(searchQuery, true);
            if (location.pathname !== '/search') navigate('/search', { state: { from: location.pathname } });
            return;
        }

        setSearchActive(!searchActive);
        if (!searchActive) {
            setTimeout(() => searchInputRef.current?.focus(), 100);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchQuery.trim().length >= 2) {
            onSearch(searchQuery, true);
            if (location.pathname !== '/search') navigate('/search', { state: { from: location.pathname } });
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query);
        if (!query && location.pathname === '/search') {
            navigate(location.state?.from || '/');
        }
    };

    return (
        <>
            <div
                className={`menu-backdrop ${mobileMenuOpen ? 'active' : ''}`}
                onClick={() => {
                    setMobileMenuOpen(false);
                    setSearchActive(false);
                }}
            />
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'mobile-open' : ''} ${searchActive ? 'search-is-active' : ''}`}>
                <div className="nav-left">
                    {window.location.hostname.includes('help.cmoviez.com') || location.pathname.startsWith('/help') ? (
                        <a href="https://cmoviez.com/" className="logo" onClick={() => setSearchActive(false)}>CMOVIEZ</a>
                    ) : (
                        <Link to="/" className="logo" onClick={() => setSearchActive(false)}>CMOVIEZ</Link>
                    )}

                    <button 
                        className="mobile-menu-btn" 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {mobileMenuOpen ? <PiXLight /> : <PiListLight />}
                    </button>

                    <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
                        {(() => {
                            const isHelpSub = window.location.hostname.includes('help.cmoviez.com') || location.pathname.startsWith('/help');
                            const renderNav = (path, icon, label) => {
                                const isActive = location.pathname === path;
                                const className = isActive ? 'active' : '';
                                const onClick = () => { onNavChange?.(); setMobileMenuOpen(false); setSearchActive(false); };
                                
                                if (isHelpSub && path !== '/help') {
                                    return <li><a href={`https://cmoviez.com${path === '/' ? '' : path}`} onClick={onClick} className={className}>{icon}{label}</a></li>;
                                }
                                return <li><Link to={path} onClick={onClick} className={className}>{icon}{label}</Link></li>;
                            };

                            return (
                                <>
                                    {renderNav('/', <PiHouseLight className="nav-link-icon" />, 'Home')}
                                    {renderNav('/movies', <PiFilmReelLight className="nav-link-icon" />, 'Movies')}
                                    {renderNav('/tv-shows', <PiTelevisionLight className="nav-link-icon" />, 'TV Shows')}
                                    {renderNav('/anime', <PiGhostLight className="nav-link-icon" />, 'Animation')}
                                    {renderNav('/upcoming', <PiStarLight className="nav-link-icon" />, 'Upcoming')}
                                    {renderNav('/genres', <PiTagLight className="nav-link-icon" />, 'Genres')}
                                    {renderNav('/about', <PiInfoLight className="nav-link-icon" />, 'About')}
                                    {renderNav('/contact', <PiPhoneCallLight className="nav-link-icon" />, 'Contact')}
                                    {renderNav('/blog', <PiBookOpenLight className="nav-link-icon" />, 'Blog')}
                                </>
                            );
                        })()}
                    </ul>
                </div>

                <div className="nav-right">
                    <div className={`search-container ${searchActive ? 'active' : ''}`}>
                        <PiMagnifyingGlassLight 
                            className="nav-icon search-icon" 
                            onClick={handleSearchClick} 
                            role="button"
                            aria-label="Search"
                        />
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Titles, genres, years"
                            aria-label="Search titles, genres, or years"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    {searchActive && (
                        <PiXLight
                            className="nav-icon close-search-icon"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSearchQuery('');
                                onSearch('');
                                	setSearchActive(false);
                                if (location.pathname === '/search') navigate(location.state?.from || '/');
                            }}
                            role="button"
                            aria-label="Clear search"
                        />
                    )}
                    <Link to="/notifications" className="notification-wrapper">
                        <PiBellLight className="nav-icon notification-icon" role="button" aria-label="Notifications" />
                    </Link>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
