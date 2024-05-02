import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchAllMovies } from "../../sanity/services/movieServices"

export default function FrontPage() {
    const [movies, setMovies] = useState(null)

    useEffect(() => {
        async function getMovies() {
            try {
                const data = await fetchAllMovies()
                setMovies(data)
            } catch (error) {
                console.error("Error fetching movies:", error)
            }
        }

        getMovies()
    }, [])

    return (
        <>
            <h1>WHAT TO SEE?</h1>
            <ul>
                {movies?.map((movie) => (
                    <li key={movie._id}>
                        <Link to={movie._id}>{movie.movietitle}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
}
