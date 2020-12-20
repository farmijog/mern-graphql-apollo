const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

const { mongoURL } = require("./config/mdbkey");
const Post = require("./models/Post");

const typeDefs = gql`
    type Post{
        id: ID!,
        body: String!,
        createdAt: String!,
        username: String!
    }
    type Query{
        getPosts: [Post]
    }
`
const resolvers = {
    Query: {
        async getPosts(){
            try {
                const posts = await Post.find();
                return posts
            } catch (error) {
                throw new Error(error);
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const port = process.env.PORT || 5000;

mongoose
    .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected successfully")
        return server.listen(port)
    })
    .then(res => {
        console.log(`Server running at: ${res.url}`)
    })
    .catch(err => {
        console.log(err);
    });
