import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

export default function Genres(){
    library.add(fab, fas, far)
    const [genres, setGenres] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchGenres() {
            try{

    const url = 'https://moviesdatabase.p.rapidapi.com/titles/utils/genres'
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
                    setGenres(data.results)
                } else {
                    setError("Invalid data format received from the API")
                }
            } catch (error) {
                console.error("Error fetching movies:", error)
                setError("Error fetching movies. Please try again later.")
            }
        }

        fetchGenres()
    }, [])

    return (

        <>
            {/* <h2>Genres</h2>
            {error ? (
                <div>{error}</div>
            ) : (

                <section>
                {genres?.map((genres, index) => (
                    <article key={index}>
                        <h3>{genres.titleText.text}</h3>
                        {genres.primaryImage && movie.primaryImage.url && (
                            <img src={movie.primaryImage.url} alt={movie.primaryImage.caption.plainText} />
                            
                        )}
                        <Link to={`https://www.imdb.com/title/${movie.id}`} target="_blank" alt={movie.titleText}>{movie.titleText.text}</Link>

                        <FontAwesomeIcon icon="fa-regular fa-star" />
                        <FontAwesomeIcon icon="fa-solid fa-star" />
                    </article>
                ))}
            </section>
            )} */}
        </>
    )
}