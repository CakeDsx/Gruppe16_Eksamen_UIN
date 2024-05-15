import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

function MovieCard({ userId }) {
  library.add(fab, fas, far)
  const [favoriteMovies, setFavoriteMovies] = useState([])
  
  useEffect(() => {
    async function fetchFavoriteMovies() {
      try {
        const response = await fetch(`https://o9tavwx2.api.sanity.io/v1/data/query/movies?userId=${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer sk0EFmQ5LvIy6dAbCyLZenXHNmihZtMmVlXxPnDjWMcx8HP75BV0vwGpWgIFFBK4flk56xkPNy1KsGvCQjz8KZIxSCyK3hsqSnnhxGKUCw5QKcNBvUwg5iT9ahVAxjK7R8n350KQK8QrEyFEaw2f6LTbKxWe4rxl4zGJIB4OZQ8kYdq9wqio',
          },
          body: JSON.stringify({
            query: '*[_type == "Users" && _id == $userId][0].favoriteMovies',
            params: { userId },
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to fetch favorite movies')
        }

        const data = await response.json()
        setFavoriteMovies(data.result)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchFavoriteMovies()
  }, [userId])

  return (
    <>
      <section id='user-movies'>
        <h1 id='overskrift'>Brukernavn sine filmer</h1>
        <h2><FontAwesomeIcon icon="fa-solid fa-star" /> Filmer jeg skal se!</h2>
        <p>Disse filmene ligger i ønskelisten din:</p>
        {favoriteMovies.map((movie, index) => (
          <article key={index}>
            {movie.image && <img src={movie.image} alt={movie.title} />}
            <h3>{movie.title}</h3>
            <FontAwesomeIcon icon="fa-regular fa-star" />
            <FontAwesomeIcon icon="fa-solid fa-star" />
          </article>
        ))}
      </section>
      <section id='users'>
        <h2>Jeg skal se sammen med ...</h2>
        <ul>
          <li>Brukernavn</li>
          <li>Brukernavn</li>
        </ul>
      </section>
    </>
  )
}

export default MovieCard
