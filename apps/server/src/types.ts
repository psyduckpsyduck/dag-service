import type { ExpressContextFunctionArgument } from '@apollo/server/dist/esm/express4'
import type { PrismaClient } from '@wittypsyduck/dag-service-prisma'

type ServerContext = {
  prisma: PrismaClient
} & ExpressContextFunctionArgument

export { ServerContext }
