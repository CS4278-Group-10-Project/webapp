import { Badge, Course, HoursLog } from "@prisma/client";
import { prisma } from "~/db.server";

export async function logHours({
  start,
  end,
  comment,
  userId,
  courseId,
}: {
  start: HoursLog["start"];
  end: HoursLog["end"];
  comment: HoursLog["comment"];
  userId: HoursLog["userId"];
  courseId: HoursLog["courseId"];
}) {
  return await prisma.hoursLog.create({
    data: {
      start,
      end,
      comment,
      user: {
        connect: {
          id: userId,
        },
      },
      course: {
        connect: {
          id: courseId,
        },
      },
    },
  });
}
