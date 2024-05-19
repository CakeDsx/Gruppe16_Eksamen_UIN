import React from 'react'
import { useParams } from 'react-router-dom'
import MovieImage from './MovieCard'


export default function Home() {
    const { userId } = useParams()

{/* calls the userId when importing the Genres component */}
    return (
        
        <MovieImage userId={userId} />
        
    )
}
