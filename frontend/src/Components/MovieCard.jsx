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
        const sanityResponse = await fetch('https://o9tavwx2.api.sanity.io/v1/data/query/movies', { //this si posting/fetchign the data we ahve put into the Sanity project called movies
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', //this is our sanity API token
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
       const userFavMovies = userData.result[0]?.favoriteMovies || [] //using || here tells the code to return the userData.result aka the favorite movies if its true, and if its not true, it shoudl show nothing in thi case
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR
          const userWishList = userData.result[0]?.wishList || []

            const FavMovie = favoriteMovies.filter((movie) =>
                userFavMovies.some((userMovie) => userMovie.title === movie.title) //looking through some links about filter and some we came to this, links to this will eb added in the document.
            ) //so filter here tests all elements that pass trough while some tests if one specfic thing is passing through.

            const WishListM = wishList.filter((movie) => 
                 userWishList.some((userMovie) => userMovie.title === movie.title) //for the filtering option we also saw somethign in legodudes that seemed to be a possible use, thsi was found : https://github.com/toremake/LEGODUDES_sanity/blob/main/frontend/src/components/Cart.jsx
            ) //so we looked mroe into how we could change that code and decided to try to use some as that was something we hadnt used a lot before. 

      const generalMovies = [...FavMovie, ...WishListM] //adds the two elements individually to a new array

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
        <h2 id="favorites">Your Favorite movies!</h2>
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
      <div id='comparison-section'>
        <section id="users">
          <h2>I'm watching with...</h2>
          <ul>
            {users.slice(0, 10).map((user) => ( //when slicing we remove a piece from one array and into a new array, afte that we map trhough
            //then using map it maps through the previous array and creates a new one withotu changign the old one. https://www.w3schools.com/jsref/jsref_map.asp#:~:text=map()%20creates%20a%20new,not%20change%20the%20original%20array.
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
        {/* by filtering we filter through the info we gatehr from results
        we then use .some to see if at least one element we called for provides the info, then using map we can create a new array
        which allows for the previous arrays to stay unchanged. */}
        {Results.filter(movie => favoriteMovies.some(favorite => favorite.title === movie.title)).map((movie, index) => (
          <li key={index}>
            <a href={`https://www.imdb.com/title/${movie.id}/`} target="_blank" rel="noopener noreferrer"> 
              <img src={movie.image} alt={movie.title} /> 
            </a>
            <p>{movie.title}</p>
          </li>
        ))}
      </ul>
      <h3>Common Wishlist:</h3>
      <ul> 
        {Results.filter(movie => wishList.some(wishlist => wishlist.title === movie.title)).map((movie, index) => (
          <li key={index}>
            <a href={`https://www.imdb.com/title/${movie.id}/`} target="_blank" rel="noopener noreferrer">
              <img src={movie.image} alt={movie.title} />
            </a>
            <p>{movie.title}</p>
          </li>
        ))}
      </ul>
    </section>
    )}
</div>
  </>
  )
}

export default MovieImage
