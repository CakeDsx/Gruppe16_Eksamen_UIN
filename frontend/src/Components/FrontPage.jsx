import { useEffect, useState } from "react"
import { fetchAllMovies } from "../../sanity/services/movieServices"
import { Link } from "react-router-dom"


export default function FrontPage() {
    
    const [movies, setMovies] = useState(null) 


    async function getMovies() {
        const data = await fetchAllMovies()
        setMovies(data)
    }

  
    useEffect(() => {
        getMovies()
    }, [])

    console.log(movies)

    return( 
        <>
            <h1>Frontpage</h1>
            <ul>
                {movies?.map((movie, index) => <li key={index}>
                    <Link to={movie._id}>{movie.title}</Link>
                </li>)}
            </ul>
        </>
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
