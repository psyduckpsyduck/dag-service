-- DropForeignKey
ALTER TABLE "dag-service"."edges" DROP CONSTRAINT "edges_source_node_id_fkey";

-- AddForeignKey
ALTER TABLE "dag-service"."edges" ADD CONSTRAINT "edges_source_node_id_fkey" FOREIGN KEY ("source_node_id") REFERENCES "dag-service"."nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
