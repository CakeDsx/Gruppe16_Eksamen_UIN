import { Link } from "react-router-dom"
// import { fetchAllMovies } from "..sanity/movieServices"
import { useEffect, useState } from "react"

export default function FrontPage(){
    const [movie, setMovie] = useState(null)

    async function getMovies(){
        const data = await fetchAllMovies()
        setMovie(data)
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
