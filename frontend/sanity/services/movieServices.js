// import { client } from "./client"


// export const fetchAllMovies = async () => {
//     const data = await client.fetch(`*[_type == "movie"]`)
//     return data
// }

// export const fetchAllMovies(id) = async () ?> {
//     const data = await client.fetch(`*[_type == "movie" && -id == $id]{_id, title}`, {id})
// }


import client from "./client"


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