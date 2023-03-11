import {
  Node,
  NodeInput,
  PositionInput,
} from '@wittypsyduck/dag-service-client/types'
import { toNullable } from 'fp-ts/lib/Option'
import { Arg, Ctx, ID, Maybe, Mutation, Query, Resolver } from 'type-graphql'
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

  @Mutation(() => Node, { nullable: true })
  async deleteNode(
    @Arg('id', () => ID) id: string,
    @Ctx() { prisma }: ServerContext
  ): Promise<Node | null> {
    return toNullable(await nodeService.deleteNode(prisma, id))
  }

  @Query(() => [Node])
  async getRoots(@Ctx() { prisma }: ServerContext): Promise<Node[]> {
    return await nodeService.getRoots(prisma)
  }

  @Mutation(() => Node, { nullable: true })
  async initDatabase(@Ctx() { prisma }: ServerContext): Promise<Maybe<Node>> {
    return toNullable(await nodeService.initDatabase(prisma))
  }
}

export default NodeResolver
