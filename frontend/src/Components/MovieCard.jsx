import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

function MovieImage() {
  library.add(fab, fas, far)
  const [imageUrls, setImageUrls] = useState([])
  
  useEffect(() => {
    async function fetchMovieImages() {
      try {
        const sanityResponse = await fetch('https://o9tavwx2.api.sanity.io/v1/data/query/movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer sk0EFmQ5LvIy6dAbCyLZenXHNmihZtMmVlXxPnDjWMcx8HP75BV0vwGpWgIFFBK4flk56xkPNy1KsGvCQjz8KZIxSCyK3hsqSnnhxGKUCw5QKcNBvUwg5iT9ahVAxjK7R8n350KQK8QrEyFEaw2f6LTbKxWe4rxl4zGJIB4OZQ8kYdq9wqio',
          },
          body: JSON.stringify({
            query: '*[_type == "movie"].title',
          }),
        })

        if (!sanityResponse.ok) {
          throw new Error('Sanity API request failed')
        }

        const sanityData = await sanityResponse.json()
        const movieTitles = sanityData.result

        const imageUrls = await Promise.all(movieTitles.map(async (slug) => {
          const url = `https://moviesdatabase.p.rapidapi.com/titles/search/title/${encodeURIComponent(slug)}?exact=true&titleType=movie`
          const options = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': '9f75e199fdmsh83cedb74debc28bp168dbajsnc177f705dfed',
              'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
            }
          };
          const response = await fetch(url, options)
          const data = await response.json()
          const movie = data.results[0]
          
       
          if (movie && movie.primaryImage) {
            return movie.primaryImage.url
          } else {
            return null
          }
        }));

        setImageUrls(imageUrls)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchMovieImages()
  }, [])

  return (
    <>
      <section id='user-movies'>
        <h1 id='overskrift'>Brukernavn sine filmer</h1>
        <h2><FontAwesomeIcon icon="fa-solid fa-star" /> Filmer jeg skal se!</h2>
        <p>Disse filmene ligger i ønskelisten din:</p>
        {imageUrls.map((imageUrl, index) => (
          <article key={index}>
            {imageUrl && <img src={imageUrl} alt="Movie name" />}
            <h3>Movie title</h3> 
            <FontAwesomeIcon icon="fa-regular fa-star" />
            <FontAwesomeIcon icon="fa-solid fa-star" />
          </article>
        ))}
      </section>
      <section id='users'>
        <h2>Jeg skal se sammen med ...</h2>
        <ul>
          <li>Brukernavn</li>
          <li>Brukernavn</li>
        </ul>
      </section>
    </>
  );
}

export default MovieImage;
