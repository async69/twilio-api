const express = require('express')
const { ApolloServer } = require('apollo-server-express')

const typeDefs = require("./schema")
const resolvers = require("./resolver")

const PORT = process.env.PORT || 1234
const localRun = true
const deployedUrl = ""

const server = new ApolloServer({
    introspection: true,
    playground: true,
    typeDefs,
    resolvers
})

const app = express()

server.applyMiddleware({ app, path: "/" })

app.listen({ port: PORT }, async () => {
    localRun ?
    console.log(`🚀Apollo Server running on http://localhost:${PORT}`) :
    console.log(`🚀Apollo Server running on ${deployedURL}`)
})