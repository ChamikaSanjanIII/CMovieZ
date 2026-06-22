import { useState, useEffect } from 'react';
import { HiOutlineSearch, HiOutlineQuestionMarkCircle, HiOutlineChevronDown, HiOutlineChevronRight } from 'react-icons/hi';
import { FaTelegramPlane, FaFacebookMessenger, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const content = {
    en: {
        title: "Help Center",
        subtitle: "How can we help you today?",
        searchPlaceholder: "Search for topics or questions...",
        faqs: [
            {
                category: "1. General & Accounts",
                items: [
                    { q: "Do I need to register to use CMovieZ?", a: "No. You can watch and download movies without an account. However, creating an account allows you to build watchlists and receive notifications about new updates." },
                    { q: "What should I do if I forget my password?", a: "Click the 'Forgot Password' link on the login page and enter your email address. You will receive a link to reset your password." },
                    { q: "Is the site content updated daily?", a: "Yes, our team adds the latest movies, TV series, and subtitles multiple times a day." },
                    { q: "Do I need to use a VPN to access CMovieZ?", a: "Generally, no. But if the website is blocked in your region, we recommend using a faster VPN like Cloudflare 1.1.1.1." }
                ]
            },
            {
                category: "2. Downloads & Quality",
                items: [
                    { q: "Which is better: Direct Download or Torrent?", a: "If you have a very fast internet connection and are downloading large files (4K/1080p), torrent is better. Direct download is easier for mobile phone users." },
                    { q: "What should I do if I get a 'Video Codec Error'?", a: "Normal video players might have trouble playing our high-quality videos (x265/HEVC). Please use VLC Media Player or KM Player." },
                    { q: "How to change the language in Multi-Audio movies?", a: "Go to 'Audio Track' settings in your video player and choose your preferred language (e.g., Hindi, English, Tamil)." },
                    { q: "Can I resume paused downloads?", a: "Yes, most of our links support resuming. We recommend using software like IDM (Internet Download Manager) for this." },
                    { q: "Why do I get redirected to other sites when clicking a download link?", a: "We use a few short ads to cover our server maintenance costs. Wait a few seconds and click the 'Get Link' or 'Skip Ad' button." }
                ]
            },
            {
                category: "3. Subtitles & Requests",
                items: [
                    { q: "Do all movies have Sinhala subtitles?", a: "We provide Sinhala subtitles for more than 90% of our movies. Some brand new movies may only have English subtitles until Sinhala ones are created." },
                    { q: "What should I do if the subtitles don't play?", a: "Go to your video player's 'Subtitle Settings' and select our provided .srt file as 'External Subtitle'." },
                    { q: "How can I request a movie?", a: "Fill out our 'Movie Request' form. Make sure to accurately mention the exact movie name and release year." },
                    { q: "Can I find old movies on the site?", a: "Yes, we have a large collection of classic and popular movies from the 1950s up to today." }
                ]
            },
            {
                category: "4. Data & Safety",
                items: [
                    { q: "How can I watch movies with low data usage?", a: "When downloading, choose links mentioned as 'x265' or 'HEVC'. They offer high clarity with lower data usage." },
                    { q: "Can the website introduce viruses to my computer?", a: "No. We scan and check all our files and links. Just be careful about unnecessary 'Pop-ups' coming from ads." },
                    { q: "Is my personal data safe?", a: "Yes, we do not share your email address or other info with any third party, and they are protected under SSL." }
                ]
            },
            {
                category: "5. Join the CMovieZ Team 🤝",
                items: [
                    { q: "How can I join the CMovieZ Team?", a: "If you have skills in subtitling, web design, or content management, you can apply through the 'Careers' page." },
                    { q: "What roles are available in the team?", a: "Subtitle Editor: creating Sinhala subtitles.\nUploader: uploading the latest movies to servers.\nModerator: checking comments and user reports.\nGraphic Designer: creating posters and advertisements." },
                    { q: "Are special qualifications needed to join?", a: "Basic technical knowledge and internet understanding are enough. The most important thing is passion for movies and dedication." },
                    { q: "Is this a paid job?", a: "Currently, most of our members volunteer, but we aim to provide special bonuses and perks based on website revenue." },
                    { q: "Can I work from home?", a: "Yes, all CMovieZ team operations are remote." },
                    { q: "Will I get training if I'm new to subtitling?", a: "Definitely. Our expert subtitlers are ready to give you the necessary software and technical knowledge." },
                    { q: "What are the team's working hours?", a: "You can work anytime convenient for you. But when a new movie is released, dedication to provide it quickly is important." },
                    { q: "Can I get ownership of the CMovieZ site?", a: "No, but you can get promoted up to a senior member (Admin) role." },
                    { q: "What are the benefits of being a team member?", a: "The chance to watch the newest movies before everyone else, growing technical knowledge, and the ability to connect with a large community." },
                    { q: "How long does it take to get a reply after applying?", a: "Usually our management will contact you within 3-7 days." }
                ]
            }
        ],
        contactTitle: "Still need help?",
        contactSubtitle: "Our support team is available 24/7 to assist you.",
        contactButtons: [
            { name: "Telegram Support", icon: <FaTelegramPlane />, link: "https://t.me/cmoviez_support", color: "#0088cc" },
            { name: "Messenger", icon: <FaFacebookMessenger />, link: "https://m.me/cmoviez", color: "#006AFF" },
            { name: "Email Us", icon: <FaEnvelope />, link: "mailto:support@cmoviez.com", color: "#e50914" }
        ]
    },
    si: {
        title: "උදවු මධ්‍යස්ථානය",
        subtitle: "අද අපි ඔබට උදවු කරන්නේ කෙසේද?",
        searchPlaceholder: "මාතෘකා හෝ ප්‍රශ්න සොයන්න...",
        faqs: [
            {
                category: "1. සාමාන්‍ය සහ ගිණුම් තොරතුරු",
                items: [
                    { q: "CMovieZ සේවාව භාවිතා කිරීමට ලියාපදිංචි වීම අනිවාර්යද?", a: "නැත. ඔබට ගිණුමක් නොමැතිව වුවද චිත්‍රපට නැරඹීමට සහ බාගත කිරීමට හැකියාව ඇත. නමුත් ගිණුමක් සැකසීමෙන් ඔබට ප්‍රියතම චිත්‍රපට ලැයිස්තු (Watchlist) සෑදීමට සහ අලුත් දේවල් ගැන දැනුම්දීම් ලබා ගැනීමට හැකි වේ." },
                    { q: "මගේ මුරපදය (Password) අමතක වුවහොත් කුමක් කළ යුතුද?", a: "Login පිටුවේ ඇති 'Forgot Password' ලින්ක් එක ක්ලික් කර ඔබගේ ඊමේල් ලිපිනය ඇතුළත් කරන්න. එවිට මුරපදය අලුත් කිරීමට අවශ්‍ය ලින්ක් එක ඔබට ලැබෙනු ඇත." },
                    { q: "වෙබ් අඩවියේ අන්තර්ගතය දිනපතා යාවත්කාලීන වේද?", a: "ඔව්, දිනකට කිහිප වතාවක්ම නවතම චිත්‍රපට, රූපවාහිනී කතා මාලා සහ උපසිරසි අපගේ කණ්ඩායම විසින් එක් කරනු ලබයි." },
                    { q: "CMovieZ අඩවියට පිවිසීමට VPN එකක් භාවිතා කළ යුතුද?", a: "සාමාන්‍යයෙන් අවශ්‍ය නොවේ. නමුත් ඔබ ඉන්නා කලාපය අනුව වෙබ් අඩවිය අවහිර වී ඇත්නම් වඩාත් වේගවත් VPN එකක් (Cloudflare 1.1.1.1 වැනි) භාවිතා කිරීම නිර්දේශ කරමු." }
                ]
            },
            {
                category: "2. බාගත කිරීම් සහ වීඩියෝ ගුණාත්මකභාවය",
                items: [
                    { q: "Direct Download සහ Torrent අතරින් වඩාත් සුදුසු කුමක්ද?", a: "ඔබට ඉතා වේගවත් අන්තර්ජාල සම්බන්ධතාවයක් ඇත්නම් සහ විශාල ෆයිල් (4K/1080p) බාගත කරන්නේ නම් Torrent වඩාත් සුදුසුයි. ජංගම දුරකථන භාවිතා කරන්නන්ට Direct Download පහසු වේ." },
                    { q: "Video Codec Error එකක් ආවොත් කුමක් කළ යුතුද?", a: "අප ලබා දෙන උසස් තාක්ෂණික වීඩියෝ (x265/HEVC) ප්ලේ කිරීමට සාමාන්‍ය වීඩියෝ ප්ලේයර් වලට අපහසු විය හැක. ඒ සඳහා VLC Media Player හෝ KM Player භාවිතා කරන්න." },
                    { q: "Multi-Audio (භාෂා කිහිපයක් සහිත) චිත්‍රපට වල භාෂාව වෙනස් කරන්නේ කෙසේද?", a: "වීඩියෝ ප්ලේයරයේ 'Audio Track' settings වෙත ගොස් ඔබට අවශ්‍ය භාෂාව (උදා: Hindi, English, Tamil) තෝරාගත හැක." },
                    { q: "බාගත කිරීම් අතරමග නතර (Resume) කළ හැකිද?", a: "ඔව්, අප ලබා දෙන බොහෝ ලින්ක් Resume පහසුකම සහිතයි. ඒ සඳහා IDM (Internet Download Manager) වැනි මෘදුකාංගයක් භාවිතා කිරීම නිර්දේශ කරමු." },
                    { q: "Download ලින්ක් එකක් ක්ලික් කළ විට වෙනත් වෙබ් අඩවි වලට යන්නේ ඇයි?", a: "අපගේ සේවාදායක නඩත්තු වියදම් පියවා ගැනීමට කෙටි දැන්වීම් කිහිපයක් භාවිතා වේ. තත්පර කිහිපයක් රැඳී සිට 'Get Link' හෝ 'Skip Ad' බොත්තම ක්ලික් කරන්න." }
                ]
            },
            {
                category: "3. උපසිරසි සහ අන්තර්ගතය",
                items: [
                    { q: "සෑම චිත්‍රපටයකටම සිංහල උපසිරසි තිබේද?", a: "90% කට වඩා වැඩි චිත්‍රපට ප්‍රමාණයකට අප සිංහල උපසිරසි ලබා දෙන්නෙමු. සමහර අලුත්ම චිත්‍රපට සඳහා උපසිරසි නිර්මාණය වන තෙක් ඉංග්‍රීසි උපසිරසි පමණක් තිබිය හැක." },
                    { q: "උපසිරසි ප්ලේයරය තුළ නොපෙන්වන්නේ නම් කුමක් කළ යුතුද?", a: "වීඩියෝ ප්ලේයරයේ 'Subtitle Settings' වෙත ගොස් 'External Subtitle' ලෙස අප ලබා දී ඇති .srt ෆයිල් එක තෝරාගන්න." },
                    { q: "චිත්‍රපටයක් Request කරන්නේ කෙසේද?", a: "අපගේ 'Movie Request' ෆෝරමය පුරවන්න. එහිදී චිත්‍රපටයේ නම සහ නිකුත් වූ වසර නිවැරදිව සඳහන් කිරීමට වගබලා ගන්න." },
                    { q: "පැරණි චිත්‍රපට වෙබ් අඩවියෙන් සොයාගත හැකිද?", a: "ඔව්, අප සතුව 1950 දශකයේ සිට අද දක්වා සම්භාව්‍ය සහ ජනප්‍රිය චිත්‍රපට විශාල එකතුවක් පවතී." }
                ]
            },
            {
                category: "4. දත්ත පිරිවැය සහ ආරක්ෂාව",
                items: [
                    { q: "අඩු දත්ත (Low Data) ප්‍රමාණයකින් චිත්‍රපට නැරඹිය හැක්කේ කෙසේද?", a: "චිත්‍රපට බාගත කිරීමේදී 'x265' හෝ 'HEVC' ලෙස සඳහන් කර ඇති ලින්ක් තෝරාගන්න. එමගින් අඩු දත්ත ප්‍රමාණයකින් ඉහළ පැහැදිලිතාවයක් ලැබේ." },
                    { q: "වෙබ් අඩවියෙන් පරිගණකයට වෛරස් ඇතුළු විය හැකිද?", a: "නැත. අපගේ සියලුම ෆයිල් සහ ලින්ක් ස්කෑන් කර පරීක්ෂා කරනු ලැබේ. දැන්වීම් හරහා එන අනවශ්‍ය 'Pop-ups' ගැන පමණක් සැලකිලිමත් වන්න." },
                    { q: "මගේ පෞද්ගලික දත්ත සුරක්ෂිතද?", a: "ඔව්, අප ඔබගේ ඊමේල් ලිපිනය හෝ වෙනත් තොරතුරු කිසිදු තෙවන පාර්ශවයකට ලබා නොදෙන අතර ඒවා SSL ආරක්ෂණය යටතේ පවතී." }
                ]
            },
            {
                category: "5. CMovieZ කණ්ඩායමට සම්බන්ධ වීම 🤝",
                items: [
                    { q: "මම කොහොමද CMovieZ Team එකට එකතු වෙන්නේ?", a: "ඔබට උපසිරසි ගැන්වීමේ හැකියාව, වෙබ් නිර්මාණකරණය හෝ අන්තර්ගතය කළමනාකරණය (Content Management) පිළිබඳ දක්ෂතාවයක් ඇත්නම් 'Careers' පිටුව හරහා අයදුම් කළ හැක." },
                    { q: "කණ්ඩායම තුළ ඇති තනතුරු (Roles) මොනවාද?", a: "Subtitle Editor: චිත්‍රපට සඳහා සිංහල උපසිරසි ගැන්වීම.\nUploader: නවතම චිත්‍රපට සර්වර් වෙත අප්ලෝඩ් කිරීම.\nModerator: කමෙන්ට්ස් සහ යූසර් රිපෝට්ස් පරීක්ෂා කිරීම.\nGraphic Designer: පෝස්ටර් සහ වෙළඳ දැන්වීම් නිර්මාණය." },
                    { q: "කණ්ඩායමට එකතු වීමට විශේෂ සුදුසුකම් අවශ්‍යද?", a: "මූලික තාක්ෂණික දැනුම සහ අන්තර්ජාලය පිළිබඳ අවබෝධය තිබීම ප්‍රමාණවත්ය. වැදගත්ම දේ වන්නේ චිත්‍රපට කෙරෙහි ඇති උනන්දුව සහ කැපවීමයි." },
                    { q: "මෙය වැටුප් සහිත රැකියාවක්ද?", a: "දැනට අපගේ බොහෝ සාමාජිකයන් ස්වේච්ඡාවෙන් සම්බන්ධ වී සිටින අතර, වෙබ් අඩවියේ ආදායම මත පදනම්ව විශේෂ ප්‍රසාද දීමනා සහ වරප්‍රසාද ලබා දීමට අපි කටයුතු කරමු." },
                    { q: "මට නිවසේ සිට වැඩ කළ හැකිද?", a: "ඔව්, CMovieZ කණ්ඩායමේ සියලුම වැඩකටයුතු ඔන්ලයින් (Remote) ක්‍රමයට සිදුවේ." },
                    { q: "උපසිරසි ගැන්වීමට මම අලුත් නම් මට පුහුණුවක් ලැබෙනවාද?", a: "අනිවාර්යයෙන්ම. අපගේ ප්‍රවීණ උපසිරසි කරුවන් විසින් ඔබට අවශ්‍ය මෘදුකාංග සහ තාක්ෂණික දැනුම ලබා දීමට සූදානම්." },
                    { q: "කණ්ඩායමේ වැඩ කරන වෙලාවන් කොහොමද?", a: "ඔබට පහසු ඕනෑම වෙලාවක වැඩ කළ හැක. නමුත් අලුත් චිත්‍රපටයක් නිකුත් වූ විට එය ඉක්මනින් ලබා දීමට කැපවීම වැදගත් වේ." },
                    { q: "CMovieZ වෙබ් අඩවියේ අයිතිය ලබාගත හැකිද?", a: "නැත, නමුත් ඔබට කණ්ඩායමේ ජ්‍යෙෂ්ඨ සාමාජිකයෙකු (Admin) දක්වා උසස් වීම් ලබාගත හැක." },
                    { q: "කණ්ඩායමේ සාමාජිකයෙකු වීමෙන් ලැබෙන ප්‍රතිලාභ මොනවාද?", a: "අලුත්ම චිත්‍රපට සැමට පෙර නැරඹීමේ අවස්ථාව, තාක්ෂණික දැනුම වර්ධනය වීම සහ විශාල ප්‍රජාවක් සමඟ සම්බන්ධ වීමේ හැකියාව." },
                    { q: "අයදුම් කළ පසු පිළිතුරක් ලැබීමට කොපමණ කාලයක් ගතවේද?", a: "සාමාන්‍යයෙන් දින 3-7ක් ඇතුළත අපගේ කළමනාකාරීත්වය විසින් ඔබව සම්බන්ධ කරගනු ඇත." }
                ]
            }
        ],
        contactTitle: "තවදුරටත් උදවු අවශ්‍යද?",
        contactSubtitle: "අපගේ සහාය කණ්ඩායම ඔබට උපකාර කිරීමට 24/7 සූදානම්ව සිටී.",
        contactButtons: [
            { name: "ටෙලිග්‍රෑම් සහාය", icon: <FaTelegramPlane />, link: "https://t.me/cmoviez_support", color: "#0088cc" },
            { name: "මැසෙන්ජර්", icon: <FaFacebookMessenger />, link: "https://m.me/cmoviez", color: "#006AFF" },
            { name: "ඊමේල්", icon: <FaEnvelope />, link: "mailto:support@cmoviez.com", color: "#e50914" }
        ]
    }
};

const HelpCenter = () => {
    const [language, setLanguage] = useState('en'); // 'en' or 'si'
    const [searchQuery, setSearchQuery] = useState('');
    const [activeAccordion, setActiveAccordion] = useState(null);

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    // SEO & Structured Data (JSON-LD for FAQ)
    useEffect(() => {
        // 1. Title & Meta Tags
        const pageTitle = language === 'en' ? "CMovieZ Help Center - Official Support" : "CMovieZ උදවු මධ්‍යස්ථානය - නිල සහාය සේවාව";
        const metaDesc = language === 'en'
            ? "Get help with CMovieZ. Find answers to common questions about downloading movies, Sinhala subtitles, and more on help.cmovie.xyz."
            : "CMovieZ වෙබ් අඩවිය සම්බන්ධ ඔබගේ සියලු ගැටළු වලට සහාය මෙතැනින් ලබා ගන්න. චිත්‍රපට බාගත කිරීම සහ තවත් දේ ගැන දැනගන්න.";

        document.title = pageTitle;

        let descTag = document.querySelector('meta[name="description"]');
        if (!descTag) {
            descTag = document.createElement('meta');
            descTag.name = "description";
            document.head.appendChild(descTag);
        }
        descTag.content = metaDesc;

        // 2. Canonical URL for help subdomain
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = "canonical";
            document.head.appendChild(canonical);
        }
        canonical.href = "https://help.cmovie.xyz";

        // 3. FAQ Schema (JSON-LD)
        const schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": content[language].faqs.flatMap(cat => cat.items.map(faq => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.a
                }
            })))
        };

        const existingScript = document.getElementById('faq-schema');
        if (existingScript) existingScript.remove();

        const script = document.createElement('script');
        script.id = 'faq-schema';
        script.type = 'application/ld+json';
        script.innerHTML = JSON.stringify(schema);
        document.head.appendChild(script);

        return () => {
            if (script) script.remove();
        };
    }, [language]);

    const currentContent = content[language];

    const filteredCategories = currentContent.faqs.map((cat, catIndex) => {
        const filteredItems = cat.items.filter(faq =>
            faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.a.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return {
            ...cat,
            items: filteredItems,
            originalCatIndex: catIndex
        };
    }).filter(cat => cat.items.length > 0);

    return (
        <div className="help-center-page page-fade-in">
            {/* Header / Hero Section */}
            <div className="help-hero">
                <div className="help-hero-overlay"></div>
                <div className="help-hero-content">
                    <div className="lang-toggle-container">
                        <button className={`lang-btn ${language === 'en' ? 'active' : ''}`} onClick={() => setLanguage('en')}>English</button>
                        <button className={`lang-btn ${language === 'si' ? 'active' : ''}`} onClick={() => setLanguage('si')}>සිංහල</button>
                    </div>
                    <h1>{currentContent.title}</h1>
                    <p>{currentContent.subtitle}</p>
                    <div className="help-search-container">
                        <HiOutlineSearch className="help-search-icon" />
                        <input
                            type="text"
                            placeholder={currentContent.searchPlaceholder}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="help-main-container">
                {/* FAQ Section */}
                <div className="help-faq-section">
                    <h2 className="section-title">
                        {searchQuery
                            ? (language === 'en' ? `Search Results for "${searchQuery}"` : `"${searchQuery}" සඳහා සෙවුම් ප්‍රතිඵල`)
                            : (language === 'en' ? "Frequently Asked Questions" : "නිතර අසන ප්‍රශ්න")
                        }
                    </h2>
                    <div className="faq-list">
                        {filteredCategories.length > 0 ? (
                            filteredCategories.map((cat, catIdx) => (
                                <div key={catIdx} className="faq-category-group">
                                    <h3 className="faq-category-title">{cat.category}</h3>
                                    <div className="faq-items-wrapper">
                                        {cat.items.map((faq, itemIdx) => {
                                            const uniqueIndex = `${cat.originalCatIndex}-${itemIdx}`;
                                            return (
                                                <div key={itemIdx} className={`faq-item ${activeAccordion === uniqueIndex ? 'active' : ''}`}>
                                                    <div className="faq-question" onClick={() => toggleAccordion(uniqueIndex)}>
                                                        <HiOutlineChevronRight className="faq-indicator" />
                                                        <span>{faq.q}</span>
                                                    </div>
                                                    <div className="faq-answer">
                                                        <div className="faq-answer-content">
                                                            <p>{faq.a}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
                                <p style={{ fontSize: '1.2rem' }}>
                                    {language === 'en' ? "No matching help topics found." : "ගැලපෙන මාතෘකා කිසිවක් හමු නොවීය."}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Contact Section */}
                <div className="help-contact-section">
                    <div className="contact-card">
                        <h2>{currentContent.contactTitle}</h2>
                        <p>{currentContent.contactSubtitle}</p>
                        <div className="contact-options">
                            {currentContent.contactButtons.map((btn, index) => (
                                <a key={index} href={btn.link} target="_blank" rel="noopener noreferrer" className="contact-btn" style={{ '--btn-color': btn.color }}>
                                    <span className="btn-icon">{btn.icon}</span>
                                    <span className="btn-text">{btn.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Link */}
                <div className="help-footer-notice">
                    <p>
                        {language === 'en'
                            ? "CMovieZ is dedicated to providing the best streaming experience. For more info, visit our "
                            : "CMovieZ ඔබට හොඳම අත්දැකීම ලබා දීමට කැපවී සිටී. වැඩි විස්තර සඳහා අපගේ "}
                        {window.location.hostname.includes('help.cmovie.xyz') || window.location.pathname.startsWith('/help') ? (
                            <a href="https://cmovie.xyz/about">{language === 'en' ? "About page" : "අප ගැන පිටුව"}</a>
                        ) : (
                            <Link to="/about">{language === 'en' ? "About page" : "අප ගැන පිටුව"}</Link>
                        )}.
                    </p>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .help-center-page {
                    color: white;
                    background-color: #0f0f0f;
                    min-height: 100vh;
                    font-family: 'Poppins', sans-serif;
                }

                .help-hero {
                    position: relative;
                    height: 50vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    background-image: url('https://images.unsplash.com/photo-1574267432553-4b2026622ec6?q=80&w=2000&auto=format&fit=crop');
                    background-size: cover;
                    background-position: center;
                    padding: 0 20px;
                }

                .help-hero-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(to bottom, rgba(15, 15, 15, 0.8), #0f0f0f);
                }

                .help-hero-content {
                    position: relative;
                    z-index: 10;
                    max-width: 800px;
                    width: 100%;
                }

                .lang-toggle-container {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    margin-bottom: 30px;
                    margin-top: 40px;
                }

                .lang-btn {
                    background: rgba(255,255,255,0.1);
                    border: 1px solid rgba(255,255,255,0.2);
                    color: #ccc;
                    padding: 6px 15px;
                    border-radius: 20px;
                    font-size: 0.85rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(5px);
                }

                .lang-btn.active {
                    background: #e50914;
                    border-color: #e50914;
                    color: white;
                    box-shadow: 0 0 15px rgba(229, 9, 20, 0.4);
                }

                .help-hero-content h1 {
                    font-size: clamp(2rem, 6vw, 3.5rem);
                    margin-bottom: 10px;
                    font-weight: 800;
                    letter-spacing: -1px;
                }

                .help-hero-content p {
                    font-size: 1.1rem;
                    color: #ccc;
                    margin-bottom: 30px;
                }

                .help-search-container {
                    background: white;
                    padding: 12px 25px;
                    border-radius: 50px;
                    display: flex;
                    align-items: center;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
                    max-width: 600px;
                    margin: 0 auto;
                }

                .help-search-icon {
                    color: #666;
                    font-size: 1.5rem;
                    margin-right: 15px;
                }

                .help-search-container input {
                    border: none;
                    outline: none;
                    width: 100%;
                    font-size: 1.05rem;
                    color: #333;
                    background: transparent;
                }

                .help-main-container {
                    position: relative;
                    z-index: 10;
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 60px 20px;
                }

                .help-faq-section {
                    margin-bottom: 80px;
                }

                .section-title {
                    text-align: center;
                    font-size: 2.5rem;
                    margin-bottom: 50px;
                    font-weight: 800;
                }

                .faq-category-group {
                    margin-bottom: 60px;
                }

                .faq-category-title {
                    font-size: 1.8rem;
                    color: #fff;
                    margin-bottom: 25px;
                    padding-bottom: 4px;
                    border-bottom: 1px solid #e50914;
                    display: block;
                    width: 100%;
                }

                .faq-items-wrapper {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .faq-item {
                    border: none;
                    background: transparent;
                    transition: all 0.3s ease;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }

                .faq-item:last-child {
                    border-bottom: none;
                }

                .faq-question {
                    padding: 15px 0;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    font-size: 1.2rem;
                    font-weight: 500;
                    color: #fff;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .faq-indicator {
                    color: #e50914;
                    font-size: 1.2rem;
                    transition: transform 0.3s ease;
                    flex-shrink: 0;
                }

                .faq-item.active .faq-indicator {
                    transform: rotate(90deg);
                }

                .faq-item.active .faq-question span {
                    color: #e50914;
                }

                .faq-arrow {
                    display: none;
                }

                .faq-item.active .faq-arrow {
                    transform: rotate(180deg);
                }

                .faq-answer {
                    max-height: 0;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    background: transparent;
                }

                .faq-item.active .faq-answer {
                    max-height: 500px;
                }

                .faq-answer-content {
                    padding: 0 0 20px 32px;
                }

                .faq-answer p {
                    color: #ccc;
                    line-height: 1.8;
                    font-size: 1.05rem;
                    white-space: pre-line;
                }

                .help-contact-section {
                    margin-bottom: 60px;
                }

                .contact-card {
                    background: linear-gradient(135deg, rgba(229, 9, 20, 0.1), rgba(0, 0, 0, 0.5));
                    border: 1px solid rgba(229, 9, 20, 0.3);
                    border-radius: 30px;
                    padding: 60px 40px;
                    text-align: center;
                    backdrop-filter: blur(20px);
                }

                .contact-card h2 {
                    font-size: 2.2rem;
                    margin-bottom: 15px;
                }

                .contact-card p {
                    color: #ccc;
                    margin-bottom: 40px;
                    font-size: 1.1rem;
                }

                .contact-options {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 20px;
                }

                .contact-btn {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 15px 30px;
                    border-radius: 50px;
                    background: var(--btn-color);
                    color: white;
                    text-decoration: none;
                    font-weight: 600;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                }

                .contact-btn:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 30px rgba(0,0,0,0.4);
                }

                .btn-icon {
                    font-size: 1.3rem;
                }

                .help-footer-notice {
                    text-align: center;
                    color: #666;
                    font-size: 0.9rem;
                    padding-top: 40px;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                }

                .help-footer-notice a {
                    color: #e50914;
                    text-decoration: none;
                }

                @media (max-width: 768px) {
                    .help-hero {
                        height: auto;
                        min-height: 45vh;
                        padding-top: 100px;
                        padding-bottom: 40px;
                    }

                    .lang-toggle-container {
                        margin-top: 60px;
                    }

                    .help-main-container {
                        padding: 40px 15px;
                    }

                    .contact-card {
                        padding: 30px 20px;
                    }

                    .contact-card h2 {
                        font-size: 1.3rem;
                        margin-bottom: 8px;
                    }

                    .contact-card p {
                        font-size: 0.85rem;
                        margin-bottom: 25px;
                    }

                    .contact-btn {
                        width: 100%;
                        justify-content: center;
                        padding: 8px 15px;
                        font-size: 0.85rem;
                    }

                    .faq-question {
                        font-size: 0.95rem;
                        padding: 10px 0;
                        gap: 10px;
                    }

                    .faq-indicator {
                        font-size: 0.9rem;
                    }

                    .faq-answer-content {
                        padding: 0 0 15px 22px;
                    }

                    .faq-answer p {
                        font-size: 0.9rem;
                    }

                    .section-title {
                        font-size: 1.8rem;
                        margin-bottom: 30px;
                    }

                    .faq-category-title {
                        font-size: 1.3rem;
                        margin-bottom: 15px;
                        padding-bottom: 2px;
                        width: 100%;
                    }

                    .faq-category-group {
                        margin-bottom: 40px;
                    }

                    .help-search-container {
                        padding: 10px 20px;
                    }

                    .help-search-container input {
                        font-size: 0.9rem;
                    }
                }
            ` }} />
        </div>
    );
};

export default HelpCenter;
