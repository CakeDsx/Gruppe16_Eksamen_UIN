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
      maxLength: 96,
      slugify: (input) => input.toLowerCase().replace(/\s+/g, '%20')
    }
},
{
  name: "kategori",
  title: "Kategorier",
  type: "array",
  of: [{type: 'reference', to:{type: 'kategori'}}]
},
{
  name: "Users",
  title: "users",
  type: "array",
  of: [{type: 'reference', to:{type: 'Users'}}]
},
  ],
}
    

