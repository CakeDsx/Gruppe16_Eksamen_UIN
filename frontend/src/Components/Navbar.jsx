import {useEffect, useState } from "react"
import {Link, useParms } from "react-router-dom"
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
            {movieList?.map((item, i) => 
        <li key={i+"cat"}>
        <Link to={"/movies/"+item.catslug}
        onClick={() => setActive(item._id)}
        className={active === item._id ? "active" : null}>{item.movietitle}</Link>
        </li>)}
        </ul>
    </nav>
)
}
