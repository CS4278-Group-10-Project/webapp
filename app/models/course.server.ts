import { Course, Program } from "@prisma/client";
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

export async function getCourseById({ id }: { id: string }) {
  const course = await prisma.course.findUnique({
    where: { id },
  });

  return course;
}

export async function createCourse({
  name,
  description,
  courseCode,
  professorId,
  programs,
  hoursNeeded,
}: {
  name: Course["name"];
  description: Course["description"];
  courseCode: Course["courseCode"];
  professorId: Course["professorId"];
  programs: Program[] | Program;
  hoursNeeded: Course["needsHoursLogged"];
}) {
  const course = await prisma.course.create({
    data: {
      name,
      description,
      courseCode,
      professorId,
      needsHoursLogged: hoursNeeded,
      programs: {
        connect: Array.isArray(programs)
          ? [...programs.map((program) => ({ id: program.id }))]
          : {
              id: programs.id,
            },
      },
    },
  });

  return course;
}
