import React from 'react';
import { PiShieldCheckLight, PiLockLight, PiEyeLight, PiGlobeLight } from 'react-icons/pi';

const PrivacyPolicy = () => {
    return (
        <div className="about-page page-fade-in" style={{ paddingTop: '100px', paddingBottom: '90px' }}>
            <div className="about-hero" style={{ height: '35vh', minHeight: '300px' }}>
                <div className="about-hero-overlay"></div>
                <div className="about-hero-content">
                    <h1>Privacy <span>Policy</span></h1>
                    <p>User Data Protection and Security Standard</p>
                </div>
            </div>

            <div className="about-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
                
                <section className="about-section">
                    <div className="about-text">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                            <PiShieldCheckLight style={{ fontSize: '2.2rem', color: 'var(--primary-color, #E50914)' }} />
                            <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '700' }}>Privacy Policy</h2>
                        </div>
                        <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '30px' }}><strong>Effective Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                        <p style={{ lineHeight: '1.7', marginBottom: '20px' }}>
                            Welcome to CMovieZ ("we", "our", or "us"). We believe in complete transparency and absolute privacy. Our commitment is simple: we respect your privacy and do not track, log, or store your activities.
                        </p>

                        <h3 style={{ fontSize: '1.3rem', color: '#fff', marginTop: '30px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <PiLockLight style={{ color: '#E50914' }} /> 1. Strict Zero-Logging Policy
                        </h3>
                        <p style={{ lineHeight: '1.7' }}>
                            At CMovieZ, user privacy is absolute. We do NOT collect, store, or log any personal information, including:
                        </p>
                        <ul style={{ paddingLeft: '20px', marginBottom: '20px', lineHeight: '1.8' }}>
                            <li><strong>NO IP Addresses:</strong> We do not log or track internet protocol (IP) addresses of our visitors.</li>
                            <li><strong>NO Browser or Device Logging:</strong> We do not collect information about your operating system, browser specifications, or device data.</li>
                            <li><strong>NO Accounts:</strong> No signup, registration, names, email addresses, or phone numbers are requested or stored.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.3rem', color: '#fff', marginTop: '30px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <PiGlobeLight style={{ color: '#E50914' }} /> 2. No Cookies & No Local Storage Policy
                        </h3>
                        <p style={{ lineHeight: '1.7' }}>
                            CMovieZ operates completely statelessly. We do NOT use browser cookies, session storage, or local storage to track your choices, page visits, or preferences. Every visit is treated as a clean, independent session, and absolutely no data is written to your device by CMovieZ.
                        </p>

                        <h3 style={{ fontSize: '1.3rem', color: '#fff', marginTop: '30px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <PiEyeLight style={{ color: '#E50914' }} /> 3. Third-Party Advertisers and Links
                        </h3>
                        <p style={{ lineHeight: '1.7' }}>
                            Our website displays download and media player options that direct you to external servers, and we may display third-party advertisements. These external services may use cookies or track your browser according to their own independent privacy terms. We do not control and are not responsible for the tracking systems or cookies of third-party domains.
                        </p>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default PrivacyPolicy;
