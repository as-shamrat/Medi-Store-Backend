import { prisma } from "../lib/prisma"

async function getCategories() {
    return await prisma.category.findMany({ orderBy: { name: 'asc' } })
}
async function addCategory(data: { name: string, description?: string }) {
    return await prisma.category.create({ data: data })
}
async function updateCategory(categoryId: string, data: { name: string, description?: string }) {
    return await prisma.category.update({ where: { id: categoryId }, data: data })
}

export const categoryService = { getCategories, addCategory, updateCategory }