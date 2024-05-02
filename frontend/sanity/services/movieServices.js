import { client } from "./client"

export async function fetchAllMovies(){
    const data = await client.fetch(`*[type == "movies"]{
        _id,
        movietitle,
        "movieslug":movieurl.current
        "moviename": movie->movietitle,
        "movieslug": movie->movieurl.current,
        "image": movieimage.asset->url
    }`)
        return data
}

export async function fetchMovieBySlug(slug){
    const data = await client.fetch(`*[type == "movies" && movieurl.current == $slug]{
        _id,
        moviename,
        description,
        "categoryname": category->categorytitle,
        "movieslug": category->categoryurl.current,
        "image": movieimage.asset->url,
            
    }`, {slug})
    return data
}

