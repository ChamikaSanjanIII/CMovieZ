import { useParams, useNavigate } from 'react-router-dom';
import EpisodeDetails from '../components/EpisodeDetails';
import useSEO from '../hooks/useSEO';
import NotFound from './NotFound';

const EpisodeDetailsPage = ({ allMovies, onDownload }) => {
    const { slug, season, episode } = useParams();
    const navigate = useNavigate();

    const series = allMovies.find(m => {
        const movieSlug = String(m.slug || m.id);
        const cleanSlug = slug.replace('-with-sinhala-subtitles', '').replace('-sinhala-subtitles', '').replace('-sinhala-sub', '');
        return movieSlug === slug || movieSlug === cleanSlug;
    });
    const seasonData = series?.seasons?.find(s => String(s.number) === season);
    const episodeData = seasonData?.episodes?.find((ep, idx) => {
        const currentEpNum = String(ep.episode || idx + 1);
        return currentEpNum === episode || parseInt(currentEpNum) === parseInt(episode);
    });

    const seoTitle = series ? `${series.title} Season ${season} Episode ${episode} with Sinhala Subtitles` : 'Episode Details';
    const seoDescription = series
        ? `Download ${series.title} Season ${season} Episode ${episode} with Sinhala Subtitles. Get the latest episodes for ${series.title} with Sinhala subs for free on CMoviez.`
        : 'Loading episode details...';
    const seoKeywords = series 
        ? `${series.title} season ${season} episode ${episode} with sinhala subtitles, ${series.title} sinhala sub, ${series.title} baiscope, ${series.title} cineru, ${series.title} sinesub, download ${series.title} s${season}e${episode} sinhala sub, cmoviez ${series.title}, latest tv shows sinhala sub`
        : 'tv shows, episodes, sinhala subtitles, sinhala sub, baiscope, cineru, sinesub';

    useSEO({
        title: seoTitle,
        description: seoDescription,
        keywords: seoKeywords,
        image: series ? (episodeData?.thumbnail || series.backdrop || series.poster) : '',
        url: window.location.href,
        type: 'video.episode'
    });

    if (!series || !episodeData) {
        return <NotFound />;
    }

    return (
        <EpisodeDetails
            series={series}
            seasonNum={season}
            episodeNum={episode}
            episode={episodeData}
            onBack={() => navigate(-1)}
            onDownload={onDownload}
        />
    );
};

export default EpisodeDetailsPage;
