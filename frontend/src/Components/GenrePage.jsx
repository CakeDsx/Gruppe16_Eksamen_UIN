import React from 'react'
import Genres from './Genres'
import { useParams } from 'react-router-dom'

function GenrePage() {
    const { userId } = useParams() //we use useParams as a hook to gain access to the userId.

    return (
        <>
        <Genres userId={userId}/> 
        {/* calls the userId when importing the Genres component */}
        </>
    )
}

export default GenrePage
