import { createClient } from "@sanity/client"

const client = createClient({
    projectId: "o9tavwx2",
    dataset: "production",
    useCdn: false,
    apiVersion: "2024-04-30",
})

export default client