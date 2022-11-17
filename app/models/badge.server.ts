import { Badge, User, UserType } from "@prisma/client";
import { prisma } from "~/db.server";

export async function createBadge({
  name,
  pictureUrl,
  description,
  userId,
}: {
  name: Badge["name"];
  pictureUrl: Badge["pictureUrl"];
  description: Badge["description"];
  userId: User["id"];
}) {
  return await prisma.badge.create({
    data: {
      name,
      pictureUrl,
      description,
      createdById: userId,
    },
  });
}

export async function getBadges(user: User & { badgesEarned: Badge[] }) {
  if (user.accountType === UserType.PROFESSOR) {
    const badges = await prisma.badge.findMany({
      where: {
        OR: [
          { createdById: user.id },
          { createdBy: { programId: user.programId } },
        ],
      },
    });
    return badges;
  } else {
    return user.badgesEarned;
  }
}
