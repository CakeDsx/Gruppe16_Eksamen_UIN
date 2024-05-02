import { client } from "./client"

export async function fetchAllCategories() {
    try {
        const data = await client.fetch(`*[_type == "category"]{
            _id,
            categorytitle,
            "categoryslug": categoryurl.current
        }`)
        return data
    } catch (error) {
        console.error("Error fetching all categories:", error)
        throw error
    }
}

export async function fetchCategoryBySlug(slug) {
    try {
        const data = await client.fetch(`*[_type == "category" && categoryurl.current == $slug]{
            _id,
            categorytitle
        }`, { slug })
        return data[0]
    } catch (error) {
        console.error("Error fetching category by slug:", error)
        throw error
    }
}
