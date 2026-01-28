import { prisma } from "../lib/prisma"

async function getCategories() {
    return await prisma.category.findMany({ orderBy: { name: 'asc' } })
}

export const categoryService = { getCategories }