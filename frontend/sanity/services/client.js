import { createClient } from "@sanity/client"

export const client = createClient({
    projectId: "o9tavwx2",
    dataset: "production",
    useCdn: true,
    apiVersion: "v2022-03-07",
})

export const writeClient = createClient({
    token: "sk0EFmQ5LvIy6dAbCyLZenXHNmihZtMmVlXxPnDjWMcx8HP75BV0vwGpWgIFFBK4flk56xkPNy1KsGvCQjz8KZIxSCyK3hsqSnnhxGKUCw5QKcNBvUwg5iT9ahVAxjK7R8n350KQK8QrEyFEaw2f6LTbKxWe4rxl4zGJIB4OZQ8kYdq9wqio",
    projectId: "o9tavwx2",
    dataset: "production",
    apiVersion: "v2022-03-07",
   

})

// uses GROQ to query content: https://www.sanity.io/docs/groq
// export async function getPosts() {
//     const posts = await client.fetch('*[_type == "post"]')
//     return posts
//   }
  
//   export async function createPost(post: Post) {
//     const result = client.create(post)
//     return result
//   }
  
//   export async function updateDocumentTitle(_id, title) {
//     const result = client.patch(_id).set({title})
//     return result
//   }