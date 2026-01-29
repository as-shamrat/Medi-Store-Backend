import { prisma } from "../lib/prisma";

// Example (replace IDs with YOUR actual ones)
const CATEGORY_IDS = {
    PAIN_RELIEF: "ddae4b90-ac48-4772-9551-ac7ec281c641",
    ANTIBIOTICS: "9cf13d45-e9b2-4c13-a9f5-849f104ff205",
    VITAMINS: "2b2e6a3e-c8bb-46a3-aa4a-90a4d951f59a",
    DIGESTIVE: "c3ebfa7b-20b9-497c-98ce-2026723fde3a",
    COLD_FLUE: "3a47e4a7-12f1-41cd-a8a6-c51146e419e5",
    DIABETES: "7df91db5-d5c3-411d-89d3-97dd931424fd",
    HEART_BLOOD: '80de6e6d-53a8-4114-b0f8-81f6ac6cb4bc',
    SKIN_CARE: '61b1636a-a438-4c4d-9688-b35774fa117f',
    ALLERGY: '25addff6-50b9-4384-a787-e8ac9140c2f3'
};

// const demoMedicines = [
//     {
//         name: "Paracetamol 500mg",
//         description: "Used to relieve mild to moderate pain and reduce fever.",
//         price: 30,
//         stock: 200,
//         manufacturer: "Beximco Pharma",
//         categoryId: CATEGORY_IDS.PAIN_RELIEF,
//         sellerId: 'NpfLdGEMeHwUjPwn5900IL6H7U2xnQDd'
//     },
//     {
//         name: "Napa Extra",
//         description: "Fast-acting pain relief with caffeine.",
//         price: 35,
//         stock: 150,
//         manufacturer: "Square Pharmaceuticals",
//         categoryId: CATEGORY_IDS.PAIN_RELIEF,
//         sellerId: 'NpfLdGEMeHwUjPwn5900IL6H7U2xnQDd'
//     },
//     {
//         name: "Azithromycin 500mg",
//         description: "Antibiotic used to treat various bacterial infections.",
//         price: 120,
//         stock: 80,
//         manufacturer: "Incepta Pharmaceuticals",
//         categoryId: CATEGORY_IDS.ANTIBIOTICS,
//         sellerId: 'NpfLdGEMeHwUjPwn5900IL6H7U2xnQDd'
//     },
//     {
//         name: "Vitamin C 1000mg",
//         description: "Boosts immunity and supports overall health.",
//         price: 180,
//         stock: 100,
//         manufacturer: "Renata Ltd",
//         categoryId: CATEGORY_IDS.VITAMINS,
//         sellerId: 'NpfLdGEMeHwUjPwn5900IL6H7U2xnQDd'
//     },
//     {
//         name: "Omeprazole 20mg",
//         description: "Reduces stomach acid and treats acid reflux.",
//         price: 90,
//         stock: 120,
//         manufacturer: "ACI Limited",
//         categoryId: CATEGORY_IDS.DIGESTIVE,
//         sellerId: 'NpfLdGEMeHwUjPwn5900IL6H7U2xnQDd'
//     },
// ];
const demoMedicines = [
    {
        name: "Ibuprofen 400mg",
        description: "Non-steroidal anti-inflammatory drug for pain and fever.",
        price: 45,
        stock: 180,
        manufacturer: "Square Pharmaceuticals",
        categoryId: CATEGORY_IDS.PAIN_RELIEF,
        sellerId: 'NpfLdGEMeHwUjPwn5900IL6H7U2xnQDd'
    },
    {
        name: "Aspirin 300mg",
        description: "Used to reduce pain, fever, and inflammation.",
        price: 25,
        stock: 220,
        manufacturer: "Beximco Pharma",
        categoryId: CATEGORY_IDS.PAIN_RELIEF,
        sellerId: 'NpfLdGEMeHwUjPwn5900IL6H7U2xnQDd'
    },
    {
        name: "Ciprofloxacin 500mg",
        description: "Broad-spectrum antibiotic for bacterial infections.",
        price: 140,
        stock: 90,
        manufacturer: "Incepta Pharmaceuticals",
        categoryId: CATEGORY_IDS.ANTIBIOTICS,
        sellerId: 'NpfLdGEMeHwUjPwn5900IL6H7U2xnQDd'
    },
    {
        name: "Amoxicillin 500mg",
        description: "Penicillin-type antibiotic used for various infections.",
        price: 110,
        stock: 100,
        manufacturer: "Renata Ltd",
        categoryId: CATEGORY_IDS.ANTIBIOTICS,
        sellerId: 'NpfLdGEMeHwUjPwn5900IL6H7U2xnQDd'
    },
    {
        name: "Metformin 500mg",
        description: "Helps control blood sugar levels in type 2 diabetes.",
        price: 60,
        stock: 200,
        manufacturer: "ACI Limited",
        categoryId: CATEGORY_IDS.DIABETES,
        sellerId: 'NpfLdGEMeHwUjPwn5900IL6H7U2xnQDd'
    },
    {
        name: "Insulin Injection",
        description: "Used to manage blood glucose levels in diabetes patients.",
        price: 850,
        stock: 40,
        manufacturer: "Novo Nordisk",
        categoryId: CATEGORY_IDS.DIABETES,
        sellerId: 'NpfLdGEMeHwUjPwn5900IL6H7U2xnQDd'
    },
    {
        name: "Cetirizine 10mg",
        description: "Antihistamine for allergy relief.",
        price: 20,
        stock: 300,
        manufacturer: "Opsonin Pharma",
        categoryId: CATEGORY_IDS.ALLERGY,
        sellerId: 'NpfLdGEMeHwUjPwn5900IL6H7U2xnQDd'
    },
    {
        name: "Loratadine 10mg",
        description: "Non-drowsy allergy relief medication.",
        price: 30,
        stock: 250,
        manufacturer: "Beximco Pharma",
        categoryId: CATEGORY_IDS.ALLERGY,
        sellerId: 'NpfLdGEMeHwUjPwn5900IL6H7U2xnQDd'
    },
    {
        name: "Salbutamol Inhaler",
        description: "Relieves asthma and breathing difficulties.",
        price: 220,
        stock: 60,
        manufacturer: "GlaxoSmithKline",
        categoryId: CATEGORY_IDS.COLD_FLUE,
        sellerId: 'NpfLdGEMeHwUjPwn5900IL6H7U2xnQDd'
    },
    {
        name: "Montelukast 10mg",
        description: "Prevents asthma attacks and treats allergies.",
        price: 95,
        stock: 120,
        manufacturer: "Incepta Pharmaceuticals",
        categoryId: CATEGORY_IDS.COLD_FLUE,
        sellerId: 'NpfLdGEMeHwUjPwn5900IL6H7U2xnQDd'
    },
    {
        name: "Atorvastatin 10mg",
        description: "Lowers cholesterol and reduces heart disease risk.",
        price: 150,
        stock: 130,
        manufacturer: "Square Pharmaceuticals",
        categoryId: CATEGORY_IDS.HEART_BLOOD,
        sellerId: 'NpfLdGEMeHwUjPwn5900IL6H7U2xnQDd'
    },
    {
        name: "Amlodipine 5mg",
        description: "Treats high blood pressure and chest pain.",
        price: 70,
        stock: 160,
        manufacturer: "Renata Ltd",
        categoryId: CATEGORY_IDS.HEART_BLOOD,
        sellerId: 'NpfLdGEMeHwUjPwn5900IL6H7U2xnQDd'
    },
    {
        name: "Ranitidine 150mg",
        description: "Reduces stomach acid and treats ulcers.",
        price: 40,
        stock: 190,
        manufacturer: "ACI Limited",
        categoryId: CATEGORY_IDS.DIGESTIVE,
        sellerId: 'NpfLdGEMeHwUjPwn5900IL6H7U2xnQDd'
    },
    {
        name: "Domperidone 10mg",
        description: "Relieves nausea and vomiting.",
        price: 35,
        stock: 170,
        manufacturer: "Eskayef Pharmaceuticals",
        categoryId: CATEGORY_IDS.DIGESTIVE,
        sellerId: 'NpfLdGEMeHwUjPwn5900IL6H7U2xnQDd'
    },
    {
        name: "Multivitamin Tablets",
        description: "Supports overall health and immunity.",
        price: 210,
        stock: 140,
        manufacturer: "Renata Ltd",
        categoryId: CATEGORY_IDS.VITAMINS,
        sellerId: 'NpfLdGEMeHwUjPwn5900IL6H7U2xnQDd'
    },
    {
        name: "Vitamin D3 2000 IU",
        description: "Supports bone health and immune system.",
        price: 260,
        stock: 110,
        manufacturer: "Incepta Pharmaceuticals",
        categoryId: CATEGORY_IDS.VITAMINS,
        sellerId: 'NpfLdGEMeHwUjPwn5900IL6H7U2xnQDd'
    },
    {
        name: "Hydrocortisone Cream",
        description: "Relieves skin inflammation and itching.",
        price: 120,
        stock: 90,
        manufacturer: "Beximco Pharma",
        categoryId: CATEGORY_IDS.SKIN_CARE,
        sellerId: 'NpfLdGEMeHwUjPwn5900IL6H7U2xnQDd'
    },
    {
        name: "Antifungal Cream",
        description: "Treats fungal skin infections.",
        price: 140,
        stock: 100,
        manufacturer: "Square Pharmaceuticals",
        categoryId: CATEGORY_IDS.SKIN_CARE,
        sellerId: 'NpfLdGEMeHwUjPwn5900IL6H7U2xnQDd'
    },
    {
        name: "ORS Sachet",
        description: "Prevents dehydration due to diarrhea.",
        price: 15,
        stock: 500,
        manufacturer: "Renata Ltd",
        categoryId: CATEGORY_IDS.DIGESTIVE,
        sellerId: 'NpfLdGEMeHwUjPwn5900IL6H7U2xnQDd'
    },
    {
        name: "Zinc Tablets",
        description: "Supports immune function and wound healing.",
        price: 50,
        stock: 220,
        manufacturer: "Incepta Pharmaceuticals",
        categoryId: CATEGORY_IDS.VITAMINS,
        sellerId: 'NpfLdGEMeHwUjPwn5900IL6H7U2xnQDd'
    },
];


async function seedMedicine() {
    try {
        const response = await prisma.medicine.createMany({ data: demoMedicines })
        console.log('Response: ', response)

    } catch (error) {
        console.log('Error at seeding medicine: ', error)
    }
}

seedMedicine();