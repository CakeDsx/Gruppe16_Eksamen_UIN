import { client } from "./client"

export async function fetchAllcategories(){
    const data = await client.fetch(`*[type == "categories"]{
        _id,
        categorytitle,
        "movieslug":categoryurl.current}`)
        return data
}

export async function fetchCategoryBySlug(slug){
    const data = await client.fetch(`*[type == "categories" && categoryurl.current == $slug]{
        _id,
        categorytitle,
        "movieProducts": *[_type == "movie" && references(^._id)]{
            _id,
            moviename,
            "slug":movieurl.current,
            "moviename": category->categorytitle,
            "movieslug": category->categoryurl.current,
            "image": movieimage.asset->url
            
        }
    }`, {slug})
    return data
}