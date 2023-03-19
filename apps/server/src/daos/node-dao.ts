import type { Node, PrismaClient } from '@wittypsyduck/dag-service-prisma'
import { pipe } from 'fp-ts/lib/function'
import * as RTE from 'fp-ts/ReaderTaskEither'
import * as TE from 'fp-ts/TaskEither'
import * as R from 'fp-ts/Reader'
import * as O from 'fp-ts/Option'

const getById = (
  id: string
): RTE.ReaderTaskEither<PrismaClient, String, O.Option<Node>> => {
  return pipe(
    id,
    RTE.of,
    RTE.chain((id) =>
      R.asks((prisma: PrismaClient) =>
        TE.tryCatch(
          () =>
            prisma.node.findUnique({
              where: {
                id,
              },
            }),
          String
        )
      )
    ),
    RTE.map(O.fromNullable)
  )
}

export { getById }
