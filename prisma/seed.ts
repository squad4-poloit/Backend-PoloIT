import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {

  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      first_name:"alice",
      last_name:"Messi",
      email:"alice@gmail.test",
      dni:"42236541",
      phone: "1241523663",
      role:{
        create: {
            name: "admin"
        }
      }
    },
  })

  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
        first_name:"bob",
        last_name:"Messi",
        email:"bob@gmail.test",
        dni:"4712352152",
        phone: "236214",
        role: {
            create:{
                name:"manager"
            }
        }
    },
  })

  const pepe = await prisma.user.upsert({
    where: { email: 'pepe@prisma.io' },
    update: {},
    create: {
        first_name:"pepe",
        last_name:"Messi",
        email:"pepe@gmail.test",
        dni:"63254712",
        phone: "25463321",
        role: {
            create:{
                name:"student"
            }
        }
    },
  })
  console.log({ alice, bob, pepe })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })