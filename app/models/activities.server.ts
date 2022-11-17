import { Competency } from "@prisma/client";
import { prisma } from "~/db.server";
import { getUserId } from "~/session.server";

export async function createActivity(
  request: Request,
  {
    name,
    description,
    competencies,
  }: {
    name: string;
    description: string;
    competencies: Competency[];
  }
) {
  const userId = await getUserId(request);
  const activity = await prisma.activity.create({
    data: {
      name,
      description,
      competencies: {
        connect: competencies.map(({ id }) => ({ id })),
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return activity;
}
