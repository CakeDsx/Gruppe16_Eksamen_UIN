import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

export default function MovieCard() {
  library.add(fab, fas, far)
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://o9tavwx2.api.sanity.io/v1/data/query/movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer sk0EFmQ5LvIy6dAbCyLZenXHNmihZtMmVlXxPnDjWMcx8HP75BV0vwGpWgIFFBK4flk56xkPNy1KsGvCQjz8KZIxSCyK3hsqSnnhxGKUCw5QKcNBvUwg5iT9ahVAxjK7R8n350KQK8QrEyFEaw2f6LTbKxWe4rxl4zGJIB4OZQ8kYdq9wqio',
          },
          body: JSON.stringify({
            query: '*[_type == "movie"]{title, slug, id, url}',
          }),
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        setMovies(data.result)
      } catch (error) {
        console.error('There was a problem fetching movies:', error)
        setError('Error fetching movies. Please try again later.')
      }
    }

    fetchMovies()
  }, [])

  return (
    <div>
      <h2>Movies</h2>
      {error ? (
        <div>{error}</div>
      ) : (
        <section>
          {movies.map((movie, index) => (
            <article key={index}>
              <Link to={`https://www.imdb.com/title/${movie.id}`} target="_blank" alt={movie.title}>
                {movie.url && (
                  <img src={movie.url} alt={movie.title} />
                )}
                <h3>{movie.title}</h3>
              </Link>
              <FontAwesomeIcon icon="fa-regular fa-star" />
              <FontAwesomeIcon icon="fa-solid fa-star" />
            </article>
          ))}
        </section>
      )}
    </div>
  )
}
