import {useEffect, useState } from "react"
import {Link, useParams } from "react-router-dom"
import { fetchAllMovies } from "../../sanity/services/movieServices"

export default function Navbar(){
    const [active, setActive] = useState()
    const[movieList, setMovieList] = useState(null)

    const getAllMovies = async () => {
        const data = await fetchAllMovies()
        setMovieList(data)
    }


useEffect(() => {
    console.log(active)
    getAllMovies()
}, [active])

console.log(movieList)

return(
    <nav>

        <ul>
            <li>
                <Link to="/FrontPage">FrontPage</Link>
            </li>
            <li>
                <Link to="/Home">Home</Link>
            </li>
        </ul>
       
    </nav>
)
}
