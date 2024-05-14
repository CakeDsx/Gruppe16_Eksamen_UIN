import {useEffect, useState } from "react"
import {Link } from "react-router-dom"
import { fetchAllMovies } from "../../sanity/services/movieServices"
import Title from "./Title"

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
    <>
    <nav>
        <Title />
        <Link to="/FrontPage">WhatToSee</Link>
        <ul>            
            <li className="what-to-see">
                <Link to="/Home">Hva skal jeg se?</Link>
            </li>
            <li>
                <Link to="/Genres">Bla gjennom sjangere</Link>
            </li>
            <li>
                <Link to="/Home">Brukernavn</Link>
            </li>
        </ul>
        </nav>
        
        </>
    
)
}
