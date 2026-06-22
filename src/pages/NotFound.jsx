import React from 'react';
import { Link } from 'react-router-dom';
import { PiMaskSadLight } from 'react-icons/pi';

const NotFound = () => {
    React.useEffect(() => {
        document.title = "404 - Page Not Found | CMovieZ";
    }, []);

    return (
        <div className="not-found-page page-fade-in" style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 20px',
            background: '#000',
            color: '#fff',
            position: 'relative',
            zIndex: 10
        }}>
            <div className="not-found-content">
                <div style={{
                    fontSize: '120px',
                    fontWeight: '900',
                    lineHeight: '1',
                    marginBottom: '10px',
                    background: 'linear-gradient(135deg, #fff 0%, #666 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    opacity: '0.8'
                }}>
                    404
                </div>
                
                <div style={{
                    fontSize: '40px',
                    color: '#e50914',
                    marginBottom: '20px'
                }}>
                    <PiMaskSadLight />
                </div>

                <h1 style={{
                    fontSize: '2rem',
                    marginBottom: '15px',
                    fontWeight: '700'
                }}>Page Not Found</h1>
                
                <p style={{
                    fontSize: '1.1rem',
                    color: '#ccc',
                    maxWidth: '500px',
                    margin: '0 auto 30px',
                    lineHeight: '1.6'
                }}>
                    Oops! The page you are looking for doesn't exist or has been moved to a new galaxy.
                </p>

                <Link 
                    to="/" 
                    className="back-home-btn"
                    style={{
                        padding: '12px 30px',
                        background: '#e50914',
                        color: '#fff',
                        borderRadius: '30px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        display: 'inline-block',
                        boxShadow: '0 4px 15px rgba(229, 9, 20, 0.4)'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(229, 9, 20, 0.6)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(229, 9, 20, 0.4)';
                    }}
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
