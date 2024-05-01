import { createClient } from "@sanity/client"

export const client = createClient({
    projectId: "o9tavwx2",
    dataset: "production",
    useCdn: false,
    apiVersion: "2022-03-07",
})

export const movieClient = createClient({
    token: "sk0EFmQ5LvIy6dAbCyLZenXHNmihZtMmVlXxPnDjWMcx8HP75BV0vwGpWgIFFBK4flk56xkPNy1KsGvCQjz8KZIxSCyK3hsqSnnhxGKUCw5QKcNBvUwg5iT9ahVAxjK7R8n350KQK8QrEyFEaw2f6LTbKxWe4rxl4zGJIB4OZQ8kYdq9wqio",
    projectId: "o9tavwx2",
    dataset: "production",
})