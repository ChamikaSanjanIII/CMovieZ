import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PiArrowLeftLight, PiCalendarBlankLight, PiClockLight, PiBookOpenLight, PiWarningCircleLight, PiCheckCircleLight, PiGearLight } from 'react-icons/pi';
import useSEO from '../hooks/useSEO';

const blogPosts = [
    {
        slug: 'how-to-add-subtitles-in-vlc-player',
        title: "VLC Media Player එකෙන් සිංහල උපසිරැසි සමඟ ෆිල්ම් බලන ආකාරය",
        description: "PC, Android සහ iOS උපාංග වලදී VLC player එක භාවිතයෙන් ඕනෑම චිත්‍රපටයකට හෝ ටෙලි කතාවකට උපසිරැසි එක් කර නරඹන ආකාරය පියවරෙන් පියවර ඉගෙන ගනිමු.",
        category: "Guides",
        date: "2026-06-12",
        readTime: "5 min read",
        content: (
            <div className="article-body">
                <p>වර්තමානයේ ලෝකයේ ජනප්‍රියතම සහ භාවිතයට පහසුම මීඩියා ප්ලේයර් එකක් තමයි VLC Media Player එක කියන්නේ. මෙහිදී බාහිරින් ඩවුන්ලෝඩ් කරන ලද සිංහල උපසිරැසි (.srt ෆයිල්ස්) වීඩියෝවට එක් කර නරඹන්නේ කෙසේද කියා උපාංග අනුව පියවරෙන් පියවර අපි බලමු.</p>

                <div className="info-alert info">
                    <PiWarningCircleLight className="alert-icon" />
                    <div>
                        <strong>වැදගත්:</strong> ඔබ බාගත කරගත් උපසිරැසි ගොනුව සාමාන්‍යයෙන් <code>.zip</code> හෝ <code>.rar</code> ගොනුවක් ලෙස තිබිය හැක. මුලින්ම එය Extract කර <code>.srt</code> ගොනුව ලබා ගන්න.
                    </div>
                </div>

                <h2>1. පරිගණකයකදී (Windows / macOS) උපසිරැසි එක් කිරීම</h2>
                
                <div className="step-card">
                    <div className="step-header">
                        <div className="step-number">01</div>
                        <h3>පහසුම ක්‍රමය: Drag and Drop</h3>
                    </div>
                    <p>පළමුව ඔබ නරඹන චිත්‍රපටය හෝ කථාංගය VLC Player එක හරහා ක්‍රියාත්මක කරන්න. ඉන්පසුව ලබාගත් <code>.srt</code> උපසිරැසි ගොනුව මවුසයෙන් ක්ලික් කර අල්ලාගෙන (Drag) ක්‍රියාත්මක වන VLC window එක මතට දමන්න (Drop).</p>
                </div>

                <div className="step-card">
                    <div className="step-header">
                        <div className="step-number">02</div>
                        <h3>මැනුවල් ක්‍රමය (Manual Method)</h3>
                    </div>
                    <p>VLC Player එකෙහි ඉහළ මෙනු තීරුවේ ඇති <strong>Subtitle</strong> ක්ලික් කරන්න. ඉන්පසු <strong>Add Subtitle File...</strong> තෝරා, ඔබගේ පරිගණකයේ ඇති <code>.srt</code> උපසිරැසි ගොනුව තෝරා දෙන්න.</p>
                </div>

                <div className="step-card">
                    <div className="step-header">
                        <div className="step-number">03</div>
                        <h3>ස්වයංක්‍රීයව ලෝඩ් වන ක්‍රමය</h3>
                    </div>
                    <p>වීඩියෝ ෆයිල් එක සහ <code>.srt</code> උපසිරැසි ෆයිල් එක එකම ෆෝල්ඩරයක් තුළ තබා, <strong>දෙකටම එකම නම ලබා දෙන්න</strong> (උදා: <i>MovieName.mp4</i> සහ <i>MovieName.srt</i>). එවිට වීඩියෝව ප්ලේ කරද්දීම සබ්ටයිටල් ඉබේම ක්‍රියාත්මක වේ.</p>
                </div>

                <h2>2. ජංගම දුරකථන වලදී (Android / iOS) උපසිරැසි එක් කිරීම</h2>
                
                <div className="step-card">
                    <div className="step-header">
                        <div className="step-number">01</div>
                    </div>
                    <p>මුලින්ම VLC mobile app එකෙන් අදාළ වීඩියෝව ප්ලේ කරන්න.</p>
                </div>
                <div className="step-card">
                    <div className="step-header">
                        <div className="step-number">02</div>
                    </div>
                    <p>තිරයේ වම්පස පහළ කෙළවරේ ඇති <strong>Subtitle/Audio icon</strong> එක (කුඩා message bubble එකක් බඳු) ටැප් කරන්න.</p>
                </div>
                <div className="step-card">
                    <div className="step-header">
                        <div className="step-number">03</div>
                    </div>
                    <p>එහි ඇති drop-down එකෙන් <strong>Select subtitle file</strong> තෝරා, ඔබ දුරකථනයට ඩවුන්ලෝඩ් කරගත් <code>.srt</code> ෆයිල් එක තෝරා දෙන්න.</p>
                </div>

                <div className="info-alert tips">
                    <PiGearLight className="alert-icon" />
                    <div>
                        <strong>ටිප් එකක්: Subtitle Delay හදන්නෙ කොහොමද?</strong><br />
                        උපසිරැසි සහ හඬ (audio) නොගැලපේ නම්, පරිගණකයේදී කීබෝඩ් එකේ <code>G</code> සහ <code>H</code> කීස් (keys) භාවිතා කර උපසිරැසි තත්පර කිහිපයක් ඉදිරියට හෝ පසුපසට කර Sync කරගත හැක.
                    </div>
                </div>
            </div>
        )
    },
    {
        slug: 'how-to-watch-softcoded-subtitles',
        title: "Softcoded Subtitles (Softcode කරන ලද උපසිරැසි) ක්‍රියාත්මක කරගන්නා ආකාරය",
        description: "වීඩියෝ ෆයිල් එක තුළටම බද්ධ කර ඇති Softcoded උපසිරැසි යනු මොනවාද? ඒවා සක්‍රීය කර ගන්නේ සහ භාෂාවන් මාරු කර ගන්නේ කෙසේද කියා බලමු.",
        category: "Guides",
        date: "2026-06-12",
        readTime: "4 min read",
        content: (
            <div className="article-body">
                <p>වර්තමානයේ අන්තර්ජාලයෙන් බාගත කරන බොහෝ උසස් තත්වයේ චිත්‍රපට හෝ ටීවී සිරිස් <code>MKV</code> හෝ <code>MP4</code> මාධ්‍යයන්ගෙන් යුක්ත වේ. මෙහිදී බාහිරින් උපසිරැසි ෆයිල්ස් ඩවුන්ලෝඩ් කිරීමට අවශ්‍ය නොවන සේ වීඩියෝ ෆයිල් එක තුළම උපසිරැසි බද්ධ කර තිබීම <strong>Softcoded Subtitles</strong> ලෙස හැඳින්වේ.</p>

                <h2>Softcoded උපසිරැසි වල ඇති වාසි මොනවාද?</h2>
                <ul>
                    <li>වෙන වෙනම <code>.srt</code> ගොනු බාගත කර ගැනීමට අවශ්‍ය නොවීම.</li>
                    <li>එක් වීඩියෝ එකක් තුළ භාෂා කිහිපයක උපසිරැසි අඩංගු කළ හැකි වීම (සිංහල, ඉංග්‍රීසි, දෙමළ ආදී වශයෙන්).</li>
                    <li>උපසිරැසි වල ප්‍රමාණය හෝ අකුරු (font) අපට අවශ්‍ය ලෙස වෙනස් කිරීමට ඇති හැකියාව (Hardcoded සබ්ටයිටල් වල මෙය කළ නොහැක).</li>
                </ul>

                <h2>Softcoded උපසිරැසි සක්‍රීය කර ගන්නේ කෙසේද?</h2>
                
                <div className="step-card">
                    <div className="step-header">
                        <div className="step-number">01</div>
                        <h3>VLC Player (PC) හරහා</h3>
                    </div>
                    <p>වීඩියෝව ප්ලේ වෙද්දී, වීඩියෝව මත <strong>Right-Click</strong> කරන්න. ඉන්පසු <strong>Subtitle ➔ Sub Track</strong> වෙත ගොස් එහි ඇති <strong>Sinhala</strong> හෝ <strong>English</strong> තෝරා ගන්න.</p>
                </div>

                <div className="step-card">
                    <div className="step-header">
                        <div className="step-number">02</div>
                        <h3>MX Player (Android Mobile) හරහා</h3>
                    </div>
                    <p>වීඩියෝව ප්ලේ වන විට තිරයේ ඉහළ දකුණු කෙළවරේ ඇති <strong>'Sub' (Subtitle) icon</strong> එක ක්ලික් කරන්න. එහි ඇති සබ්ටයිටල් ලැයිස්තුවෙන් අදාළ උපසිරැසිය සක්‍රීය කිරීමට හරි ලකුණ (tick) යොදන්න.</p>
                </div>

                <div className="step-card">
                    <div className="step-header">
                        <div className="step-number">03</div>
                        <h3>Smart TV සහ වෙනත් Devices</h3>
                    </div>
                    <p>ඔබගේ TV Remote එකෙහි ඇති <strong>Subtitle</strong> හෝ <strong>CC (Closed Captions)</strong> බටන් එක ක්ලික් කිරීමෙන් වීඩියෝව තුළ ඇති උපසිරැසි සක්‍රීය කරගත හැක.</p>
                </div>

                <div className="info-alert success">
                    <PiCheckCircleLight className="alert-icon" />
                    <div>
                        <strong>දැනුවත් වීම:</strong> CMoviez වෙබ් අඩවියෙන් ලබාදෙන බොහෝ ලිපිගොනු වල සිංහල උපසිරැසි Softcode කර අමුණා ඇති බැවින් ඉහත ක්‍රම මඟින් ඒවා පහසුවෙන්ම ක්‍රියාත්මක කරගත හැක!
                    </div>
                </div>
            </div>
        )
    },
    {
        slug: 'how-to-create-subtitles-from-scratch',
        title: "මූලික පියවරේ සිට සිංහල උපසිරැසි (SRT Subtitles) නිර්මාණය කරන්නේ කෙසේද?",
        description: "ඔබත් උපසිරැසි ගැන්වීමට කැමතිද? Subtitle Edit මෘදුකාංගය භාවිතයෙන් වීඩියෝවකට නිවැරදිව කාලරාමු (timestamps) සකසමින් උපසිරැසි නිර්මාණය කරන ආකාරය ඉගෙන ගනිමු.",
        category: "Creation",
        date: "2026-06-12",
        readTime: "7 min read",
        content: (
            <div className="article-body">
                <p>චිත්‍රපටයකට හෝ ටෙලි කතාවකට උපසිරැසි නිර්මාණය කිරීම යනු කලාත්මක මෙන්ම ඉවසීමක් අවශ්‍ය වන ක්‍රියාවලියකි. මේ සඳහා අපට භාවිත කළ හැකි හොඳම සහ නොමිලේ ලැබෙන මෘදුකාංගයක් තමයි <strong>Subtitle Edit</strong> කියන්නේ. අපි බලමු සරලවම උපසිරැසියක් නිර්මාණය කරගන්නේ කොහොමද කියලා.</p>

                <h2>පළමු පියවර: මෘදුකාංග සූදානම් කර ගැනීම</h2>
                <p>උපසිරැසි නිර්මාණය කිරීමට ප්‍රධාන වශයෙන් අවශ්‍ය වන්නේ:</p>
                <ul>
                    <li><strong>Subtitle Edit</strong> මෘදුකාංගය (නොමිලේ බාගත කර ගත හැක).</li>
                    <li>ඔබ උපසිරැසි ගැන්වීමට බලාපොරොත්තු වන අදාළ <strong>වීඩියෝ පටය</strong>.</li>
                    <li>චිත්‍රපටයේ ඇති දෙබස් පරිවර්තනය කිරීමට අවශ්‍ය නම්, එහි <strong>English SRT උපසිරැසි ගොනුව</strong> (විකල්පයකි).</li>
                </ul>

                <h2>පියවරෙන් පියවර උපසිරැසි ගැන්වීම</h2>
                
                <div className="step-card">
                    <div className="step-header">
                        <div className="step-number">01</div>
                        <h3>වීඩියෝව ඇතුළත් කිරීම</h3>
                    </div>
                    <p>Subtitle Edit මෘදුකාංගය විවෘත කර <strong>Video ➔ Open video file...</strong> වෙත ගොස් ඔබගේ වීඩියෝ ගොනුව තෝරා එක් කර ගන්න. එවිට එහි Waveform (ශබ්ද තරංග) දර්ශනය වන පහළ තීරුවක් නිර්මාණය වේ.</p>
                </div>

                <div className="step-card">
                    <div className="step-header">
                        <div className="step-number">02</div>
                        <h3>කාලරාමු (Timestamps) සැකසීම</h3>
                    </div>
                    <p>වීඩියෝවේ දෙබසක් ආරම්භ වන විට Waveform එක මත මවුසයෙන් ක්ලික් කර ඇද, දෙබස අවසන් වන තැන දක්වා සිලෙක්ට් කරන්න. ඉන්පසු <strong>Right-Click ➔ Add text here</strong> ක්ලික් කරන්න. එවිට නිවැරදි කාලරාමුවක් සෑදේ.</p>
                </div>

                <div className="step-card">
                    <div className="step-header">
                        <div className="step-number">03</div>
                        <h3>සිංහල දෙබස ඇතුළත් කිරීම</h3>
                    </div>
                    <p>දැන් අලුතින් සැකසූ කාලරාමුවට අදාළව ඇති Text box එක තුළ සිංහල දෙබස ටයිප් කරන්න. ඉංග්‍රීසි උපසිරැසියක් බලාගෙන පරිවර්තනය කරන්නේ නම්, ඉංග්‍රීසි දෙබස කියවා ඊට ගැලපෙන සිංහල දෙබස ලියන්න.</p>
                </div>

                <h2>SRT ගොනුවක් යනු කුමක්ද?</h2>
                <p>උපසිරැසියක් පරිගණකයක සේව් වන්නේ <code>.srt</code> (SubRip Subtitle) ගොනුවක් ලෙසයි. එහි ව්‍යුහය පහත පරිදි සරල වේ:</p>
                
                <pre className="code-block">
{`1
00:01:20,000 --> 00:01:23,500
ආයුබෝවන් මිතුරනි! (Hello friends!)

2
00:01:24,200 --> 00:01:27,800
අද මම ඔබට උපසිරැසි නිර්මාණය ගැන කියා දෙනවා.`}
                </pre>

                <div className="info-alert info">
                    <PiWarningCircleLight className="alert-icon" />
                    <div>
                        <strong>වැදගත් කරුණක්:</strong> සිංහල අකුරු නිවැරදිව ප්ලේයර්ස් වල දිස්වීමට නම්, සේව් කිරීමේදී Encoding එක සැමවිටම <strong>UTF-8</strong> ලෙස තෝරා ගැනීමට අමතක නොකරන්න.
                    </div>
                </div>
            </div>
        )
    }
];

const Blog = () => {
    const { postSlug } = useParams();
    const navigate = useNavigate();
    const post = blogPosts.find(p => p.slug === postSlug);

    useSEO({
        title: post ? `${post.title} - CMovieZ Blog` : 'Help & Subtitle Blog - CMovieZ',
        description: post ? post.description : 'Read guides and tutorials on how to watch movies with Sinhala subtitles, setup VLC player, and create subtitles.',
        url: window.location.href
    });

    if (postSlug && !post) {
        return (
            <div className="page-fade-in" style={{ paddingTop: '150px', textAlign: 'center', minHeight: '60vh' }}>
                <h2>Article not found</h2>
                <Link to="/blog" className="btn-show-more" style={{ display: 'inline-block', marginTop: '20px', textDecoration: 'none' }}>Back to Blog</Link>
            </div>
        );
    }

    if (post) {
        return (
            <div className="page-fade-in blog-detail-page" style={{ paddingTop: '100px', paddingBottom: '90px' }}>
                <div className="article-container">
                    <button onClick={() => navigate('/blog')} className="btn-back">
                        <PiArrowLeftLight /> Back to Blog
                    </button>
                    
                    <header className="article-header">
                        <span className="article-category">{post.category}</span>
                        <h1 className="article-title">{post.title}</h1>
                        
                        <div className="article-meta">
                            <span className="meta-item">
                                <PiCalendarBlankLight /> {post.date}
                            </span>
                            <span className="meta-item">
                                <PiClockLight /> {post.readTime}
                            </span>
                        </div>
                    </header>
                    
                    {post.content}
                </div>
            </div>
        );
    }

    return (
        <div className="page-fade-in blog-page" style={{ paddingTop: '100px', paddingBottom: '90px' }}>
            <div className="blog-header" style={{ padding: '0 4%', marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <span className="blog-subtitle"><PiBookOpenLight /> CMOVIEZ BLOG</span>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '15px' }} className="blog-title-main">Subtitle Help & Guides</h1>
                <p style={{ fontSize: '0.95rem', color: '#ccc', maxWidth: '800px', lineHeight: '1.6' }} className="blog-desc-main">
                    චිත්‍රපට සහ කතා මාලා සඳහා සිංහල උපසිරැසි නිවැරදිව භාවිත කරන ආකාරය, ප්ලේයර්ස් වල ගැටළු නිරාකරණය කරගන්නා ආකාරය සහ උපසිරැසි නිර්මාණය පිළිබඳ සවිස්තරාත්මක මාර්ගෝපදේශ මෙතැනින් කියවන්න.
                </p>
            </div>

            <main className="content" style={{ padding: '0 4%' }}>
                <div className="blog-grid">
                    {blogPosts.map(p => (
                        <Link to={`/blog/${p.slug}`} key={p.slug} className="blog-card">
                            <div className="blog-card-content">
                                <span className="blog-card-category">{p.category}</span>
                                <h2 className="blog-card-title">{p.title}</h2>
                                <p className="blog-card-desc">{p.description}</p>
                                <div className="blog-card-meta">
                                    <span><PiCalendarBlankLight /> {p.date}</span>
                                    <span><PiClockLight /> {p.readTime}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Blog;
