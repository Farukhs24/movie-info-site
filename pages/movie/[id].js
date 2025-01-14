export async function getStaticProps({ params }) {
  const API_KEY = process.env.TMDB_API_KEY;  // Use environment variable for security
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?api_key=${API_KEY}&language=en-US`
  );
  const movie = await res.json();

  return {
    props: {
      movie,
    },
  };
}

export async function getStaticPaths() {
  const API_KEY = process.env.TMDB_API_KEY;  // Use environment variable for security
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  );
  const data = await res.json();

  const paths = data.results.map((movie) => ({
    params: { id: movie.id.toString() },
  }));

  return { paths, fallback: false };
}

const MoviePage = ({ movie }) => (
  <div>
    <h1>{movie.title}</h1>
    <img
      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      alt={movie.title}
      style={{ width: '100%', height: 'auto' }}
    />
    <p>{movie.overview}</p>
    <p>Release Date: {movie.release_date}</p>
    <p>Rating: {movie.vote_average}/10</p>
  </div>
);

export default MoviePage;