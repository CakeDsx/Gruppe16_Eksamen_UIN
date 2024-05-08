import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'o9tavwx2',
    dataset: 'movies'
  }
  // ,
  // server:{
  //   hostname: "localhost",
  //   port: 3333,
  // },
  // graphql: [{
  //   tag: "default",
  //   playground: true,
  //   generation: "gen3",
  //   nonNullDocumentFields: false,
  // }],
  // vite: (config) => config,
})
