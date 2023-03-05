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
import { map } from 'ramda'

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
        enclosedNodes: true,
        outEdges: {
          include: {
            destinationNode: true,
          },
        },
      },
    })
  )
}

const makeEdge = (node: NodeInput): Prisma.EdgeCreateWithoutSourceNodeInput => {
  return {
    destinationNode: {
      create: makeNode(node),
    },
  }
}

const makeEdges = (
  nodes: NodeInput[]
): Prisma.EdgeCreateWithoutSourceNodeInput[] => {
  return map(makeEdge, nodes)
}

const makeNode = (node: NodeInput): Prisma.NodeCreateInput => {
  const { name, enclosedNodes, nextNodes } = node
  return {
    name,
    enclosedNodes: {
      create: makeNodes(enclosedNodes || []),
    },
    outEdges: {
      create: makeEdges(nextNodes || []),
    },
  }
}

const makeNodes = (nodes: NodeInput[]): Prisma.NodeCreateInput[] => {
  return map(makeNode, nodes)
}

const makeCreateNodeData = ({
  name,
  enclosedNodes,
  nextNodes,
}: NodeInput): Prisma.NodeCreateWithoutEnclosingNodeInput => {
  return {
    name,
    enclosedNodes: {
      create: makeNodes(enclosedNodes || []),
    },
    outEdges: {
      create: makeEdges(nextNodes || []),
    },
  }
}

const insertNode = async (
  prisma: PrismaClient,
  position: PositionInput,
  node: NodeInput
): Promise<Option<Node>> => {
  const { placement, referredNodeId } = position
  const nodeCreateData = makeCreateNodeData(node)
  const maybeReferredNode = fromNullable(referredNodeId)
  let createdNode
  if (isNone(maybeReferredNode)) {
    createdNode = await prisma.node.create({
      data: nodeCreateData,
    })
  } else {
    if (placement === NodePlacement.NEXT) {
      createdNode = await prisma.node.create({
        data: {
          ...nodeCreateData,
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
          ...nodeCreateData,
          enclosingNodeId: referredNodeId!,
        },
      })
    }
  }

  return fromNullable(createdNode)
}

const deleteNode = async (
  prisma: PrismaClient,
  id: string
): Promise<Option<Node>> => {
  return fromNullable(
    await prisma.node.delete({
      where: {
        id,
      },
    })
  )
}

export default { getById, insertNode, deleteNode }
