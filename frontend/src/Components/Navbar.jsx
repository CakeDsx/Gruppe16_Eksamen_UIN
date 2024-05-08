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
        <Title />

        <ul>
            
                <Link to="/FrontPage">WhatToSee</Link>
            
            <li>
                <Link to="/Home">What to see</Link>
            </li>
            <li>
                <Link to="/Genres">Genre</Link>
            </li>
        </ul>
        
        </>
    
)
}
