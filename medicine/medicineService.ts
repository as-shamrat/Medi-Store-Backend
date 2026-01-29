
import { MedicineWhereInput } from "../generated/prisma/models";
import { prisma } from "../lib/prisma"

async function getAllMedicines(payload: { search?: string, page?: string, limit?: string }) {
    const whereConditions: MedicineWhereInput[] = payload.search !== undefined ?
        [
            {
                name: {
                    contains: payload.search,
                    mode: 'insensitive'
                }
            },
            {
                description: {
                    contains: payload.search,
                    mode: 'insensitive'
                }
            },
            {
                category: {
                    name: {
                        contains: payload.search,
                        mode: 'insensitive'
                    }
                }
            }
        ] : [];
    // pagination part

    const { page, limit } = payload

    const skip = (Number(page) - 1) * Number(limit)
    const take = Number(limit)

    return await prisma.medicine.findMany({
        where: { OR: whereConditions },
        skip,
        take,
        select: {
            id: true,
            name: true,
            description: true,
            manufacturer: true,
            price: true, createdAt: true,
            stock: true,
            seller: {
                select: {
                    id: true,
                    name: true
                }
            },
            category: {
                select: { id: true, name: true }
            }
        }
    })
}

async function getMedicineById(id: string) {
    return await prisma.medicine.findUnique({
        where: { id: id }, select: {

            id: true,
            name: true,
            description: true,
            manufacturer: true,
            price: true, createdAt: true,
            stock: true,
            seller: {
                select: {
                    id: true,
                    name: true
                }
            },
            category: {
                select: { id: true, name: true }
            }

        }
    })
}


export const medicineService = { getAllMedicines, getMedicineById }