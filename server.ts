import app from './app'
import { prisma } from './lib/prisma'
import './env'
async function main() {
    try {
        await prisma.$connect();
        console.log('prisma connected successfully')
        app.listen(process.env.PORT || 5000, () => {
            console.log('Server is up at PORT: 5000')
        })
    } catch (error) {
        console.log('An error occurred connecting prisma, Error: ', error)
        await prisma.$disconnect();
        process.exit(1)
    }
}

// main();
