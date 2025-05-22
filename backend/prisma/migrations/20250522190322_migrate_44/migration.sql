/*
  Warnings:

  - Added the required column `newDate` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "newDate" TIMESTAMP(3) NOT NULL;
