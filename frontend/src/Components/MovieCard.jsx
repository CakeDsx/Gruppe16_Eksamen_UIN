import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar as fas, faStar as far } from '@fortawesome/free-solid-svg-icons'
import { faStar as fab } from '@fortawesome/free-regular-svg-icons'


function MovieImage() {
  library.add(fab, fas, far)
  const [imageUrls, setImageUrls] = useState([])
  const [movieTitles, setMovieTitles] = useState([])
  const [isStarSolid, setisStarSolid] = useState([])

  
  useEffect(() => {
    async function fetchMovieImages() {
      try {
        // Fetch movie titles from Sanity
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
        const titles = sanityData.result
        setMovieTitles(titles)


        setisStarSolid(new Array(titles.length).fill(false))

        // Fetch movie images from RapidAPI using movie titles
        const imageUrls = await Promise.all(titles.map(async (title, index) => {
          console.log(`Fetching image for movie ${index + 1}: ${title}`)
          const params = new URLSearchParams()
          params.append('exact', 'true')
          params.append('titleType', 'movie')
          const url = `https://moviesdatabase.p.rapidapi.com/titles/search/title/${title}?${params.toString()}`
          const options = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': '9f75e199fdmsh83cedb74debc28bp168dbajsnc177f705dfed',
              'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
            }
          }
          const response = await fetch(url, options)
          if (!response.ok) {
            console.error(`Failed to fetch image for movie ${index + 1}: ${title}`)
            return null
          }
          const data = await response.json()
          const movie = data.results[0]
          
          // Check if movie is null before accessing its properties
          if (movie && movie.primaryImage) {
            return movie.primaryImage.url
          } else {
            console.error(`No image found for movie ${index + 1}: ${title}`)
            return null // or any other default value
          }
        }))

        

        setImageUrls(imageUrls.filter(url => url)) // Filter out null values
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchMovieImages()
  }, [])

  const toggleStar = (index) => {
    const updatedStars = [...isStarSolid]
    updatedStars[index] = !updatedStars[index]
    setisStarSolid(updatedStars)
  }

 

  return (
    <>
      <section id='user-movies'>
        <h1 id='overskrift'>Brukernavn sine filmer</h1>
        <h2><FontAwesomeIcon icon="fa-solid fa-star" /> Filmer jeg skal se!</h2>
        

        <p>Disse filmene ligger i ønskelisten din:</p>
        {imageUrls.map((imageUrl, index) => (
          <article key={index}>
            {imageUrl && <img src={imageUrl} alt="Movie name" />}
            <h3>{movieTitles[index]}</h3>
            <button onClick={() => toggleStar (index)}>
              <FontAwesomeIcon icon={isStarSolid[index] ? fas : fab} />
              </button>
           
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
  )
}

export default MovieImage
