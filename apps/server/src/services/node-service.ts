import type {
  NodeInput,
  PositionInput,
} from '@wittypsyduck/dag-service-client/types'
import type {
  Node,
  Prisma,
  PrismaClient,
} from '@wittypsyduck/dag-service-prisma'
import { pipe } from 'fp-ts/lib/function'
import { fromNullable, isNone, Option } from 'fp-ts/lib/Option'
import { map } from 'ramda'
import { ROOT_NODE_ID } from '../consts'
import { isNilOrEmpty } from '../utils'

const initDatabase = async (prisma: PrismaClient): Promise<Option<Node>> => {
  return fromNullable(
    await prisma.node.upsert({
      create: {
        id: ROOT_NODE_ID,
        name: 'ROOT',
        enclosingNodeId: ROOT_NODE_ID,
      },
      where: {
        id: ROOT_NODE_ID,
      },
      update: {},
    })
  )
}

const getById = async (
  prisma: PrismaClient,
  id: string
): Promise<Option<Node>> => {
  return fromNullable(
    await prisma.node.findUnique({
      where: {
        id,
      },
    })
  )
}

const makeEdge = (node: NodeInput): Prisma.EdgeCreateWithoutFromNodeInput => {
  return {
    toNode: {
      create: makeNode(node),
    },
  }
}

const makeEdges = (
  nodes: NodeInput[]
): Prisma.EdgeCreateWithoutFromNodeInput[] => {
  return map(makeEdge, nodes)
}

const makeNode = (node: NodeInput): Prisma.NodeCreateInput => {
  const { name, enclosedNodes, nextNodes } = node
  return {
    name,
    enclosingNode: {
      connectOrCreate: {
        create: {},
      },
    },
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

const makeCreateNodeData = (
  position: PositionInput,
  node: NodeInput
): Prisma.NodeCreateInput => {
  const { placement, referredNodeId } = position

  return {
    name,
    enclosedNodes: {
      create: makeNodes(enclosedNodes || []),
    },
    outEdges: {
      create: makeEdges(nextNodes || []),
    },
    enclosingNode: {},
  }
}

const insertNode = async (
  prisma: PrismaClient,
  position: PositionInput,
  node: NodeInput
): Promise<Option<Node>> => {
  const referredNodeId = isNilOrEmpty(position.referredNodeId)
    ? ROOT_NODE_ID
    : position.referredNodeId!
  const maybeReferredNode = await getById(prisma, referredNodeId)
  return pipe(maybeReferredNode)
  if (isNone(maybeReferredNode)) {
  }
  const nodeCreateData = makeCreateNodeData(position, node)

  return fromNullable(
    await prisma.node.create({
      data: nodeCreateData,
    })
  )
  // if (isNone(maybeReferredNode)) {
  //   createdNode = await prisma.node.create({
  //     data: nodeCreateData,
  //   })
  // } else {
  //   if (placement === NodePlacement.NEXT) {
  //     createdNode = await prisma.node.create({
  //       data: {
  //         ...nodeCreateData,
  //         inEdges: {
  //           create: {
  //             sourceNodeId: referredNodeId!,
  //           },
  //         },
  //       },
  //     })
  //   } else {
  //     createdNode = await prisma.node.create({
  //       data: {
  //         ...nodeCreateData,
  //         enclosingNodeId: referredNodeId!,
  //       },
  //     })
  //   }
  // }
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

const getRoots = async (
  prisma: PrismaClient,
  enclosingNodeId: string = ROOT_NODE_ID
): Promise<Node[]> => {
  return await prisma.node.findMany({
    where: {
      id: {
        not: enclosingNodeId,
      },
      enclosingNodeId,
      inEdges: {
        every: {
          fromNode: {
            id: enclosingNodeId,
          },
        },
      },
    },
  })
}

export default { getById, insertNode, deleteNode, getRoots, initDatabase }
