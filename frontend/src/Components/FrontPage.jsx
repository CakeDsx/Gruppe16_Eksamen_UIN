import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser } from '@fortawesome/free-regular-svg-icons'

export default function FrontPage() {
  library.add(faUser) 

  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://o9tavwx2.api.sanity.io/v1/data/query/movies', { //retrieve info from our sanit API
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', //this si our sanity API token
            Authorization: 'Bearer sk0EFmQ5LvIy6dAbCyLZenXHNmihZtMmVlXxPnDjWMcx8HP75BV0vwGpWgIFFBK4flk56xkPNy1KsGvCQjz8KZIxSCyK3hsqSnnhxGKUCw5QKcNBvUwg5iT9ahVAxjK7R8n350KQK8QrEyFEaw2f6LTbKxWe4rxl4zGJIB4OZQ8kYdq9wqio',
          },
          body: JSON.stringify({ //specifies what info from the api we are looking for
              query: '*[_type == "Users"]{_id, users, url}',
             }),
        })

        if (!response.ok) { //these are for checking our code through the way to ee what works and waht deosnt, its used pretty much everywhere in oru code
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

  return (
    <>
      {error ? (
        <div>{error}</div>
      ) : (
        <section>
          <h1>Users</h1>
          {users.map((user, index) => ( //this maps the users into an array
            <article className="user-card" key={index}>
                {/* here we add the icon to the user names */}
              <h3><FontAwesomeIcon icon={faUser} /> {user.users}</h3> 
              {/* while picking a user we redirect it to go to the specified users ID when one is picked. */}
              <Link to={`/Home/${user._id}`} alt={user.users}>
                {user.url && (
                  <img src={user.url} alt={user.users} />
                )}
              </Link>
            </article>
          ))}
        </section>
      )}
    </>
  )
}

