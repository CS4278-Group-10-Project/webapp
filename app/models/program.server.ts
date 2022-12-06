import { Program } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getAllPrograms() {
  return prisma.program.findMany();
}

export async function deleteProgram({ id }: { id: Program["id"] }) {
  return prisma.program.delete({
    where: {
      id,
    },
  });
}

export async function editProgram({
  id,
  name,
  description,
}: {
  id: Program["id"];
  name: Program["name"];
  description: Program["description"];
}) {
  return prisma.program.update({
    where: {
      id,
    },
    data: { name, description },
  });
}
