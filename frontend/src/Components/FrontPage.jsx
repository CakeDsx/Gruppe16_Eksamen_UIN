// import React, { useState, useEffect } from "react"
// // import { Link } from "react-router-dom"


// export default function FrontPage() {
    
//     // const [movies, setMovies] = useState(null) 
//     const [users, setUsers] = useState([])
//     const [error, setError] = useState(null)

//     useEffect(() => {
//         const fetchUsers = async () => {
//           try {
//             const response = await fetch('https://o9tavwx2.api.sanity.io/v1/data/query/movies', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: 'Bearer sk0EFmQ5LvIy6dAbCyLZenXHNmihZtMmVlXxPnDjWMcx8HP75BV0vwGpWgIFFBK4flk56xkPNy1KsGvCQjz8KZIxSCyK3hsqSnnhxGKUCw5QKcNBvUwg5iT9ahVAxjK7R8n350KQK8QrEyFEaw2f6LTbKxWe4rxl4zGJIB4OZQ8kYdq9wqio',
//               },
//               body: JSON.stringify({
//                 query: '*[_type == "Users"]{users, favoriteMovies, FavoriteGenres, Main_image}',
//               }),
//             })
    
//             if (!response.ok) {
//               throw new Error('Network response was not ok')
//             }
    
//             const data = await response.json()
//             setUsers(data.result)
//           } catch (error) {
//             console.error('There was a problem fetching users:', error)
//             setError('Error fetching users. Please try again later.')
//           }
//         }

//         fetchUsers()
//     }, [])


//     console.log(users)

//     return( 
//         <>
//              <div>
//       <h2>FrontPage</h2>
//       {error ? (
//         <div>{error}</div>
//       ) : (
//         <section>
//           {users.map((Users, index) => (
//             <article key={index}>
//                 {Users.image && (
//                   <img src={Users.image} alt={Users.title} />
//                 )}
//                 <h3>{Users.title}</h3>
//             </article>
//           ))}
//         </section>
//       )}
//     </div>
            
//         </>
//     )

// }


import React, { useState, useEffect } from "react"
// import { Link } from "react-router-dom"


export default function MovieCard() {

  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://o9tavwx2.api.sanity.io/v1/data/query/movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer sk0EFmQ5LvIy6dAbCyLZenXHNmihZtMmVlXxPnDjWMcx8HP75BV0vwGpWgIFFBK4flk56xkPNy1KsGvCQjz8KZIxSCyK3hsqSnnhxGKUCw5QKcNBvUwg5iT9ahVAxjK7R8n350KQK8QrEyFEaw2f6LTbKxWe4rxl4zGJIB4OZQ8kYdq9wqio',
          },
          body: JSON.stringify({
              query: '*[_type == "Users"]{users, url}',
             }),
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        setUsers(data.result)
      } catch (error) {
        console.error('There was a problem fetching movies:', error)
        setError('Error fetching movies. Please try again later.')
      }
    }

    fetchUsers()
  }, [])

  return (
    <div>
      <h2>Users</h2>
      {error ? (
        <div>{error}</div>
      ) : (
        <section>
          {users.map((Users, index) => (
            <article key={index}>
                <h3>{Users.users}</h3>
              {/* <Link to={`https://www.imdb.com/title/${movie.id}`} target="_blank" alt={Users.title}> */}
                {Users.url && (
                  <img src={Users.url} alt={Users.title} />
                )}  
                   
                
              {/* </Link> */}
             
            </article>
          ))}
        </section>
      )}
    </div>
  )
}


  





// import React, { useEffect, useState } from "react"
// import { Link } from "react-router-dom"
// import { fetchAllMovies } from "../../sanity/services/movieServices"

// export default function FrontPage() {
//     const [movies, setMovies] = useState(null)

//     useEffect(() => {
//         async function getMovies() {
//             try {
//                 const data = await fetchAllMovies()
//                 setMovies(data)
//             } catch (error) {
//                 console.error("Error fetching movies:", error)
//             }
//         }

//         getMovies()
//     }, [])

//     return (
//         <>
//             <h1>WHAT TO SEE?</h1>
//             <ul>
//                 {movies?.map((movie) => (
//                     <li key={movie._id}>
//                         <Link to={movie._id}>{movie.movietitle}</Link>
//                     </li>
//                 ))}
//             </ul>
//         </>
//     )
// }
