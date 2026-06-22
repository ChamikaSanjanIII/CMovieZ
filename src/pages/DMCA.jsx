import React from 'react';
import { PiNotebookLight, PiShieldCheckLight, PiWarningLight, PiEnvelopeLight } from 'react-icons/pi';

const DMCA = () => {
    return (
        <div className="about-page page-fade-in" style={{ paddingTop: '100px', paddingBottom: '90px' }}>
            <div className="about-hero" style={{ height: '35vh', minHeight: '300px' }}>
                <div className="about-hero-overlay"></div>
                <div className="about-hero-content">
                    <h1>DMCA & <span>Copyright Policy</span></h1>
                    <p>Digital Millennium Copyright Act Compliance, Downloads, and Subtitle Credits Policy</p>
                </div>
            </div>

            <div className="about-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
                
                <section className="about-section">
                    <div className="about-text">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                            <PiShieldCheckLight style={{ fontSize: '2.2rem', color: 'var(--primary-color, #E50914)' }} />
                            <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '700' }}>DMCA & Intellectual Property Policy</h2>
                        </div>
                        <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '30px' }}><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                        <p style={{ lineHeight: '1.7', marginBottom: '20px' }}>
                            CMovieZ ("we", "our", or "us") respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act of 1998 (DMCA), we will respond expeditiously to claims of copyright infringement that are reported to our designated team.
                        </p>

                        <div style={{ background: 'rgba(255,255,255,0.03)', borderLeft: '4px solid #E50914', padding: '20px', borderRadius: '4px', marginBottom: '30px' }}>
                            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <PiWarningLight style={{ color: '#E50914', fontSize: '1.3rem' }} /> Notice regarding Media Downloads & Subtitles
                            </h3>
                            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.6', color: '#ccc' }}>
                                CMovieZ provides platform resources for educational, archival, and personal reference purposes, including movie/TV-show download packages and separate subtitle files. If you represent a copyright holder whose work is listed for download without authorization, please submit a formal takedown request so we can disable the download link.
                            </p>
                        </div>

                        <h3 style={{ fontSize: '1.3rem', color: '#fff', marginTop: '30px' }}>1. Subtitle Sourcing and Creator Respect Policy</h3>
                        <p style={{ lineHeight: '1.7' }}>
                            We fully support and respect the tireless community of translators, subtitle creators, and fansub groups who spend hours translating content. Our subtitle policy guarantees:
                        </p>
                        <ul style={{ paddingLeft: '20px', marginBottom: '25px', lineHeight: '1.8' }}>
                            <li><strong>Preservation of Original Creator Names:</strong> We strictly preserve and retain the original creator's/translator's name within the subtitle files. The credit for translation remains 100% with the original individual creator.</li>
                            <li><strong>Removal of Third-Party Website References:</strong> We remove references, promotions, or advertisements from other third-party websites or platforms that are not related to the actual creator of the subtitle. Only the creator's name is kept.</li>
                            <li><strong>Distributor Branding:</strong> We include our website name (CMovieZ) inside the subtitle files to indicate where the file was downloaded from, alongside the original creator's name, without ever replacing or altering the creator's credit.</li>
                            <li><strong>Non-Commercial & Community Driven:</strong> All downloadable subtitles are provided for free as an accessibility aid. They are never sold or hidden behind paywalls.</li>
                        </ul>

                        <h3 style={{ fontSize: '1.3rem', color: '#fff', marginTop: '30px' }}>2. Filing a DMCA Takedown Notice</h3>
                        <p style={{ lineHeight: '1.7' }}>
                            To request the removal of any copyrighted material (including specific movie download links or subtitle files) from our site, please submit a written notification that includes the following details:
                        </p>
                        <ol style={{ paddingLeft: '20px', marginBottom: '25px', lineHeight: '1.8' }}>
                            <li>Identify the copyrighted work that you claim has been infringed, or if multiple works are covered by this Notice, you may provide a representative list.</li>
                            <li>Identify the specific download page URL on our site where the infringing content or link is located, so that we can locate and disable the correct download file.</li>
                            <li>Provide your contact details (name, mailing address, telephone number, and email address).</li>
                            <li>Include both of the following statements in the body of the Notice:
                                <p style={{ fontStyle: 'italic', margin: '5px 0 5px 15px', color: '#ccc' }}>
                                    "I hereby state that I have a good faith belief that the disputed use of the copyrighted material is not authorized by the copyright owner, its agent, or the law."
                                </p>
                                <p style={{ fontStyle: 'italic', margin: '5px 0 5px 15px', color: '#ccc' }}>
                                    "I hereby state that the information in this Notice is accurate and, under penalty of perjury, that I am the owner, or authorized to act on behalf of, the owner, of the copyright that is allegedly infringed."
                                </p>
                            </li>
                            <li>Provide your full legal name and your electronic or physical signature.</li>
                        </ol>

                        <div style={{ background: 'rgba(229, 9, 20, 0.05)', border: '1px solid rgba(229, 9, 20, 0.2)', padding: '20px', borderRadius: '4px', marginTop: '20px' }}>
                            <h4 style={{ margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}>
                                <PiEnvelopeLight style={{ fontSize: '1.3rem', color: '#E50914' }} /> Contact Designated Copyright Team
                            </h4>
                            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.6' }}>
                                Please deliver the completed notification to our team via:
                                <br />
                                <strong>Email:</strong> <span style={{ color: '#E50914' }}>dmca@cmoviez.com</span>
                                <br />
                                <strong>Online Contact Form:</strong> <a href="/contact" style={{ color: '#fff', textDecoration: 'underline' }}>Click here to submit directly</a>
                            </p>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default DMCA;
