/*
  Warnings:

  - You are about to drop the `brands` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "order_products" DROP CONSTRAINT "order_products_orderId_fkey";

-- DropForeignKey
ALTER TABLE "order_products" DROP CONSTRAINT "order_products_productId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_userId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_brandId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "name" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "password" SET NOT NULL;

-- DropTable
DROP TABLE "brands";

-- DropTable
DROP TABLE "order_products";

-- DropTable
DROP TABLE "orders";

-- DropTable
DROP TABLE "products";
