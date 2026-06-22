import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaTelegramPlane } from 'react-icons/fa';

const CustomLink = ({ to, children, className }) => {
    const isHelpSub = window.location.hostname.includes('help.cmoviez.com') || window.location.pathname.startsWith('/help');
    if (isHelpSub && to !== '/help') {
        const fullHref = `https://cmoviez.com${to === '/' ? '' : to}`;
        return <a href={fullHref} className={className}>{children}</a>;
    }
    return <Link to={to} className={className}>{children}</Link>;
};

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <CustomLink to="/" className="logo">CMOVIEZ</CustomLink>
                        <p className="brand-tagline">Experience the best of cinema from the comfort of your home. Streaming the latest and greatest titles across every genre.</p>
                        <div className="social-links">
                            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
                            <a href="#" aria-label="Twitter"><FaTwitter /></a>
                            <a href="#" aria-label="Instagram"><FaInstagram /></a>
                            <a href="#" aria-label="Youtube"><FaYoutube /></a>
                            <a href="https://t.me/CMovieZOfficial" target="_blank" rel="noopener noreferrer" aria-label="Telegram"><FaTelegramPlane /></a>
                        </div>
                    </div>

                    <div className="footer-links-grid">
                        <div className="footer-column">
                            <h3>Explore</h3>
                            <ul>
                                <li><CustomLink to="/">Home</CustomLink></li>
                                <li><CustomLink to="/tv-shows">TV Shows</CustomLink></li>
                                <li><CustomLink to="/movies">Movies</CustomLink></li>
                                <li><CustomLink to="/anime">Animation</CustomLink></li>
                                <li><CustomLink to="/about">About Us</CustomLink></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h3>Genres</h3>
                            <ul>
                                <li><CustomLink to="/genre/movie/Action">Action</CustomLink></li>
                                <li><CustomLink to="/genre/movie/Comedy">Comedy</CustomLink></li>
                                <li><CustomLink to="/genre/movie/Drama">Drama</CustomLink></li>
                                <li><CustomLink to="/genre/movie/Horror">Horror</CustomLink></li>
                                <li><CustomLink to="/genre/movie/Science Fiction">Sci-Fi</CustomLink></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h3>Support</h3>
                            <ul>
                                <li><a href="https://help.cmoviez.com" target="_blank" rel="noopener noreferrer">Help Center</a></li>
                                <li><CustomLink to="/blog">Blog & Subtitle Help</CustomLink></li>
                                <li><CustomLink to="/contact">Contact Us</CustomLink></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h3>Legal</h3>
                            <ul>
                                <li><CustomLink to="/privacy-policy">Privacy Policy</CustomLink></li>
                                <li><CustomLink to="/terms-of-use">Terms of Use</CustomLink></li>
                                <li><CustomLink to="/dmca">DMCA Policy</CustomLink></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom" style={{ justifyContent: 'center', textAlign: 'center' }}>
                    <div className="footer-copyright">
                        <p>Powered by CMovieZ | Developed by Chamika Sanjan</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
