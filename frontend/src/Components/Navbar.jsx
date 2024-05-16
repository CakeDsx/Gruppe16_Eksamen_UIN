import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchAllMovies } from "../../sanity/services/movieServices"
import Title from "./Title"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser } from '@fortawesome/free-regular-svg-icons'

export default function Navbar({ userID, userName }) {
    library.add(faUser)
    const [active, setActive] = useState()
    const [movieList, setMovieList] = useState(null)
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)
   

    const getAllMovies = async () => {
        const data = await fetchAllMovies()
        setMovieList(data)
    }

    useEffect(() => {
        console.log(active)
        getAllMovies()
    }, [active])

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await fetch('https://o9tavwx2.api.sanity.io/v1/data/query/movies', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer sk0EFmQ5LvIy6dAbCyLZenXHNmihZtMmVlXxPnDjWMcx8HP75BV0vwGpWgIFFBK4flk56xkPNy1KsGvCQjz8KZIxSCyK3hsqSnnhxGKUCw5QKcNBvUwg5iT9ahVAxjK7R8n350KQK8QrEyFEaw2f6LTbKxWe4rxl4zGJIB4OZQ8kYdq9wqio',
              },
              body: JSON.stringify({
                  query: '*[_type == "Users"]{_id, users, url}',
                 }),
            })
    
            if (!response.ok) {
              throw new Error('Network response was not ok')
            }
    
            const data = await response.json()
            setUsers(data.result)
          } catch (error) {
            console.error('There was a problem fetching users:', error)
            setError('Error fetching users. Please try again later.')
          }
        }
    
        fetchUsers()
      }, [])

    console.log(movieList)

    return (
        <>
            <nav>
                <Title />
                
                <ul> 
                 {users.map((user, index) => (   
                    <li className="what-to-see" key={index}>
                        <Link to={`/Home/${user._id}`}>Hva skal jeg se?</Link>
                    </li>
                    ))}
                    {users.map((user, index) => (
                    <li key={index}>  
                        <Link to={`/Genres/${user._id}`}>Bla gjennom sjangere</Link>
                    </li>
                    ))}
                
                    <li>
                        <Link to="/FrontPage"><FontAwesomeIcon icon={faUser} />Bruker</Link>
                    </li>
                </ul>
                
            </nav>
        </>
    )
}
