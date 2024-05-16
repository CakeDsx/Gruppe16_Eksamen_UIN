import React, { useEffect, useState } from 'react'

function MovieImage({ userId }) {
  const [favoriteMovies, setFavoriteMovies] = useState([])
  const [wishList, setWishList] = useState([])
  const [favoriteGenres, setFavoriteGenres] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [users, setUsers] = useState([])
  const [mainUser, setMainUser ] = useState(null)

  useEffect(() => {
    async function fetchUsers() {
      try {
        // Fetch user's favorite movies from Sanity
        const response = await fetch('https://o9tavwx2.api.sanity.io/v1/data/query/movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer sk0EFmQ5LvIy6dAbCyLZenXHNmihZtMmVlXxPnDjWMcx8HP75BV0vwGpWgIFFBK4flk56xkPNy1KsGvCQjz8KZIxSCyK3hsqSnnhxGKUCw5QKcNBvUwg5iT9ahVAxjK7R8n350KQK8QrEyFEaw2f6LTbKxWe4rxl4zGJIB4OZQ8kYdq9wqio',
          },
          body: JSON.stringify({
            query: '*[_type == "Users" && _id != $userId]{_id, users}' ,
            params: { userId },
          }),
        })

        if(!response.ok){
          throw new Error('failed to fetch user info')
        }

        const userData = await response.json()
        console.log(userData)
        setUsers(userData.result)
        console.log(userId)
      } catch (error){
        console.error('Error', error)
      }
    }

    fetchUsers()
  }, [userId])

  useEffect(() => {
    async function fetchUserInfo(userId) {
      try {
        const sanityResponse = await fetch('https://o9tavwx2.api.sanity.io/v1/data/query/movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer sk0EFmQ5LvIy6dAbCyLZenXHNmihZtMmVlXxPnDjWMcx8HP75BV0vwGpWgIFFBK4flk56xkPNy1KsGvCQjz8KZIxSCyK3hsqSnnhxGKUCw5QKcNBvUwg5iT9ahVAxjK7R8n350KQK8QrEyFEaw2f6LTbKxWe4rxl4zGJIB4OZQ8kYdq9wqio',
          },
          body: JSON.stringify({
            query: '*[_type == "Users" && _id == $userId]{favoriteMovies[]->{title, id}, wishList[]->{title, id}, favorittKategori[]->{Genre}}',
            params: { userId },
          }),
        })

        if (!sanityResponse.ok) {
          throw new Error('Sanity API request failed')
        }

        const sanityData = await sanityResponse.json()
        const favoriteMovies = sanityData.result[0]?.favoriteMovies || []
        const wishList = sanityData.result[0]?.wishList || []
        const genres = sanityData.result[0]?.favorittKategori.map(genre => genre.Genre) || []

        const fetchMovieData = async (movies) => {
          const moviePromises = movies.map(async (movie) => {
            const title = movie.title
            const url = `https://moviesdatabase.p.rapidapi.com/titles/search/title/${title}?exact=true&titleType=movie`
            const options = {
              method: 'GET',
              headers: {
                'X-RapidAPI-Key': '9f75e199fdmsh83cedb74debc28bp168dbajsnc177f705dfed',
                'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
              },
            };
            const response = await fetch(url, options)
            const data = await response.json()
            return {
              title,
              image: data.results[0]?.primaryImage?.url,
              id: data.results[0]?.id,
            };
          });
          return Promise.all(moviePromises)
        }

        const favoriteMovieImage = await fetchMovieData(favoriteMovies)
        const wishListImage = await fetchMovieData(wishList)

        setFavoriteMovies(favoriteMovieImage)
        setWishList(wishListImage)
        setFavoriteGenres(genres)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchUserInfo(userId);
  }, [userId]);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  return (
    <>
      <section id="user-movies">
        <h1 id='overskrift'>Movies you want to watch!</h1>
        <p>Your Wishlist:</p>
        <ul>
          {wishList.map((movie, index) => (
            <li key={index}>
              <a href={`https://www.imdb.com/title/${movie.id}/`} target="_blank" rel="noopener noreferrer">
                <img src={movie.image} alt={movie.title}/>
              </a>
              <p>{movie.title}</p>
            </li>
          ))}
        </ul>
        <h2 id='favorites'>Your favorite movies!</h2>
        <p>Favorites:</p>
        <ul>
          {favoriteMovies.map((movie, index) => (
            <li key={index}>
              <a href={`https://www.imdb.com/title/${movie.id}/`} target="_blank" rel="noopener noreferrer">
                <img src={movie.image} alt={movie.title}/>
              </a>
              <p>{movie.title}</p>
            </li>
          ))}
        </ul>
      </section>
      {/*<section id="user-genres">
        <h1>Your favorite genres!</h1>
        <ul>
          {favoriteGenres.map((genre, index) => (
            <li key={index}>{genre}</li>
          ))}
        </ul>
      </section>*/}
      <section id='users'>
        <h2>I'm watching with...</h2>
        <ul>
         {users.slice(0, 10).map((user) =>(  //REEEEEEEEEEEEE
        <li key = {user._id} onClick={() => handlemainUser(user._id)}>{user.users}</li> //i have never been so annoyed trying to find what was wrong....i missed = after onclick....
          ))} 
          </ul>
      </section>
    </>
  )
}

export default MovieImage

