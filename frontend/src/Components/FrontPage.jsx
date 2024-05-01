import { Link } from "react-router-dom"
import { fetchAllMovies } from "../../sanity/services/movieServices"
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

console.log(movie)

return(
    <>
    <h1>WHAT TO SEE?</h1>
    
    <ul>
        {movie?.map((movie, index) => <li key={index}>
            <Link to={movie._id}>{movie.title}</Link>
        </li>)}
    </ul>
    </>
)
}
