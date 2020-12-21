const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const { mongoURL } = require("./config/mdbkey");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});

const port = process.env.PORT || 5000;

mongoose
    .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected successfully");
        return server.listen(port);
    })
    .then(res => {
        console.log(`Server running at: ${res.url}`);
    })
    .catch(err => {
        console.log(err);
    });