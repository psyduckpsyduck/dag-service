import {
  InsertNodeInput,
  NodePlacement,
} from '@wittypsyduck/dag-service-client/types'
import type { Node, PrismaClient } from '@wittypsyduck/dag-service-prisma'
import { fromNullable, isNone, Option } from 'fp-ts/lib/Option'

const getById = async (
  prisma: PrismaClient,
  id: string
): Promise<Option<Node>> => {
  return fromNullable(
    await prisma.node.findUnique({
      where: {
        id,
      },
      include: {
        embededNodes: true,
      },
    })
  )
}

const insertNode = async (
  prisma: PrismaClient,
  input: InsertNodeInput
): Promise<Option<Node>> => {
  const { name, placement, referredNodeId, embededNodes, nextNodes } = input
  console.log(JSON.stringify(input, null, 2))
  const maybeReferredNode = fromNullable(referredNodeId)
  let createdNode
  if (isNone(maybeReferredNode)) {
    createdNode = await prisma.node.create({
      data: {
        name,
      },
    })
  } else {
    if (placement === NodePlacement.FLAT) {
      createdNode = await prisma.node.create({
        data: {
          name,
          inEdges: {
            create: {
              sourceNodeId: referredNodeId!,
            },
          },
        },
      })
    } else {
      createdNode = await prisma.node.create({
        data: {
          name,
          groupingNodeId: referredNodeId!,
        },
      })
    }
  }

  return fromNullable(createdNode)
}

export default { getById, insertNode }
