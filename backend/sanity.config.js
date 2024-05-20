import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

//to set up sanity we mainly followed a youtube video to get the hang of it : https://www.youtube.com/watch?v=OcTPaUfay5I

export default defineConfig({
  name: 'default',
  title: 'EksamenUIN2024',

  projectId: 'o9tavwx2',
  dataset: 'movies',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
