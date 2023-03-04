import type { Node, PrismaClient } from '@wittypsyduck/dag-service-prisma'
import { fromNullable, Option } from 'fp-ts/lib/Option'

import { isEmpty, isNil, or } from 'ramda'

const isNilOrEmpty = or(isNil, isEmpty)

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

export default { getById }
