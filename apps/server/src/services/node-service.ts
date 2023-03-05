import {
  NodeInput,
  NodePlacement,
  PositionInput,
} from '@wittypsyduck/dag-service-client/types'
import type {
  Node,
  Prisma,
  PrismaClient,
} from '@wittypsyduck/dag-service-prisma'
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

// TODO: fix this method
const makeNodeCreate = (
  position: PositionInput,
  node: NodeInput
): Prisma.NodeCreateInput => {
  return {
    name: node.name,
  }
}

const insertNode = async (
  prisma: PrismaClient,
  position: PositionInput,
  node: NodeInput
): Promise<Option<Node>> => {
  const { placement, referredNodeId } = position
  const { name, embededNodes, nextNodes } = node
  console.log(JSON.stringify(position, null, 2))
  console.log(JSON.stringify(node, null, 2))
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
