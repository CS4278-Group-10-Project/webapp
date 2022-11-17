import { Activity, Competency } from "@prisma/client";
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

export async function getActivities({
  request,
  isProfessor,
}: {
  request: Request;
  isProfessor: boolean;
}) {
  const userId = await getUserId(request);
  const activities = await prisma.activity.findMany({
    where: {
      userId,
    },
  });

  const allActivities = await prisma.activity.findMany();

  return isProfessor ? allActivities : activities;
}

export async function deleteActivity({ id }: { id: Activity["id"] }) {
  return await prisma.activity.delete({
    where: { id },
  });
}

export async function editActivity({
  id,
  name,
  description,
}: {
  id: Activity["id"];
  name: Activity["name"];
  description: Activity["description"];
}) {
  const currentCompetencies = await prisma.activity.findUnique({
    where: { id },
    select: {
      competencies: true,
    },
  });

  return await prisma.activity.update({
    where: { id },
    data: {
      name,
      description,
      competencies: {
        connect: currentCompetencies?.competencies.map(({ id }) => ({ id })),
      },
    },
  });
}
