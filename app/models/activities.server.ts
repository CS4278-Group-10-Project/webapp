import { prisma } from "~/db.server";
import { getUserId } from "~/session.server";

export async function createActivity(request: Request) {
  const userId = await getUserId(request);
  const { name, description, competencies } = await request.json();
  const activity = await prisma.activity.create({
    data: {
      name,
      description,
      competencies: {
        connect: competencies.map((id: string) => ({ id })),
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
