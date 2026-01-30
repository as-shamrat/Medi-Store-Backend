-- CreateEnum
CREATE TYPE "ShippingMethod" AS ENUM ('CASH_ON_DELIVERY');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "shippingMethod" "ShippingMethod" NOT NULL DEFAULT 'CASH_ON_DELIVERY';
