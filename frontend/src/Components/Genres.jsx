import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar as fas, faStar as far } from '@fortawesome/free-solid-svg-icons'
import { faStar as fab } from '@fortawesome/free-regular-svg-icons'

export default function Genres() {
  const [genres, setGenres] = useState([])
  const [error, setError] = useState(null)
  const [isStarSolid, setisStarSolid] = useState([])
  library.add(fab, fas, far)

  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await fetch('https://o9tavwx2.api.sanity.io/v1/data/query/movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer sk0EFmQ5LvIy6dAbCyLZenXHNmihZtMmVlXxPnDjWMcx8HP75BV0vwGpWgIFFBK4flk56xkPNy1KsGvCQjz8KZIxSCyK3hsqSnnhxGKUCw5QKcNBvUwg5iT9ahVAxjK7R8n350KQK8QrEyFEaw2f6LTbKxWe4rxl4zGJIB4OZQ8kYdq9wqio',
          },
          body: JSON.stringify({
            query: '*[_type == "kategori"]{_id, Genre}' ,
            
          }),
        })

        if(!response.ok){
          throw new Error('failed to fetch user info')
        }

        const userData = await response.json()
        setGenres(userData.result)
        console.log(userData)
      } catch (error){
        console.error('Error', error)
      }
    }

    setisStarSolid(new Array(genres.length).fill(false))

    fetchGenres()
  }, [])

  const toggleStar = (index) => {
            const updatedStars = [...isStarSolid]
            updatedStars[index] = !updatedStars[index]
            setisStarSolid(updatedStars)
          }

  return (
    <>
      <h1>Genres</h1>
      {error && <p>{error}</p>}
      <ul>
      {genres
        ? genres
          .filter((genre, index) => index > 0)
          .map((genre, index) => (
          <li key={genre._id}>{genre.Genre}                               
           <button onClick={() => toggleStar (index)}>
              <FontAwesomeIcon icon={isStarSolid[index] ? fas : fab} />
             </button>
             </li>
        ))
    :null
    }
      </ul>
    </>
  )
}



// import React, { useEffect, useState } from "react"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faStar as fas, faStar as far } from '@fortawesome/free-solid-svg-icons'
// import { faStar as fab } from '@fortawesome/free-regular-svg-icons'

// export default function Genres(){
//     library.add(fab, fas, far)
//     const [genres, setGenres] = useState([])
//     const [error, setError] = useState(null)
//     const [isStarSolid, setisStarSolid] = useState([])


//     useEffect(() => {
//         async function fetchGenres() {
//             try{

//     const url = 'https://moviesdatabase.p.rapidapi.com/titles/utils/genres'
// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': '023516fa7dmsh3db1b9729c75136p1ed7fejsn251f88436307',
//         'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
//     }
// }

// const response = await fetch(url, options)
//                 const data = await response.json()

//                 if (data && Array.isArray(data.results)) {
//                     setGenres(data.results)
//                 } else {
//                     setError("Invalid data format received from the API")
//                 }
//             } catch (error) {
//                 console.error("Error fetching movies:", error)
//                 setError("Error fetching movies. Please try again later.")
//             }
//         }

//         setisStarSolid(new Array(genres.length).fill(false))


//         fetchGenres()
//     }, [])

//     const toggleStar = (index) => {
//         const updatedStars = [...isStarSolid]
//         updatedStars[index] = !updatedStars[index]
//         setisStarSolid(updatedStars)
//       }
    
//     return (
//         <>
//             <ul>
//                 {genres
//                     ? genres
//                         .filter((genres, index) => index > 0)
//                         .map((genres, index) => (
//                             <li key={index}>
//                                 <span>{index + 1}. {genres}</span>
//                                 <button onClick={() => toggleStar (index)}>
//               <FontAwesomeIcon icon={isStarSolid[index] ? fas : fab} />
//               </button>
//                             </li>
//                         ))
//                     : null
//                 }
//             </ul>
//         </>
//     )
// }