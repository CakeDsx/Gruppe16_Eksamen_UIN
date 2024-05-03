import React, { useEffect, useState } from "react"
import MovieCard from "./MovieCard"

export default function Home() {
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchMovies() {
            try {
                //gotten from the API to test, javascript(fetch)

                const url = 'https://moviesdatabase.p.rapidapi.com/titles/'
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '023516fa7dmsh3db1b9729c75136p1ed7fejsn251f88436307',
		'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
	}
}

try {
	const response = await fetch(url, options)
	const result = await response.text()
	console.log(result)
} catch (error) {
	console.error(error)
}
            //     const response = await fetch(
            //     "https://moviesdatabase.p.rapidapi.com/titles/series/%7BseriesId%7D",
            //         {
            //         method: "GET",
            //         headers: {
            //                 "X-RapidAPI-Key": "023516fa7dmsh3db1b9729c75136p1ed7fejsn251f88436307",
            //                 "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com"
            //         }
            //     }
            // )
                const data = await response.json()
                if (Array.isArray(data)) {
                    setMovies(data)
                } else {
                    setError("Invalid data format received from the API")
                }
            } catch (error) {
                console.error("Error fetching movies:", error)
                setError("Error fetching movies. Please try again later.")
            }
        }

        fetchMovies()
    }, [])

    return (
        <main>
            <h2>Movies</h2>
            {error ? (
                <div>{error}</div>
            ) : (
                <div className="movie-list">
                    {movies.map((movie, index) => (
                        <MovieCard key={index} movie={movie} />
                    ))}
                </div>
            )}
        </main>
    )
}
