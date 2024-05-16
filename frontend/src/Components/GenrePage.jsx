import React from 'react'
import Genres from './Genres'
import { useParams } from 'react-router-dom'

function GenrePage() {
    const { userId } = useParams()

    return (
        <>
        <Genres userId={userId}/>
        </>
    )
}

export default GenrePage
