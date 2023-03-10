-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "dag-service"."nodes" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "enclosing_node_id" UUID NOT NULL,

    CONSTRAINT "nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dag-service"."edges" (
    "from" UUID NOT NULL,
    "to" UUID NOT NULL,

    CONSTRAINT "edges_pkey" PRIMARY KEY ("from","to")
);

-- AddForeignKey
ALTER TABLE "dag-service"."nodes" ADD CONSTRAINT "nodes_enclosing_node_id_fkey" FOREIGN KEY ("enclosing_node_id") REFERENCES "dag-service"."nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dag-service"."edges" ADD CONSTRAINT "edges_from_fkey" FOREIGN KEY ("from") REFERENCES "dag-service"."nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dag-service"."edges" ADD CONSTRAINT "edges_to_fkey" FOREIGN KEY ("to") REFERENCES "dag-service"."nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
