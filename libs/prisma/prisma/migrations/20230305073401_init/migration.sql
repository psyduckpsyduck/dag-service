-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "dag-service"."nodes" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "grouping_node_id" UUID,

    CONSTRAINT "nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dag-service"."edges" (
    "source_node_id" UUID NOT NULL,
    "destination_node_id" UUID NOT NULL,

    CONSTRAINT "edges_pkey" PRIMARY KEY ("source_node_id","destination_node_id")
);

-- AddForeignKey
ALTER TABLE "dag-service"."nodes" ADD CONSTRAINT "nodes_grouping_node_id_fkey" FOREIGN KEY ("grouping_node_id") REFERENCES "dag-service"."nodes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dag-service"."edges" ADD CONSTRAINT "edges_source_node_id_fkey" FOREIGN KEY ("source_node_id") REFERENCES "dag-service"."nodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dag-service"."edges" ADD CONSTRAINT "edges_destination_node_id_fkey" FOREIGN KEY ("destination_node_id") REFERENCES "dag-service"."nodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
