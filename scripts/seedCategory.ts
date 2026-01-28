
import { prisma } from "../lib/prisma"

const demoCategories = [
    { name: "Pain Relief", description: "Medicines for headaches, body pain, and inflammation." },
    { name: "Antibiotics", description: "Drugs used to treat bacterial infections." },
    { name: "Vitamins & Supplements", description: "Daily vitamins, minerals, and nutritional supplements." },
    { name: "Cold & Flu", description: "Medications for cold, flu, cough, and sore throat." },
    { name: "Diabetes Care", description: "Medicines and supplies for managing diabetes." },
    { name: "Heart & Blood", description: "Medications for heart health, blood pressure, and cholesterol." },
    { name: "Skin Care", description: "Creams, ointments, and treatments for skin conditions." },
    { name: "Digestive Health", description: "Medicines for stomach, digestion, and gut health." },
    { name: "Allergy", description: "Medications for seasonal and food allergies." },
];

async function seedCategory() {
    try {
        const response = await prisma.category.createMany({
            data: demoCategories,
            skipDuplicates: true
        })
        console.log('Seeding category response: ', response)
    }
    catch (error) {
        console.error('Error at seeding categories: ', error)
    }
}

seedCategory();