import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const existingUser = await prisma.user.findUnique({
      where: {email: "maria@prisma.io"}
    })

    if(existingUser){
      console.log("El usuario ya esxiste: ", existingUser  );
    } else{
      const user = await prisma.user.create({
        data: {
            name: 'Juana',
            email: 'Juana@prisma.io',
        },
    })
    console.log(user)

  }
    
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