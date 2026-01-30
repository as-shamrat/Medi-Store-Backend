async function addMedicine(sellerId: string, data: { name: string, description: string, price: number, stock: number, manufacturer: string, categoryId: string }) {
    console.log({ ...data, sellerId })
    return null
}

export const sellerService = { addMedicine }