
import React, { useEffect, useState } from 'react'

function MovieImage({ userId }) {
  const [favoriteMovies, setFavoriteMovies] = useState([])
  const [favoriteGenres, setFavoriteGenres] = useState([])
  // const [users, setUsers] = useState([])
  // const [mainUser, setMainUser ] = useState(null)

  // useEffect(() => {
  //   async function fetchUsers() {
  //     try {
  //       // Fetch user's favorite movies from Sanity
  //       const response = await fetch('https://o9tavwx2.api.sanity.io/v1/data/query/movies', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: 'Bearer sk0EFmQ5LvIy6dAbCyLZenXHNmihZtMmVlXxPnDjWMcx8HP75BV0vwGpWgIFFBK4flk56xkPNy1KsGvCQjz8KZIxSCyK3hsqSnnhxGKUCw5QKcNBvUwg5iT9ahVAxjK7R8n350KQK8QrEyFEaw2f6LTbKxWe4rxl4zGJIB4OZQ8kYdq9wqio',
  //         },
  //         body: JSON.stringify({
  //           query: '*[_type == "Users" && _id != $userId]{_id, users}' ,
  //           params: { userId },
  //         }),
  //       })

  //       if(!response.ok){
  //         throw new Error('failed to fetch user info')
  //       }

  //       const userData = await response.json()
  //       setUsers(userData.result)
  //     } catch (error){
  //       console.error('Error', error)
  //     }
  //   }

  //   fetchUsers()
  // }, [userId])

  useEffect(() => {
    async function fetchUserInfo(userId) {
      try {
        // Fetch user's favorite movies from Sanity
        const sanityResponse = await fetch('https://o9tavwx2.api.sanity.io/v1/data/query/movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer sk0EFmQ5LvIy6dAbCyLZenXHNmihZtMmVlXxPnDjWMcx8HP75BV0vwGpWgIFFBK4flk56xkPNy1KsGvCQjz8KZIxSCyK3hsqSnnhxGKUCw5QKcNBvUwg5iT9ahVAxjK7R8n350KQK8QrEyFEaw2f6LTbKxWe4rxl4zGJIB4OZQ8kYdq9wqio',
          },
          body: JSON.stringify({
            query: '*[_type == "Users" && _id == $userId]{favoriteMovies[]->{title}, favorittKategori[]->{Genre}}',
            params: { userId },
          }),
        })

        if (!sanityResponse.ok) {
          throw new Error('Sanity API request failed')
        }

        const sanityData = await sanityResponse.json()
        console.log('Sanity Data:', sanityData)

        const movies = sanityData.result[0]?.favoriteMovies.map(movie => movie.title) || []
        const genres = sanityData.result[0]?.favorittKategori.map(genre => genre.Genre) || []

        console.log('Favorite Movies:', movies)
        console.log('Favorite Genre:', genres)


        setFavoriteMovies(movies)
        setFavoriteGenres(genres)

        //fetches movie images from Movie Database API for each favorite movie
        const moviepromises = movies.map(async (movie) =>{
            const title = movie.title 
            const url = `https//moviedatabase.p.rapidapi.com/titles/search/title/${title}?exact=true&titleType=movie`
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '9f75e199fdmsh83cedb74debc28bp168dbajsnc177f705dfed',
                    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
                }
            }
            const response = await fetch(url, options)
            const data = await response.json()
            return { title, image: data.results[0]?.primaryImage?.url }
        })


      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchUserInfo(userId)
  }, [userId])
    // if (mainUser){
    //   fetchUserInfo(mainUser)
    // }
    // }, [mainUser])

    // const handlemainUser = (userId) => {
    //   setMainUser(userId)
    // }

  
 

  return (
    <>
      <section id='user-movies'>
        <h1 id='overskrift'>Your favorite movies!</h1>
        <h2>ToWatch</h2>
        <p>Your Wishlist:</p>
        <ul>
          {favoriteMovies.map((movie, index) => (
            <li key={index}>{movie}
            <img src={movie.image} alt={movie.title} style={{width: '150px', height: 'auto'}} />
            <br />
            {movie.title}
            </li>
          ))}
        </ul>
      </section>
      <section id='user-genres'>
        <h1 id='overskrift'>Your favorite genres!</h1>
        <h2>Favorite Genres</h2>
        <ul>
          {favoriteGenres.map((genre, index) => (
            <li key={index}>{genre}</li>
          ))}
        </ul>
      </section>
      <section id='users'>
        <h2>I'm watching with...</h2>
        {/* <ul>
         {users.slice(0, 2).map((user) =>(  //REEEEEEEEEEEEE
        <li key = {user._id} onClick={() => handlemainUser(user._id)}>{user.users}</li> //i have never been so annoyed trying to find what was wrong....i missed = after onclick....
          ))} 
        </ul> */}
      </section>
    </>
  )
}

export default MovieImage


// import React, { useEffect, useState } from 'react'

// function MovieImage() {
//   const [imageUrls, setImageUrls] = useState([])
//   const [movieTitles, setMovieTitles] = useState([])

//   useEffect(() => {
//     async function fetchMovieImages() {
//       try {
//         // Fetch user's favorite movie titles from Sanity
//         const sanityResponse = await fetch('https://o9tavwx2.api.sanity.io/v1/data/query/movies', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Bearer sk0EFmQ5LvIy6dAbCyLZenXHNmihZtMmVlXxPnDjWMcx8HP75BV0vwGpWgIFFBK4flk56xkPNy1KsGvCQjz8KZIxSCyK3hsqSnnhxGKUCw5QKcNBvUwg5iT9ahVAxjK7R8n350KQK8QrEyFEaw2f6LTbKxWe4rxl4zGJIB4OZQ8kYdq9wqio',
//           },
//           body: JSON.stringify({
//             query: '*[_type == "Users"]{favoriteMovies[]->{title}}',
//           }),
//         })

//         if (!sanityResponse.ok) {
//           throw new Error('Sanity API request failed')
//         }

//         const sanityData = await sanityResponse.json()
//         console.log('Sanity Data:', sanityData)

//         const titles = sanityData.result.map(user => user.favoriteMovies.map(movie => movie.title))
//         console.log('Movie Titles:', titles)

//         setMovieTitles(titles.flat())

//       } catch (error) {
//         console.error('Error:', error)
//       }
//     }

//     fetchMovieImages()
//   }, [])

//   return (
//     <>
//       <section id='user-movies'>
//         <h1 id='overskrift'>Brukernavn sine filmer</h1>
//         <h2>Filmer jeg skal se!</h2>
//         <p>Disse filmene ligger i ønskelisten din:</p>
//         {movieTitles.map((title, index) => (
//           <article key={index}>
//             <h3>{title}</h3>
//           </article>
//         ))}
//       </section>
//     </>
//   )
// }

// export default MovieImage



// import React, { useEffect, useState } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
// import { fas } from '@fortawesome/free-solid-svg-icons'
// import { far } from '@fortawesome/free-regular-svg-icons'

// function MovieImage() {
//   library.add(fab, fas, far)
//   const [imageUrls, setImageUrls] = useState([])
//   const [movieTitles, setMovieTitles] = useState([])
  
//   useEffect(() => {
//     async function fetchMovieImages() {
//       try {
//         // Fetch movie titles from Sanity
//         const sanityResponse = await fetch('https://o9tavwx2.api.sanity.io/v1/data/query/movies', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Bearer sk0EFmQ5LvIy6dAbCyLZenXHNmihZtMmVlXxPnDjWMcx8HP75BV0vwGpWgIFFBK4flk56xkPNy1KsGvCQjz8KZIxSCyK3hsqSnnhxGKUCw5QKcNBvUwg5iT9ahVAxjK7R8n350KQK8QrEyFEaw2f6LTbKxWe4rxl4zGJIB4OZQ8kYdq9wqio',
//           },
//           body: JSON.stringify({
//             query: '*[_type == "Users"]{}',
//             // query: '*[_type == "Users"].title',
//           }),
//         })

//         if (!sanityResponse.ok) {
//           throw new Error('Sanity API request failed')
//         }

//         const sanityData = await sanityResponse.json()
//         const titles = sanityData.result
//         setMovieTitles(titles)

//         // Fetch movie images from RapidAPI using movie titles
//         const imageUrls = await Promise.all(titles.map(async (title, index) => {
//           console.log(`Fetching image for movie ${index + 1}: ${title}`)
//           const params = new URLSearchParams()
//           params.append('exact', 'true')
//           params.append('titleType', 'movie')
//           const url = `https://moviesdatabase.p.rapidapi.com/titles/search/title/${title}?${params.toString()}`
//           const options = {
//             method: 'GET',
//             headers: {
//               'X-RapidAPI-Key': '9f75e199fdmsh83cedb74debc28bp168dbajsnc177f705dfed',
//               'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
//             }
//           }
//           const response = await fetch(url, options)
//           if (!response.ok) {
//             console.error(`Failed to fetch image for movie ${index + 1}: ${title}`)
//             return null
//           }
//           const data = await response.json()
//           const movie = data.results[0]
          
//           // Check if movie is null before accessing its properties
//           if (movie && movie.primaryImage) {
//             return movie.primaryImage.url
//           } else {
//             console.error(`No image found for movie ${index + 1}: ${title}`)
//             return null // or any other default value
//           }
//         }))

//         setImageUrls(imageUrls.filter(url => url)) // Filter out null values
//       } catch (error) {
//         console.error('Error:', error)
//       }
//     }

//     fetchMovieImages()
//   }, [])

//   return (
//     <>
//       <section id='user-movies'>
//         <h1 id='overskrift'>Brukernavn sine filmer</h1>
//         <h2><FontAwesomeIcon icon="fa-solid fa-star" /> Filmer jeg skal se!</h2>
//         <p>Disse filmene ligger i ønskelisten din:</p>
//         {imageUrls.map((imageUrl, index) => (
//           <article key={index}>
//             {imageUrl && <img src={imageUrl} alt="Movie name" />}
//             <h3>{movieTitles[index]}</h3>
//             <FontAwesomeIcon icon="fa-regular fa-star" />
//             <FontAwesomeIcon icon="fa-solid fa-star" />
//           </article>
//         ))}
//       </section>
//       <section id='users'>
//         <h2>Jeg skal se sammen med ...</h2>
//         <ul>
//           <li>Brukernavn</li>
//           <li>Brukernavn</li>
//         </ul>
//       </section>
//     </>
//   )
// }

// export default MovieImage









// // import React, { useEffect, useState } from 'react'
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// // import { library } from '@fortawesome/fontawesome-svg-core'
// // import { faStar } from '@fortawesome/free-solid-svg-icons'

// // function Home() {
// //   library.add(faStar)

// //   const [users, setUsers] = useState([])
// //   const [error, setError] = useState(null)

// //   useEffect(() => {
// //     async function fetchUserData() {
// //       try {
// //         const response = await fetch('https://o9tavwx2.api.sanity.io/v1/data/query/movies', {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json',
// //             Authorization: 'Bearer sk0EFmQ5LvIy6dAbCyLZenXHNmihZtMmVlXxPnDjWMcx8HP75BV0vwGpWgIFFBK4flk56xkPNy1KsGvCQjz8KZIxSCyK3hsqSnnhxGKUCw5QKcNBvUwg5iT9ahVAxjK7R8n350KQK8QrEyFEaw2f6LTbKxWe4rxl4zGJIB4OZQ8kYdq9wqio',
// //           },
// //           body: JSON.stringify({
// //             query: '*[_type == "Users"]{_id, users, favoriteMovies[]->{title}}',
// //           }),
// //         })

// //         if (!response.ok) {
// //           throw new Error('Failed to fetch user data')
// //         }

// //         const userData = await response.json()
// //         setUsers(userData.result)
// //       } catch (error) {
// //         console.error('Error:', error)
// //         setError('Error fetching user data. Please try again later.')
// //       }
// //     }

// //     fetchUserData()
// //   }, [])

// //   return (
// //     <>
// //       {error ? (
// //         <div>{error}</div>
// //       ) : (
// //         <section id='user-movies'>
// //           <h1 id='overskrift'>Brukernavn sine filmer</h1>
// //           {users.map((user, index) => (
// //             <div key={index}>
// //               <h2>{user.users}</h2>
// //               <p>Favorittfilmer:</p>
// //               <ul>
// //                 {user.favoriteMovies.map((movie, movieIndex) => (
// //                   <li key={movieIndex}>{movie.title}</li>
// //                 ))}
// //               </ul>
// //             </div>
// //           ))}
// //         </section>
// //       )}
// //     </>
// //   )
// // }

// // export default Home
