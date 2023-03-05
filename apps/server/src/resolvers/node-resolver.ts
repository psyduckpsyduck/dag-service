import {
  PositionInput,
  NodeInput,
  Node,
} from '@wittypsyduck/dag-service-client/types'
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
    const rootNode = await nodeService.getById(prisma, id)
    console.log(rootNode)
    return toNullable(rootNode)
  }

  @Mutation(() => Node, { nullable: true })
  async insertNode(
    @Arg('position', () => PositionInput) position: PositionInput,
    @Arg('node', () => NodeInput) node: NodeInput,
    @Ctx() { prisma }: ServerContext
  ): Promise<Node | null> {
    return toNullable(await nodeService.insertNode(prisma, position, node))
  }
}

export default NodeResolver
