import { Course, User } from "@prisma/client";
import { prisma } from "~/db.server";

export async function enroll({
  userId,
  courseId,
  unenroll,
}: {
  userId: User["id"];
  courseId: Course["id"];
  unenroll?: boolean;
}) {
  if (unenroll) {
    return await prisma.course.update({
      where: { id: courseId },
      data: {
        enrolledUsers: {
          disconnect: {
            id: userId,
          },
        },
      },
    });
  }

  return await prisma.course.update({
    where: { id: courseId },
    data: {
      enrolledUsers: {
        connect: {
          id: userId,
        },
      },
    },
  });
}
