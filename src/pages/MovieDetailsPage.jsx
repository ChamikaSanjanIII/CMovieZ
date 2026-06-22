import { useParams, useNavigate } from 'react-router-dom';
import MovieDetails from '../components/MovieDetails';
import useSEO from '../hooks/useSEO';
import NotFound from './NotFound';

const MovieDetailsPage = ({ allMovies, onDownload }) => {
    const { slug } = useParams();
    const navigate = useNavigate();

    // SEO-friendly slug වලින් movie එක හොයාගන්න (Suffix එක අයින් කරලත් බලනවා)
    const cleanSlug = slug.replace('-with-sinhala-subtitles', '').replace('-sinhala-subtitles', '').replace('-sinhala-sub', '');
    const movie = allMovies.find(m => {
        const movieSlug = String(m.slug || m.id);
        return movieSlug === slug || movieSlug === cleanSlug;
    });

    const seoTitle = movie ? `${movie.title} with Sinhala Subtitles` : 'Details';
    const seoDescription = movie
        ? `Download ${movie.title} (${movie.year}) full movie with Sinhala Subtitles. Get ${movie.title} Sinhala subbed movie in high quality for free on CMoviez.`
        : 'Loading movie details...';
    const seoKeywords = movie
        ? `${movie.title} with sinhala subtitles, ${movie.title} sinhala sub, ${movie.title} baiscope, ${movie.title} cineru, ${movie.title} sinesub, ${movie.title} zoom, download ${movie.title} sinhala subtitles, ${movie.title} sinhala subbed, sinhala sub movies, ${movie.title} sin sub, ${movie.title} sinsub, cmoviez ${movie.title}, new sinhala sub movies`
        : 'movies, tv shows, animation, sinhala subtitles, sinhala sub, cineru, baiscope, sinesub, zoom';

    useSEO({
        title: seoTitle,
        description: seoDescription,
        keywords: seoKeywords,
        image: movie ? movie.poster : '',
        url: window.location.href,
        type: 'video.movie',
        structuredData: movie ? {
            "@context": "https://schema.org",
            "@type": "Movie",
            "name": `${movie.title} with Sinhala Subtitles`,
            "description": seoDescription,
            "image": movie.poster,
            "datePublished": movie.year
        } : null
    });

    if (!movie) {
        return <NotFound />;
    }

    return <MovieDetails movie={movie} onBack={() => navigate(-1)} onDownload={onDownload} />;
};

export default MovieDetailsPage;
