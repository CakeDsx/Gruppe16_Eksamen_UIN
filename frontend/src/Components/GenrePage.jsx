import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

function MovieImage() {
  library.add(fab, fas, far)
    const [imageUrl, setImageUrl] = useState('')

    useEffect(() => {
        async function fetchMovieImage() {
            const url = 'https://moviesdatabase.p.rapidapi.com/titles/search/title/Blade%20Runner?exact=true&titleType=movie'
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '9f75e199fdmsh83cedb74debc28bp168dbajsnc177f705dfed',
                    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options)
                const data = await response.json()
                const movie = data.results[0]
                const imageUrl = movie.primaryImage.url
                setImageUrl(imageUrl)
            } catch (error) {
                console.error('Error:', error)
            }
        }

        fetchMovieImage()
    }, [])

    return (
        <section>
          <article>
            {imageUrl && <img src={imageUrl} alt="Movie" />}
            <h3>Movie title</h3>
            <FontAwesomeIcon icon="fa-regular fa-star" />
            <FontAwesomeIcon icon="fa-solid fa-star" />
         </article>
        </section>
    );
}

export default MovieImage
