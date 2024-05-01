import { useEffect, useState } from "react"
import { fetchAllMovies } from "../../sanity/services/movieServices"
import MovieCard from "./MovieCard"

export default function Home(){
    const [movies, setMovies] = useState(null)

    const getAllMovies = async () => {
        const data = await fetchAllMovies()
        setMovies(data)
    }

    useEffect(() => {
        getAllMovies
    }, [])

    console.log(moveis)

    return (
    <main>
        <h2>WhatToSee</h2>
        {movies?.map((movie, index) => <MovieCard key={index} />)}
    </main>
    )
}