import { createClient } from "@sanity/client"

const client = createClient({
    projectId: "o9tavwx2",
    dataset: "production",
    useCdn: false,
    apiVersion: "2022-03-07",
})

export default client