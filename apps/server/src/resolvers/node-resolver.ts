import { Node, NodeInput } from '@wittypsyduck/dag-service-client/types'
import { toNullable } from 'fp-ts/lib/Option'
import { Arg, Ctx, ID, Mutation, Query, Resolver } from 'type-graphql'
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

  @Mutation(() => Node, { nullable: true })
  async createNode(
    @Arg('input', () => NodeInput)
    input: NodeInput,
    @Ctx() { prisma }: ServerContext
  ): Promise<Node | null> {
    return toNullable(await nodeService.createNode(prisma, input))
  }
}

export default NodeResolver
