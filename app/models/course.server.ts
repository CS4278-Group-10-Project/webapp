import { prisma } from "~/db.server";
import { getUserId } from "~/session.server";

export async function getAllCourses(request: Request) {
  const userId = await getUserId(request);
  const allCourses = await prisma.course.findMany({
    include: {
      completedUsers: true,
      enrolledUsers: true,
    },
    orderBy: { updatedAt: "desc" },
  });

  return allCourses.map((course) => {
    const completed = course.completedUsers.some((user) => user.id === userId);
    const enrolled = course.enrolledUsers.some((user) => user.id === userId);

    return {
      ...course,
      completed,
      enrolled,
    };
  });
}
