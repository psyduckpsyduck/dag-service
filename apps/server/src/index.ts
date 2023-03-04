import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { PrismaClient } from '@wittypsyduck/dag-service-prisma'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotEnv from 'dotenv'
import dotEnvExpand from 'dotenv-expand'
import express from 'express'
import http from 'http'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import NodeResolver from './resolvers/node-resolver'
import type { ServerContext } from './types'

const myEnv = dotEnv.config({ override: true })
dotEnvExpand.expand(myEnv)

const prisma = new PrismaClient()

const app = express()
const httpServer = http.createServer(app)

const server = new ApolloServer<ServerContext>({
  schema: await buildSchema({
    resolvers: [NodeResolver],
    validate: { forbidUnknownValues: false },
  }),
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  introspection: true,
})
await server.start()

app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  bodyParser.json({ limit: '50mb' }),
  expressMiddleware(server, {
    context: async ({ req, res }) => ({ req, res, prisma }),
  })
)

await new Promise<void>((resolve) =>
  httpServer.listen({ port: process.env.PORT }, resolve)
)
console.log(`🚀 Server ready at http://localhost:${process.env.PORT}/graphql`)
