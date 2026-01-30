import { prisma } from "../lib/prisma"

async function addMedicine(sellerId: string, data: { name: string, description: string, price: number, stock: number, manufacturer: string, categoryId: string }) {
    console.log('medicine data: ', { ...data, sellerId })
    const medicineExist = await prisma.medicine.findFirst({
        where: {
            name: data.name,
            sellerId: sellerId
        }
    })
    if (medicineExist) {
        throw new Error('Medicine already exists from same seller')
    }
    return await prisma.medicine.create({
        data: { ...data, sellerId: sellerId }
    })
    return null
}
async function updateMedicine(sellerId: string, medicineId: string, data: { price?: number, stock?: number }) {
    console.log(sellerId, medicineId, data)
    const isSeller = await prisma.medicine.findFirst({
        where: { sellerId: sellerId }
    })
    if (!isSeller) {
        throw new Error("Not authorized to update this medicine")
    }
    return await prisma.medicine.update({ where: { id: medicineId }, data: data })
}

export const sellerService = { addMedicine, updateMedicine }