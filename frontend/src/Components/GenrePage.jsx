import { useEffect, useState } from 'react';

export default function GenrePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sanityResponse = await fetch('https://o9tavwx2.api.sanity.io/v1/data/query/movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer sk0EFmQ5LvIy6dAbCyLZenXHNmihZtMmVlXxPnDjWMcx8HP75BV0vwGpWgIFFBK4flk56xkPNy1KsGvCQjz8KZIxSCyK3hsqSnnhxGKUCw5QKcNBvUwg5iT9ahVAxjK7R8n350KQK8QrEyFEaw2f6LTbKxWe4rxl4zGJIB4OZQ8kYdq9wqio',
          },
          body: JSON.stringify({
            query: '*[_type == "movie"]{title, slug, id, url}',
          }),
        });

        if (!sanityResponse.ok) {
          throw new Error('Sanity.io: Network response was not ok');
        }

        const sanityData = await sanityResponse.json();
        console.log('Sanity Data:', sanityData);

        if (sanityData.result) {
          setMovies(sanityData.result);
        } else {
          console.error('Sanity Data: Result is undefined');
        }

        await Promise.all(
          sanityData.results.map(async (movie) => {
            const movieSlug = movie.slug;

            const rapidApiResponse = await fetch(`https://moviesdatabase.p.rapidapi.com/titles/search/title/${movieSlug}?exact=true&titleType=movie`, {
              method: 'GET',
              headers: {
                'X-RapidAPI-Key': '9f75e199fdmsh83cedb74debc28bp168dbajsnc177f705dfed',
                'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
              }
            });

            if (!rapidApiResponse.ok) {
              throw new Error(`RapidAPI: Network response was not ok for ${movieSlug}`);
            }

            const rapidApiData = await rapidApiResponse.json();
            const primaryImageUrl = rapidApiData.results[0].primaryImage.url;
            console.log(`RapidAPI Result for ${movieSlug}:`, primaryImageUrl);
          })
        );
      } catch (error) {
        console.error('Error:', error);
        setError('Error fetching movies. Please try again later.');
      }
    };

    fetchData();
  }, []);

  console.log('Movies:', movies);

  return (
    <div>
      <section>
        {movies && movies.map((movie, index) => (
          <article key={index}>
            {movie.primaryImage && (
              <img src={movie.primaryImage.url} alt={movie.title} />
            )}
            <h3>{movie.title}</h3>
          </article>
        ))}
      </section>
      {error && <p>Error: {error}</p>}
    </div>
  );
}
