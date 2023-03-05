/*
  Warnings:

  - You are about to drop the column `grouping_node_id` on the `nodes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "dag-service"."nodes" DROP CONSTRAINT "nodes_grouping_node_id_fkey";

-- AlterTable
ALTER TABLE "dag-service"."nodes" DROP COLUMN "grouping_node_id",
ADD COLUMN     "enclosing_node_id" UUID;

-- AddForeignKey
ALTER TABLE "dag-service"."nodes" ADD CONSTRAINT "nodes_enclosing_node_id_fkey" FOREIGN KEY ("enclosing_node_id") REFERENCES "dag-service"."nodes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
