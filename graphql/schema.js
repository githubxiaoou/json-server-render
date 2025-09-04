const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLSchema, GraphQLID } = require('graphql');

// Blog Type
const BlogType = new GraphQLObjectType({
  name: 'Blog',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    author: { type: GraphQLString }
  })
});

// Product Type
const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLInt },
    img: { type: GraphQLString }
  })
});

// Project Type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString }
  })
});

// Wordle Type
const WordleType = new GraphQLObjectType({
  name: 'Wordle',
  fields: () => ({
    id: { type: GraphQLID },
    word: { type: GraphQLString },
    date: { type: GraphQLString }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // Blog queries
    blogs: {
      type: new GraphQLList(BlogType),
      resolve: (parent, args, { dataSources }) => {
        return dataSources.getBlogs();
      }
    },
    blog: {
      type: BlogType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args, { dataSources }) => {
        return dataSources.getBlogById(args.id);
      }
    },
    blogsByAuthor: {
      type: new GraphQLList(BlogType),
      args: { author: { type: GraphQLString } },
      resolve: (parent, args, { dataSources }) => {
        return dataSources.getBlogsByAuthor(args.author);
      }
    },

    // Product queries
    products: {
      type: new GraphQLList(ProductType),
      resolve: (parent, args, { dataSources }) => {
        return dataSources.getProducts();
      }
    },
    product: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args, { dataSources }) => {
        return dataSources.getProductById(args.id);
      }
    },
    productsByPrice: {
      type: new GraphQLList(ProductType),
      args: { maxPrice: { type: GraphQLInt } },
      resolve: (parent, args, { dataSources }) => {
        return dataSources.getProductsByPrice(args.maxPrice);
      }
    },

    // Project queries
    projects: {
      type: new GraphQLList(ProjectType),
      resolve: (parent, args, { dataSources }) => {
        return dataSources.getProjects();
      }
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args, { dataSources }) => {
        return dataSources.getProjectById(args.id);
      }
    },

    // Wordle queries
    wordles: {
      type: new GraphQLList(WordleType),
      resolve: (parent, args, { dataSources }) => {
        return dataSources.getWordles();
      }
    },
    wordle: {
      type: WordleType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args, { dataSources }) => {
        return dataSources.getWordleById(args.id);
      }
    }
  }
});

// Root Mutation
const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    // Blog mutations
    addBlog: {
      type: BlogType,
      args: {
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        author: { type: GraphQLString }
      },
      resolve: (parent, args, { dataSources }) => {
        return dataSources.addBlog(args);
      }
    },
    updateBlog: {
      type: BlogType,
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        author: { type: GraphQLString }
      },
      resolve: (parent, args, { dataSources }) => {
        return dataSources.updateBlog(args);
      }
    },
    deleteBlog: {
      type: BlogType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args, { dataSources }) => {
        return dataSources.deleteBlog(args.id);
      }
    },

    // Product mutations
    addProduct: {
      type: ProductType,
      args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLInt },
        img: { type: GraphQLString }
      },
      resolve: (parent, args, { dataSources }) => {
        return dataSources.addProduct(args);
      }
    },
    updateProduct: {
      type: ProductType,
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLInt },
        img: { type: GraphQLString }
      },
      resolve: (parent, args, { dataSources }) => {
        return dataSources.updateProduct(args);
      }
    },
    deleteProduct: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args, { dataSources }) => {
        return dataSources.deleteProduct(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
