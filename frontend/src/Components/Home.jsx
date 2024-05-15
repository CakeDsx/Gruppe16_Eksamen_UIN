import React from 'react'
import { useParams } from 'react-router-dom'
import MovieCard from './MovieCard'

export default function Home() {
    const { userId } = useParams()

    return (
        <MovieCard userId={userId} />
    )
}
