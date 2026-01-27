import { auth } from "../lib/auth"
import { prisma } from "../lib/prisma"
import bcrypt from "bcryptjs"
const adminData = {
    name: "Shahriar Shamrat", // required
    email: "shahriar4499@gmail.com", // required
    password: "password123", // required
    role: "ADMIN",
    phone: "01817211899"
}

async function seedAdmin() {
    try {
        const existingUser = await prisma.user.findUnique({ where: { email: adminData.email } })
        if (existingUser) {
            throw new Error('Admin already exists')
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("password123", salt);
        const data = await auth.api.signUpEmail({
            body: {
                name: "John Doe", // required
                email: "john.doe@example.com", // required
                password: "password123", // required
                role: 'ADMIN',
            },
        });
        console.log(data)
    }
    catch (error) {
        console.error('Error at creating admin.Error: ', error)
    }
}

seedAdmin();