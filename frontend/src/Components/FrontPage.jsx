import { Link } from "react-router-dom"
//import { fetchAllMovies } from "..sanity/movieServices"
import { useEffect, useState } from "react"
import Navbar from "./Navbar"

export default function FrontPage(){
    const [movie, setMovie] = useState(null)

    async function getMovies(){
        const data = await fetchAllMovies()
        setMovie(data)
    }


useEffect(() => {
    getMovies()
}, [])

console.log(movie)

return(
    <>
    <h1>Frontpage</h1>
    <Navbar/>
    <ul>
        {movie?.map((movie, index) => <li key={index}>
            <Link to={movie._id}>{movie.title}</Link>
        </li>)}
    </ul>
    </>
)
}
