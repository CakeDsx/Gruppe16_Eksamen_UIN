import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

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
