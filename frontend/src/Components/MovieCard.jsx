import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

export default function MovieCard() {
    library.add(fab, fas, far)
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
                }

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
        <>
            <h2>Movies</h2>
            {error ? (
                <div>{error}</div>
            ) : (

                <section>
                {movies?.map((movie, index) => (
                    <article key={index}>
                        <h3>{movie.titleText.text}</h3>
                        {movie.primaryImage && movie.primaryImage.url && (
                            <img src={movie.primaryImage.url} alt={movie.primaryImage.caption.plainText} />
                            
                        )}
                        <Link to={`https://www.imdb.com/title/${movie.id}`} target="_blank" alt={movie.titleText}>{movie.titleText.text}</Link>

                        <FontAwesomeIcon icon="fa-regular fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                    </article>
                ))}
            </section>

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
        </>
    )
}
