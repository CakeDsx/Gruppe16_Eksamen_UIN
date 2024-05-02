import { useEffect, useState } from "react"
import { fetchAllMovies } from "../../sanity/services/movieServices"
import MovieCard from "./MovieCard"

export default function Home(){
    const [movies, setMovies] = useState(null)

    const getAllMovies = async () => {
        const data = await fetchAllMovies()
        setMovies(data)
    }

    const url = 'https://moviesdatabase.p.rapidapi.com/titles/series/%7BseriesId%7D';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '023516fa7dmsh3db1b9729c75136p1ed7fejsn251f88436307',
		'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

    useEffect(() => {
        getAllMovies
    }, [])

    console.log(movies)

    return (
    <main>
        <h2>WhatToSee</h2>
        
        {movies?.map((movie, index) => <MovieCard key={index} movieInfo={movie} />)}
    </main>
    )
}