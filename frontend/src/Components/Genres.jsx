import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar as fas, faStar as far } from '@fortawesome/free-solid-svg-icons'
import { faStar as fab } from '@fortawesome/free-regular-svg-icons'

export default function Genres() {
  const [genres, setGenres] = useState([])
  const [error, setError] = useState(null)
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [movies, setMovies] = useState([])
  const [isStarSolid, setisStarSolid] = useState([])
  library.add(fab, fas, far)

  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await fetch('https://o9tavwx2.api.sanity.io/v1/data/query/movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer sk0EFmQ5LvIy6dAbCyLZenXHNmihZtMmVlXxPnDjWMcx8HP75BV0vwGpWgIFFBK4flk56xkPNy1KsGvCQjz8KZIxSCyK3hsqSnnhxGKUCw5QKcNBvUwg5iT9ahVAxjK7R8n350KQK8QrEyFEaw2f6LTbKxWe4rxl4zGJIB4OZQ8kYdq9wqio',
          },
          body: JSON.stringify({
            query: '*[_type == "kategori"]{_id, Genre, "movies": *[_type == "movie" && references(^._id)]{_id, title}}',
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to fetch genre info')
        }

        const userData = await response.json()
        setGenres(userData.result)
        setisStarSolid(new Array(userData.result.length).fill(false))
      } catch (error) {
        console.error('Error', error)
        setError(error.message)
      }
    }

    fetchGenres()
  }, [])

  const toggleStar = (index) => {
    const updatedStars = [...isStarSolid]
    updatedStars[index] = !updatedStars[index]
    setisStarSolid(updatedStars)
  }

  const genClick = async (genre) => {
    setSelectedGenre(genre)
    try {
      const response = await fetch('https://o9tavwx2.api.sanity.io/v1/data/query/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer sk0EFmQ5LvIy6dAbCyLZenXHNmihZtMmVlXxPnDjWMcx8HP75BV0vwGpWgIFFBK4flk56xkPNy1KsGvCQjz8KZIxSCyK3hsqSnnhxGKUCw5QKcNBvUwg5iT9ahVAxjK7R8n350KQK8QrEyFEaw2f6LTbKxWe4rxl4zGJIB4OZQ8kYdq9wqio',
        },
        body: JSON.stringify({
          query: '*[_type == "kategori" && Genre == $genre]{_id, Genre, "movies": *[_type == "movie" && references(^._id)]{_id, title}}',
          params: { genre: genre.Genre },
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch movies for the selected genre')
      }

      const genreData = await response.json()
      setMovies(genreData.result[0]?.movies || [])
    } catch (error) {
      console.error('Error fetching movies:', error)
      setError(error.message)
    }
  }

  return (
    <>
      <h1 id='sjanger-overskrift'>Genres</h1>
      {error && <p>{error}</p>}
      <ul>
        {genres.map((genre, index) => (
          <li key={genre._id}>
            <button onClick={() => genClick(genre)}>
              {genre.Genre}
              <FontAwesomeIcon icon={isStarSolid[index] ? fas : fab} />
            </button>
          </li>
        ))}
      </ul>
      <div>
        {selectedGenre && (
          <>
            <h2>{selectedGenre.Genre}</h2>
            <ul>
              {movies.map((movie) => (
                <li key={movie._id}>{movie.title}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  )
}