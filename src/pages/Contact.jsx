import { useState } from 'react';
import { PiEnvelopeSimpleLight, PiDiscordLogoLight, PiTelegramLogoLight } from 'react-icons/pi';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here we would typically send the form to a backend or Firebase
        console.log("Form Submitted:", formData);
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="contact-page page-fade-in">
            <div className="contact-hero">
                <div className="contact-hero-overlay"></div>
                <h1>Get in <span>Touch</span></h1>
                <p>Have a question or a request? We're here to help.</p>
            </div>

            <div className="contact-container">
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                    gap: '20px',
                    marginBottom: '50px'
                }}>
                    {[
                        { title: 'Main Movie Channel', link: 'https://t.me/CMovieZOfficial', desc: 'Get the latest movie updates and downloads.' },
                        { title: 'TV Series Hub', link: 'https://t.me/CMovieZOfficial', desc: 'All your favorite TV shows in one place.' },
                        { title: 'Anime Universe', link: 'https://t.me/CMovieZOfficial', desc: 'Join for the best animation and anime content.' },
                        { title: 'Request Group', link: 'https://t.me/CMovieZOfficial', desc: 'Request your favorite movies or shows here.' },
                        { title: 'Support Chat', link: 'https://t.me/CMovieZOfficial', desc: 'Need help? Chat with our support team.' },
                        { title: 'Upcoming Hub', link: 'https://t.me/CMovieZOfficial', desc: 'Sneak peeks and trailers of upcoming releases.' }
                    ].map((box, index) => (
                        <a 
                            key={index}
                            href={box.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none' }}
                        >
                            <div className="info-card" style={{ height: '100%', cursor: 'pointer', transition: 'all 0.3s' }}>
                                <div className="info-icon" style={{ color: '#fff' }}><PiTelegramLogoLight /></div>
                                <div className="info-text">
                                    <h3 style={{ color: '#fff' }}>{box.title}</h3>
                                    <p style={{ fontSize: '0.85rem' }}>{box.desc}</p>
                                    <span style={{ color: '#e50914', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginTop: '10px', display: 'block' }}>
                                        Join Now →
                                    </span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Contact;
