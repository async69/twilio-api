const { gql } = require('apollo-server-express')

module.exports =  gql`
    type Query {
        _: Boolean
    }

    type Mutation {
        sendText(username: String!, password: String!, serviceID: String!, phoneNumber: String!): Message
        verify(username: String!, password: String!, serviceID: String!, phoneNumber: String!, code: String!): Message
    }

    type Message {
        message: String
        error: Error
    }

    type Error {
        value: Boolean
        message: String
    }

`