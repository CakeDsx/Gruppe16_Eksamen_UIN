import { client } from "../client"

export async function fetchMovies() {
    const data = await client.fetch(`*[_type == "movies"]{
        //sette inn keys(?) her?
    }`)
    return data
}