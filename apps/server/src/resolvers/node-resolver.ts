import { Node } from '@wittypsyduck/dag-service-client/types'
import { toNullable } from 'fp-ts/lib/Option'
import { Arg, Ctx, ID, Query, Resolver } from 'type-graphql'
import nodeService from '../services/node-service'
import type { ServerContext } from '../types'

@Resolver()
class NodeResolver {
  @Query(() => Node, { nullable: true })
  async node(
    @Arg('id', () => ID) id: string,
    @Ctx() { prisma }: ServerContext
  ): Promise<Node | null> {
    return toNullable(await nodeService.getById(prisma, id))
  }
}

export default NodeResolver
