import Genres from "./Genres"
import React, { useState, useEffect } from "react";

const url = 'https://moviesdatabase.p.rapidapi.com/titles/tt1856101'
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9f75e199fdmsh83cedb74debc28bp168dbajsnc177f705dfed',
		'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
	}
};

export default function GenrePage() {
  const [movieData, setMovieData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(url, options)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setMovieData(data.results)
      } catch (error) {
        console.error('Error fetching movie data:', error);
        setError('Error fetching movie data. Please try again later.')
      }
    }

    fetchMovie()
  }, [])

  return (
    
    <div>
      {error ? (
        <div>{error}</div>
      ) : movieData ? (
        <div>
          <h2>{movieData.titleText.text}</h2>
          <img src={movieData.primaryImage.url} alt={movieData.titleText.text} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
        {/*<Genres/>*/}
    </div>
  )
}
