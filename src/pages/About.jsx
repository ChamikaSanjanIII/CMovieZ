import React from 'react';
import { PiFilmReelLight, PiDevicesLight, PiShieldCheckLight, PiUsersLight } from 'react-icons/pi';

const About = () => {
    return (
        <div className="about-page page-fade-in">
            <div className="about-hero">
                <div className="about-hero-overlay"></div>
                <div className="about-hero-content">
                    <h1>About <span>CMOVIEZ</span></h1>
                    <p>Your Ultimate Cinematic Destination</p>
                </div>
            </div>

            <div className="about-container">
                <section className="about-section">
                    <div className="about-text">
                        <h2>Our Story</h2>
                        <p>
                            Founded with a passion for storytelling, CMOVIEZ began as a small project to bring high-quality entertainment to movie lovers everywhere.
                            Today, we are one of the fastest-growing platforms for streaming and downloading the latest movies, TV shows, and animation.
                        </p>
                        <p>
                            We believe that great cinema should be accessible to everyone, regardless of where they are. Our platform is designed to provide
                            a seamless, premium experience across all your devices.
                        </p>
                    </div>
                </section>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon"><PiFilmReelLight /></div>
                        <h3>Vast Library</h3>
                        <p>From the latest Hollywood blockbusters to timeless classics and trending animation series.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon"><PiDevicesLight /></div>
                        <h3>Multi-Device Support</h3>
                        <p>Enjoy your favorite content on your phone, tablet, laptop, or smart TV with ease.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon"><PiShieldCheckLight /></div>
                        <h3>High Quality</h3>
                        <p>We provide multiple quality options, from 720p to 4K, ensuring the best viewing experience.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon"><PiUsersLight /></div>
                        <h3>Community Driven</h3>
                        <p>Built for the fans, by the fans. We constantly update our library based on user requests.</p>
                    </div>
                </div>

                <section className="about-mission">
                    <div className="mission-content">
                        <h2>Our Mission</h2>
                        <p>
                            To revolutionize the way you experience entertainment by providing a lightning-fast, secure, and intuitive platform
                            that brings the magic of the big screen directly to your home.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
