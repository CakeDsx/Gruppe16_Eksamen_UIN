// import { client } from "./client"


// export const fetchAllMovies = async () => {
//     const data = await client.fetch(`*[_type == "movie"]`)
//     return data
// }

// export const fetchAllMovies(id) = async () ?> {
//     const data = await client.fetch(`*[_type == "movie" && -id == $id]{_id, title}`, {id})
// }



import { client } from "./client"
import {defineConfig} from 'sanity'
import {defineCliConfig} from 'sanity/cli'




export async function fetchAllMovies() {
    try {
        const data = await client.fetch(`*[_type == "movie"]{
            _id,
            movietitle,
            "movieslug": movieurl.current,
            "image": movieimage.asset->url
        }`)
        return data
    } catch (error) {
        console.error("Error fetching all movies:", error)
        throw error
    }
}

export async function fetchMovieBySlug(slug) {
    try {
        const data = await client.fetch(`*[_type == "movie" && movieurl.current == $slug]{
            _id,
            movietitle,
            description,
            "image": movieimage.asset->url
        }`, { slug })
        return data[0]
    } catch (error) {
        console.error("Error fetching movie by slug:", error)
        throw error
    }
}




const API_TOKEN = 'sk0EFmQ5LvIy6dAbCyLZenXHNmihZtMmVlXxPnDjWMcx8HP75BV0vwGpWgIFFBK4flk56xkPNy1KsGvCQjz8KZIxSCyK3hsqSnnhxGKUCw5QKcNBvUwg5iT9ahVAxjK7R8n350KQK8QrEyFEaw2f6LTbKxWe4rxl4zGJIB4OZQ8kYdq9wqio'
const DATASET_ID = 'movies'
const PROJECT_ID = 'o9tavwx2'
// Construct the URL using the dataset ID
const CAT_API_URL = `https://${PROJECT_ID}.api.sanity.io/v1/data/query/${DATASET_ID}`

// Function to fetch cat breeds
function fetchMovies() {
  fetch(CAT_API_URL, {
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`
    }
  })
  .then(res => res.json())
  .then(MovieTitles => {
    // Now you have an array of catBreeds from the external API
    console.log(MovieTitles);
  })
  .catch(error => {
    console.error('Error fetching data:', error)
  })
}

// Call the function to fetch cat breeds
export default fetchMovies();




   
