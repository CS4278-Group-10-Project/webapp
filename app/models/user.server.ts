import { Password, StudentStanding, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"], include?: any) {
  return prisma.user.findUnique({ where: { id }, include });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser({
  email,
  password,
  firstName,
  lastName,
  bio,
  programId,
  standing,
}: {
  email: User["email"];
  password: string;
  firstName: User["firstName"];
  lastName: User["lastName"];
  bio: User["bio"];
  programId: string;
  standing: StudentStanding;
}) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      firstName,
      lastName,
      bio,
      programId: parseInt(programId),
      standing,
    },
  });
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"]
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  console.log({
    password,
    hash: userWithPassword.password.hash,
    userWithPassword,
    pass: userWithPassword.password,
  });

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}

export async function getProfessorStudents(professorId: User["id"]) {
  // request students who are taking courses taught by this professor
  const students = await prisma.user.findMany({
    where: {
      enrolledCourses: {
        some: {
          professorId,
        },
      },
    },
  });
  return students;
}

export async function getAllUsers() {
  return prisma.user.findMany();
}

export async function updateUser({
  id,
  email,
  firstName,
  lastName,
  bio,
  accountType,
  programId,
}: {
  id: User["id"];
  email: User["email"];
  firstName: User["firstName"];
  lastName: User["lastName"];
  bio: User["bio"];
  accountType: User["accountType"];
  programId: User["programId"];
}) {
  return prisma.user.update({
    where: { id },
    data: {
      email,
      firstName,
      lastName,
      bio,
      accountType,
      programId,
    },
  });
}

export async function getAllProfessors() {
  return prisma.user.findMany({
    where: {
      accountType: "PROFESSOR",
    },
  });
}
