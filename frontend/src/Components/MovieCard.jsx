  import React, { useEffect, useState } from 'react'

  function MovieImage({ userId }) { //remember to write that we were unsure abotu hwo much they wanted to be in moviecard in the document that explains it
  const [favoriteMovies, setFavoriteMovies] = useState([])
  const [wishList, setWishList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [Results, setResults] = useState([])

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('https://o9tavwx2.api.sanity.io/v1/data/query/movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer sk0EFmQ5LvIy6dAbCyLZenXHNmihZtMmVlXxPnDjWMcx8HP75BV0vwGpWgIFFBK4flk56xkPNy1KsGvCQjz8KZIxSCyK3hsqSnnhxGKUCw5QKcNBvUwg5iT9ahVAxjK7R8n350KQK8QrEyFEaw2f6LTbKxWe4rxl4zGJIB4OZQ8kYdq9wqio',
          },
          body: JSON.stringify({
            query: '*[_type == "Users" && _id != $userId]{_id, users}',
            params: { userId },
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to fetch user info')
        }

        const userData = await response.json()
        setUsers(userData.result)
      } catch (error) {
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
            query: '*[_type == "Users" && _id == $userId]{favoriteMovies[]->{title, id}, wishList[]->{title, id}}',
            params: { userId },
          }),
        })

        if (!sanityResponse.ok) {
          throw new Error('Sanity API request failed')
        }

        const sanityData = await sanityResponse.json()
        const favoriteMovies = sanityData.result[0]?.favoriteMovies || []
        const wishList = sanityData.result[0]?.wishList || []

        const fetchMovieData = async (movies) => {// Fetch movie data for favorite movies and wishlist
          const moviePromises = movies.map(async (movie) => {
            const title = movie.title
            const url = `https://moviesdatabase.p.rapidapi.com/titles/search/title/${title}?exact=true&titleType=movie`
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
          return Promise.all(moviePromises) //explain the sue of promise.all
        }

        const favoriteMovieImage = await fetchMovieData(favoriteMovies)
        const wishListImage = await fetchMovieData(wishList)

        setFavoriteMovies(favoriteMovieImage)
        setWishList(wishListImage)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchUserInfo(userId)
  }, [userId])

  // Handle user click
  const userClick = async (userId) => {
    setSelectedUser(users.find((user) => user._id === userId))
    try {
      const response = await fetch('https://o9tavwx2.api.sanity.io/v1/data/query/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer sk0EFmQ5LvIy6dAbCyLZenXHNmihZtMmVlXxPnDjWMcx8HP75BV0vwGpWgIFFBK4flk56xkPNy1KsGvCQjz8KZIxSCyK3hsqSnnhxGKUCw5QKcNBvUwg5iT9ahVAxjK7R8n350KQK8QrEyFEaw2f6LTbKxWe4rxl4zGJIB4OZQ8kYdq9wqio',
        },
        body: JSON.stringify({
          query: '*[_type == "Users" && _id == $userId]{favoriteMovies[]->{title, id}, wishList[]->{title, id}}',
          params: { userId },
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch user info')
      }

      const userData = await response.json()
      const userFavMovies = userData.result[0]?.favoriteMovies || []
      const userWishList = userData.result[0]?.wishList || []

      const FavMovie = favoriteMovies.filter((movie) =>
        userFavMovies.some((userMovie) => userMovie.title === movie.title) //remember to source chatGPT here for use of some
      )

      const WishListM = wishList.filter((movie) => //rememebr to explain the use here of filer and .some
        userWishList.some((userMovie) => userMovie.title === movie.title)
      )

      const generalMovies = [...FavMovie, ...WishListM] //explain waht this const does.

      setResults(generalMovies)
    } catch (error) {
      setError(error.message)
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <>
      <section id="user-movies">
        <h1 id="overskrift">Movies to watch!</h1>
        <p>Your Wishlist:</p>
        <ul>
          {wishList.map((movie, index) => (
            <li key={index}>
              <a href={`https://www.imdb.com/title/${movie.id}/`} target="_blank" rel="noopener noreferrer">
                <img src={movie.image} alt={movie.title} />
              </a>
              <p>{movie.title}</p>
            </li>
          ))}
        </ul>
        <h2 id="favorites">Your favorite movies!</h2>
        <p>Favorites:</p>
        <ul>
          {favoriteMovies.map((movie, index) => (
            <li key={index}>
              <a href={`https://www.imdb.com/title/${movie.id}/`} target="_blank" rel="noopener noreferrer">
                <img src={movie.image} alt={movie.title} />
              </a>
              <p>{movie.title}</p>
            </li>
          ))}
        </ul>
      </section>
      <section id="users">
        <h2>I'm watching with...</h2>
        <ul>
          {users.slice(0, 10).map((user) => ( //remember to explain the use of slice
            <li key={user._id} onClick={() => userClick(user._id)}>
              {user.users}
            </li>
          ))}
        </ul>
      </section>
      {selectedUser && (
  <section id="comparison">
    <h2>Comparison with {selectedUser.users}</h2>
    <h3>Common Favorite Movies:</h3>
    <ul>
      {Results.filter(movie => favoriteMovies.some(favorite => favorite.title === movie.title)).map((movie, index) => (
        <li key={index}>
          <a href={`https://www.imdb.com/title/${movie.id}/`} target="_blank" rel="noopener noreferrer">
            <img src={movie.image} alt={movie.title} style={{ maxWidth: '150px', maxHeight: '200px' }} />
          </a>
          <p>{movie.title}</p>
        </li>
      ))}
    </ul>
    <h3>Common Wishlist:</h3>
    <ul>
      {Results.filter(movie => wishList.some(wishlist => wishlist.title === movie.title)).map((movie, index) => ( //remmeber to source chatGPT here as well fro
        <li key={index}>
          <a href={`https://www.imdb.com/title/${movie.id}/`} target="_blank" rel="noopener noreferrer">
            <img src={movie.image} alt={movie.title} style={{ maxWidth: '150px', maxHeight: '200px' }} />
          </a>
          <p>{movie.title}</p>
        </li>
      ))}
    </ul>
  </section>
)}
  </>
  )
}

export default MovieImage
