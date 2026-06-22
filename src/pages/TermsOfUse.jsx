import React from 'react';
import { PiInfoLight, PiWarningLight, PiShieldCheckLight, PiNotebookLight } from 'react-icons/pi';

const TermsOfUse = () => {
    return (
        <div className="about-page page-fade-in" style={{ paddingTop: '100px', paddingBottom: '90px' }}>
            <div className="about-hero" style={{ height: '35vh', minHeight: '300px' }}>
                <div className="about-hero-overlay"></div>
                <div className="about-hero-content">
                    <h1>Terms of <span>Use</span></h1>
                    <p>User Agreement, Disclaimer of Liability, and Platform Rules</p>
                </div>
            </div>

            <div className="about-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
                
                <section className="about-section">
                    <div className="about-text">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                            <PiInfoLight style={{ fontSize: '2.2rem', color: 'var(--primary-color, #E50914)' }} />
                            <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '700' }}>Terms of Service</h2>
                        </div>
                        <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '30px' }}><strong>Effective Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                        <p style={{ lineHeight: '1.7', marginBottom: '20px' }}>
                            Please read these Terms of Use carefully before using CMovieZ. By accessing or downloading content from our site, you agree to comply with and be bound by the following terms.
                        </p>

                        <h3 style={{ fontSize: '1.3rem', color: '#fff', marginTop: '30px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <PiShieldCheckLight style={{ color: '#E50914' }} /> 1. Curated Platform & Administrator Uploads
                        </h3>
                        <p style={{ lineHeight: '1.7' }}>
                            CMovieZ is a curated download platform. All movie download links and corresponding subtitle files are published exclusively by the site administrator. We do not permit any public user uploads, file sharing, or third-party submissions on this platform. This ensures all content is hand-selected and verified by the site owner.
                        </p>

                        <h3 style={{ fontSize: '1.3rem', color: '#fff', marginTop: '30px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <PiWarningLight style={{ color: '#E50914' }} /> 2. Content Disclaimer & Usage
                        </h3>
                        <p style={{ lineHeight: '1.7' }}>
                            The downloads are provided for personal and informational use. While all content is personally selected and added by the administrator to guarantee high quality, download packages are stored on external file hosts. Users assume standard responsibility when downloading media from these external links.
                        </p>

                        <h3 style={{ fontSize: '1.3rem', color: '#fff', marginTop: '30px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <PiNotebookLight style={{ color: '#E50914' }} /> 3. Limitation of Liability
                        </h3>
                        <p style={{ lineHeight: '1.7' }}>
                            CMovieZ, its administrator, and developers shall not be liable for any direct or indirect issues arising from downloading files or accessing third-party host links. Downloading and using the files are done under your own discretion.
                        </p>

                        <h3 style={{ fontSize: '1.3rem', color: '#fff', marginTop: '30px' }}>4. Subtitle and Takedown Requests</h3>
                        <p style={{ lineHeight: '1.7' }}>
                            We respect all content owners and subtitle translators. Since all uploads are handled directly by the administrator, any takedown or credit adjustment requests will be addressed immediately. Please consult our <a href="/dmca" style={{ color: 'var(--primary-color, #E50914)', textDecoration: 'underline' }}>DMCA Policy Page</a> to submit a request.
                        </p>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default TermsOfUse;
