import React, { useEffect, useState } from 'react'

function MovieImage() {
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
         </article>
        </section>
    );
}

export default MovieImage
