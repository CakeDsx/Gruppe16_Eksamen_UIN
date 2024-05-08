export default {
  name: 'movie',
  title: 'Movie',
  type: 'document',
  fields: [
    
    {
      name: "title",
      title: "movieTitle",
      type: "string"
  },
  {
    name: "slug",
    title: "slug",
    type: "slug",
    options: {
      source: 'title',
      maxLength: 96
    }
},
{
  name: "mainImage",
  title: "Main image",
  type: "image",
  options: {
    hotspot: true
  }
},
{
  name: "kategori",
  title: "Kategorier",
  type: "array",
  of: [{type: 'reference', to:{type: 'kategori'}}]
}

  ],
}
    

