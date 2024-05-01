import { client } from "../client"

// export async function fetchMovies() {
//     const data = await client.fetch(`*[_type == "movies"]{
//         //sette inn keys(?) her?
//     }`)
//     return data
// }

export const fetchAllMovies = async () => {
    const data = await client.fetch(`*[_type == "movie"]`)
    return data
}

export const fetchAllMovies(id) = async () ?> {
    const data = await client.fetch(`*[_type == "movie" && -id == $id]{_id, title, reviews}`, {id})
}