import { createClient } from '@sanity/client'


const sanityClient = createClient({
  projectId: 'o9tavwx2',
  dataset: 'production',

});


export const fetchAllMovies = async () => {
  const data = await sanityClient.fetch(`*[_type == "movie"]`)
  return data
};
