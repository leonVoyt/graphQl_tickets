import { resolvers } from './resolvers/mainResolve.js'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './types/graphTypes.js'

const server = new ApolloServer({ typeDefs, resolvers })

const app = express()

async function startServer() {
  await server.start()
  server.applyMiddleware({ app })
}

startServer().then(() => {
  const PORT = process.env.PORT || 4000
  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  })
})
