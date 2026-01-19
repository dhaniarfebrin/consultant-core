/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@example.com";
  const password = "admin";

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        name: "Admin User",
        password: hashedPassword,
        role: "ADMIN",
      },
    });
    console.log(`Created default user: ${user.email}`);
  } else {
    console.log("Default user already exists.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
