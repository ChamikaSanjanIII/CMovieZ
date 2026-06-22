import { useEffect } from 'react';
import { useLocation, useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import MovieRow from '../components/MovieRow';
import LoadingScreen from '../components/LoadingScreen';
import { getOptimizedImage } from '../utils/imageOptimizer';
import Home from './Home';
import CategoryPage from './CategoryPage';
import TVShows from './TVShows';
import MoviesPage from './MoviesPage';
import AnimePage from './AnimePage';
import GenresListing from './GenresListing';
import GenrePage from './GenrePage';
import YearPage from './YearPage';
import MovieDetailsPage from './MovieDetailsPage';
import EpisodeDetailsPage from './EpisodeDetailsPage';
import DownloadPage from './DownloadPage';
import About from './About';
import Contact from './Contact';
import HelpCenter from './HelpCenter';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfUse from './TermsOfUse';
import DMCA from './DMCA';
import Notifications from './Notifications';
import DownloadSelectionPage from './DownloadSelectionPage';
import NotFound from './NotFound';
import Blog from './Blog';

const AppContent = ({
    handleSelectMovie,
    searchQuery,
    handleSearch,
    searchResults,
    featuredMovie,
    homeCategories,
    featuredHeroMovies,
    moviesFeatured,
    tvFeatured,
    animeFeatured,
    trendingMovies,
    allMovies,
    upcomingData,
    loading,
    onDownload
}) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (window.scrollTo) window.scrollTo(0, 0);

        // ✅ Subdomain Redirection (help.cmoviez.com -> /help)
        if (window.location.hostname === 'help.cmoviez.com') {
            if (location.pathname === '/') {
                navigate('/help', { replace: true });
            } else if (location.pathname !== '/help') {
                window.location.href = `https://cmoviez.com${location.pathname}${location.search}${location.hash}`;
                return;
            }
        }

        // ✅ Redirect to previous page only if the search bar is actually empty
        if (location.pathname === '/search' && !searchQuery) {
            navigate(location.state?.from || '/', { replace: true });
        }
    }, [location.pathname, searchQuery, navigate]);

    const handleMovieClick = (movie) => {
        handleSelectMovie(movie, navigate);
    };

    const isDownloadPage = location.pathname.startsWith('/download') || location.pathname.startsWith('/final-download');

    if (loading && !isDownloadPage) {
        return <LoadingScreen />;
    }

    const upcomingGroups = (upcomingData || []).reduce((acc, movie) => {
        let date = movie.releaseDate;
        if (!date) {
            date = 'Coming Soon';
        }
        if (!acc[date]) acc[date] = [];
        acc[date].push(movie);
        return acc;
    }, {});

    const sortedDateKeys = Object.keys(upcomingGroups).sort((a, b) => {
        if (a === 'Coming Soon') return 1;
        if (b === 'Coming Soon') return -1;
        return new Date(a) - new Date(b);
    });

    return (
        <div className="app">
            {!isDownloadPage && <Navbar onSearch={handleSearch} initialSearch={searchQuery} />}

            <main className="main-content" style={{ flex: 1 }}>
                <Routes>
                    <Route path="/watch/:slug" element={
                        <MovieDetailsPage
                            allMovies={[...allMovies, ...upcomingData]}
                            onDownload={onDownload}
                        />
                    } />
                    <Route path="/watch/:slug/season/:season/episode/:episode" element={
                        <EpisodeDetailsPage
                            allMovies={[...allMovies, ...upcomingData]}
                            onDownload={onDownload}
                        />
                    } />
                    <Route path="/" element={
                        <Home
                            onSelectMovie={handleMovieClick}
                            featuredMovie={featuredMovie}
                            categories={homeCategories}
                            featuredHeroMovies={featuredHeroMovies}
                            trendingMovies={trendingMovies}
                        />
                    } />
                    <Route path="/category/:categoryId" element={<CategoryPage onSelectMovie={handleMovieClick} categories={homeCategories} />} />
                    <Route path="/tv-shows" element={<TVShows onSelectMovie={handleMovieClick} allMovies={allMovies} featuredMovie={featuredMovie} categories={homeCategories} featuredHeroMovies={tvFeatured} />} />
                    <Route path="/movies" element={<MoviesPage onSelectMovie={handleMovieClick} allMovies={allMovies} featuredMovie={featuredMovie} categories={homeCategories} featuredHeroMovies={moviesFeatured} />} />
                    <Route path="/anime" element={<AnimePage onSelectMovie={handleMovieClick} allMovies={allMovies} featuredMovie={featuredMovie} categories={homeCategories} featuredHeroMovies={animeFeatured} />} />
                    <Route path="/genres" element={<GenresListing allMovies={allMovies} />} />
                    <Route path="/genre/:type/:genreName" element={<GenrePage onSelectMovie={handleMovieClick} allMovies={allMovies} />} />
                    <Route path="/years" element={<Navigate to="/genres#years-section" replace />} />
                    <Route path="/year/:year" element={<YearPage onSelectMovie={handleMovieClick} allMovies={allMovies} />} />
                    <Route path="/upcoming" element={
                        <div className="page-fade-in category-page" style={{ paddingTop: '100px', paddingBottom: '90px' }}>
                            <div className="category-header" style={{ padding: '0 4%', marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                <h1 style={{ fontSize: '2.5rem', marginBottom: '15px' }} className="cat-page-title">Upcoming Hits</h1>
                                <p style={{ fontSize: '0.95rem', color: '#ccc', maxWidth: '800px', lineHeight: '1.6' }} className="cat-page-desc">Exciting movies and shows coming soon to CMoviez. Stay tuned for the latest releases.</p>
                            </div>

                            <main className="content">
                                {sortedDateKeys.map(dateKey => {
                                    const displayDate = dateKey === 'Coming Soon' ? dateKey : new Date(dateKey).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
                                    return (
                                        <div key={dateKey} style={{ marginBottom: '50px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', padding: '0 4%' }}>
                                                <h2 style={{ fontSize: 'clamp(1.15rem, 4vw, 1.6rem)', color: '#fff', margin: 0, fontWeight: 700 }}>{displayDate}</h2>
                                                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)', marginLeft: '20px' }}></div>
                                            </div>
                                            <div className="category-grid-layout">
                                                {upcomingGroups[dateKey].map(movie => (
                                                    <div key={movie.id} className="movie-card-container" onClick={() => handleMovieClick(movie)}>
                                                        <div className="card-top-tags">
                                                            {movie.language && <span className="tag-lang">{movie.language}</span>}
                                                            {movie.quality && <span className="tag-quality">{movie.quality}</span>}
                                                            {movie.format && <span className="tag-format">{movie.format}</span>}
                                                        </div>

                                                        <img
                                                            className="movie-card-img"
                                                            src={getOptimizedImage(movie.poster || movie.backdrop, { w: 400, q: 95 })}
                                                            alt={movie.title}
                                                            loading="lazy"
                                                        />

                                                        <div className="card-bottom-info">
                                                            <h3 className="card-title">{movie.title}</h3>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </main>
                        </div>
                    } />

                    <Route path="/search" element={
                        <div className="page-fade-in" style={{ paddingTop: '100px', paddingBottom: '90px' }}>
                            {searchResults.length > 0 ? (
                                <div style={{ padding: '0 4%', marginBottom: '20px' }}>
                                    <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '2px', lineHeight: '1.1' }}>Search Results</h1>
                                    <p style={{ color: '#ccc', fontSize: 'clamp(0.85rem, 3vw, 1rem)', marginTop: '0', opacity: 0.8 }}>Found {searchResults.reduce((acc, cat) => acc + cat.movies.length, 0)} matches for "{searchQuery}"</p>
                                </div>
                            ) : (
                                <div style={{ padding: '0 4%', textAlign: 'center', marginTop: '100px' }}>
                                    <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)' }}>No results found</h1>
                                    <p style={{ color: '#ccc', marginTop: '15px' }}>Try exploring our categories or use different keywords.</p>
                                </div>
                            )}

                            {searchResults.map(category => (
                                <MovieRow
                                    key={category.id}
                                    title={category.title}
                                    movies={category.movies}
                                    isLargeRow={category.id === 'movies'}
                                    onSelect={handleMovieClick}
                                    categoryId={category.id}
                                    disableLink={true}
                                />
                            ))}
                        </div>
                    } />
                    <Route path="/notifications" element={
                        <Notifications
                            onSelectMovie={handleMovieClick}
                            allMovies={allMovies}
                        />
                    } />
                    <Route path="/my-list" element={<main style={{ paddingTop: '150px', textAlign: 'center' }}><h2>My List is empty</h2></main>} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:postSlug" element={<Blog />} />
                    <Route path="/help" element={<HelpCenter />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-of-use" element={<TermsOfUse />} />
                    <Route path="/dmca" element={<DMCA />} />
                    <Route path="/download-selection" element={<DownloadSelectionPage allMovies={allMovies} onDownload={onDownload} loading={loading} />} />
                    <Route path="/download" element={<DownloadPage onDownload={onDownload} />} />

                    <Route path="/final-download" element={<DownloadPage onDownload={onDownload} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                {!isDownloadPage && <Footer />}
            </main>
        </div>
    );
};

export default AppContent;
