// import client from "./client"

// export async function fetchUsers() {
//   try {
//     const data = await client.fetch(`*[_type == "Users" && _id != $userId]{_id, users}`, {
//       userId: "",
//     })
//     return data;
//   } catch (error) {
//     console.error("Error fetching users:", error)
//     throw error
//   }
// }

// export async function fetchUserInfo(userId) {
//   try {
//     const data = await client.fetch(`*[_type == "Users" && _id == $userId]{favoriteMovies[]->{title, id}, wishList[]->{title, id}}`, {
//       userId,
//     })
//     return data[0]
//   } catch (error) {
//     console.error("Error fetching user info:", error)
//     throw error
//   }
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