import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Home() {
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchMovies() {
            try {
                const url = 'https://moviesdatabase.p.rapidapi.com/titles/'
                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '023516fa7dmsh3db1b9729c75136p1ed7fejsn251f88436307',
                        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
                    }
                };

                const response = await fetch(url, options)
                const data = await response.json()

                if (data && Array.isArray(data.results)) {
                    setMovies(data.results)
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

                <ul>
                {movies.map((movie, index) => (
                    <div key={index}>
                        <h3>{movie.title}</h3>
                        {movie.primaryImage && movie.primaryImage.url && (
                            <img src={movie.primaryImage.url} alt={movie.title} />
                        )}

                        {movies?.map((movie, index) =>
                        <li key={index}>
                            <Link to={movie.titleText.text} alt={movie.titleText}>{movie.titleText.text}</Link>
                        </li>
                        )}
                    </div>
                ))}
            </ul>

                // <div className="movie-list">
                //     {movies.map((movie, index) => (
                //         <div key={index}>
                //             <h3>{movie.title}</h3>
                //             {movie.primaryImage && movie.primaryImage.url && (
                //                 <img src={movie.primaryImage.url} alt={movie.title} />
                //             )}

                //             {/* add more info here :D */}
                //         </div>
                //     ))}
                // </div>
            )}
        </main>
    );
}
