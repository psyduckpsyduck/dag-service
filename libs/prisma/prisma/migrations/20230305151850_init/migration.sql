-- DropForeignKey
ALTER TABLE "dag-service"."nodes" DROP CONSTRAINT "nodes_enclosing_node_id_fkey";

-- AddForeignKey
ALTER TABLE "dag-service"."nodes" ADD CONSTRAINT "nodes_enclosing_node_id_fkey" FOREIGN KEY ("enclosing_node_id") REFERENCES "dag-service"."nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
