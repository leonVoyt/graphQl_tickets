import { schema } from './types/graphTypes.js'
import { resolvers } from './resolvers/mainResolve.js'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'

const app = express()

app.use(
  '/',
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: resolvers,
  })
)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}`)
})
