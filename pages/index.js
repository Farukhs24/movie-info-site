import Link from 'next/link';

export async function getStaticProps() {
  const API_KEY = process.env.TMDB_API_KEY;  // Use environment variable for security
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  );
  const data = await res.json();

  return {
    props: {
      movies: data.results,
    },
  };
}

const HomePage = ({ movies }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
    {movies.map((movie) => (
      <div key={movie.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
        <h3>{movie.title}</h3>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{ width: '100%', height: 'auto' }}
        />
        <Link href={`/movie/${movie.id}`}>
          <a>Read More</a>
        </Link>
      </div>
    ))}
  </div>
);

export default HomePage;