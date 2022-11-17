import { Box, Typography } from "@mui/material";
import { Course } from "@prisma/client";
import CourseCard from "./courseCard";

export default function CourseList({
  title,
  courses,
  isProfessor,
}: {
  title: string;
  courses: Course[];
  isProfessor?: boolean;
}) {
  return (
    <>
      <h4 className="mt-0 mb-2 pt-5 pl-5 text-2xl font-bold leading-tight text-black">
        {title}
      </h4>

      {courses.length > 0 ? (
        <Box className="flex flex-wrap gap-10 overflow-x-scroll pl-5">
          {courses.map((course, key) => (
            <CourseCard course={course} key={key} isProfessor={isProfessor} />
          ))}
        </Box>
      ) : (
        <Typography ml={3}>No courses found</Typography>
      )}
    </>
  );
}
