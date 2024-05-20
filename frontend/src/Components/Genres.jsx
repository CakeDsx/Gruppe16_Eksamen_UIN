import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar as fas, faStar as far } from '@fortawesome/free-solid-svg-icons'
import { faStar as fab } from '@fortawesome/free-regular-svg-icons'

export default function Genres() {
  const [genres, setGenres] = useState([])
  const [error, setError] = useState(null) //this we use to check if errors appear while testing. 
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [movies, setMovies] = useState([])
  const [isStarSolid, setisStarSolid] = useState([])
  library.add(fab, fas, far) //this is simlply here to add a button that we didnt really get workign but will be explained in the document. 

  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await fetch('https://o9tavwx2.api.sanity.io/v1/data/query/movies', { //fetches the info from our movies project
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', //the line under retrievs our sanity token tha we made to be able to use it as a sort of API
            Authorization: 'Bearer sk0EFmQ5LvIy6dAbCyLZenXHNmihZtMmVlXxPnDjWMcx8HP75BV0vwGpWgIFFBK4flk56xkPNy1KsGvCQjz8KZIxSCyK3hsqSnnhxGKUCw5QKcNBvUwg5iT9ahVAxjK7R8n350KQK8QrEyFEaw2f6LTbKxWe4rxl4zGJIB4OZQ8kYdq9wqio',
          },
          body: JSON.stringify({
            query: '*[_type == "kategori"]{_id, Genre, "movies": *[_type == "movie" && references(^._id)]{_id, title}}', 
          }), //this code allows us to specify what we want from the movies dataset in our Sanity project
        }) 

        if (!response.ok) {
          throw new Error('Failed to fetch genre info')
        }

        const fetchMovieData = async (movies) => {// Fetch movie data for favorite movies and wishlist
            const moviePromises = movies.map(async (movie) => {
              const title = movie.title
              const url = `https://moviesdatabase.p.rapidapi.com/titles/search/title/${title}?exact=true&titleType=movie` //this is fetching data from the rapid API
              const options = {
                method: 'GET',
                headers: {
                  'X-RapidAPI-Key': '9f75e199fdmsh83cedb74debc28bp168dbajsnc177f705dfed',
                  'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
                },
              }
              const response = await fetch(url, options)
              const data = await response.json()
              return {
                title,
                image: data.results[0]?.primaryImage?.url,
                id: data.results[0]?.id,
              }
            })
            return Promise.all(moviePromises) //returns all promsied objects specifiecd liek the oen above which is moviePromises, which si used in fetchMovieData
          }

        const userData = await response.json()
        setGenres(userData.result)
        setisStarSolid(new Array(userData.result.length).fill(false)) //checks if the star is solid
      } catch (error) {
        console.error('Error', error)
        setError(error.message)
      }
    }

    fetchGenres()
  }, [])

  const toggleStar = (index) => { //this was originaly used to change the star in the genres page to be filled in when clicked on, but 
    //somewhat stopped workign as we added the function to be able to see movie names as you click on the different genres
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
          params: { genre: genre.Genre }, //here we are calling the movies and genres to be able to connect the differen genres to the different movies
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch movies for the selected genre')
      }

      const genreData = await response.json()
      const movieData = await fetchMovieData(genreData.result[0]?.movies || [])
      setMovies(movieData)
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
            {/* here we see what is being used as a user clicks the button to see what movies are in what genre. */}
              {genre.Genre}
              <FontAwesomeIcon icon={isStarSolid[index] ? fas : fab} /> 
              {/* updates the code if the button has been clciked */}
            </button>
          </li>
        ))}
      </ul>
      <div>
        {selectedGenre && (
          <>
            <h2>{selectedGenre.Genre}</h2>
            <ul>
          {movies.map((movie, index) => (
            <li key={index}>
              <a href={`https://www.imdb.com/title/${movie.id}/`} target="_blank" rel="noopener noreferrer">
                <img src={movie.image} alt={movie.title} />
              </a>
              <p>{movie.title}</p>
            </li>
          ))}
        </ul>
          </>
        )}
      </div>
    </>
  )
}