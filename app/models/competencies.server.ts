import { Competency } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getAllCompetencies() {
  return await prisma.competency.findMany();
}

export async function deleteCompetency({ id }: { id: Competency["id"] }) {
  return await prisma.competency.delete({
    where: { id },
  });
}

export async function editCompetency({
  id,
  name,
  description,
}: {
  id: Competency["id"];
  name: Competency["name"];
  description: Competency["description"];
}) {
  return await prisma.competency.update({
    where: { id },
    data: { name, description },
  });
}
